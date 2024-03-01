import { Cylinder, Extrude, Line, Trail, useGLTF } from "@react-three/drei";
import { DoubleSide, Shape, TextureLoader, RepeatWrapping } from "three";
import { threeSpace } from "./helpers";
import { Config } from "./config";
import { GLTF } from "three-stdlib";
import { ASSETS } from "./constants";
import { SVGLoader } from "three/examples/jsm/Addons.js";
import { useEffect, useState } from "react";
import { range } from "lodash";

const zAxisLength = 1000;
const extrusionWidth = 20;
const utmRadius = 35;
const utmHeight = 35;

const LIB_DIR = "/3D/lib/";

type GantryWheelPlate = GLTF & {
  nodes: { Gantry_Wheel_Plate: THREE.Mesh };
  materials: never;
}
type LeftBracket = GLTF & {
  nodes: { Left_Gantry_Corner_Bracket: THREE.Mesh };
  materials: never;
}
type RightBracket = GLTF & {
  nodes: { Right_Gantry_Corner_Bracket: THREE.Mesh };
  materials: never;
}
type CrossSlide = GLTF & {
  nodes: { ["Cross-Slide_Plate"]: THREE.Mesh }
  materials: never;
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
    x, y, z, botSizeX, botSizeY, botSizeZ, beamLength, trail,
    bedXOffset, bedYOffset, bedLengthOuter, bedWidthOuter, tracks, labels,
  } = props.config;
  const columnLength = botSizeZ + 200;
  const boundsDrawZ = 0;
  const zero = {
    x: threeSpace(bedXOffset, bedLengthOuter),
    y: threeSpace(bedYOffset, bedWidthOuter),
  };
  const extents = {
    x: threeSpace(bedXOffset + botSizeX, bedLengthOuter),
    y: threeSpace(bedYOffset + botSizeY, bedWidthOuter),
  };
  const gantryWheelPlate =
    useGLTF(ASSETS.models.gantryWheelPlate, LIB_DIR) as GantryWheelPlate;
  const leftBracket = useGLTF(ASSETS.models.leftBracket, LIB_DIR) as LeftBracket;
  const rightBracket = useGLTF(ASSETS.models.rightBracket, LIB_DIR) as RightBracket;
  const crossSlide = useGLTF(ASSETS.models.crossSlide, LIB_DIR) as CrossSlide;
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
  return <group name={"bot"} visible={props.config.bot}>
    {[0 - extrusionWidth, bedWidthOuter].map((y, index) =>
      <group key={y}>
        <Extrude name={"columns"}
          castShadow={true}
          args={[
            columnShape,
            { steps: 1, depth: columnLength, bevelEnabled: false },
          ]}
          position={[
            threeSpace(x - extrusionWidth - 10, bedLengthOuter) + bedXOffset,
            threeSpace(y, bedWidthOuter),
            30,
          ]}
          rotation={[0, 0, Math.PI / 2]}>
          <meshPhongMaterial color={"white"} map={aluminumTexture} side={DoubleSide} />
        </Extrude>
        <mesh name={index == 0 ? "leftBracket" : "rightBracket"}
          position={[
            threeSpace(x - extrusionWidth - 10, bedLengthOuter) + bedXOffset,
            threeSpace(y - (index == 0 ? 0 : 170), bedWidthOuter),
            columnLength - 30,
          ]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
          scale={1000}
          geometry={index == 0
            ? leftBracket.nodes.Left_Gantry_Corner_Bracket.geometry
            : rightBracket.nodes.Right_Gantry_Corner_Bracket.geometry}>
          <meshPhongMaterial color={"silver"} side={DoubleSide} />
        </mesh>
        <Extrude name={"tracks"} visible={tracks}
          castShadow={true}
          args={[
            trackShape,
            { steps: 1, depth: botSizeX, bevelEnabled: false },
          ]}
          position={[
            threeSpace(index == 0 ? botSizeX : 0, bedLengthOuter) + bedXOffset,
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
        <mesh name={"gantryWheelPlate"}
          position={[
            threeSpace(x - extrusionWidth * 4 - 10, bedLengthOuter) + bedXOffset,
            threeSpace(y + (index == 0 ? 0 : extrusionWidth + 5), bedWidthOuter),
            -30,
          ]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1000}
          geometry={gantryWheelPlate.nodes.Gantry_Wheel_Plate.geometry}>
          <meshPhongMaterial color={"silver"} side={DoubleSide} />
        </mesh>
      </group>)}
    <mesh name={"crossSlide"}
      position={[
        threeSpace(x - 5, bedLengthOuter) + bedXOffset,
        threeSpace(y - 135, bedWidthOuter),
        columnLength,
      ]}
      rotation={[Math.PI / 2, Math.PI / 2, 0]}
      scale={1000}
      geometry={crossSlide.nodes["Cross-Slide_Plate"].geometry}>
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
        z,
      ]}
      rotation={[0, 0, 0]}>
      <meshPhongMaterial color={"white"} map={aluminumTexture} side={DoubleSide} />
    </Extrude>

    <Trail
      width={trail ? 500 : 0}
      color={"red"}
      length={100}
      decay={0.5}
      local={false}
      stride={0}
      interval={1}>
      <Cylinder name={"UTM"}
        castShadow={true}
        args={[utmRadius, utmRadius, utmHeight]}
        position={[
          threeSpace(x, bedLengthOuter) + bedXOffset,
          threeSpace(y, bedWidthOuter) + bedYOffset,
          z + utmHeight / 2,
        ]}
        rotation={[Math.PI / 2, 0, 0]}>
        <meshPhongMaterial color={"silver"} side={DoubleSide} />
      </Cylinder>
    </Trail>
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
    <Line name={"bounds"}
      visible={labels}
      color={"white"}
      points={[
        [zero.x, zero.y, boundsDrawZ],
        [zero.x, extents.y, boundsDrawZ],
        [extents.x, extents.y, boundsDrawZ],
        [extents.x, zero.y, boundsDrawZ],
        [zero.x, zero.y, boundsDrawZ],
      ]} />
  </group>;
};
