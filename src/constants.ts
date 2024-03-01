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
  }
};

export const PLANTS = [
  { label: "Swiss Chard", icon: ASSETS.icons.chard },
  { label: "Thai Basil", icon: ASSETS.icons.basil },
  { label: "Bok Choy", icon: ASSETS.icons.bokChoy },
];
