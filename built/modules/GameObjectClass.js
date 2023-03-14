//#region GameObjects
import { SpriteManager } from "./Sprite.js";
import { ClickEvent } from "./Events.js";
/**
 *
 *
 * @class GameObject : Objet de base du jeu
 */
class GameObject {
    /**
     * Creates an instance of GameObject.
     * @param {string} name nom de l'objet
     * @param {int[]} pos position x puis y de l'objet
     * @memberof GameObject
     */
    constructor(name, pos) {
        this.name = name;
        this.pos_X = pos[0];
        this.pos_Y = pos[1];
        this.object_sprite_manager = new SpriteManager();
        this.linked_click_event = undefined;
    }
    /**
     * Renvoie le nom du GameObject
     * @return {string} nom du GameObject
     * @memberof GameObject
     */
    getObjectName() {
        return this.name;
    }
    /**
     * Renvoie la position du GameObject
     * @return {int[]}
     * @memberof GameObject
     */
    getObjectPos() {
        return [this.pos_X, this.pos_Y];
    }
    /**
     * Change le sprite du GameObject à afficher
     *
     * @param {string} name
     * @memberof GameObject
     */
    setObjectCurrentSprite(name) {
        this.object_sprite_manager.setCurrentSprite(name);
    }
    /**
     * Ajoute un Sprite ou une Animation dans la collection
     * d'affichage possible
     * @param {string} name
     * @param {Sprite|SpriteAnimation} sprite
     * @memberof GameObject
     */
    addToObjectSpriteCollection(name, sprite) {
        this.object_sprite_manager.addToSpriteCollection(name, sprite);
    }
    /**
     * Affiche le gameObject dans le contexte ctx
     * @param {CanvasRenderingContext2D} ctx
     */
    renderObject(ctx) {
        this.object_sprite_manager.render(ctx, [this.pos_X, this.pos_Y]);
        if (!(this.linked_click_event === undefined)) {
            this.linked_click_event.render(ctx);
        }
    }
    /**
     *
     * Stop currentAnimation
     * @memberof GameObject
     */
    stopObjectRender() {
        this.object_sprite_manager.stopRender();
        this.linked_click_event.stopRender();
    }
    setLinkedClickEvent(offset_pos, width, height, sprite, func) {
        this.linked_click_event = new ClickEvent([this.pos_X + offset_pos[0], this.pos_X + offset_pos[1]], width, height);
        if (!(sprite === undefined)) {
            this.linked_click_event.addToSpriteCollection("spriteBase", sprite);
            this.linked_click_event.setCurrentSprite("spriteBase");
        }
        if (!(func === undefined)) {
            this.linked_click_event.event_func = func;
        }
    }
}
//#endregion
export { GameObject };
//# sourceMappingURL=GameObjectClass.js.map