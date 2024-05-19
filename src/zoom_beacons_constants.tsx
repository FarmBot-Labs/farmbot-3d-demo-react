import { findIndex } from "lodash";
import { Config } from "./config";
import { threeSpace, zDir, zZero } from "./helpers";

export type VectorXyz = [x: number, y: number, z: number];

interface Focus {
  label: string;
  info: string;
  position: VectorXyz;
  camera: {
    position: VectorXyz;
    target: VectorXyz;
  };
}

export const FOCI = (config: Config): Focus[] => [
  {
    label: "What you can grow",
    info: "Plants",
    position: [
      threeSpace(config.bedLengthOuter / 2, config.bedLengthOuter),
      threeSpace(config.bedWidthOuter / 2, config.bedWidthOuter),
      150,
    ],
    camera: {
      position: [
        0,
        0,
        config.sizePreset == "Genesis XL" ? 6000 : 3000,
      ],
      target: [
        0,
        0,
        0,
      ],
    },
  },
  {
    label: "Included tools",
    info: "Watering Nozzle, Seeder, Soil Sensor, Weeder",
    position: [
      threeSpace(0, config.bedLengthOuter),
      threeSpace(config.bedWidthOuter / 2, config.bedWidthOuter),
      100,
    ],
    camera: {
      position: [
        450,
        -450,
        125,
      ],
      target: [
        0,
        0,
        -125,
      ],
    },
  },
  {
    label: "Universal Tool Mounting",
    info: "UTM",
    position: [
      threeSpace(config.x, config.bedLengthOuter) + config.bedXOffset,
      threeSpace(config.y + 150, config.bedWidthOuter) + config.bedYOffset,
      zZero(config) + zDir * config.z,
    ],
    camera: {
      position: [
        200,
        -100,
        0,
      ],
      target: [
        0,
        -150,
        -25,
      ],
    },
  },
  {
    label: "Electronics",
    info: "Farmduino and Raspberry Pi",
    position: [
      threeSpace(config.x, config.bedLengthOuter) + config.bedXOffset - 50,
      threeSpace(-200, config.bedWidthOuter),
      config.columnLength - 150,
    ],
    camera: {
      position: [
        75,
        -150,
        125,
      ],
      target: [
        0,
        100,
        -25,
      ],
    },
  },
  {
    label: "What you need to provide",
    info: "Internet, water, and power",
    position: [
      threeSpace(config.bedLengthOuter + 700, config.bedLengthOuter),
      threeSpace(config.legSize / 2, config.bedWidthOuter),
      250 - config.bedZOffset - config.bedHeight,
    ],
    camera: {
      position: [
        -500,
        -700,
        300,
      ],
      target: [
        -100,
        0,
        -75,],
    },
  },
];

// eslint-disable-next-line react-refresh/only-export-components
export const getFocus = (config: Config, activeFocus: string) =>
  FOCI(config)[findIndex(FOCI(config), ["label", activeFocus])];

// eslint-disable-next-line react-refresh/only-export-components
export const getCamera = (
  config: Config,
  activeFocus: string,
  fallback: { position: VectorXyz, target: VectorXyz },
): { position: VectorXyz, target: VectorXyz } => {
  const focus = getFocus(config, activeFocus);
  return focus
    ? {
      position: [
        focus.position[0] + focus.camera.position[0],
        focus.position[1] + focus.camera.position[1],
        focus.position[2] + focus.camera.position[2],
      ],
      target: [
        focus.position[0] + focus.camera.target[0],
        focus.position[1] + focus.camera.target[1],
        focus.position[2] + focus.camera.target[2],
      ]
    }
    : fallback;
};
