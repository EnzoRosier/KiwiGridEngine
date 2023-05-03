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
    render(pos, ctx, zoom) {
        // On check si l'image du Sprite est chargée par le navigateur
        if (this.img.complete) {
            // Si oui on affiche directement
            ctx.drawImage(this.img, pos[0], pos[1], 3200 / zoom, 3200 / zoom);
        }
        else {
            // Si non
            this.img.addEventListener("load", (event) => {
                // On attend que l'image soit chargée
                ctx.drawImage(this.img, pos[0], pos[1], 3200 / zoom, 3200 / zoom);
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
    /**
     * Fonction qui arrête l'animation en cours
     *
     * @memberof SpriteAnimation
     */
    stopRender() {
        if (this.request_id) {
            window.cancelAnimationFrame(this.request_id);
            this.request_id = undefined;
        }
    }
}
/**
 * Classe permettant de géré une collection de Sprite / Animation
 *
 * @class SpriteManager
 */
class SpriteManager {
    constructor() {
        this.sprites_collection = new Map();
        this.curr_sprite = undefined;
    }
    /**
     * Change le Sprite actuelle
     *
     * @param {string} name
     * @memberof SpriteManager
     */
    setCurrentSprite(name) {
        this.stopRender();
        this.curr_sprite = this.sprites_collection[name];
    }
    /**
     * Ajoute un Sprite / une Animation à la collection
     *
     * @param {string} name
     * @param {(Sprite | SpriteAnimation)} sprite
     * @memberof SpriteManager
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
     * Affiche le gameObject dans le contexte ctx à la position pos
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number[]} pos
     */
    render(ctx, pos) {
        if (this.curr_sprite != undefined) {
            this.curr_sprite.render([pos[0] * 32 * 10, pos[1] * 32 * 10], ctx, 9 //TMP
            );
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
export { SpriteAnimation, Sprite, SpriteManager };
//# sourceMappingURL=Sprite.js.map