import { Config, seasonProperties } from "./config";
import { Vector3 } from "three";
import { useSpring, animated } from "@react-spring/three";

interface SunProps {
  config: Config;
}

export const sunPosition = (config: Config): Vector3 => {
  const { sunInclination, sunAzimuth } = config;
  return new Vector3(
    10000 * Math.cos(sunInclination * Math.PI / 180) * Math.sin(sunAzimuth * Math.PI / 180),
    10000 * Math.cos(sunInclination * Math.PI / 180) * Math.cos(sunAzimuth * Math.PI / 180),
    10000 * Math.sin(sunInclination * Math.PI / 180)
  );
};

export const Sun = (props: SunProps) => {
  const { config } = props;

  const { sunIntensity, sunColor } = useSpring({
    ...seasonProperties[config.plants] || seasonProperties.Spring,
    tension: 50,
    friction: 40,
  });

  const sunPos = sunPosition(config);
  const sunDistance = 20000;
  const sunDecay = 0;
  const shadowNormalBias = 100;

  return (
    <group>
      <animated.pointLight
        intensity={sunIntensity}
        color={sunColor}
        distance={sunDistance}
        decay={sunDecay}
        castShadow
        shadow-normalBias={shadowNormalBias}
        position={[sunPos.x, sunPos.y, sunPos.z]}
      />
      <animated.pointLight
        intensity={sunIntensity}
        color={sunColor}
        distance={sunDistance}
        decay={sunDecay}
        castShadow
        shadow-normalBias={shadowNormalBias}
        position={[sunPos.x + 50, sunPos.y, sunPos.z]}
      />
      <animated.pointLight
        intensity={sunIntensity}
        color={sunColor}
        distance={sunDistance}
        decay={sunDecay}
        castShadow
        shadow-normalBias={shadowNormalBias}
        position={[sunPos.x + 50, sunPos.y + 50, sunPos.z]}
      />
      <animated.pointLight
        intensity={sunIntensity}
        color={sunColor}
        distance={sunDistance}
        decay={sunDecay}
        castShadow
        shadow-normalBias={shadowNormalBias}
        position={[sunPos.x, sunPos.y + 50, sunPos.z]}
      />
    </group>
  );
};
