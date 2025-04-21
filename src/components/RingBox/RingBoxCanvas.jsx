// RingBoxCanvas.js
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import RingBoxModel from "./RingBoxModel";
import { Float } from "@react-three/drei";

const RingBoxCanvas = () => {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 4], fov: 50 }}
      style={{ background: "transparent" }}
      shadows
    >
      <directionalLight
        position={[9.9, -9.8, -8.3]}
        intensity={8}
        color="#ffffff"
        castShadow
      />
      <spotLight position={[-13, -12, 2]} intensity={1000} color={"#fffff"} />
      <pointLight position={[0.9, 3.7, 4.8]} intensity={1000} color="#e0e0ff" />
      <pointLight position={[-6, 2.8, -5.4]} intensity={800} color="#ffccaa" />
      <pointLight
        position={[-1.4, 2.8, 17.3]}
        intensity={1000}
        color="#ffffff"
      />

      <Suspense fallback={null}>
        <Float floatIntensity={0.5} speed={3} rotationIntensity={0.5}>
          <RingBoxModel />
        </Float>
      </Suspense>
    </Canvas>
  );
};

export default RingBoxCanvas;
