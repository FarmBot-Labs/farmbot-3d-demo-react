import { Cylinder, Extrude, Line, Trail } from "@react-three/drei";
import { DoubleSide, Path, Shape } from "three";
import { Config } from "./garden";
import { threeSpace } from "./helpers";

const zAxisLength = 1000;
const extrusionWidth = 20;
const extrusionWallThickness = 3;
const utmRadius = 35;
const utmHeight = 35;

const extrusion = (factor: number) => {
  const shape = new Shape();
  const width = extrusionWidth;
  const length = extrusionWidth * factor;

  // outer edge
  shape.moveTo(0, 0);
  shape.lineTo(0, width);
  shape.lineTo(length, width);
  shape.lineTo(length, 0);
  shape.lineTo(0, 0);

  // inside
  const thickness = extrusionWallThickness;
  const hole = new Path();
  hole.moveTo(thickness, thickness);
  hole.lineTo(thickness, width - thickness);
  hole.lineTo(length - thickness, width - thickness);
  hole.lineTo(length - thickness, thickness);
  hole.lineTo(thickness, thickness);
  shape.holes.push(hole);

  return shape;
}

interface FarmbotModelProps {
  config: Config;
}

export const Bot = (props: FarmbotModelProps) => {
  const {
    x, y, z, botSizeX, botSizeY, botSizeZ, beamLength, trail,
    bedXOffset, bedYOffset, bedLengthOuter, bedWidthOuter,
  } = props.config;
  const columnLength = botSizeZ + 200;
  const boundsDrawZ = 0;
  const zero = {
    x: threeSpace(bedXOffset, bedLengthOuter),
    y: threeSpace(bedYOffset, bedWidthOuter),
  };
  const extents = {
    x: threeSpace(bedXOffset + botSizeX, bedLengthOuter),
    y: threeSpace(bedYOffset + botSizeY, bedWidthOuter),
  };
  return <group name={"bot"}>
    {[0 + extrusionWidth / 2, bedWidthOuter - extrusionWidth / 2].map(y =>
      <Extrude name={"columns"}
        castShadow={true}
        args={[
          extrusion(3),
          { steps: 1, depth: columnLength, bevelEnabled: false },
        ]}
        position={[
          threeSpace(x + extrusionWidth, bedLengthOuter),
          threeSpace(y, bedWidthOuter),
          0,
        ]}
        rotation={[0, 0, 0]}>
        <meshPhongMaterial color={"silver"} side={DoubleSide} />
      </Extrude>)}
    <Extrude name={"z-axis"}
      castShadow={true}
      args={[
        extrusion(1),
        { steps: 1, depth: zAxisLength, bevelEnabled: false },
      ]}
      position={[
        threeSpace(x - extrusionWidth, bedLengthOuter),
        threeSpace(y + utmRadius, bedWidthOuter),
        z,
      ]}
      rotation={[0, 0, 0]}>
      <meshPhongMaterial color={"silver"} side={DoubleSide} />
    </Extrude>
    <Trail
      width={trail ? 500 : 0}
      color={"red"}
      length={100}
      decay={0.5}
      local={false}
      stride={0}
      interval={1}>
      <Cylinder name={"UTM"}
        castShadow={true}
        args={[utmRadius, utmRadius, utmHeight]}
        position={[
          threeSpace(x, bedLengthOuter),
          threeSpace(y, bedWidthOuter),
          z + utmHeight / 2,
        ]}
        rotation={[Math.PI / 2, 0, 0]}>
        <meshPhongMaterial color={"silver"} side={DoubleSide} />
      </Cylinder>
    </Trail>
    <Extrude name={"gantry-beam"}
      castShadow={true}
      args={[
        extrusion(3),
        { steps: 1, depth: beamLength, bevelEnabled: false },
      ]}
      position={[
        threeSpace(x + extrusionWidth, bedLengthOuter),
        threeSpace(beamLength, beamLength),
        columnLength,
      ]}
      rotation={[Math.PI / 2, 0, Math.PI / 2]}>
      <meshPhongMaterial color={"silver"} side={DoubleSide} />
    </Extrude>
    <Line name={"bounds"}
      color={"white"}
      points={[
        [zero.x, zero.y, boundsDrawZ],
        [zero.x, extents.y, boundsDrawZ],
        [extents.x, extents.y, boundsDrawZ],
        [extents.x, zero.y, boundsDrawZ],
        [zero.x, zero.y, boundsDrawZ],
      ]} />
  </group>;
};
