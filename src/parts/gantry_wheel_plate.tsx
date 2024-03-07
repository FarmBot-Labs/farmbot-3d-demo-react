import { GLTF } from 'three-stdlib'

export type GantryWheelPlateFull = GLTF & {
  nodes: {
    Gantry_Wheel_Plate: THREE.Mesh
    mesh141_mesh: THREE.Mesh
    mesh141_mesh_1: THREE.Mesh
    mesh141_mesh_2: THREE.Mesh
    mesh141_mesh_3: THREE.Mesh
    mesh141_mesh_4: THREE.Mesh
    mesh141_mesh_5: THREE.Mesh
    mesh141_mesh_6: THREE.Mesh
    mesh141_mesh_7: THREE.Mesh
    mesh141_mesh_8: THREE.Mesh
    mesh141_mesh_9: THREE.Mesh
    mesh141_mesh_10: THREE.Mesh
    mesh141_mesh_11: THREE.Mesh
    mesh141_mesh_12: THREE.Mesh
    mesh141_mesh_13: THREE.Mesh
    mesh141_mesh_14: THREE.Mesh
    mesh141_mesh_15: THREE.Mesh
    mesh141_mesh_16: THREE.Mesh
    mesh141_mesh_17: THREE.Mesh
    mesh159_mesh: THREE.Mesh
    mesh159_mesh_1: THREE.Mesh
    mesh159_mesh_2: THREE.Mesh
    mesh159_mesh_3: THREE.Mesh
    mesh159_mesh_4: THREE.Mesh
    mesh159_mesh_5: THREE.Mesh
    mesh159_mesh_6: THREE.Mesh
    mesh159_mesh_7: THREE.Mesh
    mesh159_mesh_8: THREE.Mesh
    mesh159_mesh_9: THREE.Mesh
    mesh159_mesh_10: THREE.Mesh
    mesh159_mesh_11: THREE.Mesh
    mesh159_mesh_12: THREE.Mesh
    mesh159_mesh_13: THREE.Mesh
    mesh159_mesh_14: THREE.Mesh
    mesh159_mesh_15: THREE.Mesh
    mesh159_mesh_16: THREE.Mesh
    mesh176_mesh: THREE.Mesh
    mesh176_mesh_1: THREE.Mesh
    mesh176_mesh_2: THREE.Mesh
    mesh176_mesh_3: THREE.Mesh
    mesh176_mesh_4: THREE.Mesh
    mesh176_mesh_5: THREE.Mesh
    mesh176_mesh_6: THREE.Mesh
    mesh176_mesh_7: THREE.Mesh
    mesh176_mesh_8: THREE.Mesh
    mesh176_mesh_9: THREE.Mesh
    mesh176_mesh_10: THREE.Mesh
    mesh176_mesh_11: THREE.Mesh
    mesh176_mesh_12: THREE.Mesh
    mesh176_mesh_13: THREE.Mesh
    mesh176_mesh_14: THREE.Mesh
    mesh176_mesh_15: THREE.Mesh
    mesh192_mesh: THREE.Mesh
    mesh192_mesh_1: THREE.Mesh
    mesh192_mesh_2: THREE.Mesh
    mesh192_mesh_3: THREE.Mesh
    mesh192_mesh_4: THREE.Mesh
    mesh192_mesh_5: THREE.Mesh
    mesh192_mesh_6: THREE.Mesh
    mesh192_mesh_7: THREE.Mesh
    mesh192_mesh_8: THREE.Mesh
    mesh192_mesh_9: THREE.Mesh
    mesh192_mesh_10: THREE.Mesh
    mesh192_mesh_11: THREE.Mesh
    mesh192_mesh_12: THREE.Mesh
    mesh192_mesh_13: THREE.Mesh
    mesh206_mesh: THREE.Mesh
    mesh206_mesh_1: THREE.Mesh
    mesh206_mesh_2: THREE.Mesh
    mesh206_mesh_3: THREE.Mesh
    mesh206_mesh_4: THREE.Mesh
    mesh206_mesh_5: THREE.Mesh
    mesh206_mesh_6: THREE.Mesh
    mesh206_mesh_7: THREE.Mesh
    mesh206_mesh_8: THREE.Mesh
    mesh206_mesh_9: THREE.Mesh
    mesh206_mesh_10: THREE.Mesh
    mesh206_mesh_11: THREE.Mesh
    mesh206_mesh_12: THREE.Mesh
    mesh206_mesh_13: THREE.Mesh
    mesh206_mesh_14: THREE.Mesh
    mesh206_mesh_15: THREE.Mesh
    mesh206_mesh_16: THREE.Mesh
    mesh206_mesh_17: THREE.Mesh
  }
  materials: {
    PaletteMaterial001: THREE.MeshStandardMaterial
  }
}

export const GantryWheelPlate = (model: GantryWheelPlateFull) => (props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = model;
  return <group {...props}>
    <mesh geometry={nodes.Gantry_Wheel_Plate.geometry} material={materials.PaletteMaterial001} position={[0.002, 0.05, 0]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} />
    <instancedMesh args={[nodes.mesh141_mesh.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh141_mesh.instanceMatrix} />
    <instancedMesh args={[nodes.mesh141_mesh_1.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh141_mesh_1.instanceMatrix} />
    <instancedMesh args={[nodes.mesh141_mesh_2.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh141_mesh_2.instanceMatrix} />
    <instancedMesh args={[nodes.mesh141_mesh_3.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh141_mesh_3.instanceMatrix} />
    <instancedMesh args={[nodes.mesh141_mesh_4.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh141_mesh_4.instanceMatrix} />
    <instancedMesh args={[nodes.mesh141_mesh_5.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh141_mesh_5.instanceMatrix} />
    <instancedMesh args={[nodes.mesh141_mesh_6.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh141_mesh_6.instanceMatrix} />
    <instancedMesh args={[nodes.mesh141_mesh_7.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh141_mesh_7.instanceMatrix} />
    <instancedMesh args={[nodes.mesh141_mesh_8.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh141_mesh_8.instanceMatrix} />
    <instancedMesh args={[nodes.mesh141_mesh_9.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh141_mesh_9.instanceMatrix} />
    <instancedMesh args={[nodes.mesh141_mesh_10.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh141_mesh_10.instanceMatrix} />
    <instancedMesh args={[nodes.mesh141_mesh_11.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh141_mesh_11.instanceMatrix} />
    <instancedMesh args={[nodes.mesh141_mesh_12.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh141_mesh_12.instanceMatrix} />
    <instancedMesh args={[nodes.mesh141_mesh_13.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh141_mesh_13.instanceMatrix} />
    <instancedMesh args={[nodes.mesh141_mesh_14.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh141_mesh_14.instanceMatrix} />
    <instancedMesh args={[nodes.mesh141_mesh_15.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh141_mesh_15.instanceMatrix} />
    <instancedMesh args={[nodes.mesh141_mesh_16.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh141_mesh_16.instanceMatrix} />
    <instancedMesh args={[nodes.mesh141_mesh_17.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh141_mesh_17.instanceMatrix} />
    <instancedMesh args={[nodes.mesh159_mesh.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh159_mesh.instanceMatrix} />
    <instancedMesh args={[nodes.mesh159_mesh_1.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh159_mesh_1.instanceMatrix} />
    <instancedMesh args={[nodes.mesh159_mesh_2.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh159_mesh_2.instanceMatrix} />
    <instancedMesh args={[nodes.mesh159_mesh_3.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh159_mesh_3.instanceMatrix} />
    <instancedMesh args={[nodes.mesh159_mesh_4.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh159_mesh_4.instanceMatrix} />
    <instancedMesh args={[nodes.mesh159_mesh_5.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh159_mesh_5.instanceMatrix} />
    <instancedMesh args={[nodes.mesh159_mesh_6.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh159_mesh_6.instanceMatrix} />
    <instancedMesh args={[nodes.mesh159_mesh_7.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh159_mesh_7.instanceMatrix} />
    <instancedMesh args={[nodes.mesh159_mesh_8.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh159_mesh_8.instanceMatrix} />
    <instancedMesh args={[nodes.mesh159_mesh_9.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh159_mesh_9.instanceMatrix} />
    <instancedMesh args={[nodes.mesh159_mesh_10.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh159_mesh_10.instanceMatrix} />
    <instancedMesh args={[nodes.mesh159_mesh_11.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh159_mesh_11.instanceMatrix} />
    <instancedMesh args={[nodes.mesh159_mesh_12.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh159_mesh_12.instanceMatrix} />
    <instancedMesh args={[nodes.mesh159_mesh_13.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh159_mesh_13.instanceMatrix} />
    <instancedMesh args={[nodes.mesh159_mesh_14.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh159_mesh_14.instanceMatrix} />
    <instancedMesh args={[nodes.mesh159_mesh_15.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh159_mesh_15.instanceMatrix} />
    <instancedMesh args={[nodes.mesh159_mesh_16.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh159_mesh_16.instanceMatrix} />
    <instancedMesh args={[nodes.mesh176_mesh.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh176_mesh.instanceMatrix} />
    <instancedMesh args={[nodes.mesh176_mesh_1.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh176_mesh_1.instanceMatrix} />
    <instancedMesh args={[nodes.mesh176_mesh_2.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh176_mesh_2.instanceMatrix} />
    <instancedMesh args={[nodes.mesh176_mesh_3.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh176_mesh_3.instanceMatrix} />
    <instancedMesh args={[nodes.mesh176_mesh_4.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh176_mesh_4.instanceMatrix} />
    <instancedMesh args={[nodes.mesh176_mesh_5.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh176_mesh_5.instanceMatrix} />
    <instancedMesh args={[nodes.mesh176_mesh_6.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh176_mesh_6.instanceMatrix} />
    <instancedMesh args={[nodes.mesh176_mesh_7.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh176_mesh_7.instanceMatrix} />
    <instancedMesh args={[nodes.mesh176_mesh_8.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh176_mesh_8.instanceMatrix} />
    <instancedMesh args={[nodes.mesh176_mesh_9.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh176_mesh_9.instanceMatrix} />
    <instancedMesh args={[nodes.mesh176_mesh_10.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh176_mesh_10.instanceMatrix} />
    <instancedMesh args={[nodes.mesh176_mesh_11.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh176_mesh_11.instanceMatrix} />
    <instancedMesh args={[nodes.mesh176_mesh_12.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh176_mesh_12.instanceMatrix} />
    <instancedMesh args={[nodes.mesh176_mesh_13.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh176_mesh_13.instanceMatrix} />
    <instancedMesh args={[nodes.mesh176_mesh_14.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh176_mesh_14.instanceMatrix} />
    <instancedMesh args={[nodes.mesh176_mesh_15.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh176_mesh_15.instanceMatrix} />
    <instancedMesh args={[nodes.mesh192_mesh.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh192_mesh.instanceMatrix} />
    <instancedMesh args={[nodes.mesh192_mesh_1.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh192_mesh_1.instanceMatrix} />
    <instancedMesh args={[nodes.mesh192_mesh_2.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh192_mesh_2.instanceMatrix} />
    <instancedMesh args={[nodes.mesh192_mesh_3.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh192_mesh_3.instanceMatrix} />
    <instancedMesh args={[nodes.mesh192_mesh_4.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh192_mesh_4.instanceMatrix} />
    <instancedMesh args={[nodes.mesh192_mesh_5.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh192_mesh_5.instanceMatrix} />
    <instancedMesh args={[nodes.mesh192_mesh_6.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh192_mesh_6.instanceMatrix} />
    <instancedMesh args={[nodes.mesh192_mesh_7.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh192_mesh_7.instanceMatrix} />
    <instancedMesh args={[nodes.mesh192_mesh_8.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh192_mesh_8.instanceMatrix} />
    <instancedMesh args={[nodes.mesh192_mesh_9.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh192_mesh_9.instanceMatrix} />
    <instancedMesh args={[nodes.mesh192_mesh_10.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh192_mesh_10.instanceMatrix} />
    <instancedMesh args={[nodes.mesh192_mesh_11.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh192_mesh_11.instanceMatrix} />
    <instancedMesh args={[nodes.mesh192_mesh_12.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh192_mesh_12.instanceMatrix} />
    <instancedMesh args={[nodes.mesh192_mesh_13.geometry, materials.PaletteMaterial001, 5]} instanceMatrix={nodes.mesh192_mesh_13.instanceMatrix} />
    <instancedMesh args={[nodes.mesh206_mesh.geometry, materials.PaletteMaterial001, 10]} instanceMatrix={nodes.mesh206_mesh.instanceMatrix} />
    <instancedMesh args={[nodes.mesh206_mesh_1.geometry, materials.PaletteMaterial001, 10]} instanceMatrix={nodes.mesh206_mesh_1.instanceMatrix} />
    <instancedMesh args={[nodes.mesh206_mesh_2.geometry, materials.PaletteMaterial001, 10]} instanceMatrix={nodes.mesh206_mesh_2.instanceMatrix} />
    <instancedMesh args={[nodes.mesh206_mesh_3.geometry, materials.PaletteMaterial001, 10]} instanceMatrix={nodes.mesh206_mesh_3.instanceMatrix} />
    <instancedMesh args={[nodes.mesh206_mesh_4.geometry, materials.PaletteMaterial001, 10]} instanceMatrix={nodes.mesh206_mesh_4.instanceMatrix} />
    <instancedMesh args={[nodes.mesh206_mesh_5.geometry, materials.PaletteMaterial001, 10]} instanceMatrix={nodes.mesh206_mesh_5.instanceMatrix} />
    <instancedMesh args={[nodes.mesh206_mesh_6.geometry, materials.PaletteMaterial001, 10]} instanceMatrix={nodes.mesh206_mesh_6.instanceMatrix} />
    <instancedMesh args={[nodes.mesh206_mesh_7.geometry, materials.PaletteMaterial001, 10]} instanceMatrix={nodes.mesh206_mesh_7.instanceMatrix} />
    <instancedMesh args={[nodes.mesh206_mesh_8.geometry, materials.PaletteMaterial001, 10]} instanceMatrix={nodes.mesh206_mesh_8.instanceMatrix} />
    <instancedMesh args={[nodes.mesh206_mesh_9.geometry, materials.PaletteMaterial001, 10]} instanceMatrix={nodes.mesh206_mesh_9.instanceMatrix} />
    <instancedMesh args={[nodes.mesh206_mesh_10.geometry, materials.PaletteMaterial001, 10]} instanceMatrix={nodes.mesh206_mesh_10.instanceMatrix} />
    <instancedMesh args={[nodes.mesh206_mesh_11.geometry, materials.PaletteMaterial001, 10]} instanceMatrix={nodes.mesh206_mesh_11.instanceMatrix} />
    <instancedMesh args={[nodes.mesh206_mesh_12.geometry, materials.PaletteMaterial001, 10]} instanceMatrix={nodes.mesh206_mesh_12.instanceMatrix} />
    <instancedMesh args={[nodes.mesh206_mesh_13.geometry, materials.PaletteMaterial001, 10]} instanceMatrix={nodes.mesh206_mesh_13.instanceMatrix} />
    <instancedMesh args={[nodes.mesh206_mesh_14.geometry, materials.PaletteMaterial001, 10]} instanceMatrix={nodes.mesh206_mesh_14.instanceMatrix} />
    <instancedMesh args={[nodes.mesh206_mesh_15.geometry, materials.PaletteMaterial001, 10]} instanceMatrix={nodes.mesh206_mesh_15.instanceMatrix} />
    <instancedMesh args={[nodes.mesh206_mesh_16.geometry, materials.PaletteMaterial001, 10]} instanceMatrix={nodes.mesh206_mesh_16.instanceMatrix} />
    <instancedMesh args={[nodes.mesh206_mesh_17.geometry, materials.PaletteMaterial001, 10]} instanceMatrix={nodes.mesh206_mesh_17.instanceMatrix} />
  </group>;
}
