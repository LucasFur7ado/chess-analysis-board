import { Piece } from "./piece" 

export class King extends Piece {
    constructor(x, y, white) {
        super(x, y, white, 'K')
    }

    resetMoves() {
        this.moves = [
            { dir: 'f', steps: 1 },
            { dir: 'b', steps: 1 },
            { dir: 'r', steps: 1 },
            { dir: 'l', steps: 1 },
            { dir: 'fl', steps: 1 },
            { dir: 'fr', steps: 1 },
            { dir: 'bl', steps: 1 },
            { dir: 'br', steps: 1 },
        ]
    }

    conditions() {
        this.resetMoves()
    }
}