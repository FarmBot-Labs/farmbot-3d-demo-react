import { Cylinder, Extrude } from "@react-three/drei";
import { MeshPhongMaterial, Path, Shape } from "three";

const columnLength = 500;
const zAxisLength = 1000;
const extrusionWidth = 20;
const extrusionWallThickness = 3;
const utmRadius = 35;
const utmHeight = 35;
const gantryBeamLength = 1500;

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
  position: Record<"x" | "y" | "z", number>;
  botSize: Record<"x" | "y", number>;
  mapOriginZ: number;
}

export const Bot = (props: FarmbotModelProps) => {
  const { position, botSize, mapOriginZ } = props;
  const { x, y, z } = position;
  const mapOriginX = -botSize.x / 2;
  const mapOriginY = -botSize.y / 2;
  return <group name={"bot"}>
    {[-mapOriginY, mapOriginY].map(yPos =>
      <Extrude name={"columns"}
        material-color={"silver"}
        material={new MeshPhongMaterial}
        castShadow={true}
        args={[
          extrusion(3),
          { steps: 1, depth: columnLength, bevelEnabled: false },
        ]}
        position={[
          mapOriginX + x + extrusionWidth,
          yPos - extrusionWidth / 2,
          mapOriginZ,
        ]}
        rotation={[0, 0, 0]} />)}
    <Extrude name={"z-axis"}
      material-color={"silver"}
      material={new MeshPhongMaterial}
      castShadow={true}
      args={[
        extrusion(1),
        { steps: 1, depth: zAxisLength, bevelEnabled: false },
      ]}
      position={[
        mapOriginX + x - extrusionWidth,
        mapOriginY + y + utmRadius,
        mapOriginZ + z,
      ]}
      rotation={[0, 0, 0]} />
    <Cylinder name={"UTM"}
      material-color={"silver"}
      material={new MeshPhongMaterial}
      castShadow={true}
      args={[utmRadius, utmRadius, utmHeight]}
      position={[
        mapOriginX + x,
        mapOriginY + y,
        mapOriginZ + z + utmHeight / 2,
      ]}
      rotation={[Math.PI / 2, 0, 0]} />
    <Extrude name={"gantry-beam"}
      material-color={"silver"}
      material={new MeshPhongMaterial}
      castShadow={true}
      args={[
        extrusion(3),
        { steps: 1, depth: gantryBeamLength, bevelEnabled: false },
      ]}
      position={[
        mapOriginX + x + extrusionWidth,
        gantryBeamLength / 2,
        mapOriginZ + columnLength,
      ]}
      rotation={[Math.PI / 2, 0, Math.PI / 2]} />
  </group>;
};
