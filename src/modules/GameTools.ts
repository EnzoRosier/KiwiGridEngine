/*import { GameObject } from "./GameObjectClass.js";*/

import { initControl } from "./ControlMap";
import { GameObject } from "./GameObjectClass.js";
import { Grid } from "./Grid.js";
import { Sprite } from "./Sprite.js"

var dpi = window.devicePixelRatio;
let interactible_canvas: HTMLCanvasElement;
let grid_size: number = 20;
let show_grid_size: number = 8;
let show_grid_pos: number[] = [0, 0];
let all_grids: Grid[] = [];
let cv_grid = undefined;
let back_grid_ctx = undefined;
let background_tile: Sprite = undefined;

/**
 * Affiche tout les GameObjects contenus dans une liste
 *
 * @param {GameObject[]} ObjectList Liste de GameObject
 */
function refreshScreen(ObjectList: Grid[], zoom: number, zoom_pos: number[]) {
    interactible_canvas.getContext("2d").clearRect(0, 0, interactible_canvas.width, interactible_canvas.height);
    drawBackgroundGrid(show_grid_size, background_tile, back_grid_ctx);
    ObjectList.forEach((val) => {
        //val.stopRender()
        val.draw_grid(zoom, zoom_pos);
    });
}

function setBackgroundTile(sprite: Sprite) {
    background_tile = sprite;
}

/**
 * Initialise les canvas
 *
 */
function initCanvas() {
    interactible_canvas = <HTMLCanvasElement>document.getElementById("interactableGrid");
    cv_grid = <HTMLCanvasElement>document.getElementById("backGrid");
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
        x: (evt.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
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
function drawBackgroundGrid(zoom: number, sprite_tile: Sprite, back_grid_ctx: CanvasRenderingContext2D) {
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
function moveScreen(dir: number) {
    // 0: top; 1: right; 2: bottom; 3: left
    console.log(dir);
    switch (dir) {
        case 0:
            if (show_grid_pos[1] > 0) {
                show_grid_pos[1]--;
            }
            break;

        case 1:
            console.log(show_grid_pos[0] + show_grid_size)
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

function zoomScreen(updown: number) {
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

export {
    refreshScreen,
    getMousePos,
    drawBackgroundGrid,
    initCanvas,
    show_grid_pos,
    show_grid_size,
    all_grids,
    moveScreen,
    interactible_canvas,
    zoomScreen,
    back_grid_ctx,
    setBackgroundTile,
    grid_size
};
