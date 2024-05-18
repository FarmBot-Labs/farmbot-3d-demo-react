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
      100,
    ],
    camera: {
      position: [
        100,
        -200,
        700,
      ],
      target: [
        0,
        0,
        -100,
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
        600,
        0,
        100,
      ],
      target: [
        0,
        0,
        -100,
      ],
    },
  },
  {
    label: "Universal Tool Mounting",
    info: "UTM",
    position: [
      threeSpace(config.x, config.bedLengthOuter) + config.bedXOffset,
      threeSpace(config.y, config.bedWidthOuter) + config.bedYOffset,
      zZero(config) + zDir * config.z + 100,
    ],
    camera: {
      position: [
        50,
        0,
        -100,
      ],
      target: [
        0,
        0,
        -100,
      ],
    },
  },
  {
    label: "Electronics",
    info: "Farmduino and Raspberry Pi",
    position: [
      threeSpace(config.x, config.bedLengthOuter) + config.bedXOffset - 200,
      threeSpace(-100, config.bedWidthOuter),
      config.columnLength - 200,
    ],
    camera: {
      position: [
        400,
        -600,
        0,
      ],
      target: [
        150,
        -50,
        0,
      ],
    },
  },
  {
    label: "What you need to provide",
    info: "Internet, water, and power",
    position: [
      threeSpace(config.bedLengthOuter + 700, config.bedLengthOuter),
      threeSpace(0, config.bedWidthOuter),
      200 - config.bedZOffset - config.bedHeight,
    ],
    camera: {
      position: [
        -100,
        -700,
        200,
      ],
      target: [
        -100,
        0,
        0,],
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
