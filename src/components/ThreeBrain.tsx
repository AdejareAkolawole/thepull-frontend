"use client";
import { useRef, useEffect } from "react";

/* ── CPU-side noise (for brain mesh displacement) ── */
function _h(n: number) { const x = Math.sin(n) * 43758.5453; return x - Math.floor(x); }
function noise3(x: number, y: number, z: number) {
  const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z);
  const fx = x-ix, fy = y-iy, fz = z-iz;
  const ux = fx*fx*(3-2*fx), uy = fy*fy*(3-2*fy), uz = fz*fz*(3-2*fz);
  const h = (a: number, b: number, c: number) => _h(a + b*157 + c*113) * 2 - 1;
  const lp = (a: number, b: number, t: number) => a + t*(b-a);
  return lp(
    lp(lp(h(ix,iy,iz), h(ix+1,iy,iz), ux), lp(h(ix,iy+1,iz), h(ix+1,iy+1,iz), ux), uy),
    lp(lp(h(ix,iy,iz+1), h(ix+1,iy,iz+1), ux), lp(h(ix,iy+1,iz+1), h(ix+1,iy+1,iz+1), ux), uy),
    uz
  );
}
function fbm(x: number, y: number, z: number, oct = 5) {
  let v = 0, amp = 0.5;
  for (let i = 0; i < oct; i++) { v += amp * noise3(x, y, z); x *= 2.17; y *= 2.17; z *= 2.17; amp *= 0.5; }
  return v;
}

/* ── GLSL shaders ── */
const BG_VERT = `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`;
const BG_FRAG = `
precision highp float;
uniform float uTime; uniform vec2 uMouse; varying vec2 vUv;
vec2 hash2(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return -1.+2.*fract(sin(p)*43758.5453);}
float gnoise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(dot(hash2(i),f),dot(hash2(i+vec2(1,0)),f-vec2(1,0)),u.x),mix(dot(hash2(i+vec2(0,1)),f-vec2(0,1)),dot(hash2(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<6;i++){v+=a*gnoise(p);p=p*2.+vec2(100.);a*=.5;}return v;}
void main(){
  vec2 uv=vUv*2.5-1.25; float t=uTime*.1;
  vec2 q=vec2(fbm(uv+t),fbm(uv+vec2(5.2,1.3)+t));
  vec2 r=vec2(fbm(uv+4.*q+vec2(1.7,9.2)+.15*t),fbm(uv+4.*q+vec2(8.3,2.8)+.126*t));
  float f=fbm(uv+4.*r+t*.5);
  vec3 c=mix(vec3(.01,.002,.02),vec3(.18,.03,.07),clamp(f*f*4.,0.,1.));
  c=mix(c,vec3(.6,.48,.18),clamp(length(q)*.5,0.,1.));
  c=mix(c,vec3(.03,.005,.08),clamp(length(r)*.4,0.,1.));
  c+=.12*vec3(.7,.55,.2)*exp(-length(vUv-uMouse)*6.);
  vec2 vig=vUv*(1.-vUv); c*=pow(vig.x*vig.y*14.,.3);
  gl_FragColor=vec4(c*(f*.5+.45),1.);
}`;

const BRAIN_VERT = `
attribute float aFold;
uniform float uTime;
varying vec3 vNormal;
varying vec3 vViewPos;
varying float vFold;
void main(){
  vec3 pos=position+normal*sin(uTime*.55)*.012;
  vNormal=normalize(normalMatrix*normal);
  vec4 mv=modelViewMatrix*vec4(pos,1.);
  vViewPos=-mv.xyz;
  vFold=aFold;
  gl_Position=projectionMatrix*mv;
}`;

const BRAIN_FRAG = `
precision highp float;
varying vec3 vNormal; varying vec3 vViewPos; varying float vFold;
uniform float uTime;
void main(){
  vec3 N=normalize(vNormal);
  vec3 V=normalize(vViewPos);
  vec3 L1=normalize(vec3(.7,1.,.9));
  vec3 L2=normalize(vec3(-.7,.1,.2));
  vec3 L3=normalize(vec3(.0,-.2,-1.));
  float d1=max(dot(N,L1),0.);
  float d2=max(dot(N,L2),0.)*.22;
  float rim=pow(1.-max(dot(N,V),0.),4.5);
  vec3 H=normalize(L1+V);
  float spec=pow(max(dot(N,H),0.),56.);
  vec3 sulcus=vec3(.1,.018,.04);
  vec3 gyrus=vec3(.52,.11,.22);
  vec3 base=mix(sulcus,gyrus,clamp(vFold,0.,1.));
  vec3 col=base*.09+base*d1*.75+base*d2;
  col+=vec3(.82,.67,.28)*spec*.4;
  col+=vec3(.48,.08,.2)*rim*.9;
  float pulse=.5+.5*sin(uTime*.75);
  col+=vec3(.28,.03,.1)*(1.-vFold)*.14*pulse;
  gl_FragColor=vec4(col,1.);
}`;

export default function ThreeBrain({ style }: { style?: React.CSSProperties }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || typeof window === "undefined") return;
    let raf: number;
    const mouse = { x: 0.5, y: 0.5 };

    import("three").then((THREE) => {
      const W = mount.clientWidth, H = mount.clientHeight;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(58, W / H, 0.01, 100);
      cam.position.z = 2.8;

      /* ── background plane ── */
      const bgMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(.5,.5) } },
        vertexShader: BG_VERT, fragmentShader: BG_FRAG,
        depthTest: false, depthWrite: false,
      });
      const bg = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMat);
      bg.renderOrder = -1; bg.frustumCulled = false;
      scene.add(bg);

      /* ── REAL BRAIN MESH ── */
      const geo = new THREE.SphereGeometry(1, 96, 72);
      const pos  = geo.attributes.position;
      const norm = geo.attributes.normal;
      const cnt  = pos.count;
      const foldArr = new Float32Array(cnt);

      for (let i = 0; i < cnt; i++) {
        // sphere surface normal = unit direction
        const nx = norm.getX(i), ny = norm.getY(i), nz = norm.getZ(i);
        const nl = Math.sqrt(nx*nx+ny*ny+nz*nz) || 1;
        const ux = nx/nl, uy = ny/nl, uz = nz/nl;

        // Brain shape: wider laterally, slightly flattened vertically
        let px = ux * 1.30;
        let py = uy * 0.78;
        let pz = uz * 1.05;

        // Cortical folds: medium frequency for gyri, high freq for micro-detail
        const f1 = fbm(ux*3.6 + 1.0, uy*3.6, uz*3.6, 5);
        const f2 = fbm(ux*9.0, uy*9.0, uz*9.0, 3) * 0.3;
        const disp = f1 * 0.19 + f2 * 0.05;

        px += ux * disp; py += uy * disp; pz += uz * disp;

        // Interhemispheric fissure — deep groove along x≈0, top half
        const fissure = Math.max(0, 1 - Math.abs(ux) / 0.11) * Math.max(0, uy * 3.0);
        px -= Math.sign(ux || 0.001) * fissure * 0.24;
        py -= fissure * 0.1;

        // Flatten bottom (brainstem area)
        if (uy < -0.55) py += uy * 0.12;

        pos.setXYZ(i, px, py, pz);
        foldArr[i] = Math.max(0, Math.min(1, 0.5 + f1 * 0.8));
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
      geo.setAttribute("aFold", new THREE.BufferAttribute(foldArr, 1));

      const brainMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: BRAIN_VERT,
        fragmentShader: BRAIN_FRAG,
      });
      const brain = new THREE.Mesh(geo, brainMat);
      scene.add(brain);

      /* ── resize / mouse ── */
      const onResize = () => {
        const w = mount.clientWidth, h = mount.clientHeight;
        renderer.setSize(w, h); cam.aspect = w/h; cam.updateProjectionMatrix();
      };
      const onMouse = (e: MouseEvent) => {
        const r = mount.getBoundingClientRect();
        mouse.x = (e.clientX - r.left) / r.width;
        mouse.y = 1 - (e.clientY - r.top) / r.height;
      };
      window.addEventListener("resize", onResize);
      window.addEventListener("mousemove", onMouse);

      /* ── loop ── */
      let t = 0;
      const clock = new THREE.Clock();
      const rot = { x: 0, y: 0 }, tgt = { x: 0, y: 0 };
      const animate = () => {
        raf = requestAnimationFrame(animate);
        const dt = clock.getDelta(); t += dt;
        bgMat.uniforms.uTime.value = t;
        bgMat.uniforms.uMouse.value.set(mouse.x, mouse.y);
        brainMat.uniforms.uTime.value = t;
        tgt.y = t * 0.07 + (mouse.x - 0.5) * 0.55;
        tgt.x = (mouse.y - 0.5) * 0.28;
        rot.x += (tgt.x - rot.x) * 0.04;
        rot.y += (tgt.y - rot.y) * 0.04;
        brain.rotation.y = rot.y;
        brain.rotation.x = rot.x;
        renderer.render(scene, cam);
      };
      animate();

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("mousemove", onMouse);
        renderer.dispose();
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      };
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%", ...style }} />;
}
