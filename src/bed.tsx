import { Box, Extrude } from "@react-three/drei";
import {
  DoubleSide, Path, Shape, TextureLoader, RepeatWrapping,
} from "three";
import "./bed.css";
import { Config } from "./garden";
import { range } from "lodash";

const thickness = 40;

const soil = (
  Type: typeof Path | typeof Shape,
  botSize: Record<"x" | "y", number>,
): Path | Shape => {
  const hole = new Type();
  hole.moveTo(thickness, thickness);
  hole.lineTo(thickness, thickness + botSize.y);
  hole.lineTo(thickness + botSize.x, thickness + botSize.y);
  hole.lineTo(thickness + botSize.x, thickness);
  hole.lineTo(thickness, thickness);
  return hole;
}

const bedStructure2D = (botSize: Record<"x" | "y", number>) => {
  const thickness2X = 2 * thickness;
  const shape = new Shape();

  // outer edge
  shape.moveTo(0, 0);
  shape.lineTo(0, botSize.y + thickness2X);
  shape.lineTo(botSize.x + thickness2X, botSize.y + thickness2X);
  shape.lineTo(botSize.x + thickness2X, 0);
  shape.lineTo(0, 0);

  // inner edge
  shape.holes.push(soil(Path, botSize));

  return shape;
}

const woodTexture = new TextureLoader()
  .load("/3D/textures/wood.jpg",
    texture => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(.0003, .0006);
    });

const legWoodTexture = new TextureLoader()
  .load("/3D/textures/wood.jpg",
    texture => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(.02, .05);
    });

const soilTexture = new TextureLoader()
  .load("/3D/textures/soil.jpg",
    texture => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(.0003, .0005);
    });

const getColorFromBrightness = (value) => {
  const colorMap = {
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
    botSizeX, botSizeY, bedHeight, bedZOffset, legSize, legsFlush,
    extraLegsX, bedBrightness,
  } = props.config;
  const botSize = { x: botSizeX, y: botSizeY };
  const bedLength = botSize.x + 2 * thickness;
  const bedWidth = botSize.y + 2 * thickness;
  const legX = (bedLength - legSize) / 2 - thickness;
  const legY = (bedWidth - legSize) / 2 - thickness;
  const bedStartZ = bedHeight;
  const bedColor = getColorFromBrightness(bedBrightness);
  return <group>
    <Extrude name={"bed"}
      castShadow={true}
      receiveShadow={true}
      args={[
        bedStructure2D(botSize),
        { steps: 1, depth: bedHeight, bevelEnabled: false },
      ]}
      position={[
        -bedLength / 2,
        -bedWidth / 2,
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
        { steps: 1, depth: bedHeight - 50, bevelEnabled: false },
      ]}
      position={[
        -bedLength / 2,
        -bedWidth / 2,
        -bedStartZ,
      ]}>
      <meshPhongMaterial map={soilTexture} color={"#aaa"}
        shininess={5} />
    </Extrude>
    {[
      { x: -legX, y: legY },
      { x: legX, y: legY },
    ]
      .concat(extraLegsX
        ? range(0, botSizeX, botSizeX / (extraLegsX + 1))
          .map(n => ({ x: n - botSizeX / 2, y: legY }))
          .slice(1)
        : [])
      .map(position =>
        <group>
          {[-1, 1].map(side =>
            <Box name={"bed-leg"}
              castShadow={true}
              receiveShadow={true}
              args={[legSize, legSize, bedZOffset + (legsFlush ? bedHeight : 0)]}
              position={[
                position.x,
                position.y * side,
                -bedZOffset / 2 - (legsFlush ? bedHeight / 2 : bedHeight),
              ]}>
              <meshPhongMaterial map={legWoodTexture} color={bedColor}
                shininess={100} />
            </Box>)}
        </group>
      )}
  </group>;
};
