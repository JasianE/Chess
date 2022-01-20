const gameReducer = (state = {currentColour: 'WHITE', whitePoints: 0, blackPoints: 0, 
    whiteCheck: false, blackCheck: false, checker: []}, action) => {
    switch (action.type) {
        case 'SWITCH':
            const copy = {...state}
            if(copy.currentColour === 'WHITE'){copy.currentColour = 'BLACK'}
            else{copy.currentColour = 'WHITE'}
            return copy
        case 'KINGCHECK':
            if(action.data.currentPieceColour === 'BLACK'){state.whiteCheck = true} 
            else{state.blackCheck = true}
            state.checker.push(action.data)
            return state
        case 'CHECKREMOVAL':
            if(action.data === 'WHITE'){
                state.whiteCheck = false
            } else {
                state.blackCheck = false
            }
            state.checker = []
            return state
        default:
            return state
    }
}

export const timeToSwitch = () => {
    return {
        type: 'SWITCH'
    }
}

export const check = (data) => {
    return {
        type: 'KINGCHECK',
        data
    }
}

export const checkRemoval = (data) => {
    return {
        type: 'CHECKREMOVAL',
        data
    }
}

export default gameReducer