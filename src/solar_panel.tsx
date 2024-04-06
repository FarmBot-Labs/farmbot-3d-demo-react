import { TextureLoader, RepeatWrapping, Shape } from "three";
import { Extrude } from "@react-three/drei";
import { ASSETS } from "./constants";

const panelWidth = 540;
const panelLength = 1040;

const aluminumTexture = new TextureLoader()
  .load(ASSETS.textures.aluminum,
    texture => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(.8, .3);
    });

const cell2D = () => {
    const cellSize = 95;
    const cellBevel = 15;
    const path = new Shape();
    path.moveTo(cellBevel, 0);
    path.lineTo(cellSize - cellBevel, 0);
    path.lineTo(cellSize, cellBevel);
    path.lineTo(cellSize, cellSize - cellBevel);
    path.lineTo(cellSize - cellBevel, cellSize);
    path.lineTo(cellBevel, cellSize);
    path.lineTo(0, cellSize - cellBevel);
    path.lineTo(0, cellBevel);
    return path;
  };

const cellArray = () => {
  const cells = [];
  const cellSize = 100;
  const cellsWide = Math.floor(panelWidth / cellSize);
  const cellsLong = Math.floor(panelLength / cellSize);

  for (let x = 0; x < cellsWide; x++) {
      for (let y = 0; y < cellsLong; y++) {
          const xPos = x * cellSize - (panelWidth / 2) + 20 + 2.5;
          const yPos = y * cellSize - (panelLength / 2) + 20 + 2.5;
          cells.push(
              <mesh key={`${x}-${y}`} position={[xPos, yPos, 15]}>
                  <Extrude args={[cell2D(), { steps: 1, depth: 2, bevelEnabled: false }]}>
                      <meshPhongMaterial color={"#131361"} />
                  </Extrude>
              </mesh>
          );
      }
  }
  return cells;
};

export const SolarPanel = () => {
  return (
    <group rotation={[0, Math.PI / 6, 0]}>
      <mesh>
        <boxGeometry args={[panelWidth, panelLength, 30]} />
        <meshPhongMaterial color={"white"} map={aluminumTexture} />
      </mesh>
      {cellArray()}
    </group>
  );
};
