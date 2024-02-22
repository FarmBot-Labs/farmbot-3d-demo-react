import { Box, Extrude } from "@react-three/drei";
import { DoubleSide, MeshPhongMaterial, Path, Shape } from "three";

const thickness = 30;

const soil = (
  Type: typeof Path | typeof Shape,
  botSize: Record<"x" | "y", number>,
): Path | Shape => {
  const hole = new Type();
  hole.moveTo(thickness, thickness);
  hole.lineTo(thickness, thickness + botSize.y);
  hole.lineTo(thickness + botSize.x, thickness + botSize.y);
  hole.lineTo(thickness + botSize.x, thickness);
  hole.lineTo(thickness, thickness);
  return hole;
}

const bedStructure2D = (botSize: Record<"x" | "y", number>) => {
  const thickness2X = 2 * thickness;
  const shape = new Shape();

  // outer edge
  shape.moveTo(0, 0);
  shape.lineTo(0, botSize.y + thickness2X);
  shape.lineTo(botSize.x + thickness2X, botSize.y + thickness2X);
  shape.lineTo(botSize.x + thickness2X, 0);
  shape.lineTo(0, 0);

  // inner edge
  shape.holes.push(soil(Path, botSize));

  return shape;
}

interface BedProps {
  botSize: Record<"x" | "y", number>;
  bedHeight: number;
  groundOffset: number;
  bedZOffset: number;
  legSize: number;
}

export const Bed = (props: BedProps) => {
  const { botSize, bedHeight, groundOffset, bedZOffset, legSize } = props;
  const bedLength = botSize.x + 2 * thickness;
  const bedWidth = botSize.y + 2 * thickness;
  const legX = (bedLength - legSize) / 2;
  const legY = (bedWidth - legSize) / 2;
  return <group>
    <Extrude name={"bed"}
      material-color={"tan"}
      material={new MeshPhongMaterial}
      castShadow={true}
      receiveShadow={true}
      material-side={DoubleSide}
      args={[
        bedStructure2D(botSize),
        { steps: 1, depth: bedHeight, bevelEnabled: false },
      ]}
      position={[
        -bedLength / 2,
        -bedWidth / 2,
        groundOffset + bedZOffset,
      ]} />
    <Extrude name={"soil"}
      material-color={"#572e21"}
      material={new MeshPhongMaterial}
      castShadow={true}
      receiveShadow={true}
      args={[
        soil(Shape, botSize) as Shape,
        { steps: 1, depth: bedHeight - 50, bevelEnabled: false },
      ]}
      position={[
        -bedLength / 2,
        -bedWidth / 2,
        groundOffset + bedZOffset,
      ]} />
    {[
      { x: -legX, y: -legY },
      { x: legX, y: -legY },
      { x: legX, y: legY },
      { x: -legX, y: legY },
    ].map(position =>
      <Box name={"bed-leg"}
        material-color={"tan"}
        material={new MeshPhongMaterial}
        castShadow={true}
        receiveShadow={true}
        args={[legSize, legSize, bedZOffset]}
        position={[
          position.x,
          position.y,
          groundOffset + bedZOffset / 2,
        ]} />)}
  </group>;
};
