import { Box } from "@react-three/drei";
import { TextureLoader, RepeatWrapping } from "three";
import { ASSETS } from "./constants";
import { Config } from "./config";
import { threeSpace, getColorFromBrightness } from "./helpers";
import { outletDepth } from "./bot";

interface UtilitiesPostProps {
  config: Config;
}

const WoodTexture = new TextureLoader()
  .load(ASSETS.textures.wood,
    texture => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(.02, .05);
    });

export const UtilitiesPost = (props: UtilitiesPostProps) => {
  const {
    utilitiesPost, legSize, bedLengthOuter, bedWidthOuter,
    bedBrightness, bedHeight, bedZOffset,
  } = props.config;
  const groundZ = -bedHeight - bedZOffset;
  const postColor = getColorFromBrightness(bedBrightness);
  return <group name={"utilities"}
    visible={utilitiesPost}
    position={[
      threeSpace(bedLengthOuter + 600, bedLengthOuter),
      threeSpace(legSize / 2, bedWidthOuter),
      groundZ + 150,
    ]}>
    <Box name={"utilities-post"}
      castShadow={true}
      args={[legSize, legSize, 300]}>
      <meshPhongMaterial map={WoodTexture} color={postColor}
        shininess={100} />
    </Box>
    <Box name={"electrical-outlet"}
      castShadow={true}
      args={[outletDepth, 90, 120]}
      position={[-legSize / 2 - outletDepth / 2, 0, 85]}>
      <meshPhongMaterial color={"gray"}
        shininess={100} />
    </Box>
  </group>
};
