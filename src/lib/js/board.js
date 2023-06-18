import { Rook } from './rook'
import { Pawn } from './pawn'
import { King } from './king'
import { Queen } from './queen'
import { Knight } from './knight'
import { Bishop } from './bishop'
import { board } from '$lib/store.js'

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
        board[3][4] = new Rook(4, 3, white)
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


