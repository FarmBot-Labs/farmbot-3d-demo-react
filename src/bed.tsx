import { Box, Extrude } from "@react-three/drei";
import {
  DoubleSide, Path, Shape, TextureLoader, RepeatWrapping,
} from "three";
import "./bed.css";
import { range } from "lodash";
import { threeSpace } from "./helpers";
import { Config } from "./config";
import { ASSETS } from "./constants";

const soil = (
  Type: typeof Path | typeof Shape,
  botSize: Record<"x" | "y" | "z" | "thickness", number>,
): Path | Shape => {
  const { x, y, thickness } = botSize;

  const hole = new Type();
  hole.moveTo(thickness, thickness);
  hole.lineTo(thickness, y - thickness);
  hole.lineTo(x - thickness, y - thickness);
  hole.lineTo(x - thickness, thickness);
  hole.lineTo(thickness, thickness);
  return hole;
}

const bedStructure2D = (
  botSize: Record<"x" | "y" | "z" | "thickness", number>,
) => {
  const { x, y } = botSize;
  const shape = new Shape();

  // outer edge
  shape.moveTo(0, 0);
  shape.lineTo(0, y);
  shape.lineTo(x, y);
  shape.lineTo(x, 0);
  shape.lineTo(0, 0);

  // inner edge
  shape.holes.push(soil(Path, botSize));

  return shape;
}

const woodTexture = new TextureLoader()
  .load(ASSETS.textures.wood,
    texture => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(.0003, .0006);
    });

const legWoodTexture = new TextureLoader()
  .load(ASSETS.textures.wood,
    texture => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(.02, .05);
    });

const soilTexture = new TextureLoader()
  .load(ASSETS.textures.soil,
    texture => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(.0003, .0005);
    });

const getColorFromBrightness = (value: number) => {
  const colorMap: { [key: number]: string } = {
    1: "#444",
    2: "#555",
    3: "#666",
    4: "#777",
    5: "#888",
    6: "#999",
    7: "#aaa",
    8: "#bbb",
    9: "#ccc",
    10: "#ddd",
    11: "#eee",
    12: "#fff",
  };
  return colorMap[value];
};

interface BedProps {
  config: Config;
}

export const Bed = (props: BedProps) => {
  const {
    bedWidthOuter, bedLengthOuter, botSizeZ, bedHeight, bedZOffset,
    legSize, legsFlush, extraLegsX, extraLegsY, bedBrightness, soilBrightness,
    soilHeight,
  } = props.config;
  const thickness = props.config.bedWallThickness;
  const botSize = { x: bedLengthOuter, y: bedWidthOuter, z: botSizeZ, thickness };
  const bedStartZ = bedHeight;
  const bedColor = getColorFromBrightness(bedBrightness);
  const soilColor = getColorFromBrightness(soilBrightness);
  const soilTop = botSizeZ - soilHeight;
  const legXPositions = [
    0 + legSize / 2 + thickness,
    ...(extraLegsX
      ? range(0, bedLengthOuter, bedLengthOuter / (extraLegsX + 1)).slice(1)
      : []),
    bedLengthOuter - legSize / 2 - thickness,
  ];
  const legYPositions = (index: number) =>
    [
      0 + legSize / 2 + thickness,
      ...(extraLegsY && (index == 0 || index == (legXPositions.length - 1))
        ? range(0, bedWidthOuter, bedWidthOuter / (extraLegsY + 1)).slice(1)
        : []),
      bedWidthOuter - legSize / 2 - thickness,
    ];
  return <group>
    <Extrude name={"bed"}
      castShadow={true}
      receiveShadow={true}
      args={[
        bedStructure2D(botSize),
        { steps: 1, depth: bedHeight, bevelEnabled: false },
      ]}
      position={[
        threeSpace(0, bedLengthOuter),
        threeSpace(0, bedWidthOuter),
        -bedStartZ,
      ]}>
      <meshPhongMaterial map={woodTexture} color={bedColor}
        shininess={100} side={DoubleSide} />
    </Extrude>
    <Extrude name={"soil"}
      castShadow={true}
      receiveShadow={true}
      args={[
        soil(Shape, botSize) as Shape,
        { steps: 1, depth: bedHeight + soilTop, bevelEnabled: false },
      ]}
      position={[
        threeSpace(0, bedLengthOuter),
        threeSpace(0, bedWidthOuter),
        -bedStartZ,
      ]}>
      <meshPhongMaterial map={soilTexture} color={soilColor}
        shininess={5} />
    </Extrude>
    {legXPositions.map((x, index) =>
      <group key={index}>
        {legYPositions(index).map(y =>
          <Box name={"bed-leg"} key={y}
            castShadow={true}
            receiveShadow={true}
            args={[legSize, legSize, bedZOffset + (legsFlush ? bedHeight : 0)]}
            position={[
              threeSpace(x, bedLengthOuter),
              threeSpace(y, bedWidthOuter),
              -bedZOffset / 2 - (legsFlush ? bedHeight / 2 : bedHeight),
            ]}>
            <meshPhongMaterial map={legWoodTexture} color={bedColor}
              shininess={100} />
          </Box>)}
      </group>
    )}
  </group>;
};
