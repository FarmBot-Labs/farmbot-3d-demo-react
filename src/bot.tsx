import { Cylinder, Extrude, Line, Trail, useGLTF } from "@react-three/drei";
import { DoubleSide, Shape, TextureLoader, RepeatWrapping } from "three";
import { threeSpace } from "./helpers";
import { Config } from "./config";
import { GLTF } from "three-stdlib";
import { ASSETS } from "./constants";
import { SVGLoader } from "three/examples/jsm/Addons.js";
import { useEffect, useState } from "react";
import { range } from "lodash";

const extrusionWidth = 20;
const utmRadius = 35;
const utmHeight = 35;
const xTrackPadding = 280;

const LIB_DIR = "/3D/lib/";

enum PartName {
  gantryWheelPlate = "Gantry_Wheel_Plate",
  leftBracket = "Left_Gantry_Corner_Bracket",
  rightBracket = "Right_Gantry_Corner_Bracket",
  crossSlide = "Cross-Slide_Plate",
  zMotorMount = "Z-Axis_Motor_Mount",
  zStop = "Z-Axis_Hardstop",
  beltClip = "Belt_Clip_-_Slim",
  utm = "M5_Barb",
}

type GantryWheelPlate = GLTF & {
  nodes: { [PartName.gantryWheelPlate]: THREE.Mesh };
  materials: never;
}
type LeftBracket = GLTF & {
  nodes: { [PartName.leftBracket]: THREE.Mesh };
  materials: never;
}
type RightBracket = GLTF & {
  nodes: { [PartName.rightBracket]: THREE.Mesh };
  materials: never;
}
type CrossSlide = GLTF & {
  nodes: { [PartName.crossSlide]: THREE.Mesh }
  materials: never;
}
type ZMotorMount = GLTF & {
  nodes: { [PartName.zMotorMount]: THREE.Mesh }
  materials: never;
}
type ZStop = GLTF & {
  nodes: { [PartName.zStop]: THREE.Mesh }
  materials: never;
}
type BeltClip = GLTF & {
  nodes: { [PartName.beltClip]: THREE.Mesh }
  materials: never;
}
type UTM = GLTF & {
  nodes: { [PartName.utm]: THREE.Mesh };
  materials: { PaletteMaterial001: THREE.MeshStandardMaterial };
}

Object.values(ASSETS.models).map(model => useGLTF.preload(model, LIB_DIR));

interface FarmbotModelProps {
  config: Config;
}

const aluminumTexture = new TextureLoader()
  .load(ASSETS.textures.aluminum,
    texture => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(.01, .0003);
    });

export const Bot = (props: FarmbotModelProps) => {
  const {
    x, y, z, botSizeX, botSizeY, botSizeZ, beamLength, trail, laser, soilHeight,
    bedXOffset, bedYOffset, bedLengthOuter, bedWidthOuter, tracks, labels,
    columnLength, zAxisLength, zGantryOffset,
  } = props.config;
  const zDir = -1;
  const zZero = columnLength + 40 - zGantryOffset;
  const zero = {
    x: threeSpace(bedXOffset, bedLengthOuter),
    y: threeSpace(bedYOffset, bedWidthOuter),
    z: zZero,
  };
  const extents = {
    x: threeSpace(bedXOffset + botSizeX, bedLengthOuter),
    y: threeSpace(bedYOffset + botSizeY, bedWidthOuter),
    z: zZero + zDir * botSizeZ,
  };
  const zDip = (x: number, y: number): [number, number, number][] => [
    [x, y, extents.z],
    [x, y, zero.z],
    [x, y, extents.z],
  ];
  const gantryWheelPlate =
    useGLTF(ASSETS.models.gantryWheelPlate, LIB_DIR) as GantryWheelPlate;
  const leftBracket = useGLTF(ASSETS.models.leftBracket, LIB_DIR) as LeftBracket;
  const rightBracket = useGLTF(ASSETS.models.rightBracket, LIB_DIR) as RightBracket;
  const crossSlide = useGLTF(ASSETS.models.crossSlide, LIB_DIR) as CrossSlide;
  const beltClip = useGLTF(ASSETS.models.beltClip, LIB_DIR) as BeltClip;
  const zStop = useGLTF(ASSETS.models.zStop, LIB_DIR) as ZStop;
  const zMotorMount = useGLTF(ASSETS.models.zMotorMount, LIB_DIR) as ZMotorMount;
  const utm = useGLTF(ASSETS.models.utm, LIB_DIR) as UTM;
  const [trackShape, setTrackShape] = useState<Shape>();
  const [beamShape, setBeamShape] = useState<Shape>();
  const [columnShape, setColumnShape] = useState<Shape>();
  const [zAxisShape, setZAxisShape] = useState<Shape>();
  useEffect(() => {
    if (!(trackShape && beamShape && columnShape && zAxisShape)) {
      const loader = new SVGLoader();
      loader.load(ASSETS.shapes.track,
        svg => {
          const smallCutout = SVGLoader.createShapes(svg.paths[0])[0];
          const largeCutout = SVGLoader.createShapes(svg.paths[1])[0];
          const outline = SVGLoader.createShapes(svg.paths[2])[0];
          outline.holes.push(smallCutout);
          outline.holes.push(largeCutout);
          setTrackShape(outline);
        });
      loader.load(ASSETS.shapes.beam,
        svg => {
          const outline = SVGLoader.createShapes(svg.paths[0])[0];
          range(1, 6).map(i => {
            const hole = SVGLoader.createShapes(svg.paths[i])[0];
            outline.holes.push(hole);
          });
          setBeamShape(outline);
        });
      loader.load(ASSETS.shapes.column,
        svg => {
          const outline = SVGLoader.createShapes(svg.paths[3])[0];
          range(3).map(i => {
            const hole = SVGLoader.createShapes(svg.paths[i])[0];
            outline.holes.push(hole);
          })
          setColumnShape(outline);
        });
      loader.load(ASSETS.shapes.zAxis,
        svg => {
          const hole = SVGLoader.createShapes(svg.paths[1])[0];
          const outline = SVGLoader.createShapes(svg.paths[0])[0];
          outline.holes.push(hole);
          setZAxisShape(outline);
        });
    }
  });
  const distanceToSoil = soilHeight + zDir * z;
  return <group name={"bot"} visible={props.config.bot}>
    {[0 - extrusionWidth, bedWidthOuter].map((y, index) => {
      const bedColumnYOffset = (tracks ? 0 : extrusionWidth) * (index == 0 ? 1 : -1);
      return <group key={y}>
        <Extrude name={"columns"}
          castShadow={true}
          args={[
            columnShape,
            { steps: 1, depth: columnLength, bevelEnabled: false },
          ]}
          position={[
            threeSpace(x - extrusionWidth - 10, bedLengthOuter) + bedXOffset,
            threeSpace(y + bedColumnYOffset, bedWidthOuter),
            30,
          ]}
          rotation={[0, 0, Math.PI / 2]}>
          <meshPhongMaterial color={"white"} map={aluminumTexture} side={DoubleSide} />
        </Extrude>
        <mesh name={index == 0 ? "leftBracket" : "rightBracket"}
          position={[
            threeSpace(x - extrusionWidth - 10, bedLengthOuter) + bedXOffset,
            threeSpace(y - (index == 0 ? 0 : 170) + bedColumnYOffset, bedWidthOuter),
            columnLength - 30,
          ]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          scale={1000}
          geometry={index == 0
            ? leftBracket.nodes[PartName.leftBracket].geometry
            : rightBracket.nodes[PartName.rightBracket].geometry}>
          <meshPhongMaterial color={"silver"} side={DoubleSide} />
        </mesh>
        <Extrude name={"tracks"} visible={tracks}
          castShadow={true}
          args={[
            trackShape,
            { steps: 1, depth: botSizeX + xTrackPadding, bevelEnabled: false },
          ]}
          position={[
            threeSpace(index == 0
              ? botSizeX + xTrackPadding / 2
              : -xTrackPadding / 2, bedLengthOuter) + bedXOffset,
            threeSpace(y + (index == 0 ? 2.5 : 17.5), bedWidthOuter),
            2,
          ]}
          rotation={[
            index == 0 ? -Math.PI / 2 : -Math.PI / 2,
            index == 0 ? -Math.PI / 2 : Math.PI / 2,
            0,
          ]}>
          <meshPhongMaterial color={"white"} map={aluminumTexture} side={DoubleSide} />
        </Extrude>
        <mesh name={"xStopMin"}
          position={[
            threeSpace(-130, bedLengthOuter) + bedXOffset,
            threeSpace(y + 10 + bedColumnYOffset, bedWidthOuter),
            2 + (index == 0 ? 0 : 5),
          ]}
          rotation={[
            0,
            index == 0 ? 0 : Math.PI,
            (index == 0 ? 1 : -1) * Math.PI / 2,
          ]}
          scale={1000}
          geometry={beltClip.nodes[PartName.beltClip].geometry}>
          <meshPhongMaterial color={"silver"} />
        </mesh>
        <mesh name={"xStopMax"}
          position={[
            threeSpace(botSizeX + 130, bedLengthOuter) + bedXOffset,
            threeSpace(y + 10 + bedColumnYOffset, bedWidthOuter),
            2 + (index == 0 ? 5 : 0),
          ]}
          rotation={[
            0,
            index == 0 ? Math.PI : 0,
            (index == 0 ? 1 : -1) * Math.PI / 2,
          ]}
          scale={1000}
          geometry={beltClip.nodes[PartName.beltClip].geometry}>
          <meshPhongMaterial color={"silver"} />
        </mesh>
        <mesh name={"gantryWheelPlate"}
          position={[
            threeSpace(x - extrusionWidth * 4 - 10, bedLengthOuter) + bedXOffset,
            threeSpace(
              y + (index == 0 ? 0 : extrusionWidth + 5)
              + bedColumnYOffset,
              bedWidthOuter),
            -30,
          ]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1000}
          geometry={gantryWheelPlate.nodes[PartName.gantryWheelPlate].geometry}>
          <meshPhongMaterial color={"silver"} side={DoubleSide} />
        </mesh>
      </group>;
    })}
    <mesh name={"crossSlide"}
      position={[
        threeSpace(x - 5, bedLengthOuter) + bedXOffset,
        threeSpace(y - 85, bedWidthOuter) + bedYOffset,
        columnLength + 20,
      ]}
      rotation={[Math.PI / 2, Math.PI / 2, 0]}
      scale={1000}
      geometry={crossSlide.nodes[PartName.crossSlide].geometry}>
      <meshPhongMaterial color={"silver"} side={DoubleSide} />
    </mesh>
    <Extrude name={"z-axis"}
      castShadow={true}
      args={[
        zAxisShape,
        { steps: 1, depth: zAxisLength, bevelEnabled: false },
      ]}
      position={[
        threeSpace(x, bedLengthOuter) + bedXOffset,
        threeSpace(y + utmRadius, bedWidthOuter) + bedYOffset,
        zZero + zDir * z,
      ]}
      rotation={[0, 0, 0]}>
      <meshPhongMaterial color={"white"} map={aluminumTexture} side={DoubleSide} />
    </Extrude>
    <mesh name={"zMotorMount"}
      position={[
        threeSpace(x + 5, bedLengthOuter) + bedXOffset,
        threeSpace(y + utmRadius - 65, bedWidthOuter) + bedYOffset,
        zZero + zDir * z + zAxisLength - 100,
      ]}
      rotation={[0, 0, Math.PI]}
      scale={1000}
      geometry={zMotorMount.nodes[PartName.zMotorMount].geometry}>
      <meshPhongMaterial color={"silver"} />
    </mesh>
    <mesh name={"zStopMax"}
      position={[
        threeSpace(x - 5, bedLengthOuter) + bedXOffset,
        threeSpace(y + utmRadius + extrusionWidth / 2, bedWidthOuter) + bedYOffset,
        zZero + zDir * z - 30 + zGantryOffset,
      ]}
      rotation={[0, Math.PI / 2, 0]}
      scale={1000}
      geometry={zStop.nodes[PartName.zStop].geometry}>
      <meshPhongMaterial color={"silver"} />
    </mesh>
    <mesh name={"zStopMin"}
      position={[
        threeSpace(x - 5, bedLengthOuter) + bedXOffset,
        threeSpace(y + utmRadius + extrusionWidth / 2, bedWidthOuter) + bedYOffset,
        zZero + zDir * z + botSizeZ + 140 + zGantryOffset,
      ]}
      rotation={[0, Math.PI / 2, 0]}
      scale={1000}
      geometry={zStop.nodes[PartName.zStop].geometry}>
      <meshPhongMaterial color={"silver"} />
    </mesh>
    <Trail
      width={trail ? 500 : 0}
      color={"red"}
      length={100}
      decay={0.5}
      local={false}
      stride={0}
      interval={1}>
      <group name={"UTM"}
        position={[
          threeSpace(x + 11, bedLengthOuter) + bedXOffset,
          threeSpace(y, bedWidthOuter) + bedYOffset,
          zZero + zDir * z + utmHeight / 2 - 18,
        ]}
        rotation={[0, 0, Math.PI / 2]}
        scale={1000}>
        <mesh
          geometry={utm.nodes.M5_Barb.geometry}
          material={utm.materials.PaletteMaterial001}
          position={[0.015, 0.009, 0.036]}
          rotation={[0, 0, 2.094]} />
      </group>
    </Trail>
    <Cylinder
      visible={laser}
      material-color={"red"}
      args={[5, 5, distanceToSoil]}
      position={[
        threeSpace(x, bedLengthOuter) + bedXOffset,
        threeSpace(y, bedWidthOuter) + bedYOffset,
        zZero + zDir * z - distanceToSoil / 2,
      ]}
      rotation={[Math.PI / 2, 0, 0]} />
    <Extrude name={"gantry-beam"}
      castShadow={true}
      args={[
        beamShape,
        { steps: 1, depth: beamLength, bevelEnabled: false },
      ]}
      position={[
        threeSpace(x - extrusionWidth - 5, bedLengthOuter) + bedXOffset,
        threeSpace((bedWidthOuter + beamLength) / 2, bedWidthOuter),
        columnLength + 40,
      ]}
      rotation={[Math.PI / 2, 0, 0]}>
      <meshPhongMaterial color={"white"} map={aluminumTexture} side={DoubleSide} />
    </Extrude>
    <mesh name={"yStopMin"}
      position={[
        threeSpace(x - extrusionWidth + 5, bedLengthOuter) + bedXOffset,
        threeSpace(bedYOffset - 125, bedWidthOuter),
        columnLength + 40 + extrusionWidth * 3,
      ]}
      rotation={[0, 0, Math.PI]}
      scale={1000}
      geometry={beltClip.nodes[PartName.beltClip].geometry}>
      <meshPhongMaterial color={"silver"} />
    </mesh>
    <mesh name={"yStopMax"}
      position={[
        threeSpace(x - extrusionWidth + 5, bedLengthOuter) + bedXOffset,
        threeSpace(botSizeY + bedYOffset + 135, bedWidthOuter),
        columnLength + 40 + extrusionWidth * 3 + 5,
      ]}
      rotation={[0, Math.PI, 0]}
      scale={1000}
      geometry={beltClip.nodes[PartName.beltClip].geometry}>
      <meshPhongMaterial color={"silver"} />
    </mesh>
    <Line name={"bounds"}
      visible={labels}
      color={"white"}
      points={[
        [zero.x, zero.y, zero.z],
        [zero.x, extents.y, zero.z],
        [extents.x, extents.y, zero.z],
        [extents.x, zero.y, zero.z],
        [zero.x, zero.y, zero.z],
        ...zDip(zero.x, zero.y),
        ...zDip(zero.x, extents.y),
        ...zDip(extents.x, extents.y),
        ...zDip(extents.x, zero.y),
        [zero.x, zero.y, extents.z],
      ]} />
  </group>;
};
