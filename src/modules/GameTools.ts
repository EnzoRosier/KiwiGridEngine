/*import { GameObject } from "./GameObjectClass.js";*/

import { GameObject } from "./GameObjectClass";
import { Grid } from "./Grid";
import { Sprite } from "./Sprite"

var dpi = window.devicePixelRatio;

/**
 * Affiche tout les GameObjects contenus dans une liste
 *
 * @param {GameObject[]} ObjectList Liste de GameObject
 */
function refreshScreen(ObjectList: Grid[]) {
    ObjectList.forEach((val) => {
        //val.stopRender()

        val.draw_grid();
    });
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width, // relationship bitmap vs. element for x
        scaleY = canvas.height / rect.height; // relationship bitmap vs. element for y

    return {
        x: (evt.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY, // been adjusted to be relative to element
    };
}

function drawBackgroundGrid(zoom: number, sprite_tile: Sprite, back_grid_ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < zoom; i++) {
        for (let j = 0; j < zoom; j++) {
            sprite_tile.render([i * 3200 / zoom, j * 3200 / zoom], back_grid_ctx, zoom);
        }
    }
}

export { refreshScreen, getMousePos, drawBackgroundGrid };
