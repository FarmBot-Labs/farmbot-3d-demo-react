import { Box, Cylinder, Tube } from "@react-three/drei";
import { TextureLoader, RepeatWrapping } from "three";
import { ASSETS } from "./constants";
import { Config } from "./config";
import { threeSpace, getColorFromBrightness } from "./helpers";
import { outletDepth } from "./power_supply";
import * as THREE from 'three';

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
  const faucetX = 0;
  const faucetY = -100;
  const faucetZ = 90;
  const barbX = -bedLengthOuter / 2 - 200;
  const barbY = -100
  const barbZ = -130;
  const hosePoints = [
    [faucetX, faucetY, faucetZ],
    [faucetX, faucetY - 50, faucetZ - 50],
    [faucetX - 50, barbY - 50, barbZ + 20],
    [faucetX - 200, barbY, barbZ],
    [barbX, barbY, barbZ],
  ];
  const hosePath = new THREE.CatmullRomCurve3(
    hosePoints.map(point => new THREE.Vector3(...point))
  );

  return <group name={"utilities"}
    visible={utilitiesPost}
    position={[
      threeSpace(600, -bedLengthOuter),
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
    <group name={"water-source"}>
      <Cylinder name={"pipe"}
        castShadow={true}
        receiveShadow={true}
        args={[20, 20, 200]}
        position={[0, -legSize / 2 - 20, -50]}
        rotation={[Math.PI / 2, 0, 0]}>
        <meshPhongMaterial color={"#f4f4f4"}
          shininess={100} />
      </Cylinder>
      <Cylinder name={"faucet-base"}
        castShadow={true}
        receiveShadow={true}
        args={[22, 22, 100]}
        position={[0, -legSize / 2 - 20, 100]}
        rotation={[Math.PI / 2, 0, 0]}>
        <meshPhongMaterial color={"gold"}
          shininess={100} />
      </Cylinder>
      <Cylinder name={"faucet-outlet"}
        castShadow={true}
        receiveShadow={true}
        args={[18, 18, 60]}
        position={[0, -legSize / 2 - 40, 100]}
        rotation={[Math.PI / 4, 0, 0]}>
        <meshPhongMaterial color={"gold"}
          shininess={100} />
      </Cylinder>
      <Cylinder name={"faucet-handle"}
        castShadow={true}
        receiveShadow={true}
        args={[30, 30, 15]}
        position={[0, -legSize / 2 - 20, 160]}
        rotation={[Math.PI / 2, 0, 0]}>
        <meshPhongMaterial color={"#0266b5"}
          shininess={100} />
      </Cylinder>
      <Tube name={"garden-hose"}
        castShadow={true}
        receiveShadow={true}
        args={[hosePath, 100, 15, 8]}>
        <meshPhongMaterial color="darkgreen" />
      </Tube>
    </group>
  </group>
};
