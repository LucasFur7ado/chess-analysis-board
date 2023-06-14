import { activePiece, possibleMoves } from '$lib/store.js'

export class Piece {
    constructor(x, y, white = false, type = 'p') {
        this.type = type
        this.pos = { x, y }
        this.showMoves = false
        this.id = Math.random()
        this.white = Boolean(white)
    }

    getMoves(board) {
        this.conditions(board)
        let moves = []
        this.moves.map(m => {
            if (m.dir == 'f') {
                for (let i = 1; i < m.steps + 1; i++) {
                    if (board[this.pos.y - i][this.pos.x] !== null) {
                        break
                    } else {
                        moves.push({
                            y: this.pos.y - i,
                            x: this.pos.x
                        })
                    }
                }
            }
        })
        return moves
    }
}

export class Pawn extends Piece {
    constructor(x, y, white) {
        super(x, y, white)
        this.moves = [
            {
                dir: 'f',
                steps: 1
            }
        ]
    }

    conditions(board) {
        if (this.pos.y == 1 || this.pos.y == 6)
            this.moves = this.moves.map(m => {
                if (m.dir == 'f') return {
                    ...m,
                    steps: 2
                }
                return m
            })
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
    }

    pieceClick(piece) {
        if (piece == null) {
            this.activePiece = null
            this.possibleMoves = null
            possibleMoves.set(null)
            activePiece.set(null)
        } else if (this.activePiece == null || this.activePiece.white == piece.white) {
            this.activePiece = this.activePiece?.id == piece.id ? null : piece
            activePiece.set(this.activePiece)
            this.board = this.board.map(p => {
                if (p.id == piece.id)
                    p.showMoves = !p.showMoves
                return p
            })
            this.showMoves()
        } else {
            if (piece.white !== this.activePiece.white)
                this.take(piece, this.activePiece)
        }
    }

    showMoves() {
        const moves = this.activePiece.getMoves(this.board)
        this.possibleMoves = moves
        possibleMoves.set(moves)
    }

    move(piece) {
        console.log("MOVE")
    }

    take(active, taken) {
        console.log("A => ", active, taken)
        this.activePiece = null
        activePiece.set(null)
        console.log("TAKE")
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
