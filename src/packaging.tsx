import { Box, Text } from "@react-three/drei";
import { threeSpace } from "./helpers";
import { Config } from "./config";
import { ASSETS } from "./constants";

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
        font={ASSETS.fonts.inknut}
        color={"black"}
        position={[0, -mainCartonWidth / 2 - 1, 0]}
        rotation={[Math.PI / 2, 0, 0]}>
        {config.label}
      </Text>
      <Box name={"main-carton-strap"}
        args={[10, mainCartonWidth + 4, mainCartonHeight + 4]}
        position={[-450, 0, 0]}>
        <meshPhongMaterial color={strapColor} />
      </Box>
      <Box name={"main-carton-strap"}
        args={[10, mainCartonWidth + 4, mainCartonHeight + 4]}>
        <meshPhongMaterial color={strapColor} />
      </Box>
      <Box name={"main-carton-strap"}
        args={[10, mainCartonWidth + 4, mainCartonHeight + 4]}
        position={[450, 0, 0]}>
        <meshPhongMaterial color={strapColor} />
      </Box>
      <Box name={"main-carton-edge-protector"}
        args={[mainCartonLength - 2, 20, 20]}
        position={[0, mainCartonWidth / 2 - 9, mainCartonHeight / 2 - 9]}>
        <meshPhongMaterial color={edgeProtectorColor} />
      </Box>
      <Box name={"main-carton-edge-protector"}
        args={[mainCartonLength - 2, 20, 20]}
        position={[0, -mainCartonWidth / 2 + 9, mainCartonHeight / 2 - 9]}>
        <meshPhongMaterial color={edgeProtectorColor} />
      </Box>
      <Box name={"main-carton-edge-protector"}
        args={[mainCartonLength - 2, 20, 20]}
        position={[0, -mainCartonWidth / 2 + 9, -mainCartonHeight / 2 + 9]}>
        <meshPhongMaterial color={edgeProtectorColor} />
      </Box>
      <Box name={"main-carton-edge-protector"}
        args={[mainCartonLength - 2, 20, 20]}
        position={[0, mainCartonWidth / 2 - 9, -mainCartonHeight / 2 + 9]}>
        <meshPhongMaterial color={edgeProtectorColor} />
      </Box>
    </group>
    <group name={"extrusion-kit"}
      position={[0, 0, (220 + 60) / 2]}>
      <Box name={"extrusion-kit-box"}
        castShadow={true}
        args={[extrusionKitLength, extrusionKitWidth, extrusionKitHeight]}>
        <meshPhongMaterial color={boxColor} />
      </Box>
      <Box name={"extrusion-kit-strap"}
        args={[10, extrusionKitWidth + 4, extrusionKitHeight + 4]}
        position={[-600, 0, 0]}>
        <meshPhongMaterial color={strapColor} />
      </Box>
      <Box name={"extrusion-kit-strap"}
        args={[10, extrusionKitWidth + 4, extrusionKitHeight + 4]}
        position={[-300, 0, 0]}>
        <meshPhongMaterial color={strapColor} />
      </Box>
      <Box name={"extrusion-kit-strap"}
        args={[10, extrusionKitWidth + 4, extrusionKitHeight + 4]}>
        <meshPhongMaterial color={strapColor} />
      </Box>
      <Box name={"extrusion-kit-strap"}
        args={[10, extrusionKitWidth + 4, extrusionKitHeight + 4]}
        position={[300, 0, 0]}>
        <meshPhongMaterial color={strapColor} />
      </Box>
      <Box name={"extrusion-kit-strap"}
        args={[10, extrusionKitWidth + 4, extrusionKitHeight + 4]}
        position={[600, 0, 0]}>
        <meshPhongMaterial color={strapColor} />
      </Box>
      <Box name={"extrusion-kit-edge-protector"}
        args={[extrusionKitLength - 2, 20, 20]}
        position={[0, extrusionKitWidth / 2 - 9, extrusionKitHeight / 2 - 9]}>
        <meshPhongMaterial color={edgeProtectorColor} />
      </Box>
      <Box name={"extrusion-kit-edge-protector"}
        args={[extrusionKitLength - 2, 20, 20]}
        position={[0, -extrusionKitWidth / 2 + 9, extrusionKitHeight / 2 - 9]}>
        <meshPhongMaterial color={edgeProtectorColor} />
      </Box>
      <Box name={"extrusion-kit-edge-protector"}
        args={[extrusionKitLength - 2, 20, 20]}
        position={[0, -extrusionKitWidth / 2 + 9, -extrusionKitHeight / 2 + 9]}>
        <meshPhongMaterial color={edgeProtectorColor} />
      </Box>
      <Box name={"extrusion-kit-edge-protector"}
        args={[extrusionKitLength - 2, 20, 20]}
        position={[0, extrusionKitWidth / 2 - 9, -extrusionKitHeight / 2 + 9]}>
        <meshPhongMaterial color={edgeProtectorColor} />
      </Box>
    </group>
  </group>
};
