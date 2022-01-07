import './App.css';
import useSetupGameBoard from './Logic/setupGameBoard';
import {useSelector, useDispatch} from 'react-redux'
import Tile from './Components/Tile';
import store from './Redux/store';
import React, { useEffect, useState } from 'react';
import { setupBoard } from './Redux/Reducers/tilesReducer';
import { organizeBoard } from './Logic/miscellaneous';

function App() {
  const [gameBoard, setGameboard] = useState([])
  const [reset, setReset] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setupBoard())
  }, [])

  useEffect(() => {
    setGameboard(store.getState().tiles)
  }, [reset])

  const resetTime = () => {
    setReset(!reset)
  }

  const organizedBoard = organizeBoard(gameBoard)
  const gameState = store.getState().game

  let i = 0;

    
  return (
    <div className="App">
        <div className = 'gameBoardContainer'>
            {
            //gameBoard.map(key => key)
            //Gets gameboard from state after actions have been done on it
            //game board produced by createGameBoard will be used by setupGameBoard to act as initial state
            //guccho gang
            organizedBoard.map((key) => {
              i++
              return <Tile data = {key} reset = {resetTime} key = {i} gameData = {gameState}/>
            })
            }
        </div>
    </div>
  );
}

export default App;
