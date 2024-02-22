import { Canvas } from "@react-three/fiber";
import {
  OrbitControls, PerspectiveCamera, Plane, Sky, Stats,
} from "@react-three/drei";
import { MeshPhongMaterial } from "three";
import { Bot } from "./bot";
import { Bed } from "./bed";

const position = { x: 1450, y: 700, z: 200 };
const botSize = { x: 2900, y: 1400 };
const groundOffset = -50;
const bedHeight = 300;
const mapOriginZ = groundOffset + bedHeight;

interface GardenProps {

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
  <Bed botSize={botSize} groundOffset={groundOffset} bedHeight={bedHeight} />
  <Bot
    position={position}
    botSize={botSize}
    mapOriginZ={mapOriginZ} />
</group>;

export const Garden = (props: GardenProps) => {
  return <div className={"garden-bed-3d-model"}>
    <Canvas shadows={true}>
      <Model {...props} />
    </Canvas>
  </div>;
};
