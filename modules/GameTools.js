import { GameObject } from "./GameObjectClass.js";


var canvas = document.getElementById('gameWindow');
var ctx = canvas.getContext('2d');

/**
 * Affiche tout les GameObjects contenus dans une liste
 *
 * @param {GameObject[]} ObjectList Liste de GameObject
 */
function refreshScreen(ObjectList) {

    ObjectList.forEach(val => {
        val.renderObject(ctx);
    });
}

export { refreshScreen };