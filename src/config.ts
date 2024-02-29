import { buttonGroup, useControls } from "leva";
import { pick } from "lodash";

export interface Config {
  label: string;
  botSizeX: number;
  botSizeY: number;
  botSizeZ: number;
  bedWallThickness: number;
  bedHeight: number;
  x: number;
  y: number;
  z: number;
  beamLength: number;
  bedXOffset: number;
  bedYOffset: number;
  bedZOffset: number;
  bedWidthOuter: number;
  bedLengthOuter: number;
  legSize: number;
  legsFlush: boolean;
  extraLegsX: number;
  extraLegsY: number;
  bedBrightness: number;
  soilBrightness: number;
  soilHeight: number;
  plants: number;
  labels: boolean;
  ground: boolean;
  grid: boolean;
  axes: boolean;
  trail: boolean;
  tracks: boolean;
  clouds: boolean;
  sunInclination: number;
  sunAzimuth: number;
}

const INITIAL: Config = {
  label: "FarmBot Genesis v1.7",
  botSizeX: 2900,
  botSizeY: 1400,
  botSizeZ: 400,
  bedWallThickness: 40,
  bedHeight: 300,
  x: 300,
  y: 700,
  z: 200,
  beamLength: 1500,
  bedXOffset: 50,
  bedYOffset: -50,
  bedZOffset: 0,
  bedWidthOuter: 1480,
  bedLengthOuter: 2980,
  legSize: 100,
  legsFlush: true,
  extraLegsX: 1,
  extraLegsY: 0,
  bedBrightness: 8,
  soilBrightness: 6,
  soilHeight: 500,
  plants: 20,
  labels: true,
  ground: true,
  grid: true,
  axes: true,
  trail: true,
  tracks: true,
  clouds: true,
  sunInclination: 0,
  sunAzimuth: 0,
};

export const PRESETS: Record<string, Config> = {
  "Genesis": {
    ...INITIAL,
    label: "FarmBot Genesis v1.7",
    botSizeX: 2900,
    botSizeY: 1400,
    botSizeZ: 400,
    beamLength: 1500,
    bedXOffset: 50,
    bedYOffset: -50,
    bedWidthOuter: 1480,
    bedLengthOuter: 2980,
    extraLegsX: 1,
    extraLegsY: 0,
    tracks: true,
  },
  "Genesis XL": {
    ...INITIAL,
    label: "FarmBot Genesis XL v1.7",
    botSizeX: 5900,
    botSizeY: 2900,
    botSizeZ: 400,
    beamLength: 3000,
    bedXOffset: 50,
    bedYOffset: -50,
    bedWidthOuter: 2980,
    bedLengthOuter: 5980,
    extraLegsX: 3,
    extraLegsY: 1,
    tracks: true,
  },
  "Initial": INITIAL,
  "Minimal": {
    ...INITIAL,
    bedWallThickness: 40,
    bedHeight: 300,
    x: 300,
    y: 700,
    z: 200,
    legSize: 100,
    legsFlush: false,
    bedBrightness: 8,
    soilBrightness: 6,
    soilHeight: 500,
    plants: 20,
    labels: false,
    ground: true,
    grid: false,
    axes: false,
    trail: false,
    clouds: false,
    sunInclination: 90,
    sunAzimuth: 45,
  },
};

export const useConfig = () => {
  const funcSizePreset = (preset: string) => () => {
    const presetConfig = PRESETS[preset];
    setBotSize0(pick(presetConfig, ["botSizeX", "botSizeY", "botSizeZ"]));
    setBedDim1(pick(presetConfig,
      ["bedWidthOuter", "bedLengthOuter", "extraLegsX", "extraLegsY"]));
    setBotSize1(pick(presetConfig,
      ["beamLength", "bedXOffset", "bedYOffset", "tracks"]));
    setOther(pick(presetConfig, ["label"]));

  };
  const funcOtherPreset = (preset: string) => () => {
    const presetConfig = PRESETS[preset];
    setBedDim0(pick(presetConfig, ["bedWallThickness", "bedHeight"]));
    setBedDim1(pick(presetConfig,
      ["legSize", "legsFlush", "bedBrightness", "soilBrightness", "soilHeight"]));
    setBotPosition(pick(presetConfig, ["x", "y", "z"]));
    setOther(pick(presetConfig, ["plants", "labels", "trail"]));
    setEnv(pick(presetConfig,
      ["ground", "grid", "axes", "clouds", "sunInclination", "sunAzimuth"]));
  };
  const funcResetPreset = (preset: string) => () => {
    const presetConfig = PRESETS[preset];
    funcSizePreset(preset)();
    funcOtherPreset(preset)();
    setBedDim1({ bedZOffset: presetConfig.bedZOffset });
  };
  useControls("Presets", {
    size: buttonGroup({
      "Genesis": funcSizePreset("Genesis"),
      "Genesis XL": funcSizePreset("Genesis XL"),
    }),
    bed: buttonGroup({
      "Standard": () => setBedDim1({ bedZOffset: 0 }),
      "Mobile": () => setBedDim1({ bedZOffset: 1000 }),
    }),
    other: buttonGroup({
      "Initial": funcOtherPreset("Initial"),
      "Minimal": funcOtherPreset("Minimal"),
    }),
    " ": buttonGroup({
      "Reset all": funcResetPreset("Initial"),
    }),
  });
  const init = PRESETS["Initial"];
  const [botSizeConfig0, setBotSize0] = useControls("Bot Dimensions", () => ({
    botSizeX: { value: init.botSizeX, min: 0, max: 6000, step: 1 },
    botSizeY: { value: init.botSizeY, min: 0, max: 4000, step: 1 },
    botSizeZ: { value: init.botSizeZ, min: 0, max: 1000, step: 1 },
  }));
  const [bedDimensions0, setBedDim0] = useControls("Bed Properties", () => ({
    bedWallThickness: { value: init.bedWallThickness, min: 0, max: 200, step: 1 },
    bedHeight: { value: init.bedHeight, min: 0, max: 1000, step: 1 },
  }));
  const bedMin = bedDimensions0.bedWallThickness * 2;
  const maxSoilHeight = botSizeConfig0.botSizeZ + bedDimensions0.bedHeight;
  const [bedDimensions1, setBedDim1] = useControls("Bed Properties", () => ({
    bedWidthOuter: { value: init.bedWidthOuter, min: bedMin, max: 3100, step: 1 },
    bedLengthOuter: { value: init.bedLengthOuter, min: bedMin, max: 6100, step: 1 },
    bedZOffset: { value: init.bedZOffset, min: 0, max: 1000, step: 1 },
    legSize: { value: init.legSize, min: 0, max: 200, step: 1 },
    legsFlush: { value: init.legsFlush },
    extraLegsX: { value: init.extraLegsX, min: 0, max: 10, step: 1 },
    extraLegsY: { value: init.extraLegsY, min: 0, max: 10, step: 1 },
    bedBrightness: { value: init.bedBrightness, min: 1, max: 12, step: 1 },
    soilBrightness: { value: init.soilBrightness, min: 1, max: 12, step: 1 },
    soilHeight: { value: init.soilHeight, min: 0, max: maxSoilHeight, step: 1 },
  }), [botSizeConfig0, bedDimensions0]);
  const [botPosition, setBotPosition] = useControls("Bot Position", () => ({
    x: { value: init.x, min: 0, max: botSizeConfig0.botSizeX, step: 1 },
    y: { value: init.y, min: 0, max: botSizeConfig0.botSizeY, step: 1 },
    z: { value: init.z, min: 0, max: botSizeConfig0.botSizeZ + 150, step: 1 },
  }), [botSizeConfig0]);
  const [botSizeConfig1, setBotSize1] = useControls("Bot Dimensions", () => ({
    beamLength: { value: init.beamLength, min: 100, max: 4000, step: 1 },
    bedXOffset: { value: init.bedXOffset, min: -500, max: 500, step: 1 },
    bedYOffset: { value: init.bedYOffset, min: -500, max: 500, step: 1 },
    tracks: { value: init.tracks },
  }));
  const [otherConfig, setOther] = useControls("Other", () => ({
    label: init.label,
    plants: { value: init.plants, min: 0, max: 3000, step: 1 },
    labels: { value: init.labels },
    trail: { value: init.trail },
  }));
  const [environmentConfig, setEnv] = useControls("Environment", () => ({
    ground: { value: init.ground },
    axes: { value: init.axes },
    grid: { value: init.grid },
    clouds: { value: init.clouds },
    sunInclination: { value: init.sunInclination, min: 0, max: 180, step: 1 },
    sunAzimuth: { value: init.sunAzimuth, min: 0, max: 360, step: 1 },
  }));
  const config: Config = {
    ...botSizeConfig0,
    ...bedDimensions0,
    ...bedDimensions1,
    ...botPosition,
    ...botSizeConfig1,
    ...otherConfig,
    ...environmentConfig,
  };
  return config;
};
