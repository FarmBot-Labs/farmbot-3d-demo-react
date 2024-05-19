import { Box, Cylinder, RoundedBox, Tube } from "@react-three/drei";
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
  const faucetY = -115;
  const faucetZ = 70;
  const barbX = -bedLengthOuter / 2 - 200;
  const barbY = -100
  const barbZ = -130;
  const hosePoints = [
    [faucetX, faucetY, faucetZ],
    [faucetX, faucetY - 30, faucetZ - 35],
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
    <Cylinder name={"pipe"}
      castShadow={true}
      receiveShadow={true}
      args={[outletDepth / 2, outletDepth / 2, 200]}
      position={[-legSize / 2 - outletDepth / 2, 0, -50]}
      rotation={[Math.PI / 2, 0, 0]}>
      <meshPhongMaterial color={"gray"}
        shininess={100} />
    </Cylinder>
    <Box name={"electrical-outlet"}
      castShadow={true}
      args={[outletDepth, 75, 110]}
      position={[-legSize / 2 - outletDepth / 2, 0, 85]}>
      <meshPhongMaterial color={"gray"}
        shininess={100} />
    </Box>
    <group name={"wifi-router"}
      position={[0, 0, 165]}>
      <RoundedBox name={"router-base"}
        castShadow={true}
        receiveShadow={true}
        radius={8}
        args={[legSize, 60, 30]}>
        <meshPhongMaterial color={"lightgray"}
          shininess={100} />
      </RoundedBox>
      <Cylinder name={"antenna-1"}
        castShadow={true}
        receiveShadow={true}
        args={[3.5, 3.5, 60]}
        position={[-30, 0, 35]}
        rotation={[Math.PI / 2, 0, Math.PI / 8]}>
        <meshPhongMaterial color={"gray"}
          shininess={100} />
      </Cylinder>
      <Cylinder name={"antenna-2"}
        castShadow={true}
        receiveShadow={true}
        args={[3.5, 3.5, 60]}
        position={[30, 0, 35]}
        rotation={[Math.PI / 2, 0, -Math.PI / 8]}>
        <meshPhongMaterial color={"gray"}
          shininess={100} />
      </Cylinder>
      <Cylinder name={"led-light-1"}
        castShadow={true}
        receiveShadow={true}
        args={[2, 2, 61]}
        position={[-40, 0, 5]}>
        <meshPhongMaterial color={"green"}
          shininess={100} />
      </Cylinder>
      <Cylinder name={"led-light-2"}
        castShadow={true}
        receiveShadow={true}
        args={[2, 2, 61]}
        position={[-30, 0, 5]}>
        <meshPhongMaterial color={"blue"}
          shininess={100} />
      </Cylinder>
    </group>
    <group name={"water-source"}>
      <Cylinder name={"pipe"}
        castShadow={true}
        receiveShadow={true}
        args={[18, 18, 200]}
        position={[0, -legSize / 2 - 20, -50]}
        rotation={[Math.PI / 2, 0, 0]}>
        <meshPhongMaterial color={"#f4f4f4"}
          shininess={100} />
      </Cylinder>
      <Cylinder name={"faucet-base"}
        castShadow={true}
        receiveShadow={true}
        args={[20, 20, 80]}
        position={[0, -legSize / 2 - 20, 90]}
        rotation={[Math.PI / 2, 0, 0]}>
        <meshPhongMaterial color={"gold"}
          shininess={100} />
      </Cylinder>
      <Cylinder name={"faucet-outlet"}
        castShadow={true}
        receiveShadow={true}
        args={[18, 18, 70]}
        position={[0, -legSize / 2 - 45, 90]}
        rotation={[Math.PI / 4, 0, 0]}>
        <meshPhongMaterial color={"gold"}
          shininess={100} />
      </Cylinder>
      <group name={"faucet-handle"}
        position={[0, -legSize / 2 - 65, 105]}
        rotation={[-Math.PI / 4, 0, 0]}>
        <Cylinder name={"handle"}
          castShadow={true}
          receiveShadow={true}
          args={[25, 25, 10]}>
          <meshPhongMaterial color={"#0266b5"}
            shininess={100} />
        </Cylinder>
        <Cylinder name={"pin"}
          castShadow={true}
          receiveShadow={true}
          args={[4, 4, 15]}>
          <meshPhongMaterial color={"#434343"}
            shininess={100} />
        </Cylinder>
      </group>
      <Tube name={"garden-hose"}
        castShadow={true}
        receiveShadow={true}
        args={[hosePath, 100, 15, 8]}>
        <meshPhongMaterial color="darkgreen" />
      </Tube>
    </group>
  </group>
};
