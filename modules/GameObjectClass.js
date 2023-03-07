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
     * @param {Sprite|SpriteAnimation} sprite_url Sprite du GameObject
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
     * Renvoie la position du GameObject
     * @return {int[]}
     * @memberof GameObject
     */
    getObjectPos() {
        return [this.pos_X, this.pos_Y];
    }

    /**
     * Affiche le gameObject dans le contexte ctx
     * @param {CanvasRenderingContext2D} ctx
     */
    renderObject(ctx) {
        /*if (typeof(this.sprite) === Sprite) {
            this.sprite.render([this.pos_X, this.pos_Y], ctx);
        } else if (typeof(this.sprite) === SpriteAnimation) {
            this.sprite.render([this.pos_X, this.pos_Y], ctx);
        }*/
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
        ctx.imageSmoothingEnabled = false;
        // On check si l'image du Sprite est chargée par le navigateur
        if (this.img.complete) {
            // Si oui on affiche directement
            ctx.drawImage(this.img, pos[0], pos[1], this.size_X, this.size_Y);
        } else {
            // Si non
            this.img.onload = (event) => {
                // On attend que l'image soit chargée
                ctx.drawImage(
                    this.img,
                    pos[0],
                    pos[1],
                    this.size_X,
                    this.size_Y
                );
            };
        }
    }
}

class SpriteAnimation {
    /**
     * Creates an instance of SpriteAnimation.
     * @param {string} spriteSheet_URL
     * @param {int[]} size_XY
     * @param {int[]} FrameSize_XY
     * @param {int} nbFrame
     * @memberof SpriteAnimation
     */
    constructor(spriteSheet_URL, size_XY, frameSize_XY, nbFrame) {
        this.img = new Image();
        this.img.src = spriteSheet_URL;
        this.size_X = size_XY[0];
        this.size_Y = size_XY[1];
        this.frameSize_X = frameSize_XY[0];
        this.frameSize_Y = frameSize_XY[1];
        this.nbFrame = nbFrame;
    }

    /**
     * Fonction Affichant l'animation
     *
     * @param {int[]} pos position [X, Y]
     * @param {CanvasRenderingContext2D} ctx
     * @memberof SpriteAnimation
     */
    render(pos, ctx) {
        ctx.imageSmoothingEnabled = false;
        if (this.img.complete) {
            // Si oui on affiche directement
            window.requestAnimationFrame(
                function () {
                    this.step(pos, ctx, this.nbFrame, 0);
                }.bind(this),
                this.nbFrame
            );
        } else {
            this.img.onload = (event) => {
                window.requestAnimationFrame(
                    function () {
                        this.step(pos, ctx, this.nbFrame, 0);
                    }.bind(this),
                    this.nbFrame
                );
            };
        }
    }
    /**
     * Fonction permettant de décidé la frame à afficher ensuite
     * @param {int[]} pos
     * @param {CanvasRenderingContext2D} ctx
     * @param {int} counter
     * @param {int} frameCount
     */
    step(pos, ctx, counter, frameCount) {
        frameCount++;
        if (frameCount < 15) {
            window.requestAnimationFrame(function () {
                this.step(pos, ctx, counter, frameCount);
            }.bind(this), counter);
            return;
        }
        frameCount = 0;
        ctx.clearRect(pos[0], pos[1], this.size_X, this.size_Y);
        this.drawFrame(counter, 0, pos, ctx);
        counter++;
        if (counter >= this.nbFrame) {
            counter = 0;
            window.requestAnimationFrame(function () {
                this.step(pos, ctx, counter, frameCount);
            }.bind(this), counter);
            return;
        }
        window.requestAnimationFrame(function () {
            this.step(pos, ctx, counter, frameCount);
        }.bind(this), counter);
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
        ctx.drawImage(
            this.img,
            frameX * this.frameSize_X,
            frameY * this.frameSize_Y,
            this.frameSize_X,
            this.frameSize_Y,
            pos_XY[0],
            pos_XY[1],
            this.size_X,
            this.size_Y
        );
    }
}

export { GameObject, Sprite, SpriteAnimation };

//#endregion
