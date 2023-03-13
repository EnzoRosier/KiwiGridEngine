//#region GameObjects
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
        this.sprites_collection = new Map();
        this.curr_sprite = undefined;
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
    setCurrentSprite(name) {
        this.stopRender();
        this.curr_sprite = this.sprites_collection[name];
    }
    /**
     * Ajoute un Sprite ou une Animation dans la collection
     * d'affichage possible
     * @param {string} name
     * @param {Sprite|SpriteAnimation} sprite
     * @memberof GameObject
     */
    addToSpriteCollection(name, sprite) {
        if (sprite instanceof Sprite) {
            this.sprites_collection[name] = new Sprite(sprite.img_url, [sprite.size_X, sprite.size_Y]);
        }
        else {
            this.sprites_collection[name] = new SpriteAnimation(sprite.img_url, [sprite.framesize_X, sprite.framesize_Y], [sprite.framesize_X, sprite.framesize_Y], sprite.nb_frame);
        }
    }
    /**
     * Affiche le gameObject dans le contexte ctx
     * @param {CanvasRenderingContext2D} ctx
     */
    renderObject(ctx) {
        if (this.curr_sprite != undefined) {
            this.curr_sprite.render([this.pos_X * 32 * 10, this.pos_Y * 32 * 10], ctx);
        }
    }
    /**
     *
     * Stop currentAnimation
     * @memberof GameObject
     */
    stopRender() {
        if (this.curr_sprite instanceof SpriteAnimation) {
            this.curr_sprite.stopRender();
        }
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
     * @param {string} sprite_url chemin du sprite
     * @param {int[]} size_XY taille du sprite
     * @memberof Sprite
     */
    constructor(sprite_url, size_XY) {
        this.size_X = size_XY[0];
        this.size_Y = size_XY[1];
        this.img = new Image();
        this.img.src = sprite_url;
        this.img_url = sprite_url;
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
        if (this.img.complete) {
            // Si oui on affiche directement
            ctx.drawImage(this.img, pos[0], pos[1], this.size_X * 10, this.size_Y * 10);
        }
        else {
            // Si non
            this.img.addEventListener("load", (event) => {
                // On attend que l'image soit chargée
                ctx.drawImage(this.img, pos[0], pos[1], this.size_X * 10, this.size_Y * 10);
            });
        }
    }
}
/**
 * Objet contenant une animation et ses informations
 *
 * @class SpriteAnimation
 */
class SpriteAnimation {
    /**
     * Creates an instance of SpriteAnimation.
     * @param {string} spriteSheet_URL
     * @param {int[]} size_XY
     * @param {int[]} FrameSize_XY
     * @param {int} nb_frame
     * @memberof SpriteAnimation
     */
    constructor(spriteSheet_URL, size_XY, frameSize_XY, nb_frame) {
        this.img = new Image();
        this.img.src = spriteSheet_URL;
        this.img_url = spriteSheet_URL;
        this.size_X = size_XY[0];
        this.size_Y = size_XY[1];
        this.framesize_X = frameSize_XY[0];
        this.framesize_Y = frameSize_XY[1];
        this.nb_frame = nb_frame;
        this.request_id = undefined;
    }
    /**
     * Fonction Affichant l'animation
     *
     * @param {int[]} pos position [X, Y]
     * @param {CanvasRenderingContext2D} ctx
     * @memberof SpriteAnimation
     */
    render(pos, ctx) {
        if (!this.request_id) {
            if (this.img.complete) {
                // Si oui on affiche directement
                this.request_id = window.requestAnimationFrame(function () {
                    this.step(pos, ctx, this.nb_frame, 0);
                }.bind(this));
            }
            else {
                this.img.addEventListener("load", (event) => {
                    this.request_id = window.requestAnimationFrame(function () {
                        this.step(pos, ctx, this.nb_frame, 0);
                    }.bind(this));
                });
            }
        }
    }
    /**
     * Fonction permettant de décidé la frame à afficher ensuite
     * @param {int[]} pos
     * @param {CanvasRenderingContext2D} ctx
     * @param {int} counter
     * @param {int} frame_count
     */
    step(pos, ctx, counter, frame_count) {
        //this.request_id = undefined;
        frame_count++;
        if (frame_count < 15) {
            this.request_id = window.requestAnimationFrame(function () {
                this.step(pos, ctx, counter, frame_count);
            }.bind(this));
            return;
        }
        frame_count = 0;
        ctx.clearRect(pos[0], pos[1], this.size_X * 10, this.size_Y * 10);
        this.drawFrame(counter, 0, pos, ctx);
        counter++;
        if (counter >= this.nb_frame) {
            counter = 0;
            this.request_id = window.requestAnimationFrame(function () {
                this.step(pos, ctx, counter, frame_count);
            }.bind(this));
            return;
        }
        this.request_id = window.requestAnimationFrame(function () {
            this.step(pos, ctx, counter, frame_count);
        }.bind(this));
    }
    /**
     * Affiche une frame de l'animation
     *
     * @param {int} frameX
     * @param {int} frameY
     * @param {int[]} pos_XY
     * @param {CanvasRenderingContext2D} ctx
     * @memberof SpriteAnimation
     */
    drawFrame(frameX, frameY, pos_XY, ctx) {
        ctx.drawImage(this.img, frameX * this.framesize_X, frameY * this.framesize_Y, this.framesize_X, this.framesize_Y, pos_XY[0], pos_XY[1], this.size_X * 10, this.size_Y * 10);
    }
    stopRender() {
        if (this.request_id) {
            window.cancelAnimationFrame(this.request_id);
            this.request_id = undefined;
        }
    }
}
export { GameObject, Sprite, SpriteAnimation };
//#endregion
//# sourceMappingURL=GameObjectClass.js.map