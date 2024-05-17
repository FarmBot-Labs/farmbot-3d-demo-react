import { Cylinder, Tube } from '@react-three/drei';
import * as THREE from 'three';
import { Config } from "./config";
import { threeSpace } from './helpers';

interface XAxisWaterTubeProps {
  config: Config;
}

export const XAxisWaterTube = (props: XAxisWaterTubeProps) => {
  const { config } = props;
  const groundZ = -config.bedHeight - config.bedZOffset;
  const ccX = -20;
  const ccY = threeSpace(-30, config.bedWidthOuter);
  const ccZ = -140;
  const barbX = 400;
  const barbY = threeSpace(-50, config.bedWidthOuter);
  const barbZ = groundZ + 20;
  const midX = (ccX + barbX) / 2
  const midY = (ccY + barbY) / 2
  const midZ = (ccZ + barbZ) / 2
  const tubePoints = [
    [ccX, ccY, ccZ],
    [ccX + 100, ccY, ccZ - 10],
    [midX, midY, midZ],
    [barbX - 100, barbY, barbZ + 10],
    [barbX, barbY, barbZ],
  ];
  const tubePath = new THREE.CatmullRomCurve3(
    tubePoints.map(point => new THREE.Vector3(...point))
  );

  return (
    <group>
      <Tube name={"x-axis-water-tube"}
        castShadow={true}
        receiveShadow={true}
        args={[tubePath, 50, 5, 8]}>
        <meshPhongMaterial
          color="white"
          transparent={true}
          opacity={0.5}
        />
      </Tube>
      <Cylinder name={"adapter-barb"}
        receiveShadow={true}
        args={[3.5, 3.5, 20]}
        position={[barbX - 10, barbY, barbZ]}
        rotation={[0, 0, Math.PI / 2]}>
        <meshPhongMaterial color={"gold"}
          shininess={100} />
      </Cylinder>
      <Cylinder name={"adapter-base"}
        receiveShadow={true}
        args={[18, 18, 20]}
        position={[barbX + 10, barbY, barbZ]}
        rotation={[0, 0, Math.PI / 2]}>
        <meshPhongMaterial color={"gold"}
          shininess={100} />
      </Cylinder>
    </group>
  );
};
