import { GameObject } from "./modules/GameObjectClass.js";
import { refreshScreen, getMousePos } from "./modules/GameTools.js";
import { Grid } from "./modules/Grid.js";
import { ClickEvent } from "./modules/Events.js";
import { Sprite, SpriteAnimation } from "./modules/Sprite.js";

let all_grids = [];

let main_grid = new Grid([10, 10]);
let interactible_canvas = document.getElementById("interactableGrid");
all_grids.push(main_grid);

//#region Sprite declaration

let sprite_factory = new Sprite("./../ressources/Factory_SpriteSheet.png", [32, 32]);
let sprite_tile = new Sprite("./../ressources/BaseTiles.png", [32, 32])
let sprite_bubble = new SpriteAnimation(
    "./../ressources/Interractible_Sprite_Sheet.png",
    [32, 32],
    [32, 32],
    12
);
let sprite_pipe = new Sprite("./../ressources/pipe_Sprite_Sheet.png", [32, 32]);

//#endregion

//#region backgrid & interact

interactible_canvas.addEventListener('click', function (evt) {
    var mousePos = getMousePos(interactible_canvas, evt);
    main_grid.list_objects.forEach(val => {
        console.log(mousePos);
        if (val.linked_click_event != undefined && val.linked_click_event.isClicked(mousePos)) {
            val.linked_click_event.event_func();
        }

    });

}, false);

let cv_grid = <HTMLCanvasElement>document.getElementById("backGrid");
cv_grid.width = 3200;
cv_grid.height = 3200;
let back_grid_ctx = cv_grid.getContext("2d");
back_grid_ctx.imageSmoothingEnabled = false;

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        sprite_tile.render([i * 320, j * 320], back_grid_ctx);
    }
}
//#endregion

main_grid.generate_canvas("container");

let obj1: GameObject = new GameObject("Usine de Bob", [5, 5]);
obj1.addToObjectSpriteCollection("Factory_Sprite", sprite_factory)
obj1.setObjectCurrentSprite("Factory_Sprite");
obj1.setLinkedClickEvent([0, -0.7], 32, 32, sprite_bubble, () => {
    alert("Bruh");
});

for (let i = 0; i < 10; i++) {
    main_grid.list_objects.push(new GameObject("Pipe" + i, [2, i]));
    main_grid.list_objects[i].addToObjectSpriteCollection("baseSprite", sprite_pipe);
    main_grid.list_objects[i].setObjectCurrentSprite("baseSprite");
}

main_grid.list_objects.push(obj1);

refreshScreen(all_grids);



