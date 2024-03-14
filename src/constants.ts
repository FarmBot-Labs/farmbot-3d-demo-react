// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { sampleSize } from "lodash";
import cabin from "/3D/fonts/Cabin.ttf";
import cabinBold from "/3D/fonts/Cabin_Bold.ttf";
import cloud from "/3D/textures/cloud.avif";
import grass from "/3D/textures/grass.avif";
import wood from "/3D/textures/wood.avif";
import soil from "/3D/textures/soil.avif";
import aluminum from "/3D/textures/aluminum.avif";
import anaheimPepper from "/3D/icons/anaheim_pepper.avif";
import basil from "/3D/icons/basil.avif";
import beet from "/3D/icons/beet.avif";
import bibbLettuce from "/3D/icons/bibb_lettuce.avif";
import bokChoy from "/3D/icons/bok_choy.avif";
import broccoli from "/3D/icons/broccoli.avif";
import carrot from "/3D/icons/carrot.avif";
import cauliflower from "/3D/icons/cauliflower.avif";
import chard from "/3D/icons/swiss_chard.avif";
import cucumber from "/3D/icons/cucumber.avif";
import eggplant from "/3D/icons/eggplant.avif";
import hillbillyTomato from "/3D/icons/hillbilly_tomato.avif";
import icicleRadish from "/3D/icons/icicle_radish.avif";
import okra from "/3D/icons/okra.avif";
import rainbowChard from "/3D/icons/rainbow_chard.avif";
import redBellPepper from "/3D/icons/red_bell_pepper.avif";
import redRussianKale from "/3D/icons/red_russian_kale.avif";
import runnerBean from "/3D/icons/runner_bean.avif";
import snapPea from "/3D/icons/snap_pea.avif";
import spinach from "/3D/icons/spinach.avif";
import sweetPotato from "/3D/icons/sweet_potato.avif";
import zucchini from "/3D/icons/zucchini.avif";
import track from "/3D/shapes/track.svg";
import column from "/3D/shapes/column.svg";
import beam from "/3D/shapes/beam.svg";
import zAxis from "/3D/shapes/z_axis.svg";
import gantryWheelPlate from "/3D/models/gantry_wheel_plate.glb";
import leftBracket from "/3D/models/left_bracket.glb";
import rightBracket from "/3D/models/right_bracket.glb";
import crossSlide from "/3D/models/cross_slide.glb";
import beltClip from "/3D/models/belt_clip.glb";
import zStop from "/3D/models/z_stop.glb";
import utm from "/3D/models/utm.glb";
import ccHorizontal from "/3D/models/cc_horizontal.glb";
import ccVertical from "/3D/models/cc_vertical.glb";
import housingVertical from "/3D/models/housing_vertical.glb";
import motorHorizontal from "/3D/models/motor_horizontal.glb";
import motorVertical from "/3D/models/motor_vertical.glb";
import toolbay3 from "/3D/models/toolbay_3.glb";
import rotaryTool from "/3D/models/rotary_tool.glb";


export const ASSETS = {
  fonts: {
    cabin,
    cabinBold,
  },
  textures: {
    cloud,
    grass,
    wood,
    soil,
    aluminum,
  },
  icons: {
    anaheimPepper,
    basil,
    beet,
    bibbLettuce,
    bokChoy,
    broccoli,
    carrot,
    cauliflower,
    chard,
    cucumber,
    eggplant,
    hillbillyTomato,
    icicleRadish,
    okra,
    rainbowChard,
    redBellPepper,
    redRussianKale,
    runnerBean,
    snapPea,
    spinach,
    sweetPotato,
    zucchini,
  },
  shapes: {
    track,
    column,
    beam,
    zAxis,
  },
  models: {
    gantryWheelPlate,
    leftBracket,
    rightBracket,
    crossSlide,
    beltClip,
    zStop,
    utm,
    ccHorizontal,
    ccVertical,
    housingVertical,
    motorHorizontal,
    motorVertical,
    toolbay3,
    rotaryTool,
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
  anaheimPepper: { label: "Anaheim Pepper", icon: ASSETS.icons.anaheimPepper, spread: 400, size: 150 },
  basil: { label: "Basil", icon: ASSETS.icons.basil, spread: 250, size: 160 },
  beet: { label: "Beet", icon: ASSETS.icons.beet, spread: 175, size: 150 },
  bibbLettuce: { label: "Bibb Lettuce", icon: ASSETS.icons.bibbLettuce, spread: 250, size: 200 },
  bokChoy: { label: "Bok Choy", icon: ASSETS.icons.bokChoy, spread: 210, size: 160 },
  broccoli: { label: "Broccoli", icon: ASSETS.icons.broccoli, spread: 375, size: 250 },
  carrot: { label: "Carrot", icon: ASSETS.icons.carrot, spread: 150, size: 125 },
  cauliflower: { label: "Cauliflower", icon: ASSETS.icons.cauliflower, spread: 400, size: 250 },
  chard: { label: "Swiss Chard", icon: ASSETS.icons.chard, spread: 300, size: 300 },
  cucumber: { label: "Cucumber", icon: ASSETS.icons.cucumber, spread: 400, size: 200 },
  eggplant: { label: "Eggplant", icon: ASSETS.icons.eggplant, spread: 400, size: 200 },
  hillbillyTomato: { label: "Hillbilly Tomato", icon: ASSETS.icons.hillbillyTomato, spread: 400, size: 200 },
  icicleRadish: { label: "Icicle Radish", icon: ASSETS.icons.icicleRadish, spread: 100, size: 100 },
  okra: { label: "Okra", icon: ASSETS.icons.okra, spread: 400, size: 200 },
  rainbowChard: { label: "Rainbow Chard", icon: ASSETS.icons.rainbowChard, spread: 250, size: 250 },
  redBellPepper: { label: "Red Bell Pepper", icon: ASSETS.icons.redBellPepper, spread: 350, size: 200 },
  redRussianKale: { label: "Red Russian Kale", icon: ASSETS.icons.redRussianKale, spread: 250, size: 200 },
  runnerBean: { label: "Runner Bean", icon: ASSETS.icons.runnerBean, spread: 350, size: 200 },
  snapPea: { label: "Snap Pea", icon: ASSETS.icons.snapPea, spread: 200, size: 150 },
  spinach: { label: "Spinach", icon: ASSETS.icons.spinach, spread: 250, size: 200 },
  sweetPotato: { label: "Sweet Potato", icon: ASSETS.icons.sweetPotato, spread: 400, size: 180 },
  zucchini: { label: "Zucchini", icon: ASSETS.icons.zucchini, spread: 400, size: 250 },
};

export const GARDENS: Gardens = {
  spring: ["beet", "bibbLettuce", "broccoli", "carrot", "cauliflower", "rainbowChard",
    "icicleRadish", "redRussianKale", "bokChoy", "spinach", "snapPea"],
  summer: ["anaheimPepper", "basil", "cucumber", "eggplant", "hillbillyTomato", "okra",
    "redBellPepper", "runnerBean", "sweetPotato", "zucchini"],
  minimal: sampleSize(Object.keys(PLANTS), 2),
  random: sampleSize(Object.keys(PLANTS), 10),
};
