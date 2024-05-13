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
  pan: boolean;
  bounds: boolean;
  threeAxes: boolean;
  xyDimensions: boolean;
  zDimension: boolean;
  promoInfo: boolean;
  solar: boolean;
  utilitiesPost: boolean;
  packaging: boolean;
  lab: boolean;
  people: boolean;
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
  sunInclination: 140,
  sunAzimuth: 230,
  perspective: true,
  bot: true,
  laser: false,
  tool: "rotaryTool",
  cableCarriers: true,
  viewCube: false,
  stats: false,
  config: false,
  zoom: false,
  pan: false,
  bounds: false,
  threeAxes: false,
  xyDimensions: true,
  zDimension: false,
  promoInfo: true,
  solar: true,
  utilitiesPost: true,
  packaging: false,
  lab: false,
  people: false,
};

export const STRING_KEYS = [
  "sizePreset", "bedType", "otherPreset", "label", "plants", "tool",
];

export const NUMBER_KEYS = [
  "botSizeX", "botSizeY", "botSizeZ", "bedWallThickness", "bedHeight",
  "ccSupportSize", "x", "y", "z", "beamLength", "columnLength", "zAxisLength",
  "bedXOffset", "bedYOffset", "bedZOffset", "zGantryOffset", "bedWidthOuter",
  "bedLengthOuter", "legSize", "extraLegsX", "extraLegsY", "bedBrightness",
  "soilBrightness", "soilHeight", "sunInclination", "sunAzimuth",
];

export const BOOLEAN_KEYS = [
  "legsFlush", "labels", "labelsOnHover", "ground", "grid", "axes", "trail",
  "tracks", "clouds", "perspective", "bot", "laser", "cableCarriers",
  "viewCube", "stats", "config", "zoom", "pan", "bounds", "threeAxes",
  "xyDimensions", "zDimension", "promoInfo", "solar", "utilitiesPost",
  "packaging", "lab", "people",
];

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
    plants: "",
    labels: false,
    labelsOnHover: false,
    ground: true,
    grid: false,
    axes: false,
    trail: false,
    clouds: false,
    sunInclination: 90,
    sunAzimuth: 0,
    perspective: true,
    bot: true,
    laser: false,
    tool: "",
    cableCarriers: true,
    viewCube: false,
    stats: false,
    config: false,
    zoom: true,
    pan: true,
    bounds: false,
    threeAxes: false,
    xyDimensions: false,
    zDimension: false,
    promoInfo: false,
    solar: false,
    utilitiesPost: false,
    packaging: false,
    lab: false,
    people: false,
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
    sunInclination: 30,
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
    pan: true,
    bounds: true,
    threeAxes: true,
    xyDimensions: true,
    zDimension: true,
    promoInfo: true,
    solar: true,
    utilitiesPost: true,
    packaging: true,
    lab: true,
    people: true,
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
  "threeAxes", "xyDimensions", "zDimension", "labelsOnHover", "promoInfo", "pan",
  "solar", "utilitiesPost", "packaging", "lab", "people",
];

export const modifyConfig = (config: Config, update: Partial<Config>) => {
  const newConfig: Config = { ...config, ...update };
  if (update.sizePreset) {
    const presetConfig = PRESETS[update.sizePreset];
    SIZE_CONFIG_KEYS.map(key => newConfig[key] = presetConfig[key] as never);
    if (update.sizePreset == "Jr") {
      newConfig.x = 100;
      newConfig.y = 100;
      newConfig.z = 50;
    }
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

export const KIT_LOOKUP: { [x: string]: string } = {
  "genesis": "Genesis",
  "genesis_xl": "Genesis XL",
  "jr": "Jr",
};

export const modifyConfigsFromUrlParams = (config: Config) => {
  let newConfig: Config = { ...config };
  const urlParams = new URLSearchParams(window.location.search);
  const kit = urlParams.get("kit")?.toLowerCase();
  if (kit) {
    const sizePreset = KIT_LOOKUP[kit];
    if (sizePreset && sizePreset != config.sizePreset) {
      newConfig = modifyConfig(newConfig, { sizePreset });
    }
  }
  STRING_KEYS.map(key => {
    const value = urlParams.get(key);
    if (value) {
      newConfig = modifyConfig(newConfig, { [key]: value });
    }
  });
  NUMBER_KEYS.map(key => {
    const value = urlParams.get(key);
    if (value) {
      newConfig = modifyConfig(newConfig, { [key]: parseInt(value) });
    }
  });
  BOOLEAN_KEYS.map(key => {
    const value = urlParams.get(key);
    if (value) {
      newConfig = modifyConfig(newConfig, { [key]: value == "true" });
    }
  });
  return newConfig;
};
