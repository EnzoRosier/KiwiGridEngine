import {
    GameObject,
    Sprite,
    SpriteAnimation,
} from "./modules/GameObjectClass.js";
import { refreshScreen } from "./modules/GameTools.js";
import { Grid } from "./modules/Grid.js";
let all_grids = [];

let main_grid = new Grid([10, 10]);

all_grids.push(main_grid);

let spriteA = new Sprite("./../ressources/Factory_SpriteSheet.png", [32, 32]);
let spriteB = new SpriteAnimation(
    "./../ressources/Interractible_Sprite_Sheet.png",
    [32, 32],
    [32, 32],
    12
);
let spritetile = new Sprite("./../ressources/BaseTiles.png", [32, 32]);

let objA = new GameObject("objet A", [2, 1]);
let objB = new GameObject("objet B", [1, 1]);

objA.addToSpriteCollection("spriteB", spriteB);
objA.addToSpriteCollection("spriteTile", spritetile);
objA.setCurrentSprite("spriteB");

objB.addToSpriteCollection("spriteImage", spriteA);
objB.setCurrentSprite("spriteImage");

for (let i = 0; i < 10; i++) {
    main_grid.list_objects.push(new GameObject(i.toString(), [i, i]));
    main_grid.list_objects[i].addToSpriteCollection("spriteImage", spriteA);
    main_grid.list_objects[i].setCurrentSprite("spriteImage");
}

let cv_grid = <HTMLCanvasElement> document.getElementById("backGrid");
cv_grid.width = 3200;
cv_grid.height = 3200;
let back_grid_ctx = cv_grid.getContext("2d");
back_grid_ctx.imageSmoothingEnabled = false;

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        spritetile.render([i * 320, j * 320], back_grid_ctx);
    }
}

main_grid.list_objects.push(objA);

main_grid.generate_canvas("container");

refreshScreen(all_grids);

var onoff = false;

window.onkeydown = function () {
    if (onoff) {
        onoff = false;
        objA.setCurrentSprite("spriteB");
        refreshScreen(all_grids);
    } else {
        onoff = true;
        objA.setCurrentSprite("spriteTile");
        refreshScreen(all_grids);
    }

};
