import { GameObject } from "./modules/GameObjectClass.js";

let allObjects = [];

allObjects.push(new GameObject("Bruh", [12, 4]));

console.log(allObjects[0].getObjectName());
