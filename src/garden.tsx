import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  GizmoHelper, GizmoViewcube, OrbitControls, PerspectiveCamera,
  Plane, Stats, Grid, Billboard, Text, Image, Clouds, Cloud, OrthographicCamera,
  Html,
} from "@react-three/drei";
import { TextureLoader, RepeatWrapping, Vector3 } from "three";
import { Bot } from "./bot";
import { Bed } from "./bed";
import { find } from "lodash";
import { threeSpace } from "./helpers";
import { Sky } from './sky';
import { useConfig } from "./config";
import { ASSETS, GARDENS, PLANTS } from "./constants";
import "./garden.css";
import { PresetButton } from "./button";

const grassTexture = new TextureLoader()
  .load(ASSETS.textures.grass,
    texture => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(4, 4);
    });

interface GardenProps {

}

const Model = () => {
  const { config, choosePreset } = useConfig();
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
  return <group dispose={null}>
    <Stats />
    <Sky distance={450000}
      sunPosition={sunPosition}
      mieCoefficient={0.01}
      mieDirectionalG={0.9}
      rayleigh={3}
      turbidity={5} />
    <Camera makeDefault={true} name={"camera"}
      fov={40} near={10} far={20000}
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
    <Clouds name={"clouds"} visible={config.clouds} renderOrder={1}
      texture={ASSETS.textures.cloud}>
      <Cloud position={[0, 0, 3000]}
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
    {["Genesis", "Genesis XL"].map((preset, index) =>
      <Html key={index}
        position={[
          threeSpace(0, 10000) + index * 500,
          threeSpace(0, 10000),
          -groundZ,
        ]}>
        <button className={"preset-button"}
          onClick={choosePreset(preset)}>
          {preset}
        </button>
      </Html>)}
    {["Genesis", "Genesis XL"].map((preset, index) =>
      <PresetButton key={index}
        index={index}
        preset={preset}
        choosePreset={choosePreset}
        hovered={hovered}
        setHovered={setHovered}
        z={-groundZ} />)}
    <Bed config={config} />
    <Bot config={config} />
    {GARDENS[config.plants].map((plant, i) => {
      const min = {
        x: config.bedXOffset,
        y: config.bedYOffset,
      }
      const max = {
        x: config.bedXOffset + config.botSizeX,
        y: config.bedYOffset + config.botSizeY,
      }
      if (plant.x < min.x || plant.x > max.x
        || plant.y < min.y || plant.y > max.y) {
        return;
      }
      const plantData =
        find(PLANTS, ["label", plant.plant]) as { label: string, icon: string };
      const position = new Vector3(
        threeSpace(plant.x, config.bedLengthOuter),
        threeSpace(plant.y, config.bedWidthOuter),
        config.columnLength - 100 - config.soilHeight,
      );
      return <Billboard key={i} follow={true} position={position}>
        <Image url={plantData.icon} scale={200} position={[0, 100, 1]}
          transparent={true} />
        <Text visible={config.labels} fontSize={40} position={[0, 225, 1]}
          font={ASSETS.fonts.cabin}>
          {plantData.label}
        </Text>
      </Billboard>;
    })}
    <Text fontSize={200} visible={config.labels}
      font={ASSETS.fonts.cabinBold}
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
      {config.label}
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
