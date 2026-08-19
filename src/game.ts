import {
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  UniversalCamera,
  Vector3,
} from "@babylonjs/core"
import { AdvancedDynamicTexture } from "@babylonjs/gui"
import { createCrosshair } from "./crosshair"
import { createDebugText } from "./debug_hud"
import { createImpactEffect, createImpactEffect2 } from "./hitEffect"
import { createGunSound } from "./hitsound"

const canvas = document.querySelector<HTMLCanvasElement>("#app")

const engine = new Engine(canvas, true)

const scene = new Scene(engine)

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

const box = MeshBuilder.CreateBox("rect", {  size: 2 }, scene)
box.scaling.x = 10

const box2 = MeshBuilder.CreateBox("box2", { size: 2 }, scene)
box.position = new Vector3(-5, -2, 0 )

// Mouse
const hit = scene.pick(scene.pointerX, scene.pointerY)
if (hit.hit && hit.pickedPoint) {
  createImpactEffect(scene, hit.pickedPoint)
}
const gunshot = await createGunSound()

scene.onPointerDown = () => {
  gunshot.play()
  const hit = scene.pick(scene.pointerX, scene.pointerY)

  if (hit.hit && hit.pickedPoint) {
    console.log("Impact:", hit.pickedPoint)

    createImpactEffect2(scene, hit.pickedPoint)
  }
}

engine.runRenderLoop(() => {
  scene.render()
})

window.addEventListener("resize", () => {
  engine.resize()
})
