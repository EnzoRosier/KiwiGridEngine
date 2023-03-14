/*import { GameObject } from "./GameObjectClass.js";*/
var dpi = window.devicePixelRatio;
/**
 * Affiche tout les GameObjects contenus dans une liste
 *
 * @param {GameObject[]} ObjectList Liste de GameObject
 */
function refreshScreen(ObjectList) {
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
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY, // been adjusted to be relative to element
    };
}
export { refreshScreen, getMousePos };
//# sourceMappingURL=GameTools.js.map