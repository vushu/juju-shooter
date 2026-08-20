export const setCrosshairScale = (scale: number): void => {
  const crosshair = document.getElementById("crosshair")
  if (!crosshair) {
    return
  }

  crosshair.style.setProperty("--crosshair-scale", `${scale}`)
}

export const animateCrosshair = (): void => {
  const crosshair = document.getElementById("crosshair")
  if (!crosshair) {
    return
  }

  crosshair.classList.remove("crosshair-expanded")
  void crosshair.offsetWidth
  crosshair.classList.add("crosshair-expanded")

  window.setTimeout(() => {
    crosshair.classList.remove("crosshair-expanded")
  }, 80)
}
