import { board as boardStore, history, historyLocation } from '$lib/store'
import { get } from 'svelte/store'
import { Board } from './board'

export const resetBoard = () => {
    const newBoard = new Board()
    boardStore.set(newBoard)
    historyLocation.set(0)
    history.set([JSON.parse(JSON.stringify(newBoard.board))])
}

export const updateHistory = (e, side = false) => {
    const h = get(history)
    let hl = get(historyLocation)
    if (side) {
        if (side == 'left' && hl !== (h.length - 1))
            historyLocation.set(hl += 1)
        else if (side == 'right' && hl !== 0)
            historyLocation.set(hl -= 1)
    } else {
        if (e.key == "ArrowLeft" && hl !== (h.length - 1))
            historyLocation.set(hl += 1)
        else if (e.key == "ArrowRight" && hl !== 0)
            historyLocation.set(hl -= 1)
    }
}

export const diagonalMove = (m, piece, board, moves, dir) => {
    if (!['fl', 'fr', 'bl', 'br'].find(s => s == dir))
        return null
    const f = (dir == 'fr' || dir == 'fl')
    const l = (dir == 'bl' || dir == 'fl')
    for (let i = 1; i < (m.steps == -1 ? 8 : m.steps + 1); i++) {
        const y = piece.pos.y - (f ? (piece.white ? i : -i) : (- (piece.white ? i : -i)))
        const x = piece.pos.x - (l ? (piece.white ? i : -i) : (- (piece.white ? i : -i)))
        console.log(x, y)
        const validCoor = (y >= 0 && x >= 0 && y < 8 && x < 8)
        if (validCoor && (!(board[y][x] !== null) || ((board[y][x] !== null)
            && !(board[y][x].white == piece.white)))) {
            moves.push({ y, x })
            if (board[y][x] !== null)
                break
        } else {
            break
        }
    }
}

export const straightMove = (m, piece, board, moves, dir) => {
    if (!['f', 'r', 'b', 'l'].find(s => s == dir))
        return null
    const f = (dir == 'f')
    const s = (dir == 'r' || dir == 'l')
    for (let i = 1; i < (m.steps == -1 ? 8 : m.steps + 1); i++) {
        const preY = piece.pos.y - (piece.white ? (f ? +i : -i) : (f ? -i : +i))
        const y = s ? piece.pos.y : (preY)
        const x = s ? (piece.pos.x + (dir == 'r' ? +i : -i)) : piece.pos.x
        const validCoor = (y >= 0 && x >= 0 && y < 8 && x < 8)
        if (validCoor && (!(board[y][x] !== null) || ((board[y][x] !== null)
            && !(board[y][x].white == piece.white)))) {
            moves.push({ y, x })
            if (board[y][x] !== null)
                break
        } else {
            break
        }
    }
}