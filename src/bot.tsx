import { Cylinder, Extrude, Line, Trail, useGLTF } from "@react-three/drei";
import { DoubleSide, Path, Shape } from "three";
import { threeSpace } from "./helpers";
import { Config } from "./config";
import { GLTF } from "three-stdlib";
import { ASSETS } from "./constants";
import { SVGLoader } from "three/examples/jsm/Addons.js";
import { useEffect, useState } from "react";

const zAxisLength = 1000;
const extrusionWidth = 20;
const extrusionWallThickness = 3;
const utmRadius = 35;
const utmHeight = 35;

const extrusion = (factor: number) => {
  const shape = new Shape();
  const width = extrusionWidth;
  const length = extrusionWidth * factor;

  // outer edge
  shape.moveTo(0, 0);
  shape.lineTo(0, width);
  shape.lineTo(length, width);
  shape.lineTo(length, 0);
  shape.lineTo(0, 0);

  // inside
  const thickness = extrusionWallThickness;
  const hole = new Path();
  hole.moveTo(thickness, thickness);
  hole.lineTo(thickness, width - thickness);
  hole.lineTo(length - thickness, width - thickness);
  hole.lineTo(length - thickness, thickness);
  hole.lineTo(thickness, thickness);
  shape.holes.push(hole);

  return shape;
}

const LIB_DIR = "/3D/lib/";

const MODELS = {
  gantryWheelPlate: "/3D/models/gantry_wheel_plate.glb",
};

type GantryWheelPlate = GLTF & {
  nodes: {
    Gantry_Wheel_Plate: THREE.Mesh;
  };
  materials: {
    [Material.gantryWheelPlate]: THREE.MeshStandardMaterial;
  };
}

enum Material {
  gantryWheelPlate = "0.603922_0.647059_0.686275_0.000000_0.000000",
}

Object.values(MODELS).map(model => useGLTF.preload(model, LIB_DIR));

interface FarmbotModelProps {
  config: Config;
}

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
    useGLTF(MODELS.gantryWheelPlate, LIB_DIR) as GantryWheelPlate;
  const [trackShape, setTrackShape] = useState<Shape>();
  useEffect(() => {
    new SVGLoader().load(ASSETS.shapes.track,
      svg => {
        const smallCutout = SVGLoader.createShapes(svg.paths[0])[0];
        const largeCutout = SVGLoader.createShapes(svg.paths[1])[0];
        const outline = SVGLoader.createShapes(svg.paths[2])[0];
        outline.holes.push(smallCutout);
        outline.holes.push(largeCutout);
        setTrackShape(outline);
      });
  });
  return <group name={"bot"}>
    {[0 - extrusionWidth, bedWidthOuter].map((y, index) =>
      <group key={y}>
        <Extrude name={"columns"}
          castShadow={true}
          args={[
            extrusion(3),
            { steps: 1, depth: columnLength, bevelEnabled: false },
          ]}
          position={[
            threeSpace(x + extrusionWidth, bedLengthOuter) + bedXOffset,
            threeSpace(y, bedWidthOuter),
            25,
          ]}
          rotation={[0, 0, 0]}>
          <meshPhongMaterial color={"silver"} side={DoubleSide} />
        </Extrude>
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
          <meshPhongMaterial color={"silver"} side={DoubleSide} />
        </Extrude>
        <mesh name={"gantryWheelPlate"}
          position={[
            threeSpace(x + extrusionWidth * 4, bedLengthOuter) + bedXOffset,
            threeSpace(y + (index == 0 ? -5 : extrusionWidth), bedWidthOuter),
            -35,
          ]}
          rotation={[Math.PI / 2, Math.PI, 0]}
          scale={1000}
          geometry={gantryWheelPlate.nodes.Gantry_Wheel_Plate.geometry}>
          <meshPhongMaterial color={"silver"} side={DoubleSide} />
        </mesh>
      </group>)}
    <Extrude name={"z-axis"}
      castShadow={true}
      args={[
        extrusion(1),
        { steps: 1, depth: zAxisLength, bevelEnabled: false },
      ]}
      position={[
        threeSpace(x - extrusionWidth, bedLengthOuter) + bedXOffset,
        threeSpace(y - utmRadius - extrusionWidth, bedWidthOuter) + bedYOffset,
        z,
      ]}
      rotation={[0, 0, 0]}>
      <meshPhongMaterial color={"silver"} side={DoubleSide} />
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
        extrusion(3),
        { steps: 1, depth: beamLength, bevelEnabled: false },
      ]}
      position={[
        threeSpace(x + extrusionWidth, bedLengthOuter) + bedXOffset,
        threeSpace((botSizeY + beamLength) / 2, bedWidthOuter),
        columnLength,
      ]}
      rotation={[Math.PI / 2, 0, Math.PI / 2]}>
      <meshPhongMaterial color={"silver"} side={DoubleSide} />
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
