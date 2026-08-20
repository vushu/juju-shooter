import {
  Mesh,
  MeshBuilder,
  PBRMaterial,
  Scene,
  Texture,
} from "@babylonjs/core"

const texturePath = "/textures/bricks_wall_05_1k/"

export function createWall(scene: Scene): Mesh {
  const wall = MeshBuilder.CreateBox("wall", { size: 2 }, scene)
  wall.scaling.x = 10

  const material = new PBRMaterial("wallMaterial", scene)

  material.albedoTexture = new Texture(
    `${texturePath}bricks_wall_05_color_1k.png`,
    scene,
  )

  material.bumpTexture = new Texture(
    `${texturePath}bricks_wall_05_normal_dx_1k.png`,
    scene,
  )

  material.ambientTexture = new Texture(
    `${texturePath}bricks_wall_05_ambient_occlusion_1k.png`,
    scene,
  )

  material.metallic = 0
  material.roughness = 0.85

  // material.albedoTexture.uScale = 2
  // material.albedoTexture.vScale = 2
  // material.bumpTexture.uScale = 2
  // material.bumpTexture.vScale = 2
  // material.ambientTexture.uScale = 2
  // material.ambientTexture.vScale = 2

  wall.material = material

  return wall
}