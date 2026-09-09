"use client";
import { useRef, useEffect } from "react";

/* ── GLSL ── */
const BG_VERT = `
varying vec2 vUv;
void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}
`;

const BG_FRAG = `
precision highp float;
uniform float uTime;
uniform vec2  uMouse;
varying vec2  vUv;

vec2 hash2(vec2 p){
  p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));
  return -1.+2.*fract(sin(p)*43758.5453);
}
float gnoise(vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(dot(hash2(i),f),dot(hash2(i+vec2(1,0)),f-vec2(1,0)),u.x),
             mix(dot(hash2(i+vec2(0,1)),f-vec2(0,1)),dot(hash2(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<6;i++){v+=a*gnoise(p);p=p*2.+vec2(100.);a*=.5;}
  return v;
}
void main(){
  vec2 uv=vUv*2.5-1.25;
  float t=uTime*.12;

  vec2 q=vec2(fbm(uv+vec2(0.,0.)+t),
              fbm(uv+vec2(5.2,1.3)+t));
  vec2 r=vec2(fbm(uv+4.*q+vec2(1.7,9.2)+.15*t),
              fbm(uv+4.*q+vec2(8.3,2.8)+.126*t));
  float f=fbm(uv+4.*r+t*.5);

  // palette: deep dark → wine → gold
  vec3 c=mix(vec3(.02,.005,.04),vec3(.22,.045,.09),clamp(f*f*4.,0.,1.));
  c=mix(c,vec3(.78,.64,.28),clamp(length(q)*.6,0.,1.));
  c=mix(c,vec3(.05,.01,.12),clamp(length(r)*.5,0.,1.));
  c+=.18*vec3(.78,.64,.28)*exp(-length(vUv-uMouse)*5.5); // mouse glow

  // vignette
  vec2 vig=vUv*(1.-vUv);
  c*=pow(vig.x*vig.y*14.,0.35);

  gl_FragColor=vec4(c*(f*.6+.55),1.);
}
`;

const PT_VERT = `
attribute float aSize;
attribute float aSpeed;
uniform   float uTime;
varying   float vAlpha;

void main(){
  vec3 pos=position;
  float wave=sin(uTime*aSpeed+position.x*3.)+cos(uTime*aSpeed*.7+position.z*2.5);
  pos+=normal*wave*.018;                  // breathe along surface normal
  vec4 mv=modelViewMatrix*vec4(pos,1.);
  gl_PointSize=aSize*(260./-mv.z);
  gl_Position=projectionMatrix*mv;
  vAlpha=.55+.45*(.5+.5*wave);
}
`;

const PT_FRAG = `
varying float vAlpha;
void main(){
  vec2 uv=gl_PointCoord-.5;
  float r=length(uv);
  if(r>.5) discard;
  float a=pow(1.-r*2.,1.8)*vAlpha;
  vec3 c=mix(vec3(.78,.64,.28),vec3(.62,.14,.26),r*2.);
  gl_FragColor=vec4(c,a);
}
`;

const LINE_VERT = `
attribute float aOpacity;
varying   float vOpacity;
void main(){vOpacity=aOpacity;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}
`;
const LINE_FRAG = `
varying float vOpacity;
void main(){gl_FragColor=vec4(.62,.14,.26,vOpacity*.35);}
`;

/* ── component ── */
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
      const cam   = new THREE.PerspectiveCamera(60, W / H, 0.01, 100);
      cam.position.z = 2.6;

      /* ── BG PLANE ── */
      const bgMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(0.5, 0.5) } },
        vertexShader: BG_VERT,
        fragmentShader: BG_FRAG,
        depthTest: false,
        depthWrite: false,
      });
      const bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMat);
      bgMesh.renderOrder = -1;
      bgMesh.frustumCulled = false;
      scene.add(bgMesh);

      /* ── PARTICLES ── */
      const N = 3200;
      const pos   = new Float32Array(N * 3);
      const norm  = new Float32Array(N * 3);
      const sizes = new Float32Array(N);
      const speed = new Float32Array(N);
      const φ     = Math.PI * (Math.sqrt(5) - 1);

      for (let i = 0; i < N; i++) {
        // Fibonacci sphere
        const y   = 1 - (i / (N - 1)) * 2;
        const rad = Math.sqrt(Math.max(0, 1 - y * y));
        const θ   = φ * i;
        const rx  = rad * Math.cos(θ);
        const rz  = rad * Math.sin(θ);
        // slight brain-squish: flatten top/bottom, bulge sides
        const sx = rx * (1 + .22 * Math.abs(y));
        const sy = y  * .85;
        const sz = rz * (1 + .18 * Math.abs(y));
        const len = Math.sqrt(sx*sx+sy*sy+sz*sz) || 1;
        pos[i*3]=sx; pos[i*3+1]=sy; pos[i*3+2]=sz;
        norm[i*3]=sx/len; norm[i*3+1]=sy/len; norm[i*3+2]=sz/len;
        sizes[i] = 0.9 + Math.random() * 1.6;
        speed[i] = 0.4 + Math.random() * 0.9;
      }

      const ptGeo = new THREE.BufferGeometry();
      ptGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      ptGeo.setAttribute("normal",   new THREE.BufferAttribute(norm, 3));
      ptGeo.setAttribute("aSize",    new THREE.BufferAttribute(sizes, 1));
      ptGeo.setAttribute("aSpeed",   new THREE.BufferAttribute(speed, 1));

      const ptMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader:   PT_VERT,
        fragmentShader: PT_FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(ptGeo, ptMat);
      scene.add(points);

      /* ── CONNECTION LINES ── */
      // sample a subset for connections (performance)
      const LSAMPLE = 600;
      const linePos: number[] = [];
      const lineOp:  number[] = [];
      const THRESH = 0.48;

      for (let i = 0; i < LSAMPLE; i++) {
        for (let j = i + 1; j < LSAMPLE; j++) {
          const dx = pos[i*3]-pos[j*3], dy = pos[i*3+1]-pos[j*3+1], dz = pos[i*3+2]-pos[j*3+2];
          const d  = Math.sqrt(dx*dx+dy*dy+dz*dz);
          if (d < THRESH) {
            linePos.push(pos[i*3],pos[i*3+1],pos[i*3+2], pos[j*3],pos[j*3+1],pos[j*3+2]);
            const op = 1 - d / THRESH;
            lineOp.push(op, op);
          }
        }
      }

      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePos), 3));
      lineGeo.setAttribute("aOpacity", new THREE.BufferAttribute(new Float32Array(lineOp), 1));
      const lineMat = new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: LINE_VERT,
        fragmentShader: LINE_FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(lines);

      /* ── RESIZE ── */
      const onResize = () => {
        const w = mount.clientWidth, h = mount.clientHeight;
        renderer.setSize(w, h);
        cam.aspect = w / h;
        cam.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      /* ── MOUSE ── */
      const onMouse = (e: MouseEvent) => {
        const r = mount.getBoundingClientRect();
        mouse.x = (e.clientX - r.left) / r.width;
        mouse.y = 1 - (e.clientY - r.top)  / r.height;
      };
      window.addEventListener("mousemove", onMouse);

      /* ── LOOP ── */
      let t = 0;
      const clock = new THREE.Clock();
      const targetRot = { x: 0, y: 0 };
      const currentRot = { x: 0, y: 0 };

      const animate = () => {
        raf = requestAnimationFrame(animate);
        const dt = clock.getDelta();
        t += dt;

        bgMat.uniforms.uTime.value = t;
        bgMat.uniforms.uMouse.value.set(mouse.x, mouse.y);
        ptMat.uniforms.uTime.value = t;

        // Slow auto-rotation + mouse tilt
        targetRot.y = t * 0.08 + (mouse.x - 0.5) * 0.5;
        targetRot.x = (mouse.y - 0.5) * 0.3;
        currentRot.x += (targetRot.x - currentRot.x) * 0.04;
        currentRot.y += (targetRot.y - currentRot.y) * 0.04;

        points.rotation.y = currentRot.y;
        points.rotation.x = currentRot.x;
        lines.rotation.y  = currentRot.y;
        lines.rotation.x  = currentRot.x;

        renderer.render(scene, cam);
      };
      animate();

      /* ── CLEANUP ── */
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
