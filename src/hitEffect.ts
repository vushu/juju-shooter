import { ParticleSystem } from "@babylonjs/core/Particles/particleSystem"
import { Texture } from "@babylonjs/core/Materials/Textures/texture"
import { Vector3 } from "@babylonjs/core/Maths/math.vector"
import { Color4, Scene } from "@babylonjs/core"

export const createImpactEffect = (scene: Scene, position: Vector3) => {
  const particles = new ParticleSystem("impact", 30, scene)

  particles.particleTexture = new Texture("/blackSmoke00.png", scene)

  particles.emitter = position.clone()

  particles.minEmitBox = Vector3.Zero()
  particles.maxEmitBox = Vector3.Zero()

  particles.minLifeTime = 0.1
  particles.maxLifeTime = 0.3

  particles.minSize = 0.03
  particles.maxSize = 0.08

  particles.minEmitPower = 1
  particles.maxEmitPower = 3

  particles.direction1 = new Vector3(-1, 1, -1)
  particles.direction2 = new Vector3(1, 2, 1)

  particles.gravity = new Vector3(0, -5, 0)

  particles.start()

  setTimeout(() => {
    particles.stop()
    particles.dispose()
  }, 500)
}


export const createImpactEffect2 = (
  scene: Scene,
  position: Vector3
) => {
  const particles = new ParticleSystem("impact", 100, scene);

  particles.particleTexture = new Texture(
    "/blackSmoke00.png",
    scene
  );

  particles.emitter = position.clone();

  particles.minEmitBox = Vector3.Zero();
  particles.maxEmitBox = Vector3.Zero();

  particles.color1 = new Color4(0.9, 0.7, 0.4, 1);
  particles.color2 = new Color4(0.9, 0.2, 0.0, 1);

  particles.minSize = 0.1;
  particles.maxSize = 0.8;

  particles.minLifeTime = 0.3;
  particles.maxLifeTime = 0.3;

  particles.minEmitPower = 2;
  particles.maxEmitPower = 5;

  particles.direction1 = new Vector3(-1, 1, -1);
  particles.direction2 = new Vector3(1, 1, 1);

  particles.gravity = new Vector3(0, -13, 0);

  particles.emitRate = 100;

  particles.start();

  setTimeout(() => {
    particles.stop();
    particles.dispose();
  }, 400);
};