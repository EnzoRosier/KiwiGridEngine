import { SpriteManager } from "./Sprite.js";
let interactible_canvas = document.getElementById("interactableGrid");
let interact_ctx = interactible_canvas.getContext("2d");
interact_ctx.imageSmoothingEnabled = false;
/**
 * Objet associant une zone du canvas interactible avec un effet
 * (Affichage optionel)
 *
 * @export
 * @class ClickEvent
 */
export class ClickEvent {
    /**
     * Creates an instance of ClickEvent.
     * @param {number[]} pos position
     * @param {number} width largeur
     * @param {numner} height hauteur
     * @memberof ClickEvent
     */
    constructor(pos, width, height) {
        this.pos_X = pos[0];
        this.pos_Y = pos[1];
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
    isClicked(pos) {
        return pos.x > this.pos_X * 320
            && pos.x < this.pos_X * 320 + this.width * 10
            && pos.y < this.pos_Y * 320 + this.height * 10
            && pos.y > this.pos_Y * 320;
    }
    /**
     * Change le sprite du GameObject à afficher
     *
     * @param {string} name
     * @memberof GameObject
     */
    setCurrentSprite(name) {
        this.event_sprite_manager.setCurrentSprite(name);
    }
    /**
     * Ajoute un Sprite ou une Animation dans la collection
     * d'affichage possible
     * @param {string} name
     * @param {Sprite|SpriteAnimation} sprite
     * @memberof GameObject
     */
    addToSpriteCollection(name, sprite) {
        this.event_sprite_manager.addToSpriteCollection(name, sprite);
    }
    /**
     * Affiche le gameObject dans le contexte ctx
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {
        this.event_sprite_manager.render(interact_ctx, [this.pos_X, this.pos_Y]);
    }
    /**
     *
     * Stop currentAnimation
     * @memberof GameObject
     */
    stopRender() {
        this.event_sprite_manager.stopRender();
    }
}
//# sourceMappingURL=Events.js.map