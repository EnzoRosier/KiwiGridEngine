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
export { refreshScreen };
//# sourceMappingURL=GameTools.js.map