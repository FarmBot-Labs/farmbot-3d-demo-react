import { Sphere } from "@react-three/drei";
import React from "react";
import { Config } from "./config";
import { FOCI } from "./zoom_beacons_constants";
import { useSpring, animated } from "@react-spring/three";

const DEBUG = false;
const beaconColor = "#0266b5";
const beaconSize = 40;

interface ZoomBeaconsProps {
  config: Config;
  activeFocus: string;
  setActiveFocus(focus: string): void;
}

const BeaconPulse = () => {
  const { scale, opacity } = useSpring({
    from: { scale: 1, opacity: 0.75 },
    to: async (next) => {
      while (true) {
        await next({ scale: 2.5, opacity: 0 });
        await new Promise(resolve => setTimeout(resolve, 2000));
        await next({ scale: 1, opacity: 0.75, immediate: true });
      }
    },
    config: { duration: 1500 }
  });

  return (
    <animated.mesh scale={scale}>
      <Sphere args={[beaconSize]}
        renderOrder={1}>
        <animated.meshPhongMaterial
          color={beaconColor}
          opacity={opacity}
          transparent />
      </Sphere>
    </animated.mesh>
  );
};

export const ZoomBeacons = (props: ZoomBeaconsProps) => {
  const [hoveredFocus, setHoveredFocus] = React.useState("");
  const { activeFocus, setActiveFocus } = props;
  const gardenBedDiv = document.querySelector('.garden-bed-3d-model') as HTMLElement | null;

  return <group name={"zoom-beacons"}>
    {FOCI(props.config).map(focus =>
      <group name={"zoom-beacon"} key={focus.label}
        position={focus.position}>
        {DEBUG &&
          <Sphere args={[30]} position={focus.camera.position}
            material-color={"cyan"} />}
        {DEBUG &&
          <Sphere args={[30]} position={focus.camera.target}
            material-color={"orange"} />}
        <Sphere
          onClick={() => {
            setActiveFocus(activeFocus ? "" : focus.label);
            setHoveredFocus("");
            if (gardenBedDiv) {
              gardenBedDiv.style.cursor = "";
            }
          }}
          onPointerEnter={() => {
            setHoveredFocus(focus.label);
            if (gardenBedDiv) {
              gardenBedDiv.style.cursor = activeFocus ? "zoom-out" : "zoom-in";
            }
          }}
          onPointerLeave={() => {
            setHoveredFocus("");
            if (gardenBedDiv) {
              gardenBedDiv.style.cursor = "";
            }
          }}
          receiveShadow={true}
          args={[(activeFocus ? 15 : beaconSize)
            * (hoveredFocus == focus.label ? 1.5 : 1)
            * ((!activeFocus && props.config.sizePreset == "Genesis XL") ? 1.5 : 1)
          ]}>
          <meshPhongMaterial
            color={activeFocus ? "red" : beaconColor}
            shininess={100} />
        </Sphere>
        {!activeFocus &&
          <BeaconPulse />
        }
      </group>)}
  </group>;
};
