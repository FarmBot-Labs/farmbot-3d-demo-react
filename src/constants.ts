// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { sampleSize } from "lodash";
import cabin from "/3D/fonts/Cabin.ttf";
import cabinBold from "/3D/fonts/Cabin_Bold.ttf";
import inknut from "/3D/fonts/InknutAntiqua-Bold.ttf";
import cloud from "/3D/textures/cloud.avif";
import grass from "/3D/textures/grass.avif";
import wood from "/3D/textures/wood.avif";
import soil from "/3D/textures/soil.avif";
import aluminum from "/3D/textures/aluminum.avif";
import concrete from "/3D/textures/concrete.avif";
import screen from "/3D/textures/screen.avif";
import anaheimPepper from "/3D/icons/anaheim_pepper.avif";
import arugula from "/3D/icons/arugula.avif";
import basil from "/3D/icons/basil.avif";
import beet from "/3D/icons/beet.avif";
import bibbLettuce from "/3D/icons/bibb_lettuce.avif";
import bokChoy from "/3D/icons/bok_choy.avif";
import broccoli from "/3D/icons/broccoli.avif";
import brusselsSprout from "/3D/icons/brussels_sprout.avif";
import carrot from "/3D/icons/carrot.avif";
import cauliflower from "/3D/icons/cauliflower.avif";
import celery from "/3D/icons/celery.avif";
import chard from "/3D/icons/swiss_chard.avif";
import cherryBelleRadish from "/3D/icons/cherry_belle_radish.avif";
import cilantro from "/3D/icons/cilantro.avif";
import collardGreens from "/3D/icons/collard_greens.avif";
import cucumber from "/3D/icons/cucumber.avif";
import eggplant from "/3D/icons/eggplant.avif";
import frenchBreakfastRadish from "/3D/icons/french_breakfast_radish.avif";
import garlic from "/3D/icons/garlic.avif";
import goldenBeet from "/3D/icons/golden_beet.avif";
import hillbillyTomato from "/3D/icons/hillbilly_tomato.avif";
import icicleRadish from "/3D/icons/icicle_radish.avif";
import lacinatoKale from "/3D/icons/lacinato_kale.avif";
import leek from "/3D/icons/leek.avif";
import napaCabbage from "/3D/icons/napa_cabbage.avif";
import okra from "/3D/icons/okra.avif";
import parsnip from "/3D/icons/parsnip.avif";
import rainbowChard from "/3D/icons/rainbow_chard.avif";
import redBellPepper from "/3D/icons/red_bell_pepper.avif";
import redCurlyKale from "/3D/icons/red_curly_kale.avif";
import redRussianKale from "/3D/icons/red_russian_kale.avif";
import runnerBean from "/3D/icons/runner_bean.avif";
import rutabaga from "/3D/icons/rutabaga.avif";
import savoyCabbage from "/3D/icons/savoy_cabbage.avif";
import shallot from "/3D/icons/shallot.avif";
import snapPea from "/3D/icons/snap_pea.avif";
import spinach from "/3D/icons/spinach.avif";
import sweetPotato from "/3D/icons/sweet_potato.avif";
import turmeric from "/3D/icons/turmeric.avif";
import turnip from "/3D/icons/turnip.avif";
import yellowOnion from "/3D/icons/yellow_onion.avif";
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
import seeder from "/3D/models/seeder.glb";
import seedTray from "/3D/models/seed_tray.glb";
import seedBin from "/3D/models/seed_bin.glb";
import seedTroughAssembly from "/3D/models/seed_trough_assembly.glb";
import seedTroughHolder from "/3D/models/seed_trough_holder.glb";
import soilSensor from "/3D/models/soil_sensor.glb";
import wateringNozzle from "/3D/models/watering_nozzle.glb";
import vacuumPump from "/3D/models/vacuum_pump.glb";
import vacuumPumpCover from "/3D/models/vacuum_pump_cover.glb";
import pi from "/3D/models/pi.glb";
import farmduino from "/3D/models/farmduino.glb";
import cameraMountHalf from "/3D/models/camera_mount_half.glb";
import shaftCoupler from "/3D/models/shaft_coupler.glb";
import solenoid from "/3D/models/solenoid.glb";
import xAxisCCMount from "/3D/models/x_axis_cc_mount.glb";
import gear from "/gear.svg";
import person1 from "/3D/people/person_1.avif";
import person1Flipped from "/3D/people/person_1_flipped.avif";
import person2 from "/3D/people/person_2.avif";
import person2Flipped from "/3D/people/person_2_flipped.avif";


export const ASSETS = {
  fonts: {
    cabin,
    cabinBold,
    inknut,
  },
  textures: {
    cloud,
    grass,
    wood,
    soil,
    aluminum,
    concrete,
    screen,
  },
  icons: {
    anaheimPepper,
    arugula,
    basil,
    beet,
    bibbLettuce,
    bokChoy,
    broccoli,
    brusselsSprout,
    carrot,
    cauliflower,
    celery,
    chard,
    cherryBelleRadish,
    cilantro,
    collardGreens,
    cucumber,
    eggplant,
    frenchBreakfastRadish,
    garlic,
    goldenBeet,
    hillbillyTomato,
    icicleRadish,
    lacinatoKale,
    leek,
    napaCabbage,
    okra,
    parsnip,
    rainbowChard,
    redBellPepper,
    redCurlyKale,
    redRussianKale,
    runnerBean,
    rutabaga,
    savoyCabbage,
    shallot,
    snapPea,
    spinach,
    sweetPotato,
    turmeric,
    turnip,
    yellowOnion,
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
    seeder,
    seedTray,
    seedBin,
    seedTroughAssembly,
    seedTroughHolder,
    soilSensor,
    wateringNozzle,
    vacuumPump,
    vacuumPumpCover,
    pi,
    farmduino,
    cameraMountHalf,
    shaftCoupler,
    solenoid,
    xAxisCCMount,
  },
  other: {
    gear,
  },
  people: {
    person1,
    person1Flipped,
    person2,
    person2Flipped,
  },
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
  arugula: { label: "Arugula", icon: ASSETS.icons.arugula, spread: 250, size: 180 },
  basil: { label: "Basil", icon: ASSETS.icons.basil, spread: 250, size: 160 },
  beet: { label: "Beet", icon: ASSETS.icons.beet, spread: 175, size: 150 },
  bibbLettuce: { label: "Bibb Lettuce", icon: ASSETS.icons.bibbLettuce, spread: 250, size: 200 },
  bokChoy: { label: "Bok Choy", icon: ASSETS.icons.bokChoy, spread: 210, size: 160 },
  broccoli: { label: "Broccoli", icon: ASSETS.icons.broccoli, spread: 375, size: 250 },
  brusselsSprout: { label: "Brussels Sprout", icon: ASSETS.icons.brusselsSprout, spread: 300, size: 250 },
  carrot: { label: "Carrot", icon: ASSETS.icons.carrot, spread: 150, size: 125 },
  cauliflower: { label: "Cauliflower", icon: ASSETS.icons.cauliflower, spread: 400, size: 250 },
  celery: { label: "Celery", icon: ASSETS.icons.celery, spread: 350, size: 200 },
  chard: { label: "Swiss Chard", icon: ASSETS.icons.chard, spread: 300, size: 300 },
  cherryBelleRadish: { label: "Cherry Belle Radish", icon: ASSETS.icons.cherryBelleRadish, spread: 100, size: 100 },
  cilantro: { label: "Cilantro", icon: ASSETS.icons.cilantro, spread: 180, size: 150 },
  collardGreens: { label: "Collard Greens", icon: ASSETS.icons.collardGreens, spread: 230, size: 230 },
  cucumber: { label: "Cucumber", icon: ASSETS.icons.cucumber, spread: 400, size: 200 },
  eggplant: { label: "Eggplant", icon: ASSETS.icons.eggplant, spread: 400, size: 200 },
  frenchBreakfastRadish: { label: "French Breakfast Radish", icon: ASSETS.icons.frenchBreakfastRadish, spread: 100, size: 100 },
  garlic: { label: "Garlic", icon: ASSETS.icons.garlic, spread: 175, size: 100 },
  goldenBeet: { label: "Golden Beet", icon: ASSETS.icons.goldenBeet, spread: 175, size: 150 },
  hillbillyTomato: { label: "Hillbilly Tomato", icon: ASSETS.icons.hillbillyTomato, spread: 400, size: 200 },
  icicleRadish: { label: "Icicle Radish", icon: ASSETS.icons.icicleRadish, spread: 100, size: 100 },
  lacinatoKale: { label: "Lacinato Kale", icon: ASSETS.icons.lacinatoKale, spread: 250, size: 220 },
  leek: { label: "Leek", icon: ASSETS.icons.leek, spread: 200, size: 200 },
  napaCabbage: { label: "Napa Cabbage", icon: ASSETS.icons.napaCabbage, spread: 400, size: 220 },
  okra: { label: "Okra", icon: ASSETS.icons.okra, spread: 400, size: 200 },
  parsnip: { label: "Parsnip", icon: ASSETS.icons.parsnip, spread: 180, size: 120 },
  rainbowChard: { label: "Rainbow Chard", icon: ASSETS.icons.rainbowChard, spread: 250, size: 250 },
  redBellPepper: { label: "Red Bell Pepper", icon: ASSETS.icons.redBellPepper, spread: 350, size: 200 },
  redCurlyKale: { label: "Red Curly Kale", icon: ASSETS.icons.redCurlyKale, spread: 350, size: 220 },
  redRussianKale: { label: "Red Russian Kale", icon: ASSETS.icons.redRussianKale, spread: 250, size: 200 },
  runnerBean: { label: "Runner Bean", icon: ASSETS.icons.runnerBean, spread: 350, size: 200 },
  rutabaga: { label: "Rutabaga", icon: ASSETS.icons.rutabaga, spread: 200, size: 150 },
  savoyCabbage: { label: "Savoy Cabbage", icon: ASSETS.icons.savoyCabbage, spread: 400, size: 250 },
  shallot: { label: "Shallot", icon: ASSETS.icons.shallot, spread: 200, size: 140 },
  snapPea: { label: "Snap Pea", icon: ASSETS.icons.snapPea, spread: 200, size: 150 },
  spinach: { label: "Spinach", icon: ASSETS.icons.spinach, spread: 250, size: 200 },
  sweetPotato: { label: "Sweet Potato", icon: ASSETS.icons.sweetPotato, spread: 400, size: 180 },
  turmeric: { label: "Turmeric", icon: ASSETS.icons.turmeric, spread: 250, size: 150 },
  turnip: { label: "Turnip", icon: ASSETS.icons.turnip, spread: 175, size: 150 },
  yellowOnion: { label: "Yellow Onion", icon: ASSETS.icons.yellowOnion, spread: 200, size: 150 },
  zucchini: { label: "Zucchini", icon: ASSETS.icons.zucchini, spread: 400, size: 250 },
};

export const GARDENS: Gardens = {
  "Spring": ["beet", "bibbLettuce", "broccoli", "carrot", "cauliflower", "rainbowChard",
    "icicleRadish", "redRussianKale", "bokChoy", "spinach", "snapPea"],
  "Summer": ["anaheimPepper", "basil", "cucumber", "eggplant", "hillbillyTomato", "okra",
    "redBellPepper", "runnerBean", "sweetPotato", "zucchini"],
  "Fall": ["arugula", "cherryBelleRadish", "cilantro", "collardGreens", "garlic",
    "goldenBeet", "leek", "lacinatoKale", "turnip", "yellowOnion"],
  "Winter": ["frenchBreakfastRadish", "napaCabbage", "parsnip", "redCurlyKale",
    "rutabaga", "savoyCabbage", "shallot", "turmeric", "celery", "brusselsSprout"],
  "Random": sampleSize(Object.keys(PLANTS), 20),
};
