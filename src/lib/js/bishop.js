import { Piece } from "./piece"

export class Bishop extends Piece {
    constructor(x, y, white) {
        super(x, y, white, 'b')
    }

    resetMoves() {
        this.moves = [
            { dir: 'fr', steps: -1 },
            { dir: 'fl', steps: -1 },
            { dir: 'br', steps: -1 },
            { dir: 'bl', steps: -1 },
        ]
    }

    conditions() {
        this.resetMoves()
    }
}