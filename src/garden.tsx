import { Canvas } from "@react-three/fiber";
import {
  GizmoHelper,
  GizmoViewcube,
  OrbitControls, PerspectiveCamera, Plane, Sky, Stats, Grid, Billboard, Text, Svg
} from "@react-three/drei";
import { TextureLoader, RepeatWrapping } from "three";
import { Bot } from "./bot";
import { Bed } from "./bed";
import { useControls } from "leva";

const grassTexture = new TextureLoader()
  .load("/3D/textures/grass.jpg",
    texture => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(1, 4);
    });

interface GardenProps {

}

export interface Config {
  x: number;
  y: number;
  z: number;
  botSizeX: number;
  botSizeY: number;
  beamLength: number;
  bedZOffset: number;
  bedHeight: number;
  legSize: number;
  legsFlush: boolean;
  extraLegsX: number;
  bedBrightness: number;
  soilBrightness: number;
}

const Model = () => {
  const config = useControls({
    x: { value: 300, min: 0, max: 6000, step: 1 },
    y: { value: 700, min: 0, max: 3000, step: 1 },
    z: { value: 200, min: 0, max: 1000, step: 1 },
    botSizeX: { value: 2900, min: 0, max: 6000, step: 1 },
    botSizeY: { value: 1400, min: 0, max: 3000, step: 1 },
    beamLength: { value: 1500, min: 0, max: 3000, step: 1 },
    bedZOffset: { value: 0, min: 0, max: 1000, step: 1 },
    bedHeight: { value: 300, min: 0, max: 1000, step: 1 },
    legSize: { value: 100, min: 0, max: 200, step: 1 },
    legsFlush: { value: true },
    extraLegsX: { value: 1, min: 0, max: 10, step: 1 },
    bedBrightness: { value: 8, min: 1, max: 12, step: 1 },
    soilBrightness: { value: 6, min: 1, max: 12, step: 1 },
    plants: { value: 10, min: 0, max: 300, step: 1 },
  });

  const groundZ = config.bedZOffset + config.bedHeight;

  const plantChoices = [
    { label: "Swiss Chard", icon: "/3D/icons/swiss_chard.svg", scale: 0.2 },
    { label: "Thai Basil", icon: "/3D/icons/thai_basil.svg", scale: 0.4 },
    { label: "Bok Choy", icon: "/3D/icons/bok_choy.svg", scale: 0.4 }
  ];
  return <group dispose={null}>
    <Stats />
    <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
    <PerspectiveCamera makeDefault={true} name={"camera"}
      fov={40} near={10} far={18000}
      position={[0, -3000, 1500]}
      rotation={[0, 0, 0]}
      up={[0, 0, 1]} />
    <OrbitControls maxPolarAngle={Math.PI / 2}
      enableZoom={true} enablePan={false} dampingFactor={0.1}
      minDistance={50} maxDistance={10000} />
    <axesHelper args={[5000]} />
    <GizmoHelper>
      <GizmoViewcube />
    </GizmoHelper>
    <pointLight intensity={5} distance={10000} decay={0} castShadow={true}
      position={[2000, -2000, 3000]} />
    <ambientLight intensity={1.5} />
    <Plane name={"ground"}
      receiveShadow={true}
      args={[10000, 10000]}
      position={[0, 0, -groundZ]}>
      <meshPhongMaterial map={grassTexture} color={"#ddd"} shininess={5} />
    </Plane>
    <Grid
      name={"ground-grid"}
      position={[0, 0, -groundZ + 5]}
      rotation={[Math.PI / 2, 0, 0]}
      cellSize={100}
      cellThickness={1.5}
      cellColor={"#eee"}
      sectionSize={1000}
      sectionThickness={3}
      sectionColor={"#333"}
      infiniteGrid={true}
      fadeDistance={10000}
      fadeStrength={1} />
    <Bed config={config} />
    <Bot config={config} />

    {Array.from({ length: config.plants }).map((_, index) => {
      const plant = plantChoices[Math.floor(Math.random() * plantChoices.length)];
      const randomPosition = [
        (Math.floor(Math.random() * config.botSizeX)) - (config.botSizeX / 2),
        Math.floor(Math.random() * config.botSizeY) - (config.botSizeY / 2),
        0
      ];

      return (
        <Billboard key={index} follow={true} position={randomPosition}>
          <Svg src={plant.icon} scale={plant.scale} position={[-100, 150, 0]} />
          <Text fontSize={40} position={[0, 200, 0]}>{plant.label}</Text>
        </Billboard>
      );
    })}

    <Text fontSize={200}
      color={"white"}
      strokeColor={"black"}
      fontWeight={"bold"}
      strokeWidth={7}
      position={[0, -config.botSizeY / 2 -200, -groundZ + 150]}
      rotation={[Math.PI / 4, 0, 0]} >
        FarmBot Genesis v1.7
    </Text>
  </group>;
};

export const Garden = (props: GardenProps) => {
  return <div className={"garden-bed-3d-model"}>
    <Canvas shadows={true}>
      <Model {...props} />
    </Canvas>
  </div>;
};
