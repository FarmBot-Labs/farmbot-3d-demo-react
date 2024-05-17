import { TextureLoader, RepeatWrapping } from "three";
import { Line, Box, CubicBezierLine } from "@react-three/drei";
import { ASSETS } from "./constants";
import { threeSpace } from "./helpers";
import { Config } from "./config";

interface PowerSupplyProps {
  config: Config;
}

export const outletDepth = 25;
const plugDepth = 25;

const CABLE_DEBUG = false;
let incr = 0;
const cableColor = () => {
  if (!CABLE_DEBUG) { return "#222"; }
  const hue = incr * 80;
  incr++;
  return `hsl(${hue}, 100%, 50%)`;
};

const aluminumTexture = new TextureLoader()
  .load(ASSETS.textures.aluminum,
    texture => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(.01, .0003);
    });

export const PowerSupply = (props: PowerSupplyProps) => {
  const {
    bedWidthOuter, bedLengthOuter, bedHeight, botSizeX,
    legSize, ccSupportSize, bedZOffset
  } = props.config;
  const zGround = -bedHeight - bedZOffset;
  return (
    <group name={"powerSupplyGroup"}>
      <Box name={"powerSupply"}
        castShadow={true}
        receiveShadow={true}
        args={[163, 42, 68]}
        position={[
          threeSpace(bedLengthOuter / 2 + 300, bedLengthOuter),
          threeSpace(-21, bedWidthOuter),
          -90 - ccSupportSize
        ]}>
        <meshPhongMaterial map={aluminumTexture} color={"white"}
          shininess={100} />
      </Box>
      <group name={"powerCableGroup"}>
        <Line name={"powerCableInCC"}
          points={[
            [
              threeSpace(botSizeX / 2, bedLengthOuter),
              threeSpace(-20, bedWidthOuter),
              10 - Math.min(150, bedHeight / 2),
            ],
            [
              threeSpace(bedLengthOuter / 2, bedLengthOuter),
              threeSpace(-20, bedWidthOuter),
              10 - Math.min(150, bedHeight / 2),
            ]
          ]}
          color={cableColor()}
          lineWidth={2.5} />
        <CubicBezierLine name={"powerCableFromSupplyToCC"}
          start={[threeSpace(bedLengthOuter / 2 + 0, bedLengthOuter), threeSpace(-20, bedWidthOuter), 10 - Math.min(150, bedHeight / 2)]}
          midA={[threeSpace(bedLengthOuter / 2 + 100, bedLengthOuter), threeSpace(-20, bedWidthOuter), 10 - Math.min(150, bedHeight / 2)]}
          midB={[threeSpace(bedLengthOuter / 2 + 200 - (163 / 2), bedLengthOuter), threeSpace(-20, bedWidthOuter), -90 - ccSupportSize]}
          end={[threeSpace(bedLengthOuter / 2 + 300 - (163 / 2), bedLengthOuter), threeSpace(-20, bedWidthOuter), -90 - ccSupportSize]}
          color={cableColor()}
          lineWidth={2.5} />
        <CubicBezierLine name={"powerCableFromGroundToSupply"}
          start={[threeSpace(bedLengthOuter / 2 + 300 + (163 / 2), bedLengthOuter), threeSpace(-20, bedWidthOuter), -90 - ccSupportSize]}
          midA={[threeSpace(bedLengthOuter / 2 + 400 + (163 / 2), bedLengthOuter), threeSpace(-20, bedWidthOuter), -90 - ccSupportSize]}
          midB={[threeSpace(bedLengthOuter / 2 + 400, bedLengthOuter), threeSpace(-20, bedWidthOuter), -bedHeight + 10]}
          end={[threeSpace(bedLengthOuter / 2 + 500, bedLengthOuter), threeSpace(-20, bedWidthOuter), -bedHeight + 10]}
          color={cableColor()}
          lineWidth={2.5} />
        <Line name={"powerCableFromBedEndToSupply"}
          points={[
            [
              threeSpace(bedLengthOuter / 2 + 500, bedLengthOuter),
              threeSpace(-20, bedWidthOuter),
              -bedHeight + 10,
            ],
            [
              threeSpace(bedLengthOuter - 150, bedLengthOuter),
              threeSpace(-20, bedWidthOuter),
              -bedHeight + 10,
            ]
          ]}
          color={cableColor()}
          lineWidth={2.5} />
        <CubicBezierLine name={"powerCableFromGroundToBedEnd"}
          start={[threeSpace(bedLengthOuter - 150, bedLengthOuter), threeSpace(-20, bedWidthOuter), -bedHeight + 10]}
          midA={[threeSpace(bedLengthOuter - 100, bedLengthOuter), threeSpace(-20, bedWidthOuter), -bedHeight + 10]}
          midB={[threeSpace(bedLengthOuter - 100, bedLengthOuter), threeSpace(-20, bedWidthOuter), zGround + 10]}
          end={[threeSpace(bedLengthOuter - 50, bedLengthOuter), threeSpace(-20, bedWidthOuter), zGround + 10]}
          color={cableColor()}
          lineWidth={2.5} />
        <Line name={"powerCableFromPostToBedEnd"}
          points={[
            [
              threeSpace(bedLengthOuter - 50, bedLengthOuter),
              threeSpace(-20, bedWidthOuter),
              zGround + 10,
            ],
            [
              threeSpace(bedLengthOuter + 400, bedLengthOuter),
              threeSpace(-20, bedWidthOuter),
              zGround + 10,
            ]
          ]}
          color={cableColor()}
          lineWidth={2.5} />
        <CubicBezierLine name={"powerCableFromOutletToGround"}
          start={[threeSpace(bedLengthOuter + 400, bedLengthOuter), threeSpace(-20, bedWidthOuter), zGround + 10]}
          midA={[threeSpace(bedLengthOuter + 450, bedLengthOuter), threeSpace(-20, bedWidthOuter), zGround + 10]}
          midB={[threeSpace(bedLengthOuter + 450, bedLengthOuter), threeSpace(legSize / 2, bedWidthOuter), zGround + 250]}
          end={[threeSpace(bedLengthOuter + 550 - legSize / 2, bedLengthOuter), threeSpace(legSize / 2, bedWidthOuter), zGround + 250]}
          color={cableColor()}
          lineWidth={2.5} />
        <Box name={"powerPlug"}
          args={[plugDepth, 30, 30]}
          position={[
            threeSpace(bedLengthOuter + 600 - plugDepth / 2 - outletDepth - legSize / 2, bedLengthOuter),
            threeSpace(legSize / 2, bedWidthOuter),
            zGround + 250,
          ]}>
          <meshPhongMaterial color={cableColor()} />
        </Box>
      </group>
    </group>
  );
};
