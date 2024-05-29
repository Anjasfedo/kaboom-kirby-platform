import kaboom from "kaboom";
import { SCALE } from "@src/constant";

export const k = kaboom({
  width: 256 * SCALE,
  height: 144 * SCALE,
  letterbox: true, // scale with device screen
  global: false, // singleton context
  scale: SCALE, // constant scale to prevent pixel consistent problem
});
