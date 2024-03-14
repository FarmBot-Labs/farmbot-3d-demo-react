import { Box, Text } from "@react-three/drei";
import { ASSETS } from "./constants";
import { Arrow } from "./arrow";

interface DistanceIndicatorProps {
  start: {x: number, y: number};
  end: {x: number, y: number};
  z: number;
}

export const DistanceIndicator = (props: DistanceIndicatorProps) => {
  const { start, end, z } = props;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  const angle = Math.atan2(dy, dx);
  return <group position={[midX, midY, z]} rotation={[0, 0, angle]}>
    <Arrow length={distance / 2} width={25} />
    <Arrow length={distance / 2} width={25} rotation={[0, 0, Math.PI]} />
    <group rotation={[Math.PI / 6, 0, 0]}>
      <Box
        args={[300, 100, 75]}>
        <meshPhongMaterial color={"#c49f7a"} />
      </Box>
      <Text name={"distance-label"}
        fontSize={50}
        font={ASSETS.fonts.cabinBold}
        color={"black"}
        strokeColor={"black"}
        strokeWidth={7}
        fontWeight={"bold"}
        position={[0, 0, 38]}>
        {distance.toFixed(0)}mm
      </Text>
    </group>
  </group>;
};
