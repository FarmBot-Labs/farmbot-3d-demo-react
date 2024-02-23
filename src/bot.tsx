import { Cylinder, Extrude } from "@react-three/drei";
import { DoubleSide, Path, Shape } from "three";
import { Config } from "./garden";

const columnLength = 500;
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
  const { x, y, z, botSizeX, botSizeY, beamLength } = props.config;
  const mapOriginX = -botSizeX / 2;
  const mapOriginY = -botSizeY / 2;
  return <group name={"bot"}>
    {[-mapOriginY, mapOriginY].map(yPos =>
      <Extrude name={"columns"}
        castShadow={true}
        args={[
          extrusion(3),
          { steps: 1, depth: columnLength, bevelEnabled: false },
        ]}
        position={[
          mapOriginX + x + extrusionWidth,
          yPos - extrusionWidth / 2,
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
        mapOriginX + x - extrusionWidth,
        mapOriginY + y + utmRadius,
        z,
      ]}
      rotation={[0, 0, 0]}>
      <meshPhongMaterial color={"silver"} side={DoubleSide} />
    </Extrude>
    <Cylinder name={"UTM"}
      castShadow={true}
      args={[utmRadius, utmRadius, utmHeight]}
      position={[
        mapOriginX + x,
        mapOriginY + y,
        z + utmHeight / 2,
      ]}
      rotation={[Math.PI / 2, 0, 0]}>
      <meshPhongMaterial color={"silver"} side={DoubleSide} />
    </Cylinder>
    <Extrude name={"gantry-beam"}
      castShadow={true}
      args={[
        extrusion(3),
        { steps: 1, depth: beamLength, bevelEnabled: false },
      ]}
      position={[
        mapOriginX + x + extrusionWidth,
        beamLength / 2,
        columnLength,
      ]}
      rotation={[Math.PI / 2, 0, Math.PI / 2]}>
      <meshPhongMaterial color={"silver"} side={DoubleSide} />
    </Extrude>
  </group>;
};
