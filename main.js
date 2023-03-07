import { GameObject, Sprite } from "./modules/GameObjectClass.js";
import { refreshScreen } from "./modules/GameTools.js";

let allObjects = [];

allObjects.push(new GameObject("Bruh", [12, 4], new Sprite("./ressources/Test_SimpleSprite.png", [10,10])));

console.log(allObjects[0].getObjectName());

refreshScreen(allObjects);