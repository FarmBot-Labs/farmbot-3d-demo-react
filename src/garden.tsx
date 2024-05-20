import React from "react";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import {
  GizmoHelper, GizmoViewcube,
  OrbitControls, PerspectiveCamera,
  Circle, Stats, Billboard, Text, Image, Clouds, Cloud, OrthographicCamera,
  Detailed,
} from "@react-three/drei";
import { TextureLoader, RepeatWrapping, Vector3 } from "three";
import { Bot } from "./bot";
import { Bed } from "./bed";
import { threeSpace, zZero } from "./helpers";
import { Sky } from "./sky";
import {
  Config, INITIAL, detailLevels, modifyConfigsFromUrlParams, seasonProperties,
} from "./config";
import { ASSETS, GARDENS, PLANTS } from "./constants";
import "./garden.css";
import { PrivateOverlay, PublicOverlay, ToolTip } from "./config_overlays";
import { useSpring, animated } from "@react-spring/three";
import { Solar } from "./solar";
import { Sun, sunPosition } from "./sun";
import { LabEnvironment } from "./lab";
import { ZoomBeacons } from "./zoom_beacons";
import { VectorXyz, getCamera } from "./zoom_beacons_constants";

const grassTexture = new TextureLoader()
  .load(ASSETS.textures.grass,
    texture => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(24, 24);
    });

const concreteTexture = new TextureLoader()
  .load(ASSETS.textures.concrete,
    texture => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(16, 24);
    });

interface ModelProps {
  config: Config;
  activeFocus: string;
  setActiveFocus(focus: string): void;
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
  const { config } = props;
  const groundZ = config.bedZOffset + config.bedHeight;
  const midPoint = {
    x: threeSpace(config.bedLengthOuter / 2, config.bedLengthOuter),
    y: threeSpace(config.bedWidthOuter / 2, config.bedWidthOuter),
  };
  const Camera = config.perspective ? PerspectiveCamera : OrthographicCamera;

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
      const plantsPerHalfRow =
        Math.ceil((config.bedWidthOuter - plant.spread) / 2 / plant.spread);
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

  const [hoveredPlant, setHoveredPlant] =
    React.useState<number | undefined>(undefined);

  const getI = (e: ThreeEvent<PointerEvent>) =>
    e.buttons ? -1 : parseInt(e.intersections[0].object.name);

  const setHover = (active: boolean) => {
    return (active && config.labelsOnHover)
      ? (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHoveredPlant(getI(e));
      }
      : undefined;
  };

  interface PlantProps {
    plant: Plant;
    i: number;
    labelOnly?: boolean;
  }

  const Plant = (props: PlantProps) => {
    const { i, plant, labelOnly } = props;
    const alwaysShowLabels = config.labels && !config.labelsOnHover;
    return <Billboard follow={true}
      position={new Vector3(
        threeSpace(plant.x, config.bedLengthOuter),
        threeSpace(plant.y, config.bedWidthOuter),
        zZero(config) - config.soilHeight + plant.size / 2,
      )}>
      {labelOnly
        ? <Text visible={alwaysShowLabels || i === hoveredPlant}
          renderOrder={2}
          material-depthTest={false}
          fontSize={50}
          position={[0, plant.size / 2 + 40, 0]}
          font={ASSETS.fonts.cabinBold}
          outlineColor={"black"}
          outlineWidth={3}
          outlineBlur={15}
          outlineOpacity={0.7}>
          {plant.label}
        </Text>
        : <Image url={plant.icon} scale={plant.size} name={"" + i}
          transparent={true}
          renderOrder={1} />}
    </Billboard>;
  };
  const isXL = config.sizePreset == "Genesis XL";
  const { scale } = useSpring({
    scale: isXL ? 1.75 : 1,
    config: {
      tension: 300,
      friction: 40,
    },
  });

  const Ground = ({ children }: { children: React.ReactElement }) =>
    <Circle name={"ground"}
      visible={config.ground}
      receiveShadow={true}
      args={[30000, 100]}
      position={[midPoint.x, midPoint.y, -groundZ]}>
      {children}
    </Circle>;

  const initCamera: { position: VectorXyz, target: VectorXyz } = {
    // position: isXL ? [7500, -3500, 3200]
    position: [5000, -2500, 3200], // Small screens
    // position: [2200, -3500, 2000], // Large screens
    target: [0, 0, 0],
  };
  const camera = getCamera(config, props.activeFocus, initCamera);

  return <group dispose={null}>
    {config.stats && <Stats />}
    <ZoomBeacons
      config={config}
      activeFocus={props.activeFocus}
      setActiveFocus={props.setActiveFocus} />
    <Sky distance={450000}
      sunPosition={sunPosition(config)}
      mieCoefficient={0.01}
      mieDirectionalG={0.9}
      rayleigh={3}
      turbidity={5} />
    <animated.group scale={props.activeFocus ? 1 : scale}>
      <Camera makeDefault={true} name={"camera"}
        fov={40} near={10} far={75000}
        position={camera.position}
        rotation={[0, 0, 0]}
        up={[0, 0, 1]} />
    </animated.group>
    <OrbitControls maxPolarAngle={Math.PI / 2}
      enableZoom={config.zoom} enablePan={config.pan} dampingFactor={0.2}
      target={camera.target}
      minDistance={500} maxDistance={12000} />
    <axesHelper args={[5000]} visible={config.threeAxes} />
    {config.viewCube && <GizmoHelper>
      <GizmoViewcube />
    </GizmoHelper>}
    <Sun config={config} />
    <ambientLight intensity={1} />
    <Detailed distances={detailLevels(config)}>
      <Ground>
        <meshPhongMaterial
          map={config.lab ? concreteTexture : grassTexture}
          color={"#ddd"}
          shininess={0} />
      </Ground>
      <Ground>
        <meshPhongMaterial
          color={config.lab ? "gray" : "darkgreen"}
          shininess={0} />
      </Ground>
    </Detailed>
    <Clouds name={"clouds"} visible={config.clouds} renderOrder={2}
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
        opacity={(seasonProperties[config.plants] || seasonProperties.Summer).cloudOpacity}
        fade={5000} />
    </Clouds>
    <Bed config={config} />
    <Bot config={config} />
    <group name={"plant-icon-preload"} visible={false}>
      {Object.values(PLANTS).map((plant, i) =>
        <Image key={i} url={plant.icon} />)}
    </group>
    <group name={"plant-labels"} visible={!props.activeFocus}>
      {plants.map((plant, i) =>
        <Plant key={i} i={i} plant={plant} labelOnly={true} />)}
    </group>
    <group name={"plants"}
      onPointerEnter={setHover(true)}
      onPointerMove={setHover(true)}
      onPointerLeave={setHover(false)}>
      {plants.map((plant, i) =>
        <Plant key={i} i={i} plant={plant} />)}
    </group>
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
    <Solar config={config} />
    <LabEnvironment config={config} />
  </group>;
};

export const Garden = () => {
  const [config, setConfig] = React.useState<Config>(INITIAL);
  const [toolTip, setToolTip] = React.useState<ToolTip>({ timeoutId: 0, text: "" });
  const [activeFocus, setActiveFocus] = React.useState("");

  React.useEffect(() => {
    setConfig(modifyConfigsFromUrlParams(config));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty dependency array

  const common = {
    config, setConfig,
    toolTip, setToolTip,
    activeFocus, setActiveFocus,
  };
  return <div className={"garden-bed-3d-model"}>
    <Canvas shadows={true}>
      <Model {...common} />
    </Canvas>
    <PublicOverlay {...common} />
    {!config.config && <img className={"gear"} src={ASSETS.other.gear}
      onClick={() => setConfig({ ...config, config: true })} />}
    {config.config &&
      <PrivateOverlay {...common} />}
    <span className={"tool-tip"} hidden={!toolTip.text}>
      {toolTip.text}
    </span>
  </div>;
};
