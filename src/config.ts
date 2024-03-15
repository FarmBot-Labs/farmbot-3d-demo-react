import { buttonGroup, useControls } from "leva";
import { pick } from "lodash";

export interface Config {
  label: string;
  botSizeX: number;
  botSizeY: number;
  botSizeZ: number;
  bedWallThickness: number;
  bedHeight: number;
  ccSupportSize: number;
  x: number;
  y: number;
  z: number;
  beamLength: number;
  columnLength: number;
  zAxisLength: number;
  bedXOffset: number;
  bedYOffset: number;
  bedZOffset: number;
  zGantryOffset: number;
  bedWidthOuter: number;
  bedLengthOuter: number;
  legSize: number;
  legsFlush: boolean;
  extraLegsX: number;
  extraLegsY: number;
  bedBrightness: number;
  soilBrightness: number;
  soilHeight: number;
  plants: string;
  labels: boolean;
  ground: boolean;
  grid: boolean;
  axes: boolean;
  trail: boolean;
  tracks: boolean;
  clouds: boolean;
  sunInclination: number;
  sunAzimuth: number;
  perspective: boolean;
  bot: boolean;
  laser: boolean;
  tool: string;
  cableCarriers: boolean;
}

const INITIAL: Config = {
  label: "FarmBot Genesis v1.7",
  botSizeX: 2720,
  botSizeY: 1220,
  botSizeZ: 500,
  bedWallThickness: 40,
  bedHeight: 300,
  ccSupportSize: 50,
  x: 300,
  y: 700,
  z: 200,
  beamLength: 1500,
  columnLength: 500,
  zAxisLength: 1000,
  bedXOffset: 140,
  bedYOffset: 80,
  bedZOffset: 0,
  zGantryOffset: 140,
  bedWidthOuter: 1400,
  bedLengthOuter: 3000,
  legSize: 100,
  legsFlush: true,
  extraLegsX: 1,
  extraLegsY: 0,
  bedBrightness: 8,
  soilBrightness: 6,
  soilHeight: 500,
  plants: "Spring",
  labels: false,
  ground: true,
  grid: true,
  axes: false,
  trail: true,
  tracks: true,
  clouds: true,
  sunInclination: 90,
  sunAzimuth: 45,
  perspective: true,
  bot: true,
  laser: false,
  tool: "rotaryTool",
  cableCarriers: true,
};

export const PRESETS: Record<string, Config> = {
  "Jr": {
    ...INITIAL,
    label: "FarmBot Jr",
    botSizeX: 620,
    botSizeY: 220,
    botSizeZ: 250,
    beamLength: 550,
    columnLength: 300,
    zAxisLength: 750,
    bedXOffset: 140,
    bedYOffset: 80,
    zGantryOffset: 140,
    bedWidthOuter: 400,
    bedLengthOuter: 900,
    extraLegsX: 0,
    extraLegsY: 0,
    soilHeight: 280,
    tracks: true,
  },
  "Genesis": {
    ...INITIAL,
    label: "FarmBot Genesis v1.7",
    botSizeX: 2720,
    botSizeY: 1220,
    botSizeZ: 500,
    beamLength: 1500,
    columnLength: 500,
    zAxisLength: 1000,
    bedXOffset: 140,
    bedYOffset: 80,
    zGantryOffset: 140,
    bedWidthOuter: 1400,
    bedLengthOuter: 3000,
    extraLegsX: 1,
    extraLegsY: 0,
    soilHeight: 500,
    tracks: true,
  },
  "Genesis XL": {
    ...INITIAL,
    label: "FarmBot Genesis XL v1.7",
    botSizeX: 5720,
    botSizeY: 2720,
    botSizeZ: 500,
    beamLength: 3000,
    columnLength: 500,
    zAxisLength: 1000,
    bedXOffset: 140,
    bedYOffset: 80,
    zGantryOffset: 140,
    bedWidthOuter: 2900,
    bedLengthOuter: 6000,
    extraLegsX: 3,
    extraLegsY: 1,
    soilHeight: 500,
    tracks: true,
  },
  "Initial": INITIAL,
  "Minimal": {
    ...INITIAL,
    bedWallThickness: 40,
    bedHeight: 300,
    x: 300,
    y: 200,
    z: 200,
    ccSupportSize: 50,
    legSize: 100,
    legsFlush: false,
    bedBrightness: 8,
    soilBrightness: 6,
    plants: "Spring",
    labels: false,
    ground: true,
    grid: false,
    axes: false,
    trail: false,
    clouds: false,
    sunInclination: 90,
    sunAzimuth: 45,
    perspective: true,
    bot: true,
    laser: false,
    tool: "",
    cableCarriers: true,
  },
};

interface UseConfig {
  config: Config;
  choosePreset(preset: string): () => void;
  setBedType(preset: string): () => void;
  setPlants(preset: string): () => void;
}

export const useConfig = (): UseConfig => {
  const funcSizePreset = (preset: string) => () => {
    const presetConfig = PRESETS[preset];
    setBotSize0(pick(presetConfig, ["botSizeX", "botSizeY", "botSizeZ"]));
    setBedDim1(pick(presetConfig, [
      "bedWidthOuter", "bedLengthOuter", "extraLegsX", "extraLegsY", "soilHeight",
    ]));
    setBotSize1(pick(presetConfig, [
      "beamLength", "columnLength", "zAxisLength", "bedXOffset", "bedYOffset",
      "tracks", "zGantryOffset",
    ]));
    setOther(pick(presetConfig, ["label"]));

  };
  const funcOtherPreset = (preset: string) => () => {
    const presetConfig = PRESETS[preset];
    setBedDim0(pick(presetConfig, ["bedWallThickness", "bedHeight"]));
    setBedDim1(pick(presetConfig, [
      "ccSupportSize", "legSize", "legsFlush", "bedBrightness", "soilBrightness",
    ]));
    setBotPosition(pick(presetConfig, ["x", "y", "z"]));
    setOther(pick(presetConfig, [
      "plants", "labels", "trail", "perspective", "bot", "laser", "tool",
      "cableCarriers",
    ]));
    setEnv(pick(presetConfig,
      ["ground", "grid", "axes", "clouds", "sunInclination", "sunAzimuth"]));
  };
  const funcResetPreset = (preset: string) => () => {
    const presetConfig = PRESETS[preset];
    funcSizePreset(preset)();
    funcOtherPreset(preset)();
    setBedDim1({ bedZOffset: presetConfig.bedZOffset });
  };
  const setTool = (tool: string) => () => setOther({ tool });
  const setPlants = (plants: string) => () => setOther({ plants });
  const setBedType = (bedType: string) => () => setBedDim1({
    bedZOffset: bedType == "Mobile" ? 500 : 0,
    legsFlush: bedType == "Mobile" ? false : true,
  });
  useControls("Presets", {
    size: buttonGroup({
      "Jr": funcSizePreset("Jr"),
      "Genesis": funcSizePreset("Genesis"),
      "XL": funcSizePreset("Genesis XL"),
    }),
    bed: buttonGroup({
      "Standard": setBedType("Standard"),
      "Mobile": setBedType("Mobile"),
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
  const [bedDimensions1, setBedDim1] = useControls("Bed Properties", () => ({
    ccSupportSize: { value: init.ccSupportSize, min: 0, max: 200, step: 1 },
    bedWidthOuter: { value: init.bedWidthOuter, min: bedMin, max: 3100, step: 1 },
    bedLengthOuter: { value: init.bedLengthOuter, min: bedMin, max: 6100, step: 1 },
    bedZOffset: { value: init.bedZOffset, min: 0, max: 1000, step: 1 },
    legSize: { value: init.legSize, min: 0, max: 200, step: 1 },
    legsFlush: { value: init.legsFlush },
    extraLegsX: { value: init.extraLegsX, min: 0, max: 10, step: 1 },
    extraLegsY: { value: init.extraLegsY, min: 0, max: 10, step: 1 },
    bedBrightness: { value: init.bedBrightness, min: 1, max: 12, step: 1 },
    soilBrightness: { value: init.soilBrightness, min: 1, max: 12, step: 1 },
    soilHeight: { value: init.soilHeight, min: 0, max: 1000, step: 1 },
  }), [botSizeConfig0, bedDimensions0]);
  const [botPosition, setBotPosition] = useControls("Bot Position", () => ({
    x: { value: init.x, min: 0, max: botSizeConfig0.botSizeX, step: 1 },
    y: { value: init.y, min: 0, max: botSizeConfig0.botSizeY, step: 1 },
    z: { value: init.z, min: 0, max: botSizeConfig0.botSizeZ, step: 1 },
  }), [botSizeConfig0]);
  const [botSizeConfig1, setBotSize1] = useControls("Bot Dimensions", () => ({
    beamLength: { value: init.beamLength, min: 100, max: 4000, step: 1 },
    columnLength: { value: init.columnLength, min: 100, max: 1000, step: 1 },
    zAxisLength: { value: init.zAxisLength, min: 100, max: 2000, step: 1 },
    bedXOffset: { value: init.bedXOffset, min: -500, max: 500, step: 1 },
    bedYOffset: { value: init.bedYOffset, min: -1500, max: 1500, step: 1 },
    zGantryOffset: { value: init.zGantryOffset, min: 0, max: 500, step: 1 },
    tracks: { value: init.tracks },
  }));
  const [otherConfig, setOther] = useControls("Other", () => ({
    label: init.label,
    plants: init.plants,
    garden: buttonGroup({
      "Spring": setPlants("Spring"),
      "Summer": setPlants("Summer"),
      "Fall": setPlants("Fall"),
    }),
    " ": buttonGroup({
      "Winter": setPlants("Winter"),
      "Random": setPlants("Random"),
      "None": setPlants(""),
    }),
    labels: { value: init.labels },
    trail: { value: init.trail },
    perspective: { value: init.perspective },
    bot: { value: init.bot },
    laser: { value: init.laser },
    tool: init.tool,
    toolSelect: buttonGroup({
      "Rotary Tool": setTool("rotaryTool"),
      "None": setTool(""),
    }),
    cableCarriers: { value: init.cableCarriers },
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
  return { config, choosePreset: funcSizePreset, setPlants, setBedType };
};
