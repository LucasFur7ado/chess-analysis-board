import { diagonalMove, straightMove } from './functions.js'
import { nanoid } from 'nanoid'

export class Piece {
    constructor(x, y, white = false, type = 'p') {
        this.type = type
        this.id = nanoid()
        this.pos = { x, y }
        this.white = Boolean(white)
    }

    getMoves(board) {
        this.conditions(board)
        let moves = []
        this.moves.map(m => {
            if (m.dir == 'xy') {
                const y = this.white ? (this.pos.y - m.coor.y) : (this.pos.y + m.coor.y)
                const x = this.white ? (this.pos.x - m.coor.x) : (this.pos.x + m.coor.x)
                const validCoor = (y >= 0 && x >= 0 && y < 8 && x < 8)
                if (validCoor && (board[y][x] == null || ((!(board[y][x] == null)
                    && !(board[y][x].white == this.white))))) {
                    moves.push({ y, x })
                }
            }
            straightMove(m, this, board, moves, m.dir)
            diagonalMove(m, this, board, moves, m.dir)
        })
        return moves
    }
}