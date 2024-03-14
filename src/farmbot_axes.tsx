import { Config } from "./config";
import { Arrow } from "./arrow";

interface BedProps {
  config: Config;
}

export const FarmBotAxes = (props: BedProps) => {
  const {
    bedLengthOuter, bedXOffset, bedWidthOuter, bedYOffset,
    columnLength, zGantryOffset,
  } = props.config;
  const x = -bedLengthOuter / 2 + bedXOffset;
  const y = -bedWidthOuter / 2 + bedYOffset;
  const z = columnLength - zGantryOffset;
  return <group position={[x, y, z,]}>
    <Arrow length={150} width={15} />
    <Arrow length={150} width={15} rotation={[0, 0, Math.PI / 2]} />
    <Arrow length={150} width={15} rotation={[0, -Math.PI / 2, 0]} />
  </group>;
};
