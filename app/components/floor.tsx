import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function Floor() {
  const colorMap = useLoader(TextureLoader, "/textures/floor/Color.jpg");
  const ao = useLoader(TextureLoader, "/textures/floor/AmbientOcclusion.jpg");
  const displacement = useLoader(
    TextureLoader,
    "/textures/floor/Displacement.jpg"
  );
  const normal = useLoader(TextureLoader, "/textures/floor/NormalGL.jpg");
  const roughNess = useLoader(TextureLoader, "/textures/floor/Roughness.jpg");
  return (
    <>
      <mesh
        position={[0, -1, 0]}
        rotation={[-90 * (Math.PI / 180), 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[4, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          aoMap={ao}
          aoMapIntensity={2}
          displacementMap={displacement}
          displacementScale={0.15}
          normalMap={normal}
          roughnessMap={roughNess}
        />
      </mesh>
    </>
  );
}
