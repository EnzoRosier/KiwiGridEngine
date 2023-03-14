import { GameObject } from "./modules/GameObjectClass.js";
import { refreshScreen, getMousePos } from "./modules/GameTools.js";
import { Grid } from "./modules/Grid.js";
import { ClickEvent } from "./modules/Events.js";
import { Sprite, SpriteAnimation } from "./modules/Sprite.js";
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
let objB = new GameObject("objet B", [2, 2]);

objA.addToObjectSpriteCollection("spriteB", spriteB);
objA.addToObjectSpriteCollection("spriteTile", spritetile);
objA.setObjectCurrentSprite("spriteB");

objB.addToObjectSpriteCollection("spriteImage", spriteA);
objB.setObjectCurrentSprite("spriteImage");

let cv_grid = <HTMLCanvasElement>document.getElementById("backGrid");
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
main_grid.list_objects.push(objB);

main_grid.generate_canvas("container");

refreshScreen(all_grids);

let interactible_canvas = document.getElementById("interactableGrid");

var onoff = false;

main_grid.grid_click_events.push(new ClickEvent([2, 1], 32, 32))
main_grid.grid_click_events[0].event_func = () => {
    alert("Clicked Bubble");
}

main_grid.grid_click_events.push(new ClickEvent([2, 2], 32, 32))
main_grid.grid_click_events[1].event_func = () => {
    alert("Clicked Factory");
}

interactible_canvas.addEventListener('click', function (evt) {
    var mousePos = getMousePos(interactible_canvas, evt);
    main_grid.grid_click_events.forEach(val => {
        if (val.isClicked(mousePos)) {
            console.log("Bruh");
            val.event_func();
        }

    });

}, false);

 window.onkeydown = function () {
    if (onoff) {
        onoff = false;
        objA.setObjectCurrentSprite("spriteB");
        refreshScreen(all_grids);
    } else {
        onoff = true;
        objA.setObjectCurrentSprite("spriteTile");
        refreshScreen(all_grids);
    }

};
