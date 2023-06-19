import { 
    dotSvg,
    kingSvg, 
    pawnSvg,
    rookSvg, 
    queenSvg, 
    knightSvg, 
    bishopSvg,
    circleSvg, 
} from "../data/piecesSvg"

export const returnSvg = (type = 'p', white) => {
    switch(type) {
        case 'p': return pawnSvg(white)
        case 'K': return kingSvg(white)
        case 'r': return rookSvg(white)
        case 'dot': return dotSvg(white)
        case 'q': return queenSvg(white)
        case 'b': return bishopSvg(white)
        case 'k': return knightSvg(white)
        case 'circle': return circleSvg(white)
    }
    return type
}