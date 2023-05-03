import { moveScreen, zoomScreen } from "./GameTools.js";

function initControl() {

    window.onkeydown = function (gfg) {
        console.log("KEY");
        switch (gfg.key) {

            //Move screen UP
            case "z":
                moveScreen(0);
                break;

            //Move screen RIGHT
            case "d":
                moveScreen(1);
                break;

            //Move screen DOWN
            case "s":
                moveScreen(2);
                break;

            //Move screen LEFT
            case "q":
                moveScreen(3);
                break;

            case "-":
                zoomScreen(1);
                break;

            case "+":
                zoomScreen(0);
                break;
        }


    };
};


export { initControl };