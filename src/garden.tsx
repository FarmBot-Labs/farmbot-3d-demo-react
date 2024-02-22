import { Canvas } from "@react-three/fiber";
import {
  GizmoHelper,
  GizmoViewcube,
  OrbitControls, PerspectiveCamera, Plane, Sky, Stats,
} from "@react-three/drei";
import { MeshPhongMaterial, TextureLoader, RepeatWrapping } from "three";
import { Bot } from "./bot";
import { Bed } from "./bed";
import { useControls } from "leva";

const groundOffset = -50;

const grassTexture = new TextureLoader().load('https://cdn.shopify.com/s/files/1/2040/0289/files/grass_texture_AdobeStock_249687268.jpg?v=1708639920', (texture) => {
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(1, 4);
});

interface GardenProps {

}

const Model = () => {
  const {
    x, y, z, length, width, bedZOffset, bedHeight, legSize, beamLength,
  } = useControls({
    x: { value: 1450, min: 0, max: 6000, step: 1 },
    y: { value: 700, min: 0, max: 3000, step: 1 },
    z: { value: 200, min: 0, max: 1000, step: 1 },
    length: { value: 2900, min: 0, max: 6000, step: 1 },
    width: { value: 1400, min: 0, max: 3000, step: 1 },
    beamLength: { value: 1500, min: 0, max: 3000, step: 1 },
    bedZOffset: { value: 0, min: 0, max: 1000, step: 1 },
    bedHeight: { value: 300, min: 0, max: 1000, step: 1 },
    legSize: { value: 150, min: 0, max: 1000, step: 1 },
  });
  const mapOriginZ = groundOffset + bedZOffset + bedHeight;
  const botSize = { x: length, y: width };
  return <group dispose={null}>
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
    <GizmoHelper>
      <GizmoViewcube />
    </GizmoHelper>
    <pointLight intensity={2} distance={100000} decay={0} castShadow={true}
      position={[1000, 0, 3000]} />
    <ambientLight intensity={1.5} />
    <Plane name={"ground"}
      material-color={"lightgray"}
      material={new MeshPhongMaterial({ map: grassTexture, shininess: 5 })}
      receiveShadow={true}
      args={[10000, 10000]}
      position={[0, 0, groundOffset]} />
    <Bed
      botSize={botSize}
      groundOffset={groundOffset}
      bedHeight={bedHeight}
      bedZOffset={bedZOffset}
      legSize={legSize} />
    <Bot
      position={{ x, y, z }}
      botSize={botSize}
      mapOriginZ={mapOriginZ}
      beamLength={beamLength} />
  </group>;
};

export const Garden = (props: GardenProps) => {
  return <div className={"garden-bed-3d-model"}>
    <Canvas shadows={true}>
      <Model {...props} />
    </Canvas>
  </div>;
};
