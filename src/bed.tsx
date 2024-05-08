import { Box, Cylinder, Extrude } from "@react-three/drei";
import {
  DoubleSide, Path, Shape, TextureLoader, RepeatWrapping,
} from "three";
import { range } from "lodash";
import { threeSpace, zZero } from "./helpers";
import { Config } from "./config";
import { ASSETS } from "./constants";
import { DistanceIndicator } from "./distance_indicator";
import { FarmBotAxes } from "./farmbot_axes";
import { outletDepth } from "./bot";

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
      texture.repeat.set(.0003, .003);
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
      texture.repeat.set(.00017, .00034);
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
    soilHeight, ccSupportSize, axes, xyDimensions, utilitiesPost,
  } = props.config;
  const thickness = props.config.bedWallThickness;
  const botSize = { x: bedLengthOuter, y: bedWidthOuter, z: botSizeZ, thickness };
  const bedStartZ = bedHeight;
  const bedColor = getColorFromBrightness(bedBrightness);
  const soilColor = getColorFromBrightness(soilBrightness);
  const soilDepth = bedHeight + zZero(props.config) - soilHeight;
  const groundZ = -bedHeight - bedZOffset;
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
  const casterHeight = legSize * 1.375;
  const casterBracket2D = () => {
    const shape = new Shape();
    shape.moveTo(0, 0);
    shape.lineTo(legSize, 0);
    shape.lineTo(legSize / 3 * 2, -legSize);
    shape.lineTo(legSize / 3, -legSize);
    shape.lineTo(0, 0);
    return shape;
  }
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
    <group visible={xyDimensions}>
      <DistanceIndicator
        start={{
          x: threeSpace(0, bedLengthOuter),
          y: threeSpace(0, bedWidthOuter) - 100,
          z: groundZ,
        }}
        end={{
          x: threeSpace(bedLengthOuter, bedLengthOuter),
          y: threeSpace(0, bedWidthOuter) - 100,
          z: groundZ,
        }} />
      <DistanceIndicator
        start={{
          x: threeSpace(bedLengthOuter, bedLengthOuter) + 100,
          y: threeSpace(0, bedWidthOuter),
          z: groundZ,
        }}
        end={{
          x: threeSpace(bedLengthOuter, bedLengthOuter) + 100,
          y: threeSpace(bedWidthOuter, bedWidthOuter),
          z: groundZ,
        }} />
    </group>
    <group visible={axes}>
      <FarmBotAxes config={props.config} />
    </group>
    <Box name={"lower-cc-support"}
      castShadow={true}
      receiveShadow={true}
      args={[bedLengthOuter / 2, ccSupportSize, ccSupportSize]}
      position={[
        threeSpace(bedLengthOuter / 4, bedLengthOuter),
        threeSpace(-ccSupportSize / 2, bedWidthOuter),
        -Math.min(150, bedHeight / 2) - ccSupportSize / 2,
      ]}>
      <meshPhongMaterial map={legWoodTexture} color={bedColor}
        shininess={100} side={DoubleSide} />
    </Box>
    <Box name={"upper-cc-support"}
      castShadow={true}
      receiveShadow={true}
      args={[bedLengthOuter / 2, ccSupportSize, ccSupportSize]}
      position={[
        threeSpace(bedLengthOuter * 3 / 4, bedLengthOuter),
        threeSpace(-ccSupportSize / 2, bedWidthOuter),
        -50 - ccSupportSize / 2,
      ]}>
      <meshPhongMaterial map={legWoodTexture} color={bedColor}
        shininess={100} side={DoubleSide} />
    </Box>
    <Extrude name={"soil"}
      castShadow={true}
      receiveShadow={true}
      args={[
        soil(Shape, botSize) as Shape,
        { steps: 1, depth: soilDepth, bevelEnabled: false },
      ]}
      position={[
        threeSpace(0, bedLengthOuter),
        threeSpace(0, bedWidthOuter),
        -bedStartZ,
      ]}>
      <meshPhongMaterial map={soilTexture} color={soilColor}
        shininess={0} />
    </Extrude>
    {legXPositions.map((x, index) =>
      <group key={index}>
        {legYPositions(index).map(y =>
          <group name={"bed-leg"} key={y}
            position={[
              threeSpace(x, bedLengthOuter),
              threeSpace(y, bedWidthOuter),
              -bedZOffset / 2 - (legsFlush ? bedHeight / 2 : bedHeight) + (casterHeight / 2),
            ]}>
            <Box name={"bed-leg-wood"}
              castShadow={true}
              receiveShadow={true}
              args={[
                legSize,
                legSize,
                bedZOffset + (legsFlush ? bedHeight : 0) - casterHeight
              ]}>
              <meshPhongMaterial map={legWoodTexture} color={bedColor}
                shininess={100} />
            </Box>
            <group name={"caster"}
              position={[
                -legSize / 2,
                legSize / 2,
                (-bedZOffset - (legsFlush ? bedHeight : 0) + casterHeight) / 2
              ]}
              rotation={[Math.PI / 2, 0, 0]}>
              <Extrude name={"caster-bracket"}
                castShadow={true}
                receiveShadow={true}
                args={[
                  casterBracket2D(),
                  { steps: 1, depth: legSize, bevelEnabled: false },
                ]}>
                <meshPhongMaterial color={"silver"} shininess={100} />
              </Extrude>
              <group name={"caster-wheel"}
                position={[legSize / 2, -legSize * 0.75, legSize / 2]}
                rotation={[Math.PI / 2, 0, 0]}>
                <Cylinder name={"wheel"}
                  castShadow={true}
                  receiveShadow={true}
                  args={[legSize * 0.625, legSize * 0.625, legSize / 3]}>
                  <meshPhongMaterial color={"#434343"} shininess={100} />
                </Cylinder>
                <Cylinder name={"axle"}
                  castShadow={true}
                  receiveShadow={true}
                  args={[legSize / 10, legSize / 10, legSize * 1.1]}>
                  <meshPhongMaterial color={"#434343"} shininess={100} />
                </Cylinder>
              </group>
            </group>
          </group>)}
      </group>
    )}
    <group name={"utilities"}
      visible={utilitiesPost}
      position={[
        threeSpace(bedLengthOuter + 600, bedLengthOuter),
        threeSpace(legSize / 2, bedWidthOuter),
        groundZ + 150,
      ]}>
      <Box name={"utilities-post"}
        castShadow={true}
        args={[legSize, legSize, 300]}>
        <meshPhongMaterial map={legWoodTexture} color={bedColor}
          shininess={100} />
      </Box>
      <Box name={"electrical-outlet"}
        castShadow={true}
        args={[outletDepth, 90, 120]}
        position={[-legSize / 2 - outletDepth / 2, 0, 85]}>
        <meshPhongMaterial color={"gray"}
          shininess={100} />
      </Box>
    </group>
  </group>;
};
