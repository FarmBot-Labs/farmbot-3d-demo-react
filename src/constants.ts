import { sampleSize } from "lodash";

export const ASSETS = {
  fonts: {
    cabin: "/3D/fonts/Cabin.ttf",
    cabinBold: "/3D/fonts/Cabin_Bold.ttf",
  },
  textures: {
    cloud: "/3D/textures/cloud.avif",
    grass: "/3D/textures/grass.avif",
    wood: "/3D/textures/wood.avif",
    soil: "/3D/textures/soil.avif",
    aluminum: "/3D/textures/aluminum.avif",
  },
  icons: {
    basil: "/3D/icons/thai_basil.avif",
    beet: "/3D/icons/beet.avif",
    bibbLettuce: "/3D/icons/bibb_lettuce.avif",
    bokChoy: "/3D/icons/bok_choy.avif",
    broccoli: "/3D/icons/broccoli.avif",
    carrot: "/3D/icons/carrot.avif",
    cauliflower: "/3D/icons/cauliflower.avif",
    chard: "/3D/icons/swiss_chard.avif",
    icicleRadish: "/3D/icons/icicle_radish.avif",
    rainbowChard: "/3D/icons/rainbow_chard.avif",
    redRussianKale: "/3D/icons/red_russian_kale.avif",
    snapPea: "/3D/icons/snap_pea.avif",
    spinach: "/3D/icons/spinach.avif",
  },
  shapes: {
    track: "/3D/shapes/track.svg",
    column: "/3D/shapes/column.svg",
    beam: "/3D/shapes/beam.svg",
    zAxis: "/3D/shapes/z_axis.svg",
  },
  models: {
    gantryWheelPlate: "/3D/models/gantry_wheel_plate.glb",
    leftBracket: "/3D/models/left_bracket.glb",
    rightBracket: "/3D/models/right_bracket.glb",
    crossSlide: "/3D/models/cross_slide.glb",
    beltClip: "/3D/models/belt_clip.glb",
    zStop: "/3D/models/z_stop.glb",
    utm: "/3D/models/utm.glb",
    ccHorizontal: "/3D/models/cc_horizontal.glb",
    ccVertical: "/3D/models/cc_vertical.glb",
    housingVertical: "/3D/models/housing_vertical.glb",
    motorHorizontal: "/3D/models/motor_horizontal.glb",
    motorVertical: "/3D/models/motor_vertical.glb",
    toolbay3: "/3D/models/toolbay_3.glb",
    rotaryTool: "/3D/models/rotary_tool.glb",
  }
};

interface Plant {
  label: string;
  icon: string;
  spread: number;
  size: number;
}

interface Gardens {
  [key: string]: string[];
}

export const PLANTS: Record<string, Plant> = {
  basil: { label: "Thai Basil", icon: ASSETS.icons.basil, spread: 250, size: 250 },
  beet: { label: "Beet", icon: ASSETS.icons.beet, spread: 175, size: 150 },
  bibbLettuce: { label: "Bibb Lettuce", icon: ASSETS.icons.bibbLettuce, spread: 250, size: 200 },
  bokChoy: { label: "Bok Choy", icon: ASSETS.icons.bokChoy, spread: 210, size: 160 },
  broccoli: { label: "Broccoli", icon: ASSETS.icons.broccoli, spread: 375, size: 250 },
  carrot: { label: "Carrot", icon: ASSETS.icons.carrot, spread: 150, size: 125 },
  cauliflower: { label: "Cauliflower", icon: ASSETS.icons.cauliflower, spread: 400, size: 250 },
  chard: { label: "Swiss Chard", icon: ASSETS.icons.chard, spread: 300, size: 300 },
  icicleRadish: { label: "Icicle Radish", icon: ASSETS.icons.icicleRadish, spread: 100, size: 100 },
  rainbowChard: { label: "Rainbow Chard", icon: ASSETS.icons.rainbowChard, spread: 250, size: 250 },
  redRussianKale: { label: "Red Russian Kale", icon: ASSETS.icons.redRussianKale, spread: 250, size: 200 },
  snapPea: { label: "Snap Pea", icon: ASSETS.icons.snapPea, spread: 200, size: 150 },
  spinach: { label: "Spinach", icon: ASSETS.icons.spinach, spread: 250, size: 200 },
};

export const GARDENS: Gardens = {
  spring: ["beet", "bibbLettuce", "broccoli", "carrot", "cauliflower", "rainbowChard",
  "icicleRadish", "redRussianKale", "bokChoy", "spinach", "snapPea"],
  minimal: ["chard", "basil", "bokChoy"],
  random: sampleSize(Object.keys(PLANTS), 8),
};
