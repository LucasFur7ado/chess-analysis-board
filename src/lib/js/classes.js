import { diagonalMove } from './functions.js'
import { board } from '$lib/store.js'
import { nanoid } from 'nanoid'

export class Config {
    constructor() {
        this.freeMode = false
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

    pieceController(piece, coor = false) {
        const validMove = this?.possibleMoves?.find(m => {
            if (((m.x == coor.x) && (m.y == coor.y)))
                return m
        })
        // Hide possible moves
        if ((piece == null && !validMove)
            || (piece?.id == this.activePiece?.id)) {
            this.hideMoves()
            return null
        }
        // Show possible moves
        const sameColor = (this.activePiece?.white == piece?.white)
        if (this.activePiece == null || sameColor
            || (piece && !sameColor && !this.possibleMoves?.find(m => {
                if (((m.x == piece?.pos?.x) && (m.y == piece?.pos?.y)))
                    return m
            }))) {
            this.showMoves(piece)
            return null
        }
        // Move 
        if (this.possibleMoves !== null && validMove) {
            this.move(coor)
            return null
        }
        // Take  
        const validTake = this?.possibleMoves?.find(m => {
            if (((m.x == piece.pos.x) && (m.y == piece.pos.y)))
                return m
        })
        if ((piece.white !== this.activePiece.white) && validTake) {
            this.take(this.activePiece, piece)
            return null
        }
    }

    hideMoves() {
        this.activePiece = null
        this.possibleMoves = null
        board.set(this)
    }

    showMoves(piece) {
        this.activePiece = piece
        const moves = this.activePiece.getMoves(this.board)
        this.possibleMoves = moves
        console.log("POS IBLE => ", this.possibleMoves)
        board.set(this)
    }

    move(coor) {
        console.log("MOVE")
        this.board[this.activePiece.pos.y][this.activePiece.pos.x] = null
        this.board[coor.y][coor.x] = this.activePiece
        this.activePiece.pos = { x: coor.x, y: coor.y }
        this.activePiece = null
        this.possibleMoves = null
        board.set(this)
    }

    take(active, toBeTaken) {
        console.log("TAKE")
        this.board[active.pos.y][active.pos.x] = null
        this.board[toBeTaken.pos.y][toBeTaken.pos.x] = active
        active.pos = { x: toBeTaken.pos.x, y: toBeTaken.pos.y }
        toBeTaken = undefined
        this.activePiece = null
        this.possibleMoves = null
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
            if (m.dir == 'f') {
                for (let i = 1; i < m.steps + 1; i++) {
                    const y = this.white ? (this.pos.y - i) : (this.pos.y + i)
                    const x = this.pos.x 
                    const validCoor = (y >= 0 && x >= 0 && y < 8 && x < 8)
                    if (validCoor && board[y][x] !== null) {
                        break
                    } else {
                        moves.push({ y, x: this.pos.x })
                    }
                }
            }
            if (m.dir == 'fr') {
                diagonalMove(m, this, board, moves, 'fr')
            }
            if (m.dir == 'fl') {
                diagonalMove(m, this, board, moves, 'fl')
            }
            if (m.dir == 'bl') {
                diagonalMove(m, this, board, moves, 'bl')
            }
            if (m.dir == 'br') {
                diagonalMove(m, this, board, moves, 'br')
            }
        })
        return moves
    }
}

export class Pawn extends Piece {
    resetMoves() {
        this.moves = [
            { dir: 'f', steps: 1 }
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
        const y = this.pos.y - sum
        const x = this.pos.x + sum 
        const validCoor = (y >= 0 && x >= 0 && y < 8 && x < 8)
        if (validCoor && board[y][x]) {
            this.moves = [
                ...this.moves,
                {
                    dir: 'fr',
                    steps: 1
                }
            ]
        }
        if (validCoor && board[y][x]) {
            this.moves = [
                ...this.moves,
                {
                    dir: 'fl',
                    steps: 1
                }
            ]
        }
    }
}

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


