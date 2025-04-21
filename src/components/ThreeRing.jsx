import React, { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import * as dat from "dat.gui";

function RingModel() {
  const group = useRef();
  const { scene } = useGLTF("/ring2.glb");
  const contactRotation = useRef(false);

  // Set initial scale and position once the model loads.
  useEffect(() => {
    if (group.current) {
      group.current.scale.set(0.3, 0.3, 0.3);
      group.current.position.set(2.45, -0.21, -0.76);
    }
  }, []);

  // Rotate the ring continuously (or differently when in contact section)
  useFrame((state, delta) => {
    if (group.current) {
      if (!contactRotation.current) {
        group.current.rotation.y += 0.5 * delta;
      } else {
        group.current.rotation.x += 0.2 * delta;
        group.current.rotation.z += 0.2 * delta;
      }
    }
  });

  // Utility functions to override and restore material
  const enableWhiteWireframe = (mesh) => {
    if (!mesh.userData.originalMaterial) {
      // Store the original material for later restoration
      mesh.userData.originalMaterial = mesh.material;
    }
    // Replace the material with a MeshBasicMaterial with white color and wireframe enabled.
    mesh.material = new THREE.MeshBasicMaterial({
      color: 0xf8f8ff,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
  };

  const disableWhiteWireframe = (mesh) => {
    if (mesh.userData.originalMaterial) {
      // Restore the original material
      mesh.material = mesh.userData.originalMaterial;
      delete mesh.userData.originalMaterial;
    }
  };
  // useEffect(() => {
  //   // Ensure group.current exists before setting up GUI
  //   if (!group.current) return;

  //   const gui = new dat.GUI();

  //   // --- Position Controls ---
  //   const positionFolder = gui.addFolder("Position");
  //   // Add controls for x, y, z position. Adjust min/max/step as needed.
  //   positionFolder
  //     .add(group.current.position, "x", -5, 5, 0.01)
  //     .name("Position X");
  //   positionFolder
  //     .add(group.current.position, "y", -5, 5, 0.01)
  //     .name("Position Y");
  //   positionFolder
  //     .add(group.current.position, "z", -5, 5, 0.01)
  //     .name("Position Z");
  //   // positionFolder.open(); // Optional: Open the folder by default

  //   // --- Rotation Controls (Example) ---
  //   const rotationFolder = gui.addFolder("Rotation");
  //   rotationFolder
  //     .add(group.current.rotation, "x", -Math.PI, Math.PI, 0.01)
  //     .name("Rotation X");
  //   rotationFolder
  //     .add(group.current.rotation, "y", -Math.PI, Math.PI, 0.01)
  //     .name("Rotation Y");
  //   rotationFolder
  //     .add(group.current.rotation, "z", -Math.PI, Math.PI, 0.01)
  //     .name("Rotation Z");
  //   rotationFolder.open();

  //   // --- Scale Controls (Example) ---
  //   const scaleFolder = gui.addFolder("Scale");
  //   scaleFolder.add(group.current.scale, "x", 0.1, 2, 0.01).name("Scale X");
  //   scaleFolder.add(group.current.scale, "y", 0.1, 2, 0.01).name("Scale Y");
  //   scaleFolder.add(group.current.scale, "z", 0.1, 2, 0.01).name("Scale Z");
  //   scaleFolder.open();

  //   // Cleanup function: This runs when the component unmounts
  //   return () => {
  //     gui.destroy();
  //   };
  // }, []);
  // Create scroll-triggered GSAP animations once the group is available.

  useGSAP(() => {
    if (!group.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".details",
        start: "top bottom",
        end: "top top",
        scrub: true,
        markers: false,
      },
      defaults: { ease: "power3.out", duration: 3 },
    });

    tl.to(group.current.position, {
      x: -0.3,
      z: 1.37,
      y: -0.21,
      duration: 2,
    }).to(group.current.position, { x: 0.15, y: -0.21, z: 2.1, duration: 1.8 });

    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact",
        start: "top 80%",
        end: "bottom center",
        scrub: true,
        onEnter: () => {
          group.current.traverse((child) => {
            if (child.isMesh) {
              enableWhiteWireframe(child);
            }
          });
          // contactRotation.current = true;
        },
        onEnterBack: () => {
          group.current.traverse((child) => {
            if (child.isMesh) {
              enableWhiteWireframe(child);
            }
          });
          // contactRotation.current = true;
        },
        onLeave: () => {
          group.current.traverse((child) => {
            if (child.isMesh) {
              disableWhiteWireframe(child);
            }
          });
          // contactRotation.current = false;
        },
        onLeaveBack: () => {
          group.current.traverse((child) => {
            if (child.isMesh) {
              disableWhiteWireframe(child);
            }
          });
          // contactRotation.current = false;
        },
      },
    });

    contactTl.to(group.current.position, { z: 0.3, x: 0.4, y: -0.23 });
  }, []);

  return <primitive ref={group} object={scene} dispose={null} />;
}

function ThreeRing() {
  return (
    <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 8]} intensity={10} color="lightblue" />
      <Suspense fallback={null}>
        <RingModel />
      </Suspense>
    </Canvas>
  );
}

export default ThreeRing;
