"use client";
import React, { useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import LabelHover from "./labelHover";
import CompTable from "./table";
import * as THREE from "three";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import LoadFLoodLightModel from "./floodlight";
import Floor from "./floor";
import BackGroundParticles from "./backgroundParticles";

export default function Scene() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [rotate, setRotate] = useState(false);
  const [labels, setLabels] = useState([
    "X-Ray V1",
    "Belt motor",
    "Touch Screen",
    "Protective Glass",
    "Belt",
    "Air vent",
    "Secondary Belt",
  ]);
  const [bold, setBold] = useState(["", "", "", "", "", "", ""]);

  return (
    <div className="w-screen h-screen">
      <div className="absolute top-20 right-20 z-10">
        <CompTable rowNum={hoveredIndex} />
      </div>
      <div className="absolute top-20 left-20 z-10">
        <FormControlLabel
          style={{
            backgroundColor: "white",
            padding: "1px",
            borderRadius: "5px",
          }}
          control={
            <Checkbox
              onChange={(e) => {
                setRotate(e.target.checked);
              }}
            />
          }
          label="Rotate Light"
        />
      </div>
      <Canvas shadows style={{ background: "black" }}>
        <LoadFLoodLightModel rotate={rotate} />
        <LabelHover
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
          labels={labels}
          bold={bold}
          setBold={setBold}
        />
        <OrbitControls
          maxDistance={5}
          minDistance={2}
          maxPolarAngle={95 * (Math.PI / 180)}
        />
        <ambientLight intensity={0.7} />
        <LoadModel />
        <Floor />
        <BackGroundParticles />
      </Canvas>
    </div>
  );
}

function LoadModel() {
  const { scene } = useGLTF("/objects/VA_3D_Generalist_Test_Machine.glb");
  scene.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  return <primitive position={[0, -1, 0]} object={scene} />;
}
