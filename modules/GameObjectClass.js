//#endregion GameObjects
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
     * @param {Sprite} sprite_url Sprite du GameObject
     * @memberof GameObject
     */
    constructor(name, pos, sprite) {
        this.name = name;
        this.pos_X = pos[0];
        this.pos_Y = pos[1];
        this.sprite = sprite;
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
     * Affiche le gameObject dans le contexte ctx
     * @param {CanvasRenderingContext2D} ctx 
     */
    renderObject(ctx) {
        this.sprite.render([this.pos_X, this.pos_Y], ctx);
    }
}
//#endregion

//#region Sprite & Animation
/**
 * Objet d'un sprite (1 image)
 *
 * @class Sprite
 */
class Sprite {
    /**
     * Creates an instance of Sprite.
     * @param {string} sprite_URL chemin du sprite
     * @param {int[]} size_XY taille du sprite
     * @memberof Sprite
     */
    constructor(sprite_URL, size_XY) {
        this.size_X = size_XY[0];
        this.size_Y = size_XY[1];
        this.img = new Image();
        this.img.src = sprite_URL;
    }

    /**
     * Affiche un sprite dans le contexte ctx
     *
     * @param {int[]} pos Position [x, y]
     * @param {CanvasRenderingContext2D} ctx context2D
     * @memberof Sprite
     */
    render(pos, ctx) {
        // On check si l'image du Sprite est chargée par le navigateur
        if (this.img.complete) { // Si oui on affiche directement
            ctx.drawImage(this.img, pos[0], pos[1], this.size_X, this.size_Y);
        } else { // Si non
            this.img.onload = (event) => { // On attend que l'image soit chargée
                ctx.drawImage(this.img, pos[0], pos[1], this.size_X, this.size_Y);
            }
        }
    }
}

export { GameObject, Sprite };

//#endregion