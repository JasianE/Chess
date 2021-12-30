export const createPiece = ({coordinates, piece=null}) => {
    return {
        coordinates,
        isDead: false,
        piece: piece,
        die: function(){
            this.isDead = true
        }
    }
}

export const diagonalMovement = () => ({
    diagonalMoves: function(state){
        //Two diagonals possible
        //while loop per diagonal
        //Store possible moves in array
        //add checking ofr occupied spaces
        let possibleMoves = []
        
        let newX1 = state.coordinates.x + 1
        let newX2 = state.coordinates.x - 1
        let newY1 = state.coordinates.y + 1
        let newY2 = state.coordinates.y - 1

        let newX3 = state.coordinates.x - 1
        let newX4= state.coordinates.x + 1
        let newY3 = state.coordinates.y + 1
        let newY4 = state.coordinates.y - 1

        for(let i = 0; i < 8; i++){
            if((newX1 < 8 && newX1 > -1) && (newY1 < 8 && newY1 > -1)){
                possibleMoves.push({x: newX1, y: newY1})
                newX1 = newX1 + 1
                newY1 = newY1 + 1
            }
            if((newX2 < 8 && newX2 > -1) && (newY2 < 8 && newY2 > -1)){
                possibleMoves.push({x: newX2, y: newY2})
                newX2 = newX2 - 1
                newY2 = newY2 - 1
            }
        }

        for(let i = 0; i < 8; i++){
            if((newX3 < 8 && newX3 > -1) && (newY3 < 8 && newY3 > -1)){
                possibleMoves.push({x: newX3, y: newY3})
                newX3 = newX3 - 1
                newY3 = newY3 + 1
            }
            if((newX4 < 8 && newX4 > -1) && (newY4 < 8 && newY4 > -1)){
                possibleMoves.push({x: newX4, y: newY4})
                newX4 = newX4 + 1
                newY4 = newY4 - 1
            }
        }
        
        return possibleMoves
    }
})

export const verticalHorizontalMovement = () => ({
    //Add checking for moves occupied + current move
    verticalHorizontalMoves: function(state){
        let possibleMoves = []

        
        for(let i = 0; i < 8; i++){
            possibleMoves.push({x: state.coordinates.x, y: i})
            possibleMoves.push({x: i, y: state.coordinates.y})
        }

        return possibleMoves
    }
})

export const coolFunction = () => ({
    queenMoves: function(state){
        const horizontalVertical = this.verticalHorizontalMoves(state)
        const diagonal = this.diagonalMoves(state)
        const possibleMoves = [...horizontalVertical, ...diagonal]

        return possibleMoves
    }
})
export const pawnMovement = () => ({
    //rfeactor tjis
    pawnMoves: function(state, currentBoard){
        let possibleMoves = []
        if(state.colour === 'WHITE'){
            if(state.coordinates.x === 6){
                let one = {
                    x: 5,
                    y: state.coordinates.y
                }
                let two = {
                    x: 4,
                    y: state.coordinates.y
                }
                possibleMoves.push(one)
                possibleMoves.push(two)

            } else {
                if(state.coordinates.x !== 0){
                    const adjacents = [{x: state.coordinates.x-1, y: state.coordinates.y - 1}, 
                        {x: state.coordinates.x-1, y: state.coordinates.y + 1}]
                    if(adjacents[0].x > -1 && adjacents[0].x < 8 && adjacents[0].y < 8 && adjacents[0].y > -1){
                        const adjacent1 = currentBoard.find((key) => {
                            if(key.x === adjacents[0].x && key.y === adjacents[0].y){
                                return key
                            }
                        })
                        if(adjacent1.currentPieceColour === 'BLACK'){possibleMoves.push(adjacent1)}
                    }
                    if(adjacents[1].x > -1 && adjacents[1].x < 8 && adjacents[1].y < 8 && adjacents[1].y > -1){
                        const adjacent2 = currentBoard.find((key) => {
                            if(key.x === adjacents[1].x && key.y === adjacents[1].y){
                                return key
                            }
                        })
                        if(adjacent2.currentPieceColour === 'BLACK'){possibleMoves.push(adjacent2)}
                    }
                }
            }
        } else {
            if(state.coordinates.x === 1){
                for(let i = 0; i < 8; i++){
                    let one = {
                        x: 2,
                        y: i
                    }
                    let two = {
                        x: 3,
                        y: i
                    }
                    possibleMoves.push(one)
                    possibleMoves.push(two)
                }
            } else {
                if(state.coordinates.x !== 7){
                    const adjacents = [{x: state.coordinates.x+1, y: state.coordinates.y - 1}, 
                        {x: state.coordinates.x+1, y: state.coordinates.y + 1}]
                    
                    const adjacent1 = currentBoard.find((key) => {
                        if(key.x === adjacents[0].x && key.y === adjacents[0].y){
                            return key
                        }
                    }).currentPieceColour === 'WHITE'

                    const adjacent2 = currentBoard.find((key) => {
                        if(key.x === adjacents[1].x && key.y === adjacents[1].y){
                            return key
                        }
                    }).currentPieceColour === 'WHITE'
    
                    if(adjacent1){possibleMoves.push(adjacent1)}
                    if(adjacent2){possibleMoves.push(adjacent2)}
                }
            }
        }
        return possibleMoves
    }
})

export const knightMovement = () => ({
    knightMoves: function(state){
        const eight = [{
            x: state.coordinates.x + 1,
            y: state.coordinates.y + 2
        },
        {
            x: state.coordinates.x + 1,
            y: state.coordinates.y - 2
        },
        {
            x: state.coordinates.x - 1,
            y: state.coordinates.y + 2,
        },
        {
            x: state.coordinates.x - 1,
            y: state.coordinates.y - 2
        },
        {
            x: state.coordinates.x + 2,
            y: state.coordinates.y - 1
        },
        {
            x: state.coordinates.x + 2,
            y: state.coordinates.y + 1
        },
        {
            x: state.coordinates.x - 2,
            y: state.coordinates.y - 1
        },
        {
            x: state.coordinates.x - 2,
            y: state.coordinates.y + 1
        }
    ]
    const possibleMoves = []
    for(let i = 0; i < eight.length; i++){
        const key = eight[i]
        if(key.x < 8 && key.x > -1 && key.y < 8 && key.y > -1){
            possibleMoves.push(key)
        } 
    }
    return possibleMoves
    }
})