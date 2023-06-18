import { Piece } from "./piece"

export class Knight extends Piece {
    constructor(x, y, white) {
        super(x, y, white, 'k')
    }

    resetMoves() {
        this.moves = [
            { dir: 'xy', coor: { x: -2, y: -1 } },
            { dir: 'xy', coor: { x: -1, y: -2 } },
            { dir: 'xy', coor: { x: +1, y: -2 } },
            { dir: 'xy', coor: { x: +2, y: -1 } },
            { dir: 'xy', coor: { x: +2, y: +1 } },
            { dir: 'xy', coor: { x: +1, y: +2 } },
            { dir: 'xy', coor: { x: -1, y: +2 } },
            { dir: 'xy', coor: { x: -2, y: +1 } }
        ]
    }

    conditions() {
        this.resetMoves()
    }
}





