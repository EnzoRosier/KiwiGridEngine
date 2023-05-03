/*import { GameObject } from "./GameObjectClass.js";*/
var dpi = window.devicePixelRatio;
let interactible_canvas;
let grid_size = 20;
let show_grid_size = 8;
let show_grid_pos = [0, 0];
let all_grids = [];
let cv_grid = undefined;
let back_grid_ctx = undefined;
let background_tile = undefined;
/**
 * Affiche tout les GameObjects contenus dans une liste
 *
 * @param {GameObject[]} ObjectList Liste de GameObject
 * @param {number} zoom nbr cases affiche
 * @param {number[]} zoom position zone affiche
 */
function refreshScreen(ObjectList, zoom, zoom_pos) {
    interactible_canvas.getContext("2d").clearRect(0, 0, interactible_canvas.width, interactible_canvas.height);
    drawBackgroundGrid(show_grid_size, background_tile, back_grid_ctx);
    ObjectList.forEach((val) => {
        //val.stopRender()
        val.draw_grid(zoom, zoom_pos);
    });
}
function initMouseDetect(main_grid) {
    interactible_canvas.addEventListener('click', function (evt) {
        var mousePos = getMousePos(interactible_canvas, evt);
        main_grid.map_objects.forEach(val => {
            console.log(mousePos);
            if (val.linked_click_event != undefined && val.linked_click_event.isClicked(mousePos, show_grid_size, show_grid_pos)) {
                val.linked_click_event.event_func();
            }
        });
    }, false);
}
/**
 * Indique le sprite de fond
 *
 * @param {Sprite} sprite Sprite de fond
 */
function setBackgroundTile(sprite) {
    background_tile = sprite;
}
/**
 * Initialise les canvas
 *
 */
function initCanvas() {
    interactible_canvas = document.getElementById("interactableGrid");
    cv_grid = document.getElementById("backGrid");
    cv_grid.width = 3200;
    cv_grid.height = 3200;
    back_grid_ctx = cv_grid.getContext("2d");
    back_grid_ctx.imageSmoothingEnabled = false;
}
/**
 * Fonction qui recupere la position du clique
 *
 * @param {*} canvas
 * @param {*} evt
 * @return {*}
 */
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width, // relationship bitmap vs. element for x
    scaleY = canvas.height / rect.height; // relationship bitmap vs. element for y
    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY, // been adjusted to be relative to element
    };
}
/**
 * Dessine la grille de fond
 *
 * @param {number} zoom
 * @param {Sprite} sprite_tile
 * @param {CanvasRenderingContext2D} back_grid_ctx
 */
function drawBackgroundGrid(zoom, sprite_tile, back_grid_ctx) {
    for (let i = 0; i < zoom; i++) {
        for (let j = 0; j < zoom; j++) {
            sprite_tile.render([i * 3200 / zoom, j * 3200 / zoom], back_grid_ctx, zoom);
        }
    }
}
/**
 * Fonction qui bouge la zone de jeu visible
 *
 * @param {number} dir direction
 */
function moveScreen(dir) {
    // 0: top; 1: right; 2: bottom; 3: left
    console.log(dir);
    switch (dir) {
        case 0:
            if (show_grid_pos[1] > 0) {
                show_grid_pos[1]--;
            }
            break;
        case 1:
            console.log(show_grid_pos[0] + show_grid_size);
            if (show_grid_pos[0] + show_grid_size < grid_size) {
                console.log("Bruh");
                show_grid_pos[0]++;
            }
            break;
        case 2:
            if (show_grid_pos[1] + show_grid_size < grid_size) {
                show_grid_pos[1]++;
            }
            break;
        case 3:
            if (show_grid_pos[0] > 0) {
                show_grid_pos[0]--;
            }
            break;
    }
    console.log("Pos : ", show_grid_pos);
    refreshScreen(all_grids, show_grid_size, show_grid_pos);
}
/**
 * Modifie la taille de la zone de jeu visible
 *
 * @param {number} updown
 */
function zoomScreen(updown) {
    switch (updown) {
        //SCALE DOWN
        case 0:
            if (show_grid_size > 2) {
                show_grid_size--;
            }
            break;
        //SCALE UP
        case 1:
            if (show_grid_size < grid_size) {
                if (show_grid_pos[0] + show_grid_size == grid_size) {
                    show_grid_pos[0]--;
                }
                if (show_grid_pos[1] + show_grid_size == grid_size) {
                    show_grid_pos[1]--;
                }
                show_grid_size++;
            }
            break;
    }
    refreshScreen(all_grids, show_grid_size, show_grid_pos);
}
export { refreshScreen, getMousePos, drawBackgroundGrid, initCanvas, show_grid_pos, show_grid_size, all_grids, moveScreen, interactible_canvas, zoomScreen, back_grid_ctx, setBackgroundTile, grid_size, initMouseDetect };
//# sourceMappingURL=GameTools.js.map