import { Rook } from './rook'
import { Pawn } from './pawn'
import { King } from './king'
import { Queen } from './queen'
import { Knight } from './knight'
import { Bishop } from './bishop'
import { get } from 'svelte/store'
import { board, history } from '$lib/store.js'

export class Config {
    constructor() {
        this.freeMode = false
    }
}

export class Board {
    constructor() {
        let board = [[], [], [], [], [], [], [], []], white = true
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
        this.whiteIsBottom = true 
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
        board.set(this)
    }

    move(coor) {
        this.board[this.activePiece.pos.y][this.activePiece.pos.x] = null
        this.board[coor.y][coor.x] = this.activePiece
        this.activePiece.pos = { x: coor.x, y: coor.y }
        this.activePiece = null
        this.possibleMoves = null
        this.updateHistory()
        board.set(this)
    }

    take(active, toBeTaken) {
        this.board[active.pos.y][active.pos.x] = null
        this.board[toBeTaken.pos.y][toBeTaken.pos.x] = active
        active.pos = { x: toBeTaken.pos.x, y: toBeTaken.pos.y }
        toBeTaken = undefined
        this.activePiece = null
        this.possibleMoves = null
        this.updateHistory()
        board.set(this)
    }

    updateHistory() {
        const b = JSON.parse(JSON.stringify(this.board))
        history.update(h => h = [b, ...h])
        const h = get(history)
    }

    invertBoard() {
        const invert = (b) => {
            for (let y = 0; y < 4; y++)
                for (let x = 0; x < 8; x++) {
                    const aux = b[y][x]
                    b[y][x] = b[7 - y][7 - x]
                    b[7 - y][7 - x] = aux
                    if (b[y][x] !== null)
                        b[y][x].pos = { x, y }
                    if (b[7 - y][7 - x] !== null)
                        b[7 - y][7 - x].pos = {
                            x: 7 - x,
                            y: 7 - y
                        }
                }
        }
        invert(this.board)
        // Invert all history records
        history.update(h => h = h.map(hh => {
            invert(hh)
            return hh
        }))
        this.whiteIsBottom = !this.whiteIsBottom
        this.hideMoves()
        board.set(this)
    }

    locateCheck() {
        // See if there is a check or mate  
    }

    coronate(pawn) {
        // Coronate a pawn
    }
}


