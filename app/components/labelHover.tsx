import React, { useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import TextLabel from "./text";
import { element } from "three/webgpu";
import CompTable from "./table";

type LabelHoverProps = {
  setBold: React.Dispatch<React.SetStateAction<string[]>>;
  setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>;
  hoveredIndex: number | null;
  labels: string[];
  bold: string[];
};

export default function LabelHover({
  labels,
  setBold,
  bold,
  setHoveredIndex,
  hoveredIndex,
}: LabelHoverProps) {
  const { scene, camera } = useThree();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function onPointerMove(event: PointerEvent) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  useFrame(() => {
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    let newHoveredIndex: number | null = null;
    for (let i = 0; i < intersects.length; i++) {
      const index = labels.findIndex(
        (element) => element === intersects[i].object.name
      );
      if (index !== -1) {
        newHoveredIndex = index;
        break;
      }
    }

    // Update hoveredIndex state if necessary
    if (newHoveredIndex !== hoveredIndex) {
      setHoveredIndex(newHoveredIndex);

      // Create a new bold array based on the updated hovered index
      const newBoldArray = bold.map((value, i) =>
        i === newHoveredIndex ? "bold" : ""
      );

      setBold(newBoldArray);
    } else if (newHoveredIndex === null && hoveredIndex !== null) {
      // If no object is hovered, reset the bold array
      setHoveredIndex(null);
      setBold(bold.map(() => ""));
    }
  });

  window.addEventListener("pointermove", onPointerMove);

  return (
    <>
      <TextLabel
        position={[0, 1.4, 0]}
        text={labels[0]}
        fontSize={0.2}
        weight={bold[0]}
      />
      <TextLabel
        position={[0.5, 0.3, 2.1]}
        text={labels[1]}
        fontSize={0.05}
        weight={bold[1]}
      />
      <TextLabel
        position={[-0.4, 1, 1.1]}
        text={labels[2]}
        fontSize={0.05}
        weight={bold[2]}
      />
      <TextLabel
        position={[-0.45, 0.8, 0]}
        text={labels[3]}
        fontSize={0.05}
        weight={bold[3]}
      />
      <TextLabel
        position={[0, 0.27, -1.4]}
        text={labels[4]}
        fontSize={0.05}
        weight={bold[4]}
      />
      <TextLabel
        position={[0.6, 1, 0]}
        text={labels[5]}
        fontSize={0.05}
        weight={bold[5]}
      />
      <TextLabel
        position={[0.8, -0.4, 0]}
        text={labels[6]}
        fontSize={0.05}
        weight={bold[6]}
      />
    </>
  );
}
