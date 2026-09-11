"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type SystemNode = {
  id: string;
  label: string;
  detail: string;
  position: THREE.Vector3;
  color: string;
};

const systemNodes: SystemNode[] = [
  {
    id: "api",
    label: "API Boundary",
    detail: "requests enter",
    position: new THREE.Vector3(-2.7, 0.88, 0.25),
    color: "#7FC7EE",
  },
  {
    id: "ingestion",
    label: "Ingestion",
    detail: "events normalized",
    position: new THREE.Vector3(-1.25, -0.72, -0.05),
    color: "#FF9DC0",
  },
  {
    id: "events",
    label: "Runtime Events",
    detail: "behavior recorded",
    position: new THREE.Vector3(0.2, 0.98, 0.18),
    color: "#FFCB5C",
  },
  {
    id: "store",
    label: "Evidence Store",
    detail: "state preserved",
    position: new THREE.Vector3(1.24, -0.86, -0.1),
    color: "#7FC7EE",
  },
  {
    id: "flow",
    label: "Flow Reconstruction",
    detail: "case file rebuilt",
    position: new THREE.Vector3(2.66, 0.48, 0.22),
    color: "#FF9DC0",
  },
];

const connectionPairs: Array<[string, string, number]> = [
  ["api", "ingestion", 0.35],
  ["ingestion", "events", -0.4],
  ["events", "store", 0.36],
  ["store", "flow", -0.32],
  ["ingestion", "store", 0.18],
];

function supportsWebGL() {
  if (typeof window === "undefined") {
    return false;
  }

  const canvas = document.createElement("canvas");
  return Boolean(
    canvas.getContext("webgl2") ?? canvas.getContext("webgl"),
  );
}

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    const mesh = child as THREE.Mesh;
    const line = child as THREE.Line;
    const disposable = mesh.geometry ?? line.geometry;

    disposable?.dispose?.();

    const material = mesh.material ?? line.material;
    if (Array.isArray(material)) {
      material.forEach((item) => item.dispose());
    } else {
      material?.dispose?.();
    }
  });
}

export function HeroSystemFallback() {
  return (
    <div className="hero-system-fallback" aria-hidden="true">
      <div className="fallback-route" />
      {systemNodes.map((node) => (
        <div className={`fallback-node fallback-node-${node.id}`} key={node.id}>
          <span>{node.label}</span>
          <small>{node.detail}</small>
        </div>
      ))}
      <div className="fallback-pulse fallback-pulse-one" />
      <div className="fallback-pulse fallback-pulse-two" />
      <div className="fallback-pulse fallback-pulse-three" />
    </div>
  );
}

export default function HeroSystemVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !supportsWebGL()) {
      setFallback(true);
      return;
    }

    let frameId = 0;
    let hidden = document.hidden;
    let hoveredNode: string | null = null;
    const pointer = new THREE.Vector2(0, 0);
    const pointerTarget = new THREE.Vector2(0, 0);
    const rayPointer = new THREE.Vector2(10, 10);
    const clock = new THREE.Clock();
    let cameraDistance = 7.05;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.className = "hero-system-canvas";
    root.appendChild(renderer.domElement);
    root.classList.add("is-webgl-ready");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0.18, 7.1);

    const systemGroup = new THREE.Group();
    scene.add(systemGroup);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.78);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.35);
    keyLight.position.set(2.6, 3.2, 4.6);
    const rimLight = new THREE.DirectionalLight(0x8dcff1, 0.72);
    rimLight.position.set(-3.4, -1.8, 2.8);
    scene.add(ambientLight, keyLight, rimLight);

    const nodeMeshes: THREE.Mesh[] = [];
    const nodeRings: THREE.Mesh[] = [];
    const nodeById = new Map(systemNodes.map((node) => [node.id, node]));
    const raycaster = new THREE.Raycaster();

    const softMaterial = (color: string) =>
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.025,
        metalness: 0.02,
        roughness: 0.48,
      });

    systemNodes.forEach((node, index) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.copy(node.position);
      nodeGroup.userData.base = node.position.clone();
      nodeGroup.userData.index = index;
      nodeGroup.userData.id = node.id;

      const body = new THREE.Mesh(
        new THREE.SphereGeometry(index === 4 ? 0.42 : 0.36, 36, 24),
        softMaterial(node.color),
      );
      body.userData.id = node.id;
      body.userData.parentGroup = nodeGroup;
      nodeMeshes.push(body);

      const core = new THREE.Mesh(
        new THREE.SphereGeometry(index === 4 ? 0.125 : 0.105, 20, 16),
        new THREE.MeshBasicMaterial({
          color: index === 4 ? "#FF7A50" : "#1B2430",
          opacity: 0.78,
          transparent: true,
        }),
      );

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(index === 4 ? 0.52 : 0.46, 0.012, 12, 60),
        new THREE.MeshBasicMaterial({
          color: node.color,
          opacity: 0.52,
          transparent: true,
        }),
      );
      ring.rotation.x = Math.PI / 2.7;
      ring.userData.baseScale = index === 4 ? 1.06 : 1;
      nodeRings.push(ring);

      nodeGroup.add(body, core, ring);
      systemGroup.add(nodeGroup);
    });

    const curves = connectionPairs.map(([fromId, toId, bend], index) => {
      const from = nodeById.get(fromId);
      const to = nodeById.get(toId);
      if (!from || !to) {
        throw new Error("Invalid hero system connection");
      }

      const midpoint = from.position.clone().lerp(to.position, 0.5);
      midpoint.y += bend;
      midpoint.z += index % 2 === 0 ? 0.42 : -0.38;

      const curve = new THREE.CatmullRomCurve3([
        from.position.clone(),
        midpoint,
        to.position.clone(),
      ]);

      const tube = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 72, 0.012, 8, false),
        new THREE.MeshBasicMaterial({
          color: index === 2 ? "#FF7A50" : "#1B2430",
          opacity: index === 4 ? 0.34 : 0.48,
          transparent: true,
        }),
      );
      tube.userData.from = fromId;
      tube.userData.to = toId;
      systemGroup.add(tube);

      return curve;
    });

    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: "#FF7A50",
      opacity: 0.88,
      transparent: true,
    });
    const pulses = curves.map((curve, curveIndex) => {
      const pulse = new THREE.Mesh(
        new THREE.SphereGeometry(0.065, 18, 14),
        pulseMaterial.clone(),
      );
      pulse.userData.curve = curve;
      pulse.userData.offset = curveIndex * 0.16;
      pulse.userData.speed = 0.085 + curveIndex * 0.012;
      systemGroup.add(pulse);
      return pulse;
    });

    const requestPulse = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 18, 14),
      new THREE.MeshBasicMaterial({
        color: "#1B2430",
        opacity: 0.75,
        transparent: true,
      }),
    );
    systemGroup.add(requestPulse);

    const resize = () => {
      const rect = root.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      camera.aspect = width / height;
      const narrowFit = Math.max(1, 1.48 / camera.aspect);
      const wideZoom = THREE.MathUtils.mapLinear(
        THREE.MathUtils.clamp(camera.aspect, 1.6, 2.8),
        1.6,
        2.8,
        1,
        1.28,
      );
      cameraDistance = (7.05 * narrowFit) / wideZoom;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const updateLabels = () => {
      const rect = root.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      systemNodes.forEach((node) => {
        const label = labelRefs.current[node.id];
        if (!label) {
          return;
        }

        const projected = node.position.clone();
        systemGroup.localToWorld(projected);
        projected.project(camera);
        const x = (projected.x * 0.5 + 0.5) * width;
        const y = (-projected.y * 0.5 + 0.5) * height;
        const visible = projected.z < 1;
        label.style.transform = `translate3d(${x}px, ${y + 48}px, 0) translate(-50%, -50%)`;
        label.style.opacity = visible ? "1" : "0";
        label.classList.toggle("is-active", node.id === hoveredNode);
      });
    };

    const setHoveredNode = (id: string | null) => {
      if (hoveredNode === id) {
        return;
      }

      hoveredNode = id;
      nodeMeshes.forEach((mesh) => {
        const meshId = mesh.userData.id;
        const scale = id && meshId === id ? 1.18 : 1;
        mesh.scale.setScalar(scale);
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      pointerTarget.set(
        THREE.MathUtils.clamp(x, -1, 1),
        THREE.MathUtils.clamp(y, -1, 1),
      );
      rayPointer.set(pointerTarget.x, pointerTarget.y);

      raycaster.setFromCamera(rayPointer, camera);
      const hit = raycaster.intersectObjects(nodeMeshes, false)[0];
      setHoveredNode(hit ? String(hit.object.userData.id) : null);
    };

    const onPointerLeave = () => {
      pointerTarget.set(0, 0);
      rayPointer.set(10, 10);
      setHoveredNode(null);
    };

    const onVisibilityChange = () => {
      hidden = document.hidden;
      if (!hidden) {
        clock.getDelta();
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      if (hidden) {
        return;
      }

      const elapsed = clock.getElapsedTime();
      pointer.lerp(pointerTarget, 0.045);
      systemGroup.rotation.y = pointer.x * 0.13 + Math.sin(elapsed * 0.18) * 0.035;
      systemGroup.rotation.x = -pointer.y * 0.08 + Math.cos(elapsed * 0.16) * 0.02;
      systemGroup.position.x = pointer.x * 0.14;
      systemGroup.position.y = pointer.y * 0.08;
      camera.position.z = cameraDistance + Math.sin(elapsed * 0.32) * 0.09;
      camera.lookAt(0, 0.04, 0);

      systemGroup.children.forEach((child) => {
        const base = child.userData.base as THREE.Vector3 | undefined;
        if (!base) {
          return;
        }

        const index = Number(child.userData.index ?? 0);
        child.position.set(
          base.x + Math.sin(elapsed * 0.7 + index) * 0.035,
          base.y + Math.cos(elapsed * 0.58 + index * 1.6) * 0.045,
          base.z + Math.sin(elapsed * 0.48 + index * 0.7) * 0.028,
        );
      });

      nodeRings.forEach((ring, index) => {
        const baseScale = Number(ring.userData.baseScale ?? 1);
        const pulse = baseScale + Math.sin(elapsed * 1.2 + index * 0.8) * 0.045;
        ring.rotation.z += 0.003 + index * 0.0006;
        ring.scale.setScalar(pulse);
      });

      pulses.forEach((pulse) => {
        const curve = pulse.userData.curve as THREE.CatmullRomCurve3;
        const t = (elapsed * pulse.userData.speed + pulse.userData.offset) % 1;
        pulse.position.copy(curve.getPointAt(t));
        const material = pulse.material as THREE.MeshBasicMaterial;
        material.opacity = 0.35 + Math.sin(t * Math.PI) * 0.55;
      });

      const requestT = (elapsed * 0.11) % 1;
      requestPulse.position.set(
        THREE.MathUtils.lerp(-3.65, -2.72, requestT),
        0.52 + Math.sin(requestT * Math.PI) * 0.16,
        0.25,
      );
      (requestPulse.material as THREE.MeshBasicMaterial).opacity =
        0.18 + Math.sin(requestT * Math.PI) * 0.58;

      updateLabels();
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    resize();
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibilityChange);
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      disposeObject(scene);
      pulseMaterial.dispose();
      renderer.dispose();
      root.classList.remove("is-webgl-ready");
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      className="hero-system-visual"
      ref={rootRef}
      role="img"
      aria-label="Animated backend flow from API boundary through runtime evidence and flow reconstruction"
    >
      <HeroSystemFallback />
      {!fallback ? (
        <div className="hero-system-labels" aria-hidden="true">
          {systemNodes.map((node) => (
            <div
              className="hero-system-label"
              key={node.id}
              ref={(element) => {
                labelRefs.current[node.id] = element;
              }}
            >
              <span>{node.label}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
