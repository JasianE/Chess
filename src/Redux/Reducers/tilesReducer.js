import createGameBoard from "../../Logic/createGameBoard"
import createWhich from "../../Logic/Factories/pieces"
import { useDispatch } from "react-redux"

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
            if(action.data === null){return state}
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
            movingPiece.activePiece = false
            tileThatMove.x = movingPieceCoordinates.x
            tileThatMove.y = movingPieceCoordinates.y
            
            if(tileThatMove.pieceFunctions){
                tileThatMove.pieceFunctions.isDead = true
                tileThatMove.currentPiece = false
                tileThatMove.currentPieceColour = null
            }
            movingPiece.pieceFunctions.justMoved = true

            return stateCopy
        case 'CASTLE':
            //shiity
            let poo = [...state]

            let daKing = poo.find((key) => {
                return key.currentPiece === 'KING' && key.currentPieceColour === action.data.pieceCoordinates.
                currentPieceColour
            })
            const daRooks = [{x: 7, y: 7}, {x: 7, y: 0}, {x: 0, y: 7}, {x: 0, y: 0}].filter(key => key.x === daKing.x)
            let daRook

            switch(action.data.to.y){
                case 6: 
                    daRook = daRooks[0]
                    break;
                case 2:
                    daRook = daRooks[1]
                    break
            }

            let tileThatMoves = poo.find((key) => {
                return key.x === action.data.to.x && key.y === action.data.to.y
            })
            let daRook3 = poo.find((key) => {
                return key.x === daRook.x && key.y === daRook.y
            })
            let whereDaRooksGo

            if(daKing.currentPieceColour === 'WHITE'){
                switch (daRook3.y) {
                    case 7:
                        whereDaRooksGo = {x: 7, y: 5}
                        break;
                    case 0:
                        whereDaRooksGo = {x: 7, y: 3}
                }
            } else {
                switch (daRook3.y) {
                    case 7:
                        whereDaRooksGo = {x: 0, y: 5}
                        break;
                    case 0:
                        whereDaRooksGo = {x: 0, y: 3}
                }
            }
            whereDaRooksGo = poo.find((key) => {
                return key.x === whereDaRooksGo.x && key.y === whereDaRooksGo.y
            })

            const tileThatMoveC = {x: daKing.x, y: daKing.y}
            const movingPieceC = {x: tileThatMoves.x, y: tileThatMoves.y}

            tileThatMoves.x = tileThatMoveC.x
            tileThatMoves.y = tileThatMoveC.y
            daKing.activePiece = false
            daKing.x = movingPieceC.x
            daKing.y = movingPieceC.y

            const whereC = {x: whereDaRooksGo.x, y: whereDaRooksGo.y}
            const IMove = {x: daRook3.x, y: daRook3.y}

            whereDaRooksGo.x = IMove.x
            whereDaRooksGo.y = IMove.y
            daRook3.x = whereC.x
            daRook3.y = whereC.y
            daRook3.moved = true

            return poo
        case 'REMOVE':
            const fakeState = [...state]
            const piece = fakeState.find(key => key.x === action.data.x && key.y === action.data.y)
            piece.pieceFunctions.justMoved = false
            return fakeState
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
export const castle = (data) => {
    return {
        type: 'CASTLE',
        data
    }
}
export const removeState = (data) => {
    return {
        type: 'REMOVE',
        data
    }
}
export default tilesReducer