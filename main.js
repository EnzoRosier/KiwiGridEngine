import {
    GameObject,
    Sprite,
    SpriteAnimation,
} from "./modules/GameObjectClass.js";
import { refreshScreen } from "./modules/GameTools.js";

var canvas = document.getElementById("gameWindow");
let allObjects = [];

let spriteA = new Sprite("./ressources/Test_SimpleSprite.png", [100, 100]);
let spriteB = new SpriteAnimation(
    "./ressources/Test_SpriteSheet.png",
    [100, 100],
    [16, 16],
    7
);

let objA = new GameObject("objet A", [10, 10]);
let objB = new GameObject("objet B", [100, 10]);

objA.addToSpriteCollection("spriteAnim", spriteB);
objA.addToSpriteCollection("spriteImage", spriteA);
objA.setCurrentSprite("spriteImage");

objB.addToSpriteCollection("spriteImage", spriteA);
objB.setCurrentSprite("spriteImage");

allObjects.push(objA);
allObjects.push(objB);

console.log(allObjects[0].getObjectName());

refreshScreen(allObjects);

window.onkeydown = function () {
    objA.stopRender()
    objA.setCurrentSprite("spriteAnim");
    refreshScreen(allObjects);
};
