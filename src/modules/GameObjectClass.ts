//#region GameObjects
/**
 *
 *
 * @class GameObject : Objet de base du jeu
 */
class GameObject {
    name: string;
    pos_X: number;
    pos_Y: number;
    spritesCollection: Map<string, Sprite>;
    currSprite: Sprite;

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
        this.spritesCollection = new Map<string, Sprite>();
        this.currSprite = undefined;
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
    setCurrentSprite(name: string) {
        this.stopRender();
        this.currSprite = this.spritesCollection[name];
    }

    /**
     * Ajoute un Sprite ou une Animation dans la collection
     * d'affichage possible
     * @param {string} name
     * @param {Sprite|SpriteAnimation} sprite
     * @memberof GameObject
     */
    addToSpriteCollection(name: string, sprite: Sprite | SpriteAnimation) {
        if (sprite instanceof Sprite) {
            this.spritesCollection[name] = new Sprite(sprite.imgUrl, [sprite.size_X, sprite.size_Y]);
        } else {
            this.spritesCollection[name] = new SpriteAnimation(
                sprite.imgUrl,
                [sprite.frameSize_X, sprite.frameSize_Y],
                [sprite.frameSize_X, sprite.frameSize_Y],
                sprite.nbFrame
            );
        }
    }

    /**
     * Affiche le gameObject dans le contexte ctx
     * @param {CanvasRenderingContext2D} ctx
     */
    renderObject(ctx: CanvasRenderingContext2D) {
        if (this.currSprite != undefined) {
            this.currSprite.render(
                [this.pos_X, this.pos_Y],
                ctx
            );
        }
    }

    /**
     *
     * Stop currentAnimation
     * @memberof GameObject
     */
    stopRender() {
        if (
            this.currSprite instanceof SpriteAnimation
        ) {
            this.currSprite.stopRender();
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
    size_X: number;
    size_Y: number;
    img: HTMLImageElement;
    imgUrl: string;

    /**
     * Creates an instance of Sprite.
     * @param {string} sprite_URL chemin du sprite
     * @param {int[]} size_XY taille du sprite
     * @memberof Sprite
     */
    constructor(sprite_URL: string, size_XY: number[]) {
        this.size_X = size_XY[0];
        this.size_Y = size_XY[1];
        this.img = new Image();
        this.img.src = sprite_URL;
        this.imgUrl = sprite_URL;
    }

    /**
     * Affiche un sprite dans le contexte ctx
     *
     * @param {int[]} pos Position [x, y]
     * @param {CanvasRenderingContext2D} ctx context2D
     * @memberof Sprite
     */
    render(pos: number[], ctx: CanvasRenderingContext2D) {
        ctx.imageSmoothingEnabled = false;
        // On check si l'image du Sprite est chargée par le navigateur
        if (this.img.complete) {
            // Si oui on affiche directement
            ctx.drawImage(this.img, pos[0] * 4, pos[1] * 4, this.size_X * 4, this.size_Y * 4);
        } else {
            // Si non
            this.img.addEventListener("load", (event) => {
                // On attend que l'image soit chargée
                ctx.drawImage(
                    this.img,
                    pos[0] * 4,
                    pos[1] * 4,
                    this.size_X * 4,
                    this.size_Y * 4
                );
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
    size_X: number;
    size_Y: number;
    img: HTMLImageElement;
    imgUrl: string;
    frameSize_X: number;
    frameSize_Y: number;
    nbFrame: number;
    requestID: number;
    /**
     * Creates an instance of SpriteAnimation.
     * @param {string} spriteSheet_URL
     * @param {int[]} size_XY
     * @param {int[]} FrameSize_XY
     * @param {int} nbFrame
     * @memberof SpriteAnimation
     */
    constructor(spriteSheet_URL: string, size_XY: number[], frameSize_XY, nbFrame: number) {
        this.img = new Image();
        this.img.src = spriteSheet_URL;
        this.imgUrl = spriteSheet_URL;
        this.size_X = size_XY[0];
        this.size_Y = size_XY[1];
        this.frameSize_X = frameSize_XY[0];
        this.frameSize_Y = frameSize_XY[1];
        this.nbFrame = nbFrame;
        this.requestID = undefined;
    }

    /**
     * Fonction Affichant l'animation
     *
     * @param {int[]} pos position [X, Y]
     * @param {CanvasRenderingContext2D} ctx
     * @memberof SpriteAnimation
     */
    render(pos: number[], ctx: CanvasRenderingContext2D) {
        if (!this.requestID) {
            ctx.imageSmoothingEnabled = false;
            if (this.img.complete) {
                // Si oui on affiche directement
                this.requestID = window.requestAnimationFrame(
                    function () {
                        this.step(pos, ctx, this.nbFrame, 0);
                    }.bind(this)
                );
            } else {
                this.img.addEventListener("load", (event) => {
                    this.requestID = window.requestAnimationFrame(
                        function () {
                            this.step(pos, ctx, this.nbFrame, 0);
                        }.bind(this)
                    );
                });
            }
        }
    }
    /**
     * Fonction permettant de décidé la frame à afficher ensuite
     * @param {int[]} pos
     * @param {CanvasRenderingContext2D} ctx
     * @param {int} counter
     * @param {int} frameCount
     */
    step(pos: number[], ctx: CanvasRenderingContext2D, counter: number, frameCount: number) {
        //this.requestID = undefined;
        frameCount++;
        if (frameCount < 15) {
            this.requestID = window.requestAnimationFrame(
                function () {
                    this.step(pos, ctx, counter, frameCount);
                }.bind(this)
            );
            return;
        }
        frameCount = 0;
        ctx.clearRect(pos[0] * 4, pos[1] * 4, this.size_X * 4, this.size_Y * 4);
        this.drawFrame(counter, 0, pos, ctx);
        counter++;
        if (counter >= this.nbFrame) {
            counter = 0;
            this.requestID = window.requestAnimationFrame(
                function () {
                    this.step(pos, ctx, counter, frameCount);
                }.bind(this)
            );
            return;
        }
        this.requestID = window.requestAnimationFrame(
            function () {
                this.step(pos, ctx, counter, frameCount);
            }.bind(this)
        );
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
    drawFrame(frameX: number, frameY: number, pos_XY: number[], ctx: CanvasRenderingContext2D) {
        
        ctx.drawImage(
            this.img,
            frameX * this.frameSize_X,
            frameY * this.frameSize_Y,
            this.frameSize_X,
            this.frameSize_Y,
            pos_XY[0] * 4,
            pos_XY[1] * 4,
            this.size_X * 4,
            this.size_Y * 4
        );
    }

    stopRender() {
        if (this.requestID) {
            window.cancelAnimationFrame(this.requestID);
            this.requestID = undefined;
        }
    }
}

export { GameObject, Sprite, SpriteAnimation };

//#endregion
