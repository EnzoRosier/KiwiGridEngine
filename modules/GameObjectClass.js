/**
 *
 *
 * @class GameObject : Objet de base du jeu
 */
class GameObject {
    /**
     * Creates an instance of GameObject.
     * @param {string} name nom de l'objet
     * @param {[int x, int y]} pos position x puis y de l'objet
     * @memberof GameObject
     */
    constructor(name, pos) {
        this.name = name;
        this.posX = pos[0];
        this.posY = pos[1];
    }
    getObjectName() {
        return this.name;
    }
}

export { GameObject };
