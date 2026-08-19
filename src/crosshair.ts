import { AdvancedDynamicTexture, Ellipse, Rectangle } from "@babylonjs/gui"
export const createCrosshair = (
  ui: AdvancedDynamicTexture,
  color = "white",
  scale = 1,
): Rectangle => {
  const crosshair = new Rectangle("crosshair")

  crosshair.width = `${30 * scale}px`
  crosshair.height = `${30 * scale}px`
  crosshair.thickness = 0

  ui.addControl(crosshair)

  // Center dot
  const dot = new Ellipse("crosshairDot")

  dot.width = `${5 * scale}px`
  dot.height = `${5 * scale}px`
  dot.thickness = 0
  dot.background = color

  crosshair.addControl(dot)

  // Top
  const top = new Rectangle("crosshairTop")

  top.width = `${2 * scale}px`
  top.height = `${8 * scale}px`
  top.thickness = 0
  top.background = color
  top.top = `${-11 * scale}px`

  crosshair.addControl(top)

  // Bottom
  const bottom = new Rectangle("crosshairBottom")

  bottom.width = `${2 * scale}px`
  bottom.height = `${8 * scale}px`
  bottom.thickness = 0
  bottom.background = color
  bottom.top = `${11 * scale}px`

  crosshair.addControl(bottom)

  // Left
  const left = new Rectangle("crosshairLeft")

  left.width = `${8 * scale}px`
  left.height = `${2 * scale}px`
  left.thickness = 0
  left.background = color
  left.left = `${-11 * scale}px`

  crosshair.addControl(left)

  // Right
  const right = new Rectangle("crosshairRight")

  right.width = `${8 * scale}px`
  right.height = `${2 * scale}px`
  right.thickness = 0
  right.background = color
  right.left = `${11 * scale}px`

  crosshair.addControl(right)

  return crosshair
}
