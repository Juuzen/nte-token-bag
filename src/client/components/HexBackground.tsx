import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HexItem {
  mesh: THREE.Mesh;
  vx: number;
  vy: number;
  rx: number;
  ry: number;
  rz: number;
}

const HEX_COLORS = [0xff6500, 0x7c3aed, 0x8899aa];

export function HexBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambient);

    const orangeLight = new THREE.PointLight(0xff6500, 3, 50);
    orangeLight.position.set(-10, 8, 10);
    scene.add(orangeLight);

    const purpleLight = new THREE.PointLight(0x7c3aed, 3, 50);
    purpleLight.position.set(10, -8, 10);
    scene.add(purpleLight);

    const hexItems: HexItem[] = [];

    for (let i = 0; i < 24; i++) {
      const radius = 0.5 + Math.random() * 1.8;
      const depth = radius * (0.05 + Math.random() * 0.10);
      const geo = new THREE.CylinderGeometry(radius, radius, depth, 6, 1);
      const color = HEX_COLORS[Math.floor(Math.random() * HEX_COLORS.length)];

      const mat = new THREE.MeshPhongMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.12,
        transparent: true,
        opacity: 0.28 + Math.random() * 0.22,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geo, mat);

      mesh.position.set(
        (Math.random() - 0.5) * 42,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 16 - 4,
      );
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      );

      scene.add(mesh);
      hexItems.push({
        mesh,
        vx: (Math.random() - 0.5) * 0.007,
        vy: (Math.random() - 0.5) * 0.006,
        rx: (Math.random() - 0.5) * 0.004,
        ry: (Math.random() - 0.5) * 0.004,
        rz: (Math.random() - 0.5) * 0.003,
      });
    }

    let t = 0;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.004;

      orangeLight.position.x = Math.sin(t * 0.6) * 14;
      orangeLight.position.y = Math.cos(t * 0.45) * 9;
      purpleLight.position.x = Math.cos(t * 0.55) * 14;
      purpleLight.position.y = Math.sin(t * 0.38) * 9;

      for (const item of hexItems) {
        item.mesh.position.x += item.vx;
        item.mesh.position.y += item.vy;
        item.mesh.rotation.x += item.rx;
        item.mesh.rotation.y += item.ry;
        item.mesh.rotation.z += item.rz;

        if (item.mesh.position.x > 23) item.mesh.position.x = -23;
        else if (item.mesh.position.x < -23) item.mesh.position.x = 23;
        if (item.mesh.position.y > 17) item.mesh.position.y = -17;
        else if (item.mesh.position.y < -17) item.mesh.position.y = 17;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
