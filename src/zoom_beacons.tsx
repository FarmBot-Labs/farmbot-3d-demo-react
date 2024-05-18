import { Sphere } from "@react-three/drei";
import React from "react";
import { Config } from "./config";
import { FOCI } from "./zoom_beacons_constants";

const DEBUG = false;

interface ZoomBeaconsProps {
  config: Config;
  activeFocus: string;
  setActiveFocus(focus: string): void;
}

export const ZoomBeacons = (props: ZoomBeaconsProps) => {
  const [hoveredFocus, setHoveredFocus] = React.useState("");
  const { activeFocus, setActiveFocus } = props;

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
            document.body.style.cursor = "default";
          }}
          onPointerEnter={() => {
            setHoveredFocus(focus.label);
            document.body.style.cursor = "pointer";
          }}
          onPointerLeave={() => {
            setHoveredFocus("");
            document.body.style.cursor = "default";
          }}
          receiveShadow={true}
          args={[(activeFocus ? 10 : 50)
            * (hoveredFocus == focus.label ? 1.5 : 1)
            * ((!activeFocus && props.config.sizePreset == "Genesis XL") ? 1.5 : 1)
          ]}>
          <meshPhongMaterial
            color={activeFocus ? "red" : "blue"}
            shininess={100} />
        </Sphere>
      </group>)}
  </group>;
};
