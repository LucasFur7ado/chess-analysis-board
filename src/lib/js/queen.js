import { Piece } from './piece'

export class Queen extends Piece {
    constructor(x, y, white) {
        super(x, y, white, 'q')
    }
}