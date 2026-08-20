import {
  addToScene,
  createBox,
  createCylinder,
  createDefaultCamera,
  createEngine,
  createHemisphericLight,
  createPbrMaterial,
  createSceneContext,
  createSphere,
  registerScene,
  startEngine
} from "@babylonjs/lite"
import { animateCrosshair, setCrosshairScale } from "./new_crosshair.ts"

async function main(): Promise<void> {

  const canvas = document.querySelector<HTMLCanvasElement>("#app")
  if (!canvas) {
    throw new Error("Canvas element #app not found")
  }

  const engine = await createEngine(canvas)

  const scene = createSceneContext(engine)

  addToScene(scene, createCylinder(engine, { diameter: 2, height: 2 }))
  addToScene(scene, createBox(engine, { size: 2 }))
  addToScene(scene, createHemisphericLight([0, 1, 0], 1.0))
  // get mouse poss

  // const camera = createDefaultCamera(scene)
  // const alpha = 1.77538207638442;

  // const camera = createArcRotateCamera(-Math.PI / 2, Math.PI / 2.5, 4, { x: 0, y: 0, z: 0 });
  const camera = createDefaultCamera(scene)
  scene.camera = camera
  // attachControl(camera, canvas, scene);
  // Light
  addToScene(scene, createHemisphericLight([0, 1, 0], 1.0))
  const crosshair = document.getElementById("crosshair")
  if (!crosshair) {
    return
  }
  setCrosshairScale(2.5)
  canvas.onmousemove = (event) => {
    crosshair.style.left = event.clientX + "px"
    crosshair.style.top = event.clientY + "px"
    // aim.style.display = "block"
    // aim.style.opacity = "0.5"
    // aim.style.pointerEvents = "none"
    // aim.style.zIndex = "1000"
  }
  canvas.onmousedown = (event ) => {
    animateCrosshair()
  }


// A sphere with a simple PBR material
  const sphere = createSphere(engine, { segments: 16, diameter: 2 })
  sphere.material = createPbrMaterial({
    baseColorFactor: [0.9, 0.1, 0.1, 1],
    metallicFactor: 0.1,
    roughnessFactor: 0.4
  })
  sphere.position.set(0, 0, 8)

  const box = createBox(engine, { size: 2, height: 2, width: 2, depth: 2 })
  box.position.set(-3, 0, 8)
  box.material = createPbrMaterial({ baseColorFactor: [0.9, 0.5, 0.1, 1], metallicFactor: 0.1, roughnessFactor: 0.4 })
  addToScene(scene, box)
  addToScene(scene, sphere)


  await registerScene(scene)
  await startEngine(engine)
}

main().catch((err) => {
  console.error(err)
})
// const ui = AdvancedDynamicTexture.CreateFullscreenUI("UI")
// const crosshair = createCrosshair(ui, "lime", 2.5)

// scene.onPointerMove = () => {
//   crosshair.left = scene.pointerX - engine.getRenderWidth() / 2
//   crosshair.top = scene.pointerY - engine.getRenderHeight() / 2
// }


/*****************************************************************/

// const debugText = createDebugText(ui, "")

// const camera = createUniversalCamera("camera", new Vector3(0, 1.7, -30), scene)

// const cameraBaseRotationX = camera.rotation.x
// const cameraBaseRotationY = camera.rotation.y
let recoilX = 0
let recoilY = 0

// const applyRecoil = (factor: number = 1) => {
//   const strength = 0.006 + Math.random() * 0.004
//   recoilX = Math.min(recoilX + strength, 0.05) * factor
//   recoilY = Math.max(-0.015, Math.min(0.015, recoilY + (Math.random() - 0.5) * 0.003)) * factor
// }

// scene.onBeforeRenderObservable.add(() => {
//   recoilX *= 0.85
//   recoilY *= 0.85
//   camera.rotation.x = cameraBaseRotationX - recoilX
//   camera.rotation.y = cameraBaseRotationY + recoilY
// })


// createTargets()

/*

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
const Gunshot = await createGunSound()
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

 */