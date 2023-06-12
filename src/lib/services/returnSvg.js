import { bishopSvg, kingSvg, knightSvg, queenSvg, rookSvg, pawnSvg } from "../data/piecesSvg"

export const returnSvg = (type = 'p', white) => {
    switch(type) {
        case 'q': return queenSvg(white)
        case 'K': return kingSvg(white)
        case 'r': return rookSvg(white)
        case 'b': return bishopSvg(white)
        case 'k': return knightSvg(white)
        case 'p': return pawnSvg(white)
    }
    return type
}