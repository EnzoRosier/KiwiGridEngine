import { GameObject, Sprite, SpriteAnimation, } from "./modules/GameObjectClass.js";
import { refreshScreen } from "./modules/GameTools.js";
let allObjects = [];
let spriteA = new Sprite("./../ressources/Test_SimpleSprite.png", [16, 16]);
let spriteB = new SpriteAnimation("./../ressources/Test_SpriteSheet.png", [16, 16], [16, 16], 7);
let objA = new GameObject("objet A", [10, 10]);
//let objB = new GameObject("objet B", [26, 10]);
objA.addToSpriteCollection("spriteAnim", spriteB);
objA.addToSpriteCollection("spriteImage", spriteA);
objA.setCurrentSprite("spriteImage");
/*objB.addToSpriteCollection("spriteAnim", spriteB);
objB.addToSpriteCollection("spriteImage", spriteA);
objB.setCurrentSprite("spriteImage");*/
allObjects.push(objA);
//allObjects.push(objB);
console.log(allObjects[0].getObjectName());
refreshScreen(allObjects);
var onoff = false;
window.onkeydown = function () {
    if (onoff) {
        onoff = false;
        objA.setCurrentSprite("spriteAnim");
        //objB.setCurrentSprite("spriteAnim");
        refreshScreen(allObjects);
    }
    else {
        onoff = true;
        objA.setCurrentSprite("spriteImage");
        //objB.setCurrentSprite("spriteImage");
        refreshScreen(allObjects);
    }
};
//# sourceMappingURL=main.js.map