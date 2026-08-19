import { CreateAudioEngineAsync, CreateSoundAsync } from "@babylonjs/core"

export const createGunSound = async () => {
  const audioEngine = await CreateAudioEngineAsync()

  await audioEngine.unlockAsync()

  const gunshot = await CreateSoundAsync("gunshot", "/gun_shot.mp3")
  return gunshot
}
