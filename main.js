import { GameObject, Sprite, SpriteAnimation } from "./modules/GameObjectClass.js";
import { refreshScreen } from "./modules/GameTools.js";

var canvas = document.getElementById("gameWindow");
var ctx = canvas.getContext("2d");
let allObjects = [];

allObjects.push(new GameObject("Bruh", [10, 10], new SpriteAnimation("./ressources/Test_SpriteSheet.png", [100,100], [16,16], 7)));

console.log(allObjects[0].getObjectName());

refreshScreen(allObjects);

let testAnim = new SpriteAnimation("./ressources/Test_SpriteSheet.png", [100,100], [16, 16], 7);
testAnim.render([200, 10], ctx);