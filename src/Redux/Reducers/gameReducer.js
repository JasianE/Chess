const gameReducer = (state = {currentColour: 'WHITE', whitePoints: 0, blackPoints: 0}, action) => {
    switch (action.type) {
        case 'SWITCH':
            const copy = {...state}
            if(copy.currentColour === 'WHITE'){copy.currentColour = 'BLACK'}
            else{copy.currentColour = 'WHITE'}
            return copy
        default:
            return state
    }
}

export const timeToSwitch = () => {
    return {
        type: 'SWITCH'
    }
}

export default gameReducer