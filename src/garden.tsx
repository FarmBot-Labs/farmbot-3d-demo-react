import { Canvas } from "@react-three/fiber";
import {
  GizmoHelper, GizmoViewcube, OrbitControls, PerspectiveCamera,
  Plane, Stats, Grid, Billboard, Text, Image, Clouds, Cloud,
} from "@react-three/drei";
import { TextureLoader, RepeatWrapping, Vector3 } from "three";
import { Bot } from "./bot";
import { Bed } from "./bed";
import { useControls } from "leva";
import { random, range, sample } from "lodash";
import { threeSpace } from "./helpers";
import { Sky } from './sky';

const PLANTS = [
  { label: "Swiss Chard", icon: "/3D/icons/swiss_chard.avif" },
  { label: "Thai Basil", icon: "/3D/icons/thai_basil.avif" },
  { label: "Bok Choy", icon: "/3D/icons/bok_choy.avif" },
];

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
  botSizeX: number;
  botSizeY: number;
  botSizeZ: number;
  bedWallThickness: number;
  bedHeight: number;
  x: number;
  y: number;
  z: number;
  beamLength: number;
  bedXOffset: number;
  bedYOffset: number;
  bedZOffset: number;
  bedWidthOuter: number;
  bedLengthOuter: number;
  legSize: number;
  legsFlush: boolean;
  extraLegsX: number;
  extraLegsY: number;
  bedBrightness: number;
  soilBrightness: number;
  soilHeight: number;
  plants: number;
  labels: boolean;
  ground: boolean;
  grid: boolean;
  axes: boolean;
  trail: boolean;
  tracks: boolean;
  clouds: boolean;
  sunInclination: number;
  sunAzimuth: number;
}

const Model = () => {
  const botSizeConfig0 = useControls("Bot Dimensions", {
    botSizeX: { value: 2900, min: 0, max: 6000, step: 1 },
    botSizeY: { value: 1400, min: 0, max: 4000, step: 1 },
    botSizeZ: { value: 400, min: 0, max: 1000, step: 1 },
  });
  const bedDimensions0 = useControls("Bed Properties", {
    bedWallThickness: { value: 40, min: 0, max: 200, step: 1 },
    bedHeight: { value: 300, min: 0, max: 1000, step: 1 },
  });
  const bedMin = bedDimensions0.bedWallThickness * 2;
  const maxSoilHeight = botSizeConfig0.botSizeZ + bedDimensions0.bedHeight;
  const bedDimensions1 = useControls("Bed Properties", {
    bedWidthOuter: { value: 1480, min: bedMin, max: 3100, step: 1 },
    bedLengthOuter: { value: 2980, min: bedMin, max: 6100, step: 1 },
    bedZOffset: { value: 0, min: 0, max: 1000, step: 1 },
    legSize: { value: 100, min: 0, max: 200, step: 1 },
    legsFlush: { value: true },
    extraLegsX: { value: 1, min: 0, max: 10, step: 1 },
    extraLegsY: { value: 0, min: 0, max: 10, step: 1 },
    bedBrightness: { value: 8, min: 1, max: 12, step: 1 },
    soilBrightness: { value: 6, min: 1, max: 12, step: 1 },
    soilHeight: { value: 500, min: 0, max: maxSoilHeight, step: 1 },
  }, [botSizeConfig0, bedDimensions0]);
  const botPosition = useControls("Bot Position", {
    x: { value: 300, min: 0, max: botSizeConfig0.botSizeX, step: 1 },
    y: { value: 700, min: 0, max: botSizeConfig0.botSizeY, step: 1 },
    z: { value: 200, min: 0, max: botSizeConfig0.botSizeZ + 150, step: 1 },
  }, [botSizeConfig0]);
  const beamLengthMin = Math.max(
    botSizeConfig0.botSizeY,
    bedDimensions1.bedWidthOuter,
  );
  const botSizeConfig1 = useControls("Bot Dimensions", {
    beamLength: { value: 1500, min: beamLengthMin, max: 4000, step: 1 },
    bedXOffset: { value: 50, min: -500, max: 500, step: 1 },
    bedYOffset: { value: -50, min: -500, max: 500, step: 1 },
    tracks: { value: true },
  }, [botSizeConfig0, bedDimensions1]);
  const otherConfig = useControls("Other", {
    plants: { value: 20, min: 0, max: 3000, step: 1 },
    labels: { value: true },
    trail: { value: true },
  });
  const environmentConfig = useControls("Environment", {
    ground: { value: true },
    axes: { value: true },
    grid: { value: true },
    clouds: { value: true },
    sunInclination: { value: 0, min: 0, max: 180, step: 1 },
    sunAzimuth: { value: 0, min: 0, max: 360, step: 1 },
  });
  const config: Config = {
    ...botSizeConfig0,
    ...bedDimensions0,
    ...bedDimensions1,
    ...botPosition,
    ...botSizeConfig1,
    ...otherConfig,
    ...environmentConfig,
  };
  const groundZ = config.bedZOffset + config.bedHeight;
  const midPoint = {
    x: threeSpace(config.bedLengthOuter / 2, config.bedLengthOuter),
    y: threeSpace(config.bedWidthOuter / 2, config.bedWidthOuter),
  };
  const sunPosition = new Vector3(
    10000 * Math.sin(config.sunAzimuth * Math.PI / 180),
    10000 * Math.cos(config.sunAzimuth * Math.PI / 180),
    10000 * Math.sin(config.sunInclination * Math.PI / 180)
  );
  return <group dispose={null}>
    <Stats />
    <Sky distance={450000}
      sunPosition={sunPosition}
      mieCoefficient={0.01}
      mieDirectionalG={0.9}
      rayleigh={3}
      turbidity={5} />
    <PerspectiveCamera makeDefault={true} name={"camera"}
      fov={40} near={10} far={20000}
      position={[0, -3000, 1500]}
      rotation={[0, 0, 0]}
      up={[0, 0, 1]} />
    <OrbitControls maxPolarAngle={Math.PI / 2}
      enableZoom={true} enablePan={false} dampingFactor={0.1}
      minDistance={50} maxDistance={12000} />
    <axesHelper args={[5000]} visible={config.axes} />
    <GizmoHelper>
      <GizmoViewcube />
    </GizmoHelper>
    <pointLight intensity={6} distance={20000} decay={0} castShadow={true}
      position={sunPosition} />
    <ambientLight intensity={1} />
    <Plane name={"ground"}
      visible={config.ground}
      receiveShadow={true}
      args={[10000, 10000]}
      position={[midPoint.x, midPoint.y, -groundZ]}>
      <meshPhongMaterial map={grassTexture} color={"#ddd"} shininess={5} />
    </Plane>
    <Grid
      name={"ground-grid"}
      visible={config.grid}
      position={[midPoint.x, midPoint.y, -groundZ + 5]}
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
    <Clouds name={"clouds"} visible={config.clouds} renderOrder={1}>
      <Cloud position={[0, 0, 3000]}
        bounds={[5000, 5000, 1000]}
        segments={80}
        volume={2500}
        smallestVolume={.4}
        concentrate="random"
        color="#ccc"
        growth={400}
        speed={.15}
        opacity={0.85}
        fade={5000} />
    </Clouds>
    <Bed config={config} />
    <Bot config={config} />
    {range(config.plants).map(i => {
      const plant = sample(PLANTS) as typeof PLANTS[0];
      const min = {
        x: config.bedXOffset,
        y: config.bedYOffset,
      }
      const max = {
        x: config.bedXOffset + config.botSizeX,
        y: config.bedYOffset + config.botSizeY,
      }
      const randomPosition = new Vector3(
        threeSpace(random(min.x, max.x), config.bedLengthOuter),
        threeSpace(random(min.y, max.y), config.bedWidthOuter),
        config.botSizeZ - config.soilHeight,
      );
      return <Billboard key={i} follow={true} position={randomPosition}>
        <Image url={plant.icon} scale={200} position={[0, 100, 0]}
          transparent={true} />
        <Text visible={config.labels} fontSize={40} position={[0, 225, 0]}>
          {plant.label}
        </Text>
      </Billboard>;
    })}
    <Text fontSize={200} visible={config.labels}
      color={"white"}
      strokeColor={"black"}
      strokeWidth={7}
      fontWeight={"bold"}
      position={[
        midPoint.x,
        threeSpace(-200, config.bedWidthOuter),
        -groundZ + 150,
      ]}
      rotation={[Math.PI / 4, 0, 0]}>
      {"FarmBot Genesis v1.7"}
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
