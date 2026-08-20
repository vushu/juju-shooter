import { CubeTexture, MeshBuilder, StandardMaterial, Texture, Scene, Color3 } from "@babylonjs/core"


export const createSkybox = (scene: Scene) => {
  const skybox = MeshBuilder.CreateBox("sky", { size: 1000 }, scene)
  skybox.infiniteDistance = true

  const skyboxMaterial = new StandardMaterial("skyMat", scene)
  skyboxMaterial.backFaceCulling = false
  // skyboxMaterial.disableLighting = true
  // const extensions = ["_px.png", "_py.png", "_pz.png", "_nx.png", "_ny.png", "_nz.png"]
  const extensions = ["px.png", "py.png", "pz.png", "nx.png", "ny.png", "nz.png"]
  skyboxMaterial.reflectionTexture = new CubeTexture("/textures/skybox/sky2/", scene, extensions)
  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE
  skyboxMaterial.diffuseColor = new Color3(0, 0, 0)
  skybox.material = skyboxMaterial
  return skybox
}