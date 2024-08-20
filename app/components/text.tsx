import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface TextProps {
  position: [number, number, number];
  text: string;
  fontSize: number;
  weight: string;
}

const TextLabel: React.FC<TextProps> = ({
  position,
  text,
  fontSize,
  weight,
}) => {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame(({ camera }) => {
    if (textRef.current) {
      textRef.current.lookAt(camera.position);
    }
  });

  return (
    <Text
      name={text}
      ref={textRef}
      position={position}
      fontSize={fontSize}
      fontWeight={weight}
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  );
};

export default TextLabel;
