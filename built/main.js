import { GameObject } from "./modules/GameObjectClass.js";
import * as tools from "./modules/GameTools.js";
import { Grid } from "./modules/Grid.js";
import { Sprite, SpriteAnimation } from "./modules/Sprite.js";
import { initControl } from "./modules/ControlMap.js";
let main_grid = new Grid([tools.grid_size, tools.grid_size]);
tools.initCanvas();
tools.all_grids.push(main_grid);
initControl();
//#region Sprite declaration
let sprite_factory = new Sprite("./../ressources/Factory_SpriteSheet.png", [32, 32]);
let sprite_tile = new Sprite("./../ressources/BaseTiles.png", [32, 32]);
let sprite_bubble = new SpriteAnimation("./../ressources/Interractible_Sprite_Sheet.png", [32, 32], [32, 32], 12);
let sprite_pipe = new Sprite("./../ressources/pipe_Sprite_Sheet.png", [32, 32]);
tools.setBackgroundTile(sprite_tile);
//#endregion
//#region backgrid & interact
tools.interactible_canvas.addEventListener('click', function (evt) {
    var mousePos = tools.getMousePos(tools.interactible_canvas, evt);
    main_grid.map_objects.forEach(val => {
        console.log(mousePos);
        if (val.linked_click_event != undefined && val.linked_click_event.isClicked(mousePos, tools.show_grid_size, tools.show_grid_pos)) {
            val.linked_click_event.event_func();
        }
    });
}, false);
tools.drawBackgroundGrid(tools.show_grid_size, sprite_tile, tools.back_grid_ctx);
//#endregion
main_grid.generate_canvas("container");
let obj1 = new GameObject("Usine de Bob", [9, 4]);
obj1.addToObjectSpriteCollection("Factory_Sprite", sprite_factory);
obj1.setObjectCurrentSprite("Factory_Sprite");
obj1.setLinkedClickEvent([0, -0.7], 32, 32, sprite_bubble, () => {
    alert("Bruh");
});
main_grid.addObject(obj1);
tools.refreshScreen(tools.all_grids, tools.show_grid_size, tools.show_grid_pos);
//# sourceMappingURL=main.js.map