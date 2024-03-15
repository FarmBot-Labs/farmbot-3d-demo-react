import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  GizmoHelper, GizmoViewcube, OrbitControls, PerspectiveCamera,
  Circle, Stats, Grid, Billboard, Text, Image, Clouds, Cloud, OrthographicCamera,
  Html,
} from "@react-three/drei";
import { TextureLoader, RepeatWrapping, Vector3 } from "three";
import { Bot } from "./bot";
import { Bed } from "./bed";
import { threeSpace, zZero } from "./helpers";
import { Sky } from "./sky";
import { useConfig } from "./config";
import { ASSETS, GARDENS, PLANTS } from "./constants";
import "./garden.css";
import _ from 'lodash';

const grassTexture = new TextureLoader()
  .load(ASSETS.textures.grass,
    texture => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(8, 8);
    });

interface GardenProps {

}

type Refs = Record<"size" | "bedType" | "garden",
  Record<string, React.RefObject<HTMLButtonElement>>>;

interface ModelProps {
  refs: Refs;
}

interface Plant {
  label: string;
  icon: string;
  size: number;
  spread: number;
  x: number;
  y: number;
}

const Model = (props: ModelProps) => {
  const { config, choosePreset, setBedType, setPlants } = useConfig();
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
  const Camera = config.perspective ? PerspectiveCamera : OrthographicCamera;
  const [hovered, setHovered] = React.useState("");

  const gardenPlants = GARDENS[config.plants] || [];
  const calculatePlantPositions = (): Plant[] => {
    const positions: Plant[] = [];
    const startX = 350;
    let nextX = startX;
    let index = 0;
    while (nextX <= config.bedLengthOuter - 100) {
      const plantKey = gardenPlants[index];
      const plant = PLANTS[plantKey];
      if (!plant) { return []; }
      positions.push({
        ...plant,
        x: nextX,
        y: config.bedWidthOuter / 2,
      });
      const plantsPerHalfRow = Math.ceil((config.bedWidthOuter - plant.spread) / 2 / plant.spread);
      for (let i = 1; i < plantsPerHalfRow; i++) {
        positions.push({
          ...plant,
          x: nextX,
          y: config.bedWidthOuter / 2 + plant.spread * i,
        });
        positions.push({
          ...plant,
          x: nextX,
          y: config.bedWidthOuter / 2 - plant.spread * i,
        });
      }
      if (index + 1 < gardenPlants.length) {
        const nextPlant = PLANTS[gardenPlants[index + 1]];
        nextX += (plant.spread / 2) + (nextPlant.spread / 2);
        index++;
      } else {
        index = 0;
        const nextPlant = PLANTS[gardenPlants[0]];
        nextX += (plant.spread / 2) + (nextPlant.spread / 2);
      }
    }
    return positions;
  };
  const plants = calculatePlantPositions();

  React.useEffect(() => {
    Object.entries(props.refs.size).map(([preset, ref]) => {
      if (ref.current) {
        ref.current.onclick = choosePreset(preset);
      }
    });
    Object.entries(props.refs.bedType).map(([preset, ref]) => {
      if (ref.current) {
        ref.current.onclick = setBedType(preset);
      }
    });
    Object.entries(props.refs.garden).map(([preset, ref]) => {
      if (ref.current) {
        ref.current.onclick = setPlants(preset);
      }
    });
  }, [props.refs, choosePreset, setBedType, setPlants]);

  return <group dispose={null}>
    <Stats />
    <Sky distance={450000}
      sunPosition={sunPosition}
      mieCoefficient={0.01}
      mieDirectionalG={0.9}
      rayleigh={3}
      turbidity={5} />
    <Camera makeDefault={true} name={"camera"}
      fov={40} near={10} far={25000}
      position={[0, -3000, 1500]}
      rotation={[0, 0, 0]}
      up={[0, 0, 1]} />
    <OrbitControls maxPolarAngle={Math.PI / 2}
      enableZoom={true} enablePan={!config.perspective} dampingFactor={0.1}
      minDistance={50} maxDistance={12000} />
    <axesHelper args={[5000]} visible={config.axes} />
    <GizmoHelper>
      <GizmoViewcube />
    </GizmoHelper>
    <pointLight intensity={6} distance={20000} decay={0} castShadow={true}
      shadow-mapSize={[512, 512]}
      shadow-normalBias={100} // warning: distorts shadows
      position={sunPosition} />
    <ambientLight intensity={1} />
    <Circle name={"ground"}
      visible={config.ground}
      receiveShadow={true}
      args={[10000, 100]}
      position={[midPoint.x, midPoint.y, -groundZ]}>
      <meshPhongMaterial map={grassTexture} color={"#ddd"} shininess={0} />
    </Circle>
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
    <Clouds name={"clouds"} visible={config.clouds} renderOrder={1}
      texture={ASSETS.textures.cloud}>
      <Cloud position={[0, 0, 5000]}
        seed={0}
        bounds={[5000, 5000, 1000]}
        segments={80}
        volume={2500}
        smallestVolume={.4}
        concentrate="random"
        color="#ccc"
        growth={400}
        speed={.1}
        opacity={0.85}
        fade={5000} />
    </Clouds>
    <Bed config={config} />
    <Bot config={config} />
    {plants.map((plant, i) => (
      <Billboard key={i} follow={true} position={new Vector3(
        threeSpace(plant.x, config.bedLengthOuter),
        threeSpace(plant.y, config.bedWidthOuter),
        zZero(config) - config.soilHeight + plant.size / 2,
      )}>
        <Image url={plant.icon} scale={plant.size}
          transparent={true} />
        <Text visible={config.labels} fontSize={40} position={[0, plant.size / 2 + 25, 0]}
          font={ASSETS.fonts.cabin}
          outlineColor={"black"}
          outlineWidth={2}
          outlineBlur={5}
          outlineOpacity={0.5}>
          {plant.label}
        </Text>
      </Billboard>
    ))}
    <Text fontSize={200} visible={config.labels}
      font={ASSETS.fonts.inknut}
      color={"white"}
      outlineColor={"black"}
      outlineWidth={0}
      outlineBlur={20}
      outlineOpacity={0.75}
      position={[
        midPoint.x,
        threeSpace(-500, config.bedWidthOuter),
        -groundZ + 100,
      ]}
      rotation={[Math.PI / 4, 0, 0]}>
      {config.label}
    </Text>
  </group>;
};

export const Garden = (props: GardenProps) => {
  const refs: Refs = {
    size: {
      "Genesis": React.createRef(),
      "Genesis XL": React.createRef(),
    },
    bedType: {
      "Standard": React.createRef(),
      "Mobile": React.createRef(),
    },
    garden: {
      "Winter": React.createRef(),
      "Spring": React.createRef(),
      "Summer": React.createRef(),
      "Fall": React.createRef(),
    },
  };
  return <div className={"garden-bed-3d-model"}>
    <Canvas shadows={true}>
      <Model {...props} refs={refs} />
    </Canvas>
    <div className={"overlay"}>
      {Object.entries(refs).map(([category, presetRefs], index) =>
        <div key={`category-${index}`}>
          <span className="setting-title">{category}</span>
          <div key={`row-${index}`} className={`${_.kebabCase(category)}-row row`}>
            {Object.entries(presetRefs).map(([preset, ref], index) =>
              <button key={index} ref={ref} className={`${_.kebabCase(preset)} active`}>
                {preset}
              </button>)}
          </div>
        </div>
      )}
    </div>
  </div>;
};
