import React, { useState } from 'react'
import bishopW from '../Assets/bishop_white.png' 
import bishopB from '../Assets/bishop_black.png'
import pawnB from '../Assets/pawn_black.png'
import kingB from '../Assets/king_black.png'
import queenB from '../Assets/queen_black.png'
import rookB from '../Assets/rook_white.png'
import knightB from '../Assets/knight_black.png'
import knightW from '../Assets/knight_white.png'
import rookW from '../Assets/rook_white.png'
import pawnW from '../Assets/pawn_white.png'
import kingW from '../Assets/king_white.png'
import queenW from '../Assets/queen_white.png'
import { useSetActivePiece } from '../Redux/Hooks/tileReducerActions'
import store from '../Redux/store'
import { useDispatch } from "react-redux"
import { movePiece } from '../Redux/Reducers/tilesReducer'

//Takes in state to determine which things have an on thing and which thing is on
//Complicated
//
const Tile = ({data, reset}) => {
    const [switch2, setSwitch2] = useState(false)
    const dispatch = useDispatch()

    const {x,y,currentPiece,activePiece,pieceFunctions, currentPieceColour} = data

    //Set image src
    let pieceThing = ''
    
    //Loophole to rule of hooks not smart but i
    let content = {}
    if(switch2 === true){
        //bruh i dont care 
        content = {
            x, y, currentPiece
        }

        if(currentPiece === false){
            const myPiece = store.getState().tiles.find((key) => {if(key.activePiece === true){return key}})
            if(myPiece){
                const state = {
                    coordinates: {x:myPiece.x, y: myPiece.y},
                    colour: myPiece.currentPieceColour
                } 
                let possibleMoves = []
                switch(myPiece.currentPiece){
                    case 'PAWN':
                        possibleMoves.push(myPiece.pieceFunctions.pawnMoves(state, store.getState().tiles))
                        break;
                    case 'QUEEN':
                        possibleMoves.push(myPiece.pieceFunctions.queenMoves(state))
                        break;
                    case 'BISHOP':
                        possibleMoves.push(myPiece.pieceFunctions.diagonalMoves(state))
                        break;
                    case 'KNIGHT':
                        possibleMoves.push(myPiece.pieceFunctions.knightMoves(state))
                        break;
                    case 'ROOK':
                        possibleMoves.push(myPiece.pieceFunctions.verticalHorizontalMoves(state))
                        break;
                }
                const theRealG = possibleMoves[0].find((key) => {
                    return key.x === x && key.y === y
                })
                const theActualDataNeededForMovePiece = {
                    pieceCoordinates: myPiece,
                    pieceType: myPiece.currentPiece,
                    to: theRealG
                }
                if(theRealG){
                    dispatch(movePiece(theActualDataNeededForMovePiece))
                }
            }
        }

        setSwitch2(false)
        reset()
    }
    //Uses a hook (why i dint use dispatch directly? me am dumb!!!!hahhaahah)
    useSetActivePiece(content)

    //Sets img src
    switch(currentPiece){
        case 'PAWN':
            pieceThing = pawnB
            break;

        case 'KING':
            pieceThing = kingB
            break;

        case 'QUEEN': 
            pieceThing = queenB
            break;

        case 'ROOK':
            pieceThing = rookB
            break;

        case 'KNIGHT': 
            pieceThing = knightB
            break;
        case 'BISHOP':
            pieceThing = bishopB
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