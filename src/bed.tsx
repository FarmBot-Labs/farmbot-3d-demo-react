// import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  Extrude, OrbitControls, PerspectiveCamera, Plane, Sky, Stats,
} from "@react-three/drei";
import { DoubleSide, MeshPhongMaterial, Path, Shape } from "three";

const length = 2900;
const width = 1400;
const thickness = 30;

const bedHeight = 300;
const groundOffset = -50;

const soil = (Type: typeof Path | typeof Shape): Path | Shape => {
  const hole = new Type();
  hole.moveTo(thickness, thickness);
  hole.lineTo(thickness, width);
  hole.lineTo(length, width);
  hole.lineTo(length, thickness);
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
    position={[-length / 2, -width / 2, groundOffset]} />
  <Extrude name={"soil"}
    material-color={"#572e21"}
    material={new MeshPhongMaterial}
    receiveShadow={true}
    args={[soil(Shape) as Shape, { steps: 1, depth: 250, bevelEnabled: false }]}
    position={[-length / 2, -width / 2, groundOffset]} />
</group>;

export const GardenBedModel = (props: GardenBedModelProps) => {
  return <div className={"garden-bed-3d-model"}>
    <Canvas shadows={true}>
      <Model {...props} />
    </Canvas>
  </div>;
};
