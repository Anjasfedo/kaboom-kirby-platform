import kaboom from "kaboom";

export const k = kaboom({
  width: 256,
  height: 144,
  letterbox: true, // scale with device screen
  global: false, // singleton context
});
