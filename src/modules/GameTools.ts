/*import { GameObject } from "./GameObjectClass.js";*/

import { GameObject } from "./GameObjectClass";

var dpi = window.devicePixelRatio;
var canvas = <HTMLCanvasElement> document.getElementById("gameWindow");
var ctx : CanvasRenderingContext2D = canvas.getContext('2d');

/**
 * Affiche tout les GameObjects contenus dans une liste
 *
 * @param {GameObject[]} ObjectList Liste de GameObject
 */
function refreshScreen(ObjectList: GameObject[]) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fix_dpi(); //On règle le dpi
    ObjectList.forEach((val) => {
        //val.stopRender()
        ctx.imageSmoothingEnabled = false;
        val.renderObject(ctx);
    });
}

/**
 * Fonction permettant de scale le canvas sans flouter le contenu
 *
 */
function fix_dpi() {
    //get CSS height
    let style_height: number = +getComputedStyle(canvas)
        .getPropertyValue("height")
        .slice(0, -2);
    //get CSS width
    let style_width: number = +getComputedStyle(canvas)
        .getPropertyValue("width")
        .slice(0, -2);
    //scale the canvas
    canvas.setAttribute("height", (style_height * dpi).toString(10));
    canvas.setAttribute("width", (style_width * dpi).toString(10));
}

export { refreshScreen };
