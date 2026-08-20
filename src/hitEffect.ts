import { ParticleSystem } from "@babylonjs/core/Particles/particleSystem"
import { Texture } from "@babylonjs/core/Materials/Textures/texture"
import { Vector3 } from "@babylonjs/core/Maths/math.vector"
import { Color4, Scene } from "@babylonjs/core"

export const createBoomEffect = (scene: Scene, position: Vector3) => {
  const fire = new ParticleSystem("bigExplosionFire", 600, scene)

  fire.particleTexture = new Texture("/blackSmoke00.png", scene)
  fire.emitter = position.clone()

  fire.minEmitBox = Vector3.Zero()
  fire.maxEmitBox = Vector3.Zero()

  fire.color1 = new Color4(1, 0.85, 0.15, 1)
  fire.color2 = new Color4(1, 0.25, 0, 1)
  fire.colorDead = new Color4(0.2, 0.05, 0, 0)

  fire.minLifeTime = 0.25
  fire.maxLifeTime = 0.65

  fire.minSize = 0.25
  fire.maxSize = 1.4

  fire.minEmitPower = 6
  fire.maxEmitPower = 14

  fire.direction1 = new Vector3(-2.5, -0.5, -2.5)
  fire.direction2 = new Vector3(2.5, 4, 2.5)

  fire.gravity = new Vector3(0, -9, 0)
  fire.emitRate = 1200
  fire.blendMode = ParticleSystem.BLENDMODE_ONEONE

  fire.start()

  const smoke = new ParticleSystem("bigExplosionSmoke", 250, scene)

  smoke.particleTexture = new Texture("/blackSmoke00.png", scene)
  smoke.emitter = position.clone()

  smoke.minEmitBox = Vector3.Zero()
  smoke.maxEmitBox = Vector3.Zero()

  smoke.color1 = new Color4(0.15, 0.15, 0.15, 0.8)
  smoke.color2 = new Color4(0.45, 0.35, 0.25, 0.6)
  smoke.colorDead = new Color4(0.05, 0.05, 0.05, 0)

  smoke.minLifeTime = 0.8
  smoke.maxLifeTime = 1.4

  smoke.minSize = 0.8
  smoke.maxSize = 2.6

  smoke.minEmitPower = 2
  smoke.maxEmitPower = 6

  smoke.direction1 = new Vector3(-2, 0.5, -2)
  smoke.direction2 = new Vector3(2, 5, 2)

  smoke.gravity = new Vector3(0, -1.5, 0)
  smoke.emitRate = 350

  smoke.start()

  setTimeout(() => {
    fire.stop()
  }, 120)

  setTimeout(() => {
    smoke.stop()
  }, 220)

  setTimeout(() => {
    fire.dispose()
    smoke.dispose()
  }, 1800)
}

export const createImpactEffect = (scene: Scene, position: Vector3) => {
  const particles = new ParticleSystem("impact", 30, scene)

  particles.particleTexture = new Texture("/particle.png", scene)

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