import { activePiece } from '$lib/store.js'

export class Piece {
    constructor(x, y, white = false, type = 'p') {
        this.type = type
        this.pos = [x, y]
        this.showMoves = false
        this.id = Math.random()
        this.white = Boolean(white)
    }
}

export class Pawn extends Piece {
    showMoves() {
        console.log("SHOW")
    }
}

export class Bishop extends Piece {
    constructor(x, y, white) {
        super(x, y, white, 'b')
    }
    showMoves() {
        console.log("SHOW")
    }
}

export class Knight extends Piece {
    constructor(x, y, white) {
        super(x, y, white, 'k')
    }
    showMoves() {
        console.log("SHOW")
    }
}

export class Rook extends Piece {
    constructor(x, y, white) {
        super(x, y, white, 'r')
    }
    showMoves() {
        console.log("SHOW")
    }
}

export class Queen extends Piece {
    constructor(x, y, white) {
        super(x, y, white, 'q')
    }
    showMoves() {
        console.log("SHOW")
    }
}

export class King extends Piece {
    constructor(x, y, white) {
        super(x, y, white, 'K')
    }
    showMoves() {
        console.log("SHOW")
    }
}

export class Board {
    constructor(white) {
        let board = [[], [], [], [], [], [], [], []]
        for (let i = 0; i < 8; i++) {
            if (i == 0) {
                board[0] = [
                    new Rook(0, 0, !white), new Knight(0, 1, !white,),
                    new Bishop(0, 2, !white), new Queen(0, 3, !white),
                    new King(0, 4, !white), new Bishop(0, 5, !white),
                    new Knight(0, 6, !white), new Rook(0, 7, !white)]
                board[7] = [
                    new Rook(7, 0, white), new Knight(7, 1, white),
                    new Bishop(7, 2, white), new Queen(7, 3, white),
                    new King(7, 4, white), new Bishop(7, 5, white),
                    new Knight(7, 6, white), new Rook(7, 7, white)]
            }
            if ([2, 3, 4, 5].some(n => n == i))
                for (let k = 0; k < 8; k++)
                    board[i].push(null)
            board[1].push(new Pawn(1, i, !white))
            board[6].push(new Pawn(6, i, white))
        }
        this.board = board
        this.activePiece = null
    }

    pieceClick(piece) {
        console.log("click")
        if (piece == null) {
            this.activePiece = null
            activePiece.set(null)
        } else if (this.activePiece == null || this.activePiece.white == piece.white) {
            this.activePiece = this.activePiece?.id == piece.id ? null : piece
            activePiece.set(this.activePiece)
            this.board = this.board.map(p => {
                if (p.id == piece.id)
                    p.showMoves = !p.showMoves
                return p
            })
        } else {
            if (piece.white !== this.activePiece.white)
                this.take(piece, this.activePiece)
        }
    }

    move(piece,) {
        console.log("MOVE")
    }

    take(active, taken) {
        console.log("A => ", active, taken)
        this.activePiece = null
        activePiece.set(null)
        console.log("TAKE")
    }

    isValidMove(piece, pos) {

    }

    get showBoard() {
        return this.board
    }
}
