import React from "react";
import { useState, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloodLightProps {
  rotate: boolean;
}

const LoadFLoodLightModel: React.FC<FloodLightProps> = ({ rotate }) => {
  const { scene } = useGLTF("/objects/floodlight.glb");
  const modelRef = useRef<THREE.Group>(null!);
  const spotLightRef = useRef<THREE.SpotLight>(null!);
  const pointLightRef = useRef<THREE.PointLight>(null!);
  const center = new THREE.Vector3(0, 0, 0);
  const axis = new THREE.Vector3(0, 1, 0);

  if (scene.traverse != undefined) {
    scene.traverse((child) => {
      if (child.type === "Mesh") {
        if (child.name === "Floor") {
          child.visible = false;
        }
      }
    });
  }
  useFrame(() => {
    if (rotate) {
      modelRef.current.position.sub(center);
      modelRef.current.position.applyAxisAngle(axis, 0.01);
      modelRef.current.position.add(center);
      modelRef.current.rotateOnAxis(axis, 0.01);

      spotLightRef.current.position.sub(center);
      spotLightRef.current.position.applyAxisAngle(axis, 0.01);
      spotLightRef.current.position.add(center);
      spotLightRef.current.rotateOnAxis(axis, 0.01);

      pointLightRef.current.position.sub(center);
      pointLightRef.current.position.applyAxisAngle(axis, 0.01);
      pointLightRef.current.position.add(center);
      pointLightRef.current.rotateOnAxis(axis, 0.01);
    }
  });

  return (
    <>
      <pointLight
        ref={pointLightRef}
        position={[3.3, 1.82, 0]}
        intensity={5}
        distance={0.2}
      />
      <spotLight
        ref={spotLightRef}
        intensity={15}
        position={[3.4, 2, 0]}
        penumbra={0.3}
        castShadow
        shadow-bias={-0.01}
        angle={0.7}
        color={0xffffc5}
      />
      <primitive
        ref={modelRef}
        position={[3.4, -1, 0]}
        rotation={[0, -90 * (Math.PI / 180), 0]}
        scale={[1, 1.5, 1]}
        object={scene}
      />
    </>
  );
};

export default LoadFLoodLightModel;
