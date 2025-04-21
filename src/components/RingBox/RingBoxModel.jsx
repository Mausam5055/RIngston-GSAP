// RingBoxModel.js
import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function RingBoxModel() {
  const group = useRef();
  const { scene } = useGLTF("/red_box.glb"); // your actual path

  useEffect(() => {
    if (group.current) {
      group.current.scale.set(1.2, 1.2, 1.2);
      group.current.rotation.set(0.1, -0.4, 0.0);
      group.current.position.set(0.1, 0, 0);
    }
  }, [scene]);

  return <primitive ref={group} object={scene} dispose={null} />;
}

export default RingBoxModel;
