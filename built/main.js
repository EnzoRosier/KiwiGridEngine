import { refreshScreen, getMousePos, drawBackgroundGrid } from "./modules/GameTools.js";
import { Grid } from "./modules/Grid.js";
import { Sprite, SpriteAnimation } from "./modules/Sprite.js";
let all_grids = [];
let show_grid_size = 12;
let show_grid_pos = [0, 0];
let main_grid = new Grid([10, 10]);
let interactible_canvas = document.getElementById("interactableGrid");
all_grids.push(main_grid);
//#region Sprite declaration
let sprite_factory = new Sprite("./../ressources/Factory_SpriteSheet.png", [32, 32]);
let sprite_tile = new Sprite("./../ressources/BaseTiles.png", [32, 32]);
let sprite_bubble = new SpriteAnimation("./../ressources/Interractible_Sprite_Sheet.png", [32, 32], [32, 32], 12);
let sprite_pipe = new Sprite("./../ressources/pipe_Sprite_Sheet.png", [32, 32]);
//#endregion
//#region backgrid & interact
interactible_canvas.addEventListener('click', function (evt) {
    var mousePos = getMousePos(interactible_canvas, evt);
    main_grid.map_objects.forEach(val => {
        console.log(mousePos);
        if (val.linked_click_event != undefined && val.linked_click_event.isClicked(mousePos)) {
            val.linked_click_event.event_func();
        }
    });
}, false);
let cv_grid = document.getElementById("backGrid");
cv_grid.width = 3200;
cv_grid.height = 3200;
let back_grid_ctx = cv_grid.getContext("2d");
back_grid_ctx.imageSmoothingEnabled = false;
drawBackgroundGrid(show_grid_size, sprite_tile, back_grid_ctx);
//#endregion
main_grid.generate_canvas("container");
/*let obj1: GameObject = new GameObject("Usine de Bob", [5, 5]);
obj1.addToObjectSpriteCollection("Factory_Sprite", sprite_factory)
obj1.setObjectCurrentSprite("Factory_Sprite");
obj1.setLinkedClickEvent([0, -0.7], 32, 32, sprite_bubble, () => {
    alert("Bruh");
});

main_grid.addObject(obj1);*/
refreshScreen(all_grids);
//# sourceMappingURL=main.js.map