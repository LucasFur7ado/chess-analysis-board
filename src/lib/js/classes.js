import { board } from '$lib/store.js'
import { nanoid } from 'nanoid'

export class Config {
    constructor() {
        this.freeMode = false
    }
}

export class Piece {
    constructor(x, y, white = false, type = 'p') {
        this.type = type
        this.id = nanoid()
        this.pos = { x, y }
        this.white = Boolean(white)
    }

    getMoves(board) {
        this.conditions(board)
        console.log("MOVES =>Z ", this.moves)
        let moves = []
        this.moves.map(m => {
            if (m.dir == 'f') {
                for (let i = 1; i < m.steps + 1; i++) {
                    const y = this.white ? (this.pos.y - i) : (this.pos.y + i)
                    if (board[y][this.pos.x] !== null) {
                        break
                    } else {
                        moves.push({ y, x: this.pos.x })
                    }
                }
            }
        })
        return moves
    }
}

export class Pawn extends Piece {
    resetMoves() {
        this.moves = [
            {
                dir: 'f',
                steps: 1
            }
        ]
    }

    conditions(board) {
        this.resetMoves()
        if (this.pos.y == 1 || this.pos.y == 6) {
            this.moves = this.moves.map(m => {
                if (m.dir == 'f') return {
                    ...m,
                    steps: 2
                }
                return m
            })
        }
        const sum = (this.white ? 1 : -1)
        if(board[this.pos.y - sum][this.pos.x + sum]) {
            console.log("DIAGNAL")
            this.moves = [
                ...this.moves,
                {
                    dir: 'fr',
                    steps: 1
                }
            ]
        }
    }
}

export class Bishop extends Piece {
    constructor(x, y, white) {
        super(x, y, white, 'b')
    }
}

export class Knight extends Piece {
    constructor(x, y, white) {
        super(x, y, white, 'k')
    }
}

export class Rook extends Piece {
    constructor(x, y, white) {
        super(x, y, white, 'r')
    }
}

export class Queen extends Piece {
    constructor(x, y, white) {
        super(x, y, white, 'q')
    }
}

export class King extends Piece {
    constructor(x, y, white) {
        super(x, y, white, 'K')
    }
}

export class Board {
    constructor(white) {
        let board = [[], [], [], [], [], [], [], []]
        for (let i = 0; i < 8; i++) {
            if (i == 0) {
                board[0] = [
                    new Rook(0, 0, !white), new Knight(1, 0, !white,),
                    new Bishop(2, 0, !white), new Queen(3, 0, !white),
                    new King(4, 0, !white), new Bishop(5, 0, !white),
                    new Knight(6, 0, !white), new Rook(7, 0, !white)]
                board[7] = [
                    new Rook(0, 7, white), new Knight(1, 7, white),
                    new Bishop(2, 7, white), new Queen(3, 7, white),
                    new King(4, 7, white), new Bishop(5, 7, white),
                    new Knight(6, 7, white), new Rook(7, 7, white)]
            }
            if ([2, 3, 4, 5].some(n => n == i))
                for (let k = 0; k < 8; k++)
                    board[i].push(null)
            board[1].push(new Pawn(i, 1, !white))
            board[6].push(new Pawn(i, 6, white))
        }
        this.board = board
        this.check = false
        this.activePiece = null
        this.possibleMoves = null
        this.config = new Config()
    }

    pieceClick(piece, coor = false) {
        const validMove = this?.possibleMoves?.find(m => ((m.x == coor.x) && (m.y == coor.y)))
        if (this.possibleMoves !== null && validMove)
            this.move(coor)
        else if (piece == null || (piece?.id == this.activePiece?.id)) {
            this.activePiece = null
            this.possibleMoves = null
            board.set(this)
        } else if (this.activePiece == null || this.activePiece.white == piece.white) {
            this.activePiece = this.activePiece?.id == piece.id ? null : piece
            board.set(this)
            this.showMoves()
        } else {
            if (piece.white !== this.activePiece.white && validMove)
                this.take(this.activePiece, piece)
        }
    }

    showMoves() {
        const moves = this.activePiece.getMoves(this.board)
        this.possibleMoves = moves
        board.set(this)
    }

    move(coor) {
        this.board[this.activePiece.pos.y][this.activePiece.pos.x] = null
        this.board[coor.y][coor.x] = this.activePiece
        this.activePiece.pos = { x: coor.x, y: coor.y }
        this.activePiece = null
        this.possibleMoves = null
        board.set(this)
    }

    take(active, toBeTaken) {
        this.board[active.pos.y][active.pos.x] = null
        this.board[toBeTaken.pos.y][toBeTaken.pos.x] = active
        active.pos = { x: toBeTaken.pos.x, y: toBeTaken.pos.y }
        toBeTaken = undefined
        this.activePiece = null
        board.set(this)
    }

    locateCheck() {
        // See if there is a check or mate  
    }

    coronate(pawn) {
        // Coronate a pawn
    }

    isValidMove(piece, pos) {

    }
}
