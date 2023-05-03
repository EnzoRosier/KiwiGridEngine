import { Sprite, SpriteAnimation, SpriteManager } from "./Sprite.js";

let interactible_canvas = <HTMLCanvasElement> document.getElementById("interactableGrid");
let interact_ctx = interactible_canvas.getContext("2d");
interact_ctx .imageSmoothingEnabled = false;

/**
 * Objet associant une zone du canvas interactible avec un effet
 * (Affichage optionel)
 *
 * @export
 * @class ClickEvent
 */
export class ClickEvent {
    pos_X: number;
    pos_Y: number;
    width: number;
    height: number;
    event_sprite_manager: SpriteManager;
    event_func: () => void;

    /**
     * Creates an instance of ClickEvent.
     * @param {number[]} pos position
     * @param {number} width largeur
     * @param {numner} height hauteur
     * @memberof ClickEvent
     */
    constructor(pos: number[], width: number, height: number) {
        this.pos_X = pos[0];
        this.pos_Y = pos[1]
        this.width = width;
        this.height = height;
        this.event_func = null;
        this.event_sprite_manager = new SpriteManager();
    }

    /**
     * Retourne si la position pos ce trouve dans la hitbox de l'event
     *
     * @param {*} pos position
     * @return {boolean}  
     * @memberof ClickEvent
     */
    isClicked(pos, zoom:number, zoom_pos: number[]): boolean {
        return pos.x > (this.pos_X - zoom_pos[0]) * (3200/zoom)
            && pos.x < (this.pos_X - zoom_pos[0]) * (3200/zoom) + this.width/this.height * (3200/zoom)
            && pos.y < (this.pos_Y - zoom_pos[1]) * (3200/zoom) + this.height/this.width * (3200/zoom)
            && pos.y > (this.pos_Y - zoom_pos[1]) * (3200/zoom);
    }

    /**
     * Change le sprite du GameObject à afficher
     *
     * @param {string} name
     * @memberof GameObject
     */
    setCurrentSprite(name: string) {
        this.event_sprite_manager.setCurrentSprite(name);
    }

    /**
     * Ajoute un Sprite ou une Animation dans la collection
     * d'affichage possible
     * @param {string} name
     * @param {Sprite|SpriteAnimation} sprite
     * @memberof GameObject
     */
    addToSpriteCollection(name: string, sprite: Sprite | SpriteAnimation) {
        this.event_sprite_manager.addToSpriteCollection(name, sprite);
    }

    /**
     * Affiche le gameObject dans le contexte ctx
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx: CanvasRenderingContext2D, zoom:number, zoom_pos:number[]) {
        
        this.event_sprite_manager.render(interact_ctx, [this.pos_X - zoom_pos[0], this.pos_Y - zoom_pos[1]], zoom, zoom_pos)
    }

    /**
     *
     * Stop currentAnimation
     * @memberof GameObject
     */
    stopRender() {
        this.event_sprite_manager.stopRender()
    }


}