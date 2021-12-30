//Uses tile component to create an 8x8 grid with coordinate for each tile
//Each tile will take 2 coordinates for later use
// 7 = a, 6 = b, 5 = c, etc.
// 0 = 1, 1 = 2, etc.
const createGameBoard = () => {
    let arrayOf = []
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            arrayOf.push({x: i, y: j, currentPiece: false, currentPieceColour: null, activePiece: false, 
                pieceFunctions: null})
        }
    }
    return arrayOf
}

export default createGameBoard