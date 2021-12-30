//Every hook used for using tile reducers actions
import { setActivePiece } from "../Reducers/tilesReducer"
import { useDispatch } from "react-redux"



export const useSetActivePiece = (data) => {
    const dispatch = useDispatch()
    const result = dispatch(setActivePiece(data))
    return result
}