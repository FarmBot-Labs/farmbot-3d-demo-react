import * as React from 'react'
import { ReactThreeFiber } from '@react-three/fiber'
import { Sky as SkyImpl } from 'three-stdlib'
import { Vector3 } from 'three'
import { ForwardRefComponent } from '../helpers/ts-utils'

type Props = {
  distance?: number
  sunPosition?: ReactThreeFiber.Vector3
  inclination?: number
  azimuth?: number
  mieCoefficient?: number
  mieDirectionalG?: number
  rayleigh?: number
  turbidity?: number
  up?: ReactThreeFiber.Vector3
}

export function calcPosFromAngles(inclination: number, azimuth: number, vector: Vector3 = new Vector3()) {
  const theta = Math.PI * (inclination - 0.5)
  const phi = 2 * Math.PI * (azimuth - 0.5)

  vector.x = -Math.sin(phi)
  vector.y = -Math.cos(phi)
  vector.z = Math.sin(theta)

  return vector
}

export const Sky: ForwardRefComponent<Props, SkyImpl> = /* @__PURE__ */ React.forwardRef(
  (
    {
      inclination = 0.6,
      azimuth = 0.1,
      distance = 1000,
      mieCoefficient = 0.005,
      mieDirectionalG = 0.8,
      rayleigh = 0.5,
      turbidity = 10,
      sunPosition = calcPosFromAngles(inclination, azimuth),
      up = [0, 0, 1],
      ...props
    }: Props,
    ref
  ) => {
    const scale = React.useMemo(() => new Vector3().setScalar(distance), [distance])
    const [sky] = React.useState(() => new SkyImpl())

    return (
      <primitive
        object={sky}
        ref={ref}
        material-uniforms-mieCoefficient-value={mieCoefficient}
        material-uniforms-mieDirectionalG-value={mieDirectionalG}
        material-uniforms-rayleigh-value={rayleigh}
        material-uniforms-sunPosition-value={sunPosition}
        material-uniforms-turbidity-value={turbidity}
        material-uniforms-up-value={up}
        scale={scale}
        {...props}
      />
    )
  }
)