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
import { movePiece, castle, removeState } from '../Redux/Reducers/tilesReducer'
import { timeToSwitch, check, checkRemoval } from '../Redux/Reducers/gameReducer'

//Curent bugs
//Checking queen piereces through check on why
//Some pieces dont work sometimes (cant take piece figure out why)
//The shittest code ive ever written
//No determining if game is daddadada done
    //Thats actually pretty easy but whatever
//en passant aby
const Tile = ({data, reset, gameData}) => {
    const [switch2, setSwitch2] = useState(false)
    const dispatch = useDispatch()

    const {x,y,currentPiece,activePiece } = data

    const game = store.getState().game
    const checks = [game.whiteCheck, game.blackCheck]
    if(checks[0] && currentPiece === 'KING' && data.currentPieceColour === 'WHITE'){console.log('hello')}

    if(checks[0] && currentPiece === 'KING' && data.currentPieceColour === 'WHITE'){
        if(!data.pieceFunctions.inCheck(store.getState().tiles, data)){
            dispatch(checkRemoval(data.currentPieceColour))
        }
    } 

    const pieceThatJustMoved = store.getState().tiles.find((key) => {
        if(key.pieceFunctions){
            return key.pieceFunctions.justMoved === true
        }
    })

    if(pieceThatJustMoved){
        dispatch(removeState(pieceThatJustMoved))
        const state = {
            coordinates: {x:pieceThatJustMoved.x, y: pieceThatJustMoved.y},
            colour: pieceThatJustMoved.currentPieceColour,
            moved: pieceThatJustMoved.pieceFunctions.moved
        } 
        let possibleMoves = []
        switch(pieceThatJustMoved.currentPiece){
            case 'PAWN':
                //Black pawns in after starting tile cant do anything
                possibleMoves.push(pieceThatJustMoved.pieceFunctions.pawnMoves(state, store.getState().tiles))
                break;
            case 'QUEEN':
                possibleMoves.push(pieceThatJustMoved.pieceFunctions.queenMoves(state, store.getState().tiles))
                break;
            case 'BISHOP':
                possibleMoves.push(pieceThatJustMoved.pieceFunctions.diagonalMoves(state, store.getState().tiles))
                break;
            case 'KNIGHT':
                possibleMoves.push(pieceThatJustMoved.pieceFunctions.knightMoves(state))
                break;
            case 'ROOK':
                possibleMoves.push(pieceThatJustMoved.pieceFunctions.verticalHorizontalMoves(state, 
                    store.getState().tiles, true))
                break;
            case 'KING':
                possibleMoves.push(pieceThatJustMoved.pieceFunctions.kingMoves(state, store.getState().tiles))
                break
        }
        const realPieces = possibleMoves[0] ? possibleMoves[0].map
        (key => store.getState().tiles.find(pee => pee.x === key.x && pee.y === key.y)) :
        []
        //Gets the array of possible moves 
        //Looks to see if the array of moves attack the king
        //I cant keep trakcof thsi anymore 
        for(let i = 0; i < realPieces.length; i++){
            if(realPieces[i].currentPiece === 'KING' && state.colour === 'WHITE' && 
            realPieces[i].currentPieceColour === 'BLACK'){
                dispatch(check(pieceThatJustMoved))
            } else if(realPieces[i].currentPiece === 'KING' && state.colour === 'BLACK' && realPieces[i].currentPieceColour
            === 'WHITE'){
                dispatch(check(pieceThatJustMoved))
            }
        }
    }
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
                        break
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
                if(store.getState().game.whiteCheck){
                    const kingGuy = store.getState().tiles.find(key => key.currentPiece === 'KING' && 
                    key.currentPieceColour === 'WHITE')
        
                    const possibleMoves = kingGuy.pieceFunctions.getOutOfCheck(kingGuy, store.getState().tiles, 
                    store.getState().game.checker[0])
        
                    const kingMoves = possibleMoves.shift()

                    if(myPiece.currentPiece === 'KING' && myPiece.currentPieceColour === 'WHITE' && theRealG){
                        if(kingMoves.find(key => key.x === theRealG.x && key.y === theRealG.y)){
                            dispatch(movePiece(theActualDataNeededForMovePiece))
                            dispatch(timeToSwitch())
                        }
                    }

                    //checks if there is actually to because i write shit code then checks if possibles moves (block check)
                    //Found in the ActualDatnanedrof piece the rEAL g and then ifit is boom mastapiece
                    if(theActualDataNeededForMovePiece.to){
                        const laPiece = store.getState().game.checker[0]
                        if((possibleMoves.find(key => key.x === theActualDataNeededForMovePiece.to.x 
                            && key.y === theActualDataNeededForMovePiece.to.y)) || laPiece.x === theRealG.x && laPiece.y ===
                            theRealG.y){
                            dispatch(movePiece(theActualDataNeededForMovePiece))
                            dispatch(timeToSwitch())
                        }
                    }
                } else if(store.getState().game.blackCheck){
                    const kingGuy = store.getState().tiles.find(key => key.currentPiece === 'KING' && 
                    key.currentPieceColour === 'BLACK')
        
                    const possibleMoves = kingGuy.pieceFunctions.getOutOfCheck(kingGuy, store.getState().tiles, 
                    store.getState().game.checker[0])
        
                    const kingMoves = possibleMoves.shift()

                    if(myPiece.currentPiece === 'KING' && myPiece.currentPieceColour === 'BLACK' && theRealG){
                        if(kingMoves.find(key => key.x === theRealG.x && key.y === theRealG.y)){
                            dispatch(movePiece(theActualDataNeededForMovePiece))
                            dispatch(timeToSwitch())
                        }
                    }

                    if(theActualDataNeededForMovePiece.to){
                        const laPiece = store.getState().game.checker[0]
                        if((possibleMoves.find(key => key.x === theActualDataNeededForMovePiece.to.x 
                            && key.y === theActualDataNeededForMovePiece.to.y)) || laPiece.x === theRealG.x && laPiece.y ===
                            theRealG.y){
                            dispatch(movePiece(theActualDataNeededForMovePiece))
                            dispatch(timeToSwitch())
                        }
                    }
                    //mastapiece put this in separate function so theres no duplicat code 
                    //ty
                } else if(myPiece.currentPiece === 'KING' && castles2 && myPiece.pieceFunctions.times < 2 
                && theActualDataNeededForMovePiece.to !== null){
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
            <img className = {activePiece ? 'thing' : 'piece'} src = {pieceThing} onClick={() => {setSwitch2(true)}}></img>
        </div>
    )
}

export default Tile