import {GameObject} from './modules/GameObjectClass.js';

let allObjects = [];

allObjects.push(new GameObject("test"));

console.log(allObjects[0].getObjectName());