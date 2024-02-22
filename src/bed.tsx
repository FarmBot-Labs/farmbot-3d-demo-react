// import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  Cylinder, Extrude, OrbitControls, PerspectiveCamera, Plane, Sky, Stats,
} from "@react-three/drei";
import { DoubleSide, MeshPhongMaterial, Path, Shape } from "three";

const x = 1450;
const y = 700;
const z = 200;
const length = 2900;
const width = 1400;
const thickness = 30;
const bedLength = length + 2 * thickness;
const bedWidth = width + 2 * thickness;

const bedHeight = 300;
const columnLength = 500;
const zAxisLength = 1000;
const extrusionWidth = 20;
const extrusionWallThickness = 3;
const groundOffset = -50;
const utmRadius = 35;
const utmHeight = 35;
const gantryBeamLength = 1500;

const mapOriginX = -length / 2;
const mapOriginY = -width / 2;
const mapOriginZ = groundOffset + bedHeight;

const soil = (Type: typeof Path | typeof Shape): Path | Shape => {
  const hole = new Type();
  hole.moveTo(thickness, thickness);
  hole.lineTo(thickness, thickness + width);
  hole.lineTo(thickness + length, thickness + width);
  hole.lineTo(thickness + length, thickness);
  hole.lineTo(thickness, thickness);
  return hole;
}

const bedStructure2D = () => {
  const thickness2X = 2 * thickness;
  const shape = new Shape();

  // outer edge
  shape.moveTo(0, 0);
  shape.lineTo(0, width + thickness2X);
  shape.lineTo(length + thickness2X, width + thickness2X);
  shape.lineTo(length + thickness2X, 0);
  shape.lineTo(0, 0);

  // inner edge
  shape.holes.push(soil(Path));

  return shape;
}

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

interface GardenBedModelProps {

}

const Model = () => <group dispose={null}>
  <Stats />
  <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
  <PerspectiveCamera makeDefault={true} name={"camera"}
    fov={40} near={0.1} far={100000}
    position={[0, -3000, 1500]}
    rotation={[0, 0, 0]}
    up={[0, 0, 1]} />
  <OrbitControls maxPolarAngle={Math.PI / 2}
    enableZoom={true} enablePan={false} dampingFactor={0.1} />
  <axesHelper args={[5000]} />
  <pointLight intensity={2} distance={100000} decay={0} castShadow={true}
    position={[1000, 0, 3000]} />
  <ambientLight intensity={1.5} />
  <Plane name={"ground"}
    material-color={"lightgray"}
    material={new MeshPhongMaterial}
    receiveShadow={true}
    args={[10000, 10000]}
    position={[0, 0, groundOffset]} />
  <Extrude name={"bed"}
    material-color={"tan"}
    material={new MeshPhongMaterial}
    castShadow={true}
    receiveShadow={true}
    material-side={DoubleSide}
    args={[bedStructure2D(), { steps: 1, depth: bedHeight, bevelEnabled: false }]}
    position={[-bedLength / 2, -bedWidth / 2, groundOffset]} />
  <Extrude name={"soil"}
    material-color={"#572e21"}
    material={new MeshPhongMaterial}
    receiveShadow={true}
    args={[soil(Shape) as Shape, { steps: 1, depth: 250, bevelEnabled: false }]}
    position={[-bedLength / 2, -bedWidth / 2, groundOffset]} />
  {[-width / 2, width / 2].map(yPos =>
    <Extrude name={"columns"}
      material-color={"silver"}
      material={new MeshPhongMaterial}
      castShadow={true}
      args={[extrusion(3), { steps: 1, depth: columnLength, bevelEnabled: false }]}
      position={[
        mapOriginX + x + extrusionWidth,
        yPos - extrusionWidth / 2,
        groundOffset + bedHeight,
      ]}
      rotation={[0, 0, 0]} />)}
  <Extrude name={"z-axis"}
    material-color={"silver"}
    material={new MeshPhongMaterial}
    castShadow={true}
    args={[extrusion(1), { steps: 1, depth: zAxisLength, bevelEnabled: false }]}
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
    position={[mapOriginX + x, mapOriginY + y, mapOriginZ + z + utmHeight / 2]}
    rotation={[Math.PI / 2, 0, 0]} />
  <Extrude name={"gantry-beam"}
    material-color={"silver"}
    material={new MeshPhongMaterial}
    castShadow={true}
    args={[extrusion(3), { steps: 1, depth: gantryBeamLength, bevelEnabled: false }]}
    position={[
      mapOriginX + x + extrusionWidth,
      gantryBeamLength / 2,
      groundOffset + bedHeight + columnLength,
    ]}
    rotation={[Math.PI / 2, 0, Math.PI / 2]} />
</group>;

export const GardenBedModel = (props: GardenBedModelProps) => {
  return <div className={"garden-bed-3d-model"}>
    <Canvas shadows={true}>
      <Model {...props} />
    </Canvas>
  </div>;
};
