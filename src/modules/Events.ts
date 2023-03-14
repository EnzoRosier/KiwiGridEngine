/**
 * Objet associant une zone du canvas interactible avec un effet
 *
 * @export
 * @class ClickEvent
 */
export class ClickEvent {
    pos_X: number;
    pos_Y: number;
    width: number;
    height: number;
    event_func: () => void;

    constructor(pos: number[], width: number, height) {
        this.pos_X = pos[0];
        this.pos_Y = pos[1]
        this.width = width;
        this.height = height;
        this.event_func = null;
    }

    isClicked(pos): boolean {
        return pos.x > this.pos_X * 320
        && pos.x < this.pos_X * 320 + this.width * 10
        && pos.y < this.pos_Y * 320 + this.height * 10
        && pos.y > this.pos_Y * 320;
    }


}