import { board as boardStore, history, historyLocation } from '$lib/store'
import { get } from 'svelte/store'
import { Board } from './board'

export const keyboardEventController = (e) => {
    switch (e.key) {
        case "ArrowLeft": return updateHistoryLocation("left")
        case "ArrowRight": return updateHistoryLocation("right")
        case "r": return resetBoard()
        case "i": {
            const boardS = get(boardStore)
            return boardS.invertBoard()
        }
    }
}

export const historyToBoard = (h) => {
    const board = get(boardStore)
    let newBoard = [[],[],[],[],[],[],[],[]]
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            const historyPiece = h[y][x]
            let boardPiece = null 
            for (let k = 0; k < 8; k++) {
                boardPiece = board.board[k].find(p => p?.id == historyPiece?.id)
                if(boardPiece) break
            }
            if(boardPiece == undefined)
                boardPiece = null 
            newBoard[y][x] = boardPiece
        }
    }
    console.log(newBoard)
    boardStore.set(newBoard)
}

export const resetBoard = () => {
    const newBoard = new Board()
    boardStore.set(newBoard)
    historyLocation.set(0)
    history.set([JSON.parse(JSON.stringify(newBoard.board))])
}

export const updateHistoryLocation = (side = false) => {
    const h = get(history)
    let hl = get(historyLocation)
    if (side == 'left' && hl !== (h.length - 1))
        historyLocation.set(hl += 1)
    else if (side == 'right' && hl !== 0)
        historyLocation.set(hl -= 1)
}

export const diagonalMove = (m, piece, board, moves, dir) => {
    if (!['fl', 'fr', 'bl', 'br'].find(s => s == dir))
        return null
    const boardS = get(boardStore)
    const cond = ((piece.white && boardS.whiteIsBottom) ||
        (!piece.white && !boardS.whiteIsBottom))
    const f = (dir == 'fr' || dir == 'fl')
    const l = (dir == 'bl' || dir == 'fl')
    for (let i = 1; i < (m.steps == -1 ? 8 : m.steps + 1); i++) {
        const finalI = cond ? i : -i
        const y = piece.pos.y - (f ? finalI : (- finalI))
        const x = piece.pos.x - (l ? finalI : (- finalI))
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
    const boardS = get(boardStore)
    const f = (dir == 'f')
    const s = (dir == 'r' || dir == 'l')
    for (let i = 1; i < (m.steps == -1 ? 8 : m.steps + 1); i++) {
        const preY = piece.pos.y - ((piece.white && boardS.whiteIsBottom
            || !piece.white && !boardS.whiteIsBottom) ? (f ? +i : -i) : (f ? -i : +i))
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