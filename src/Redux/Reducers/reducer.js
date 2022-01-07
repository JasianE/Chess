import { combineReducers } from "redux"
import tilesReducer from "./tilesReducer"
import gameReducer from './gameReducer'

const reducer = combineReducers({
    tiles: tilesReducer,
    game: gameReducer
})

export default reducer