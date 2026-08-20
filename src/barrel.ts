import {
  Animation, CreateSoundAsync,
  Mesh,
  MeshBuilder,
  PBRMaterial,
  Scene, StaticSound,
  Texture
} from "@babylonjs/core"
import { createBoomEffect } from "./hitEffect"

const texturePath = "/textures/metal_01_1k/"
const startingHealth = 10
var bang: StaticSound | undefined = undefined

export const createBangSound = async () => {
  bang = await CreateSoundAsync("bang", "/bang.mp3")
}

export function createBarrel(
  scene: Scene,
  onHit?: (barrel: Mesh) => void
): Mesh {
  const barrel = MeshBuilder.CreateCylinder(
    "barrel",
    { diameter: 2, height: 3 },
    scene
  )

  const material = new PBRMaterial("barrelMaterial", scene)

  material.albedoTexture = new Texture(
    `${texturePath}metal_01_color_1k.png`,
    scene
  )

  material.bumpTexture = new Texture(
    `${texturePath}metal_01_normal_dx_1k.png`,
    scene
  )

  material.ambientTexture = new Texture(
    `${texturePath}metal_01_ambient_occlusion_1k.png`,
    scene
  )

  material.metallic = 0
  material.roughness = 0.8

  barrel.material = material
  barrel.metadata = { health: startingHealth }

  if (onHit) {
    bindHit(barrel, onHit)
  }

  return barrel
}

function bindHit(barrel: Mesh, onHit: (barrel: Mesh) => void): void {
  barrel.metadata = { ...(barrel.metadata ?? {}), onHit }
}

export function triggerBarrelHit(barrel: Mesh): void {
  const onHit = barrel.metadata?.onHit

  if (typeof onHit === "function") {
    onHit(barrel)
  }
}

export function shakeBarrel(barrel: Mesh): void {
  const animation = new Animation(
    "barrelShake",
    "rotation.z",
    60,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CONSTANT
  )

  animation.setKeys([
    { frame: 0, value: 0 },
    { frame: 2, value: 0.12 },
    { frame: 4, value: -0.12 },
    { frame: 6, value: 0.08 },
    { frame: 8, value: 0 }
  ])

  barrel.getScene().beginDirectAnimation(barrel, [animation], 0, 8, false)
}

export function explodeBarrel(barrel: Mesh): void {
  const scene = barrel.getScene()
  const position = barrel.getAbsolutePosition().clone()

  createBoomEffect(scene, position)
  if (bang) {
    bang.play({startOffset: 0.38})
  }

  barrel.actionManager?.dispose()
  barrel.dispose()
}

export function reduceHealth(barrel: Mesh): void {
  const currentHealth = barrel.metadata?.health ?? startingHealth
  barrel.metadata.health = currentHealth - 1

  shakeBarrel(barrel)
  if (barrel.metadata.health <= 0) {
    explodeBarrel(barrel)
  }
}
