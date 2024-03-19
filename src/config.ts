export interface Config {
  sizePreset: string;
  bedType: string;
  otherPreset: string;
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
  labelsOnHover: boolean;
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
  viewCube: boolean;
  stats: boolean;
  config: boolean;
  zoom: boolean;
  bounds: boolean;
  threeAxes: boolean;
  xyDimensions: boolean;
  zDimension: boolean;
}

export const INITIAL: Config = {
  sizePreset: "Genesis",
  bedType: "Standard",
  otherPreset: "Initial",
  label: "FarmBot Genesis v1.7",
  botSizeX: 2720,
  botSizeY: 1230,
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
  bedYOffset: 60,
  bedZOffset: 0,
  zGantryOffset: 140,
  bedWidthOuter: 1360,
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
  labelsOnHover: false,
  ground: true,
  grid: true,
  axes: false,
  trail: false,
  tracks: true,
  clouds: true,
  sunInclination: 90,
  sunAzimuth: 45,
  perspective: true,
  bot: true,
  laser: false,
  tool: "rotaryTool",
  cableCarriers: true,
  viewCube: false,
  stats: false,
  config: false,
  zoom: false,
  bounds: false,
  threeAxes: false,
  xyDimensions: true,
  zDimension: false,
};

export const PRESETS: Record<string, Config> = {
  "Jr": {
    ...INITIAL,
    sizePreset: "Jr",
    bedType: "Standard",
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
    sizePreset: "Genesis",
    bedType: "Standard",
    label: "FarmBot Genesis v1.7",
    botSizeX: 2720,
    botSizeY: 1230,
    botSizeZ: 500,
    beamLength: 1500,
    columnLength: 500,
    zAxisLength: 1000,
    bedXOffset: 140,
    bedYOffset: 60,
    zGantryOffset: 140,
    bedWidthOuter: 1360,
    bedLengthOuter: 3000,
    extraLegsX: 1,
    extraLegsY: 0,
    soilHeight: 500,
    tracks: true,
  },
  "Genesis XL": {
    ...INITIAL,
    sizePreset: "Genesis XL",
    bedType: "Standard",
    label: "FarmBot Genesis XL v1.7",
    botSizeX: 5720,
    botSizeY: 2730,
    botSizeZ: 500,
    beamLength: 3000,
    columnLength: 500,
    zAxisLength: 1000,
    bedXOffset: 140,
    bedYOffset: 60,
    zGantryOffset: 140,
    bedWidthOuter: 2860,
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
    labelsOnHover: false,
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
    viewCube: false,
    stats: false,
    config: false,
    zoom: false,
    bounds: false,
    threeAxes: false,
    xyDimensions: false,
    zDimension: false,
  },
  "Maximal": {
    ...INITIAL,
    bedWallThickness: 40,
    bedHeight: 300,
    x: 300,
    y: 200,
    z: 200,
    ccSupportSize: 50,
    legSize: 100,
    legsFlush: true,
    bedBrightness: 8,
    soilBrightness: 6,
    plants: "Spring",
    labels: true,
    labelsOnHover: false,
    ground: true,
    grid: true,
    axes: true,
    trail: true,
    clouds: true,
    sunInclination: 90,
    sunAzimuth: 45,
    perspective: true,
    bot: true,
    laser: true,
    tool: "",
    cableCarriers: true,
    viewCube: true,
    stats: true,
    config: true,
    zoom: true,
    bounds: true,
    threeAxes: true,
    xyDimensions: true,
    zDimension: true,
  },
};

const SIZE_CONFIG_KEYS: (keyof Config)[] = [
  "sizePreset", "label", "bedType",
  "botSizeX", "botSizeY", "botSizeZ", "beamLength", "columnLength", "zAxisLength",
  "bedXOffset", "bedYOffset", "zGantryOffset", "bedWidthOuter", "bedLengthOuter",
  "extraLegsX", "extraLegsY", "soilHeight", "tracks",
];

const OTHER_CONFIG_KEYS: (keyof Config)[] = [
  "bedWallThickness", "bedHeight", "x", "y", "z",
  "ccSupportSize", "legSize", "legsFlush",
  "bedBrightness", "soilBrightness", "plants", "labels", "ground", "grid", "axes",
  "trail", "clouds", "sunInclination", "sunAzimuth", "perspective", "bot", "laser",
  "tool", "cableCarriers", "viewCube", "stats", "config", "zoom", "bounds",
  "threeAxes", "xyDimensions", "zDimension",
];

export const modifyConfig = (config: Config, update: Partial<Config>) => {
  const newConfig: Config = { ...config, ...update };
  if (update.sizePreset) {
    const presetConfig = PRESETS[update.sizePreset];
    SIZE_CONFIG_KEYS.map(key => newConfig[key] = presetConfig[key] as never);
  }
  if (update.bedType || (newConfig.bedType != config.bedType)) {
    newConfig.bedZOffset = update.bedType == "Mobile" ? 500 : 0;
    newConfig.legsFlush = update.bedType == "Mobile" ? false : true;
  }
  if (update.otherPreset) {
    if (update.otherPreset == "Reset all") {
      Object.keys(config).map(key => {
        const configKey = key as keyof Config;
        newConfig[configKey] = INITIAL[configKey] as never;
      })
    } else {
      const presetConfig = PRESETS[update.otherPreset];
      OTHER_CONFIG_KEYS.map(key => newConfig[key] = presetConfig[key] as never);
    }
  }
  return newConfig;
};
