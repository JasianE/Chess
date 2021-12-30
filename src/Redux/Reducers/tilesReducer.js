import createGameBoard from "../../Logic/createGameBoard"
import createWhich from "../../Logic/Factories/pieces"

//reducer for tiles

const tilesReducer = (state = createGameBoard(), action) => {
    switch(action.type){
        case 'RECEIVE': 
            if(action.data){
                return [...state]
            } else { 
                return state
            }
        case 'SETUP':
            const pseduo = [...state]
            const setUpData = {
                0: 'ROOK',
                1: 'KNIGHT',
                2: 'BISHOP',
                3: 'QUEEN',
                4: 'KING',
                5: 'BISHOP',
                6: 'KNIGHT',
                7: 'ROOK'
            }

            let pawns1 = pseduo.filter(key => key.x === 1)
            let pawns2 = pseduo.filter(key => key.x === 6)
            let row1 = pseduo.filter(key => key.x === 0)
            let row2 = pseduo.filter(key => key.x === 7)
            let everythingElse = pseduo.filter(key => key.x !== 7 && key.x !== 1 && key.x !== 0 && key.x !== 6)

            for(let i = 0; i < row1.length; i++){
                
                const row1State = {
                    piece: setUpData[i],
                    coordinates: {
                        x: 0,
                        y: i
                    }
                }
                row1[i].currentPiece = setUpData[i]
                row1[i].currentPieceColour = 'BLACK'
                row1[i].pieceFunctions = createWhich(row1State)

                const row2State = {
                    piece: setUpData[i],
                    coordinates: {
                        x: 1,
                        y: i
                    }
                }
                row2[i].currentPiece = setUpData[i]
                row2[i].currentPieceColour = 'WHITE'
                row2[i].pieceFunctions = createWhich(row2State)

                const row3State = {
                    piece: 'PAWN',
                    coordinates: {
                        x: 6,
                        y: i
                    }
                }
                pawns1[i].currentPiece = 'PAWN'
                pawns1[i].currentPieceColour = 'BLACK'
                pawns1[i].pieceFunctions = createWhich(row3State)

                const row4State = {
                    piece: 'PAWN',
                    coordinates: {
                        x: 7,
                        y: i
                    }
                }
                pawns2[i].currentPiece = 'PAWN'
                pawns2[i].currentPieceColour = 'WHITE'
                pawns2[i].pieceFunctions = createWhich(row4State)
            }

            const newState = [...row1, ...pawns1, ...everythingElse, ...pawns2, ...row2]
                
            return [...newState]
        case 'ACTIVE':
            const pseudo2 = [...state]

            if(action.data.currentPiece !== false && action.data.currentPiece !== undefined){
                let loser = pseudo2.find((key) => {
                    return key.activePiece === true
                })
                if(loser){
                    loser.activePiece = false
                }

                const piece = pseudo2.find((key) => {
                    if(key.x === action.data.x && key.y === action.data.y && key.currentPiece === action.data.currentPiece){
                        return key
                    }
                })
                piece.activePiece = true
            }
            return pseudo2
        case 'MOVE':
            let stateCopy = [...state]
            let movingPiece = stateCopy.find((key) => {
                return key.x === action.data.pieceCoordinates.x && key.y === action.data.pieceCoordinates.y
            })
            let tileThatMove = stateCopy.find((key) => {
                return key.x === action.data.to.x && key.y === action.data.to.y
            })

            const tileThatMoveCoordinates = {x: tileThatMove.x, y: tileThatMove.y}
            const movingPieceCoordinates = {x: movingPiece.x, y: movingPiece.y}

            movingPiece.x = tileThatMoveCoordinates.x
            movingPiece.y = tileThatMoveCoordinates.y
            tileThatMove.x = movingPieceCoordinates.x
            tileThatMove.y = movingPieceCoordinates.y

            return stateCopy
        default:
            return state
    }
}

export const receiveState = () => {
    return {
        type: 'RECEIVE'
    }
}
export const setupBoard = () => {
    return {
        type: 'SETUP'
    }
}
export const setActivePiece = (content) => {
    return {
        type: 'ACTIVE',
        data: content
    }
}
export const movePiece = (data) => {
    return {
        type: 'MOVE',
        data
    }
}
export default tilesReducer