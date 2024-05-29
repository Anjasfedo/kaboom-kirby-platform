import { SCALE } from "@src/constant";
import { KaboomCtx } from "kaboom";

export const makeMap = async (k: KaboomCtx, name: string) => {
  const mapData = await (await fetch(`./${name}.json`)).json();

  // create game object but not display like add does
  const map = k.make([k.sprite(name), k.scale(SCALE), k.pos(0)]);

  const spawnPoints: { [key: string]: { x: number; y: number }[] } = {};

  for (const layer of mapData.layers) {
    if (layer.name === "colliders") {
      for (const collider of layer.objects) {
        // children map object
        map.add([
          k.area({
            shape: new k.Rect(k.vec2(0), collider.width, collider.height),
            collisionIgnore: ["platform", "exit"],
          }),

          collider.name !== "exit" ? k.body({ isStatic: true }) : null,

          k.pos(collider.x, collider.y),

          collider.name !== "exit" ? "platform" : "exit",
        ]);
      }

      continue;
    }

    if (layer.name === "spawnpoint") {
      for (const spawnPoint of layer.objects) {
        if (spawnPoints[spawnPoint.name]) {
          spawnPoints[spawnPoint.name].push({
            x: spawnPoint.x,
            y: spawnPoint.y,
          });

          continue;
        }

        spawnPoints[spawnPoint.name] = [{ x: spawnPoint.x, y: spawnPoint.y }];
      }
    }
  }

  return { map, spawnPoints };
};
