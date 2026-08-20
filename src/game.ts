import {
  Engine,
  HemisphericLight,
  Mesh,
  Scene,
  UniversalCamera,
  Vector3
} from "@babylonjs/core"
import { AdvancedDynamicTexture } from "@babylonjs/gui"
import { createCrosshair, resizeCrosshair } from "./crosshair"
import { createDebugText } from "./debug_hud"
import { createImpactEffect, createImpactEffect2 } from "./hitEffect"
import { createGunSound } from "./hitsound"
import { createSkybox } from "./skybox"
import { createBangSound, createBarrel, reduceHealth, triggerBarrelHit } from "./barrel.ts"
import { createWall } from "./wall.ts"

const canvas = document.querySelector<HTMLCanvasElement>("#app")

const engine = new Engine(canvas, true)

const scene = new Scene(engine)

// Skybox

createSkybox(scene)

// Light
const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene)

light.intensity = 1

// crosshair
const ui = AdvancedDynamicTexture.CreateFullscreenUI("UI")
const crosshair = createCrosshair(ui, "lime", 2.5)

scene.onPointerMove = () => {
  crosshair.left = scene.pointerX - engine.getRenderWidth() / 2
  crosshair.top = scene.pointerY - engine.getRenderHeight() / 2
}

/*****************************************************************/

const debugText = createDebugText(ui, "")

const camera = new UniversalCamera("camera", new Vector3(0, 1.7, -30), scene)

const cameraBaseRotationX = camera.rotation.x
const cameraBaseRotationY = camera.rotation.y
let recoilX = 0
let recoilY = 0

const applyRecoil = (factor: number = 1 ) => {
  const strength = 0.006 + Math.random() * 0.004
  recoilX = Math.min(recoilX + strength, 0.05) * factor
  recoilY = Math.max(-0.015, Math.min(0.015, recoilY + (Math.random() - 0.5) * 0.003))  * factor
}

scene.onBeforeRenderObservable.add(() => {
  recoilX *= 0.85
  recoilY *= 0.85
  camera.rotation.x = cameraBaseRotationX - recoilX
  camera.rotation.y = cameraBaseRotationY + recoilY
})


const targetMeshes: Mesh[] = []
createTargets()
function clearTargets(): void {
  for (const target of targetMeshes) {
    target.dispose()
  }

  targetMeshes.length = 0
}


function createTargets(): void {
  const box = createWall(scene)

  box.position = new Vector3(-5, -2, 0)
  targetMeshes.push(box)

  const barrel = createBarrel(scene, (barrel) => {
    reduceHealth(barrel)
  })

  barrel.position = new Vector3(-5, 0.5, 0)
  targetMeshes.push(barrel)

  const barrel2 = createBarrel(scene, (barrel2) => {
    reduceHealth(barrel2)
  })

  barrel2.position = new Vector3(-2, 0.5, 0)
  targetMeshes.push(barrel2)

  const barrel3 = createBarrel(scene, (barrel3) => {
    reduceHealth(barrel3)
  })

  barrel3.position = new Vector3(-10, 0.5, 0)
  targetMeshes.push(barrel3)
}

function restartGame(): void {
  stopFiring()
  clearTargets()
  createTargets()

  recoilX = 0
  recoilY = 0
  camera.rotation.x = cameraBaseRotationX
  camera.rotation.y = cameraBaseRotationY
}


// Mouse
const hit = scene.pick(scene.pointerX, scene.pointerY)
if (hit.hit && hit.pickedPoint) {
  createImpactEffect(scene, hit.pickedPoint)
}
const gunshot = await createGunSound()
await createBangSound()
const automaticFire = true

const shoot = () => {
  gunshot.play()
  // applyRecoil(0.8)
  resizeCrosshair(crosshair)
  const hit = scene.pick(scene.pointerX, scene.pointerY)

  if (hit.hit && hit.pickedPoint) {
    createImpactEffect2(scene, hit.pickedPoint)

    if (hit.pickedMesh instanceof Mesh) {
      triggerBarrelHit(hit.pickedMesh)
    }
  }
}

let fireInterval: number | undefined

const stopFiring = () => {
  if (fireInterval !== undefined) {
    window.clearInterval(fireInterval)
    fireInterval = undefined
  }
}

scene.onPointerDown = () => {
  stopFiring()
  shoot()

  if (automaticFire) {
    fireInterval = window.setInterval(shoot, 100)
  }
}

scene.onPointerUp = stopFiring
window.addEventListener("pointerup", stopFiring)

engine.runRenderLoop(() => {
  scene.render()
})

window.addEventListener("resize", () => {
  engine.resize()
})

window.addEventListener("keydown", async (event) => {
  const key = event.key.toLowerCase()

  if (key === "f") {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }

    await canvas?.requestFullscreen()
    return
  }

  if (key === "r") {
    restartGame()
  }
})