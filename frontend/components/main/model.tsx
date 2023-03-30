import React, { useRef, MutableRefObject } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Calendar = ({ mouse }: { mouse: MutableRefObject<number[]> }) => {
  const ref = useRef<any>();
  const { nodes, materials } = useGLTF("/calendar.gltf") as any;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const x = (mouse.current[0] / window.innerWidth) * 2 - 1;
    const y = -(mouse.current[1] / window.innerHeight) * 2 + 1;
    ref.current.rotation.x = y * -0.8;
    ref.current.rotation.y = x * 0.8;
    ref.current.position.y = (-16 + Math.cos(t / 2)) / 7;
  });

  return (
    <group>
      <mesh
        geometry={nodes.notejoined.geometry}
        material={materials["Material.002"]}
        position={[5.2, 0, 0]}
        scale={0.15}
        ref={ref}
      />
    </group>
  );
};

const SpeechBubble = ({ mouse }: { mouse: MutableRefObject<number[]> }) => {
  const ref = useRef<any>();
  const { nodes, materials } = useGLTF("/speechBubble.gltf") as any;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const x = (mouse.current[0] / window.innerWidth) * 2 - 1;
    const y = -(mouse.current[1] / window.innerHeight) * 2 + 1;
    ref.current.rotation.x = y * 0.8;
    ref.current.rotation.y = x * -0.8;
    ref.current.position.y = (0 + Math.cos(t / 2)) / 7;
  });

  return (
    <group>
      <mesh
        geometry={nodes.Cylinder001.geometry}
        material={materials["Material.002"]}
        scale={[0.16, 0.033, 0.16]}
        position={[-6, 0, 0]}
        ref={ref}
      />
    </group>
  );
};

const Model = ({ mouse }: { mouse: MutableRefObject<number[]> }) => {
  return (
    <>
      <Calendar mouse={mouse} />
      <SpeechBubble mouse={mouse} />
    </>
  );
};

useGLTF.preload("/calendar.gltf");
useGLTF.preload("/speechBubble.gltf");

export default Model;
