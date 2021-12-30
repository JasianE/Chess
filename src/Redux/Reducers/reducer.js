import { combineReducers } from "redux"
import tilesReducer from "./tilesReducer"

const reducer = combineReducers({
    tiles: tilesReducer
})

export default reducer