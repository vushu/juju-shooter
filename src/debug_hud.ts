import { Control, TextBlock, type AdvancedDynamicTexture } from "@babylonjs/gui";

export const createDebugText = (
  ui: AdvancedDynamicTexture,
  text: string
) => {
  const textBlock = new TextBlock();

  textBlock.text = text;
  textBlock.color = "white";
  textBlock.fontSize = 24;
  textBlock.textHorizontalAlignment =
    Control.HORIZONTAL_ALIGNMENT_LEFT;

  textBlock.textVerticalAlignment =
    Control.VERTICAL_ALIGNMENT_TOP;

  textBlock.left = "20px";
  textBlock.top = "20px";

  ui.addControl(textBlock);

  return textBlock;
};