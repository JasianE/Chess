import React, { useState } from 'react'
import bishopW from '../Assets/bishop_white.png' 
import bishopB from '../Assets/bishop_black.png'
import pawnB from '../Assets/pawn_black.png'
import kingB from '../Assets/king_black.png'
import queenB from '../Assets/queen_black.png'
import rookB from '../Assets/rook_black.png'
import knightB from '../Assets/knight_black.png'
import knightW from '../Assets/knight_white.png'
import rookW from '../Assets/rook_white.png'
import pawnW from '../Assets/pawn_white.png'
import kingW from '../Assets/king_white.png'
import queenW from '../Assets/queen_white.png'
import { useSetActivePiece } from '../Redux/Hooks/tileReducerActions'
import store from '../Redux/store'
import { useDispatch } from "react-redux"
import { movePiece, castle } from '../Redux/Reducers/tilesReducer'
import {timeToSwitch} from '../Redux/Reducers/gameReducer'

//Takes in state to determine which things have an on thing and which thing is on
//Complicated
//
const Tile = ({data, reset, gameData}) => {
    const [switch2, setSwitch2] = useState(false)
    const dispatch = useDispatch()

    const {x,y,currentPiece,activePiece } = data
 
    //Set image src
    let pieceThing = ''
    //Loophole to rule of hooks not smart but i
    let content = {}
    if(switch2 === true){
        //bruh i dont care 
        const ref1 = store.getState().tiles.find((key) => {if(key.activePiece === true){return key}})
        content = gameData.currentColour === data.currentPieceColour ? {
            x, y, currentPiece
        } : null
        const yesOrNo = ref1 ? ref1.currentPieceColour !== data.currentPieceColour : false
        if(yesOrNo){
            const myPiece = store.getState().tiles.find((key) => {if(key.activePiece === true){return key}})
            if(myPiece){
                const state = {
                    coordinates: {x:myPiece.x, y: myPiece.y},
                    colour: myPiece.currentPieceColour,
                    moved: myPiece.pieceFunctions.moved
                } 
                let possibleMoves = []
                switch(myPiece.currentPiece){
                    case 'PAWN':
                        //Black pawns in after starting tile cant do anything
                        possibleMoves.push(myPiece.pieceFunctions.pawnMoves(state, store.getState().tiles))
                        break;
                    case 'QUEEN':
                        possibleMoves.push(myPiece.pieceFunctions.queenMoves(state, store.getState().tiles))
                        break;
                    case 'BISHOP':
                        possibleMoves.push(myPiece.pieceFunctions.diagonalMoves(state, store.getState().tiles))
                        break;
                    case 'KNIGHT':
                        possibleMoves.push(myPiece.pieceFunctions.knightMoves(state))
                        break;
                    case 'ROOK':
                        possibleMoves.push(myPiece.pieceFunctions.verticalHorizontalMoves(state, 
                            store.getState().tiles, true))
                        break;
                    case 'KING':
                        possibleMoves.push(myPiece.pieceFunctions.kingMoves(state, store.getState().tiles))
                }
                const theRealG = possibleMoves[0].find((key) => {
                    return key.x === x && key.y === y
                })
                let ayYo;
                if(theRealG){ayYo = store.getState().tiles.find(key => key.x === theRealG.x && key.y === theRealG.y)}
                let castles2 = []
                
                if(theRealG){castles2 = [{x: 7, y: 6},{x: 7, y: 2},{x: 0, y: 6},{x: 0, y: 2}]
                .find(key => key.x === theRealG.x && 
                    key.y === theRealG.y)}
                
                const theActualDataNeededForMovePiece = {
                    pieceCoordinates: myPiece,
                    pieceType: myPiece.currentPiece,
                    to: theRealG ? theRealG : null
                }

                if(myPiece.currentPiece === 'KING' && castles2 && myPiece.pieceFunctions.times < 2){
                    dispatch(castle(theActualDataNeededForMovePiece))
                    dispatch(timeToSwitch())
                } else if(theRealG){
                    dispatch(movePiece(theActualDataNeededForMovePiece))
                    dispatch(timeToSwitch())
                }
            }
        }

        setSwitch2(false)
        reset()
    }
    //Uses a hook (why i dint use dispatch directly? me am dumb!!!!hahhaahah)
    useSetActivePiece(content)

    //Sets img src
    const colour = data.currentPieceColour === 'WHITE'
    switch(currentPiece){
        case 'PAWN':
            pieceThing = colour ? pawnW : pawnB
            break;

        case 'KING':
            pieceThing = colour ? kingW : kingB
            break;

        case 'QUEEN': 
            pieceThing = colour ? queenW : queenB
            break;

        case 'ROOK':
            pieceThing = colour ? rookW : rookB
            break;

        case 'KNIGHT': 
            pieceThing = colour ? knightW : knightB
            break;
        case 'BISHOP':
            pieceThing = colour ? bishopW : bishopB
            break;           
    }
    return(
        <div className= 'tile'>
            <h1>{x}</h1>
            <h1>{y}</h1>
            <img className = {activePiece ? 'thing' : 'piece'} src = {pieceThing} onClick={() => {setSwitch2(true)}}></img>
        </div>
    )
}

export default Tile