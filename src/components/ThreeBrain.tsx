"use client";
import { useRef, useEffect } from "react";

/* ── CPU noise for brain mesh ── */
function _h(n: number) { const x = Math.sin(n) * 43758.5453; return x - Math.floor(x); }
function noise3(x: number, y: number, z: number) {
  const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z);
  const fx = x-ix, fy = y-iy, fz = z-iz;
  const ux = fx*fx*(3-2*fx), uy = fy*fy*(3-2*fy), uz = fz*fz*(3-2*fz);
  const h = (a: number, b: number, c: number) => _h(a + b*157 + c*113) * 2 - 1;
  const lp = (a: number, b: number, t: number) => a + t*(b-a);
  return lp(
    lp(lp(h(ix,iy,iz), h(ix+1,iy,iz), ux), lp(h(ix,iy+1,iz), h(ix+1,iy+1,iz), ux), uy),
    lp(lp(h(ix,iy,iz+1), h(ix+1,iy,iz+1), ux), lp(h(ix,iy+1,iz+1), h(ix+1,iy+1,iz+1), ux), uy), uz);
}
function fbm(x: number, y: number, z: number, oct = 5) {
  let v = 0, amp = 0.5;
  for (let i = 0; i < oct; i++) { v += amp * noise3(x, y, z); x *= 2.17; y *= 2.17; z *= 2.17; amp *= 0.5; }
  return v;
}

const BRAIN_VERT = `
attribute float aFold;
uniform float uTime;
varying vec3 vNormal; varying vec3 vViewPos; varying float vFold;
void main(){
  vec3 pos = position + normal * sin(uTime * 0.55) * 0.012;
  vNormal = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vViewPos = -mv.xyz; vFold = aFold;
  gl_Position = projectionMatrix * mv;
}`;

const BRAIN_FRAG = `
precision highp float;
varying vec3 vNormal; varying vec3 vViewPos; varying float vFold;
uniform float uTime;
void main(){
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewPos);
  vec3 L1 = normalize(vec3(0.8, 1.2, 1.0));
  vec3 L2 = normalize(vec3(-0.6, 0.4, 0.5));
  vec3 L3 = normalize(vec3(0.0, -0.5, -1.0));
  float d1 = max(dot(N, L1), 0.0);
  float d2 = max(dot(N, L2), 0.0) * 0.28;
  float d3 = max(dot(N, L3), 0.0) * 0.15;
  float rim = pow(1.0 - max(dot(N, V), 0.0), 4.0);
  vec3 H = normalize(L1 + V);
  float spec = pow(max(dot(N, H), 0.0), 64.0);
  vec3 sulcus = vec3(0.13, 0.025, 0.055);
  vec3 gyrus  = vec3(0.62, 0.14, 0.26);
  vec3 base = mix(sulcus, gyrus, clamp(vFold, 0.0, 1.0));
  vec3 col = base * 0.14 + base * d1 * 0.72 + base * d2 + base * d3;
  col += vec3(0.85, 0.68, 0.28) * spec * 0.55;
  col += vec3(0.55, 0.10, 0.22) * rim * 1.1;
  float pulse = 0.5 + 0.5 * sin(uTime * 0.75);
  col += vec3(0.32, 0.04, 0.13) * (1.0 - vFold) * 0.18 * pulse;
  gl_FragColor = vec4(col, 1.0);
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
      renderer.setClearColor(0x000000, 0); // transparent bg
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(55, W / H, 0.01, 100);
      cam.position.z = 2.8;

      /* ── real brain mesh ── */
      const geo = new THREE.SphereGeometry(1, 96, 72);
      const pos = geo.attributes.position;
      const norm = geo.attributes.normal;
      const cnt = pos.count;
      const foldArr = new Float32Array(cnt);

      for (let i = 0; i < cnt; i++) {
        const nx = norm.getX(i), ny = norm.getY(i), nz = norm.getZ(i);
        const nl = Math.sqrt(nx*nx+ny*ny+nz*nz) || 1;
        const ux = nx/nl, uy = ny/nl, uz = nz/nl;
        let px = ux * 1.30, py = uy * 0.78, pz = uz * 1.05;
        const f1 = fbm(ux*3.6 + 1.0, uy*3.6, uz*3.6, 5);
        const f2 = fbm(ux*9.0, uy*9.0, uz*9.0, 3) * 0.3;
        const disp = f1 * 0.19 + f2 * 0.05;
        px += ux * disp; py += uy * disp; pz += uz * disp;
        const fissure = Math.max(0, 1 - Math.abs(ux) / 0.11) * Math.max(0, uy * 3.0);
        px -= Math.sign(ux || 0.001) * fissure * 0.24;
        py -= fissure * 0.1;
        if (uy < -0.55) py += uy * 0.12;
        pos.setXYZ(i, px, py, pz);
        foldArr[i] = Math.max(0, Math.min(1, 0.5 + f1 * 0.8));
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
      geo.setAttribute("aFold", new THREE.BufferAttribute(foldArr, 1));

      const mat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: BRAIN_VERT,
        fragmentShader: BRAIN_FRAG,
      });
      const brain = new THREE.Mesh(geo, mat);
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
        mat.uniforms.uTime.value = t;
        tgt.y = t * 0.07 + (mouse.x - 0.5) * 0.6;
        tgt.x = (mouse.y - 0.5) * 0.3;
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
