import { Box, Text } from "@react-three/drei";
import { BufferGeometry } from "three";
import { threeSpace } from "./helpers";
import { ASSETS } from "./constants";

interface PresetButtonProps {
  preset: string;
  choosePreset(preset: string): () => void;
  hovered: string;
  setHovered(preset: string): void;
  z: number;
  index: number;
}

export const PresetButton = (props: PresetButtonProps) => {
  const { preset, choosePreset, hovered, setHovered, z, index } = props;
  const btnHeight = 50;
  const btnZ = 0;
  const textZ = btnHeight / 2 + 1;
  return <group
    position={[
      threeSpace(1000, 10000) + index * 1100,
      threeSpace(1000, 10000),
      z + btnHeight / 2,
    ]}
    onClick={() => {
      choosePreset(preset)();
    }}>
    <group
      onPointerDown={e =>
        changeItemsInGroup(e.object.parent as MeshObject, object => {
          if (object.name == "btn") {
            object.position.z = btnZ - 10;
          } else {
            object.position.z = textZ - 10;
          }
        })}
      onPointerOver={() => {
        setHovered(preset);
        document.body.style.cursor = "pointer";
      }}
      onPointerUp={e =>
        changeItemsInGroup(e.object.parent as MeshObject, object => {
          if (object.name == "btn") {
            object.position.z = btnZ;
          } else {
            object.position.z = textZ;
          }
        })}
      onPointerLeave={() => {
        document.body.style.cursor = "default";
        setHovered("");
      }}>
      <Box name={"btn"}
        args={[1000, 300, btnHeight]}
        position={[0, 0, 0]}>
        <meshPhongMaterial color={hovered == preset ? "lightgray" : "gray"} />
      </Box>
      <Text fontSize={200}
        font={ASSETS.fonts.cabinBold}
        color={"black"}
        strokeColor={"black"}
        strokeWidth={7}
        fontWeight={"bold"}
        position={[0, 0, btnHeight / 2 + 1]}
        rotation={[0, 0, 0]}>
        {preset}
      </Text>
    </group>
  </group>;
};

const changeItemsInGroup = (
  meshObject: MeshObject,
  cb: (x: MeshObject) => void,
) => {
  meshObject.children.map(child => {
    const object = child as MeshObject;
    cb(object);
    changeItemsInGroup(object, cb);
  });
};

type MeshObject = THREE.Mesh<BufferGeometry, THREE.MeshStandardMaterial>;
