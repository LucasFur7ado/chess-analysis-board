import { Piece } from "./piece"

export class Rook extends Piece {
    constructor(x, y, white) {
        super(x, y, white, 'r')
    }

    resetMoves() {
        this.moves = [
            { dir: 'f', steps: -1 },
            { dir: 'b', steps: -1 },
            { dir: 'r', steps: -1 },
            { dir: 'l', steps: -1 },
        ]
    }

    conditions() {
        this.resetMoves()
    }
}