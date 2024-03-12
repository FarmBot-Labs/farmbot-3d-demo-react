import { random, range, sample } from "lodash";

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
    chard: "/3D/icons/swiss_chard.avif",
    basil: "/3D/icons/thai_basil.avif",
    bokChoy: "/3D/icons/bok_choy.avif",
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

export const PLANTS = [
  { label: "Swiss Chard", icon: ASSETS.icons.chard },
  { label: "Thai Basil", icon: ASSETS.icons.basil },
  { label: "Bok Choy", icon: ASSETS.icons.bokChoy },
];

export const GARDENS: { [x: string]: { plant: string, x: number, y: number }[] } = {
  rows: [
    { plant: "Swiss Chard", x: -1000, y: -1000 },
    ...range(15).map(i => ({ plant: "Swiss Chard", x: 300 + 400 * i, y: 200 })),
    ...range(15).map(i => ({ plant: "Thai Basil", x: 300 + 400 * i, y: 600 })),
    ...range(15).map(i => ({ plant: "Bok Choy", x: 300 + 400 * i, y: 1000 })),
    ...range(15).map(i => ({ plant: "Swiss Chard", x: 300 + 400 * i, y: 1400 })),
    ...range(15).map(i => ({ plant: "Thai Basil", x: 300 + 400 * i, y: 1800 })),
    ...range(15).map(i => ({ plant: "Bok Choy", x: 300 + 400 * i, y: 2200 })),
    ...range(15).map(i => ({ plant: "Swiss Chard", x: 300 + 400 * i, y: 2600 })),
  ],
  random: range(100).map(() => ({
    plant: sample(PLANTS.map(plant => plant.label)) as string,
    x: random(0, 6000),
    y: random(0, 3000),
  })),
};
