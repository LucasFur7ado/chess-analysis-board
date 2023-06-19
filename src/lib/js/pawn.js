import { board as boardStore } from '$lib/store'
import { get } from 'svelte/store'
import { Piece } from './piece'

export class Pawn extends Piece {
    resetMoves() {
        this.moves = [
            { dir: 'f', steps: 1 }
        ]
    }

    conditions(board) {
        this.resetMoves()
        const boardS = get(boardStore)
        if (this.pos.y == 1 || this.pos.y == 6) {
            this.moves = this.moves.map(m => {
                if (m.dir == 'f') return {
                    ...m,
                    steps: 2
                }
                return m
            })
        }
        const cond = ((this.white && boardS.whiteIsBottom) || 
        (!this.white && !boardS.whiteIsBottom))
        const sum = (cond ? 1 : -1)
        const y = this.pos.y - sum
        const x = this.pos.x + sum
        const validCoor = (y >= 0 && x >= 0 && y < 8 && x < 8)
        // Able to take 
        if (validCoor && board[y][x]) {
            this.moves = [
                ...this.moves,
                {
                    dir: 'fr',
                    steps: 1
                }
            ]
        }
        if (validCoor && board[y][(cond ? x - 2 : x + 2)]) {
            console.log(board[y][x])
            this.moves = [
                ...this.moves,
                {
                    dir: 'fl',
                    steps: 1
                }
            ]
        }
        // TODO: En passant
    }
}