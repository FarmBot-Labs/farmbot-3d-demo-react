import { Box, Text } from "@react-three/drei";
import { threeSpace } from "./helpers";
import { Config } from "./config";
// import { ASSETS } from "./constants";

interface PackagingProps {
  config: Config;
}

export const FarmBotPackaging = (props: PackagingProps) => {
  const { config } = props;
  const isXL = config.sizePreset == "Genesis XL";
  const mainCartonLength = 1060;
  const mainCartonWidth = 420;
  const mainCartonHeight = 220;
  const extrusionKitLength = 1540;
  const extrusionKitWidth = isXL ? 170 : 100;
  const extrusionKitHeight = 60;
  const edgeProtectorSize = 20;
  const edgeProtector = (boxDimension: number) => {
    const edgeProtectorCenter = edgeProtectorSize / 2 - 1;
    const boxDimensionMid = boxDimension / 2;
    return edgeProtectorCenter - boxDimensionMid;
  };
  const strapThickness = 4;
  const strapWidth = 10;
  const strap = (boxDimension: number) => boxDimension + strapThickness;
  const zGround = -config.bedZOffset - config.bedHeight;
  const boxColor = "#bf8b59";
  const strapColor = "#434343";
  const edgeProtectorColor = "#9d6c40";
  return <group name={"packaging"}
    visible={config.packaging}
    position={[
      threeSpace(config.bedLengthOuter - 800, config.bedLengthOuter),
      threeSpace(-700, config.bedWidthOuter),
      zGround + 110,
    ]}>
    <group name={"main-carton"}>
      <Box name={"main-carton-box"}
        castShadow={true}
        receiveShadow={true}
        args={[mainCartonLength, mainCartonWidth, mainCartonHeight]}>
        <meshPhongMaterial color={boxColor} />
      </Box>
      <Text fontSize={55}
        // font={ASSETS.fonts.inknut}
        color={"black"}
        position={[0, -mainCartonWidth / 2 - 1, 0]}
        rotation={[Math.PI / 2, 0, 0]}>
        {config.label}
      </Text>
      {[-450, 0, 450].map(x =>
        <Box name={"main-carton-strap"} key={x}
          args={[strapWidth, strap(mainCartonWidth), strap(mainCartonHeight)]}
          position={[x, 0, 0]}>
          <meshPhongMaterial color={strapColor} />
        </Box>)}
      {[
        [-edgeProtector(mainCartonWidth), -edgeProtector(mainCartonHeight)],
        [-edgeProtector(mainCartonWidth), edgeProtector(mainCartonHeight)],
        [edgeProtector(mainCartonWidth), -edgeProtector(mainCartonHeight)],
        [edgeProtector(mainCartonWidth), edgeProtector(mainCartonHeight)],
      ].map(([y, z], index) =>
        <Box name={"main-carton-edge-protector"} key={index}
          args={[mainCartonLength - 2, edgeProtectorSize, edgeProtectorSize]}
          position={[0, y, z]}>
          <meshPhongMaterial color={edgeProtectorColor} />
        </Box>)}
    </group>
    <group name={"extrusion-kit"}
      position={[0, 0, (220 + 60) / 2]}>
      <Box name={"extrusion-kit-box"}
        castShadow={true}
        args={[extrusionKitLength, extrusionKitWidth, extrusionKitHeight]}>
        <meshPhongMaterial color={boxColor} />
      </Box>
      {[-600, -300, 0, 300, 600].map(x =>
        <Box name={"extrusion-kit-strap"} key={x}
          args={[strapWidth, strap(extrusionKitWidth), strap(extrusionKitHeight)]}
          position={[x, 0, 0]}>
          <meshPhongMaterial color={strapColor} />
        </Box>)}
      {[
        [-edgeProtector(extrusionKitWidth), -edgeProtector(extrusionKitHeight)],
        [-edgeProtector(extrusionKitWidth), edgeProtector(extrusionKitHeight)],
        [edgeProtector(extrusionKitWidth), -edgeProtector(extrusionKitHeight)],
        [edgeProtector(extrusionKitWidth), edgeProtector(extrusionKitHeight)],
      ].map(([y, z], index) =>
        <Box name={"extrusion-kit-edge-protector"} key={index}
          args={[extrusionKitLength - 2, edgeProtectorSize, edgeProtectorSize]}
          position={[0, y, z]}>
          <meshPhongMaterial color={edgeProtectorColor} />
        </Box>)}
    </group>
  </group>
};
