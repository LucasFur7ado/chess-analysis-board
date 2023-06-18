export const diagonalMove = (m, piece, board, moves, dir) => {
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
        } else {
            break
        }
    }
}

export const straightMove = (m, piece, board, moves, dir) => {
    const f = (dir == 'f')
    const s = (dir == 'r' || dir == 'l') 
    for (let i = 1; i < (m.steps == -1 ? 8 : m.steps + 1); i++) {
        const preY = piece.pos.y - (piece.white ? (f ? +i : -i) : (f ? -i : +i))
        const y = s ? piece.pos.y : (preY)
        const x = s ? (piece.pos.x + (dir == 'r' ? +i : -i)) : piece.pos.x  
        const validCoor = (y >= 0 && x >= 0 && y < 8 && x < 8)
        if (validCoor && board[y][x] !== null) {
            break
        } else {
            moves.push({ y, x })
        }
    }
}