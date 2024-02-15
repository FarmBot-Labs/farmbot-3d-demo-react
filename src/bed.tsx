// import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  CameraControls, Extrude, PerspectiveCamera, Plane, Sky, Stats,
} from "@react-three/drei";
import { DoubleSide, MeshPhongMaterial, Path, Shape, Vector3 } from "three";

const length = 1200;
const width = 800;
const thickness = 30;

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

const Model = () => <group dispose={null}
  rotation={[0, 0, Math.PI / 2]}>
  <Stats />
  <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
  <CameraControls />
  <PerspectiveCamera makeDefault={true} name={"camera"}
    fov={40} near={0.1} far={100000}
    position={[2000, -800, 2000]}
    lookAt={() => new Vector3(0, 0, 0)}
    rotation={[Math.PI / 6, Math.PI / 6, Math.PI / 6]} />
  <pointLight intensity={1} position={[0, 0, 10000]} rotation={[0, 0, 0]}
    distance={0} decay={0} />
  <directionalLight intensity={1}
    position={[0, 0, 100]} rotation={[0, 0, 0]} />
  <ambientLight intensity={1} />
  <Plane name={"ground"}
    material-color={"lightgray"}
    material={new MeshPhongMaterial}
    args={[10000, 10000]}
    position={[0, 0, 0]} />
  <Extrude name={"bed"}
    material-color={"tan"}
    material={new MeshPhongMaterial}
    material-side={DoubleSide}
    args={[bedStructure2D(), { steps: 1, depth: 300, bevelEnabled: false }]}
    position={[0, 0, 0]} />
  <Extrude name={"soil"}
    material-color={"#572e21"}
    material={new MeshPhongMaterial}
    args={[soil(Shape) as Shape, { steps: 1, depth: 250, bevelEnabled: false }]}
    position={[0, 0, 0]} />
</group>;

export const GardenBedModel = (props: GardenBedModelProps) => {
  return <div className={"garden-bed-3d-model"}>
    <Canvas>
      <Model {...props} />
    </Canvas>
  </div>;
};
