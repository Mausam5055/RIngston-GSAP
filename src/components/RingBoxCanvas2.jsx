import React, { useRef, useEffect, Suspense } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// --- New Component: RingBox ---
// This component loads the ring box model with its original colours.
const RingBox = () => {
  const { scene } = useGLTF("/textured_mesh.glb");
  // Optionally, you can adjust the scale and position here if needed:
  scene.scale.set(0.5, 0.5, 0.5);
  scene.position.set(0, 0, 0);
  return <primitive object={scene} dispose={null} />;
};

const RingBoxCanvas2 = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* Additional lights can be added if you need even more brightness */}
      <Suspense fallback={null}>
        <RingBox />
      </Suspense>
    </Canvas>
  );
};

export default RingBoxCanvas2;
