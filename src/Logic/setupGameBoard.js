import { useSelector, useDispatch } from 'react-redux'
import { receiveState, setupBoard } from '../Redux/Reducers/tilesReducer'
//Setups gameboard so starting tiles have things

const useSetupGameBoard = (use) => {
    const dispatch = useDispatch()
    dispatch(receiveState(use))
    dispatch(setupBoard(use))
        //Setups pawns
}

export const useReceivestate = () => {
    const dispatch = useDispatch()
    dispatch(receiveState())
    return receiveState
}
export default useSetupGameBoard