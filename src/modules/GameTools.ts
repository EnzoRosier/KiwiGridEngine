/*import { GameObject } from "./GameObjectClass.js";*/

import { GameObject } from "./GameObjectClass";
import { Grid } from "./Grid";

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


export { refreshScreen };
