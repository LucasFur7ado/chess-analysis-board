import { Piece } from "./piece" 

export class King extends Piece {
    constructor(x, y, white) {
        super(x, y, white, 'K')
    }
}