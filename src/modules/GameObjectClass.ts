//#region GameObjects

import { Sprite, SpriteAnimation, SpriteManager } from "./Sprite.js";
import { ClickEvent } from "./Events.js";

/**
 *
 *
 * @class GameObject : Objet de base du jeu
 */
class GameObject {
    name: string;
    pos_X: number;
    pos_Y: number;
    linked_click_event: ClickEvent;
    object_sprite_manager : SpriteManager;


    /**
     * Creates an instance of GameObject.
     * @param {string} name nom de l'objet
     * @param {int[]} pos position x puis y de l'objet
     * @memberof GameObject
     */
    constructor(name: string, pos: number[]) {
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
    getObjectName(): string {
        return this.name;
    }

    /**
     * Renvoie la position du GameObject
     * @return {int[]}
     * @memberof GameObject
     */
    getObjectPos(): number[] {
        return [this.pos_X, this.pos_Y];
    }

    /**
     * Change le sprite du GameObject à afficher
     *
     * @param {string} name
     * @memberof GameObject
     */
    setObjectCurrentSprite(name: string) {
       this.object_sprite_manager.setCurrentSprite(name);
    }

    /**
     * Ajoute un Sprite ou une Animation dans la collection
     * d'affichage possible
     * @param {string} name
     * @param {Sprite|SpriteAnimation} sprite
     * @memberof GameObject
     */
    addToObjectSpriteCollection(name: string, sprite: Sprite | SpriteAnimation) {
        this.object_sprite_manager.addToSpriteCollection(name, sprite);
    }

    /**
     * Affiche le gameObject dans le contexte ctx
     * @param {CanvasRenderingContext2D} ctx
     */
    renderObject(ctx: CanvasRenderingContext2D) {
        
        this.object_sprite_manager.render(ctx, [this.pos_X, this.pos_Y])
    }

    /**
     *
     * Stop currentAnimation
     * @memberof GameObject
     */
    stopObjectRender() {
        this.object_sprite_manager.stopRender()
    }
}
//#endregion

export { GameObject };

