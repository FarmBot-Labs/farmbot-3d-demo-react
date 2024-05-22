import { TextureLoader, RepeatWrapping } from "three";
import { Box } from "@react-three/drei";
import { ASSETS } from "./constants";
import { threeSpace } from "./helpers";
import { Config } from "./config";

interface DeskProps {
  config: Config;
}

const deskWidth = 1000;
const deskDepth = 500;
const deskHeight = 550;
const deskOffset = 800;
const deskLegWidth = 50;
const deskWoodDarkness = "#666";

const woodTexture = new TextureLoader()
  .load(ASSETS.textures.wood,
    texture => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(0.3, 0.3);
    }
  );

export const Desk = (props: DeskProps) => {
  const { config } = props;
  const zGround = -config.bedZOffset - config.bedHeight;
  return (
    <group name={"desk"}
      position={[
        threeSpace(deskOffset, -config.bedLengthOuter),
        0,
        zGround,
      ]}>
      <Box
        name={"desk-top"}
        castShadow={true}
        receiveShadow={true}
        args={[deskDepth, deskWidth, 50]}
        position={[0, 0, deskHeight + 25]}>
        <meshPhongMaterial map={woodTexture} color={deskWoodDarkness} />
      </Box>
      <group name={"desk-legs"}>
        {[
          [(-deskDepth + deskLegWidth) / 2, (-deskWidth + deskLegWidth) / 2],
          [(-deskDepth + deskLegWidth) / 2, (deskWidth - deskLegWidth) / 2],
          [(deskDepth - deskLegWidth) / 2, (-deskWidth + deskLegWidth) / 2],
          [(deskDepth - deskLegWidth) / 2, (deskWidth - deskLegWidth) / 2],
        ].map(([xOffset, yOffset], index) =>
          <Box
            name={"desk-leg"}
            key={index}
            castShadow={true}
            receiveShadow={true}
            args={[deskLegWidth, deskLegWidth, deskHeight]}
            position={[xOffset, yOffset, deskHeight / 2]}>
            <meshPhongMaterial map={woodTexture} color={deskWoodDarkness} />
          </Box>
        )}
      </group>
      <group name={"laptop"}
        position={[0, 0, deskHeight + 50]}>
        <group name={"laptop-bottom"}
          position={[0, 0, 5]}>
          <Box
            name={"base"}
            receiveShadow={true}
            args={[200, 300, 10]}>
            <meshPhongMaterial color={"#222"} />
          </Box>
          <Box
            name={"keyboard"}
            receiveShadow={true}
            args={[100, 260, 10]}
            position={[-30, 0, 1]}>
            <meshPhongMaterial color={"#333"} />
          </Box>
          <Box
            name={"trackpad"}
            receiveShadow={true}
            args={[50, 100, 10]}
            position={[60, 0, 1]}>
            <meshPhongMaterial color={"#333"} />
          </Box>
        </group>
        <group name={"laptop-lid"}
          position={[-137, 0, 75]}
          rotation={[0, Math.PI / 3, 0]}>
          <Box
            name={"base"}
            castShadow={true}
            receiveShadow={true}
            args={[200, 300, 10]}>
            <meshPhongMaterial color={"#222"} />
          </Box>
          <Box
            name={"screen"}
            castShadow={true}
            receiveShadow={true}
            args={[140, 260, 10]}
            position={[-10, 0, 1]}>
            <meshPhongMaterial color={"#888"} />
          </Box>
        </group>
      </group>
    </group>
  );
};
