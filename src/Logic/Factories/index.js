//Functions used by every function

//TODO
//Pawn promotion
//En passant
//Checking system
//Checkmate

const checker = (arr, gameboard, currentLocation=null, pieceColour) => {
    //Returns first tile that is occupied
    //Calls remover

    //Removes current location if present i.e if piece is at 7:7 it will remove 7:7
    if(currentLocation){
        let where = 0
        const res = arr.find((key) => {
            where = where + 1
            if(key.x === currentLocation.x && key.y === currentLocation.y){
                return key
            }
        })
        if(res){arr.splice(where - 1, 1)}
    }
    //Find the reference to the piece in gamebaord
  
    const piece = arr.find((key) => {
        const pieceReference = gameboard.find((key1) => {return key1.x === key.x && key1.y === key.y})
        if(pieceReference.currentPiece !== false){return key}
    })
    return remover(arr, piece, gameboard, pieceColour)
}
const remover = (arr, piece,gameboard, pieceColour) => {
    //epic function names
    const theRealPieceReference = piece ? gameboard.find(key => key.x === piece.x && key.y === piece.y) : null
    
    let faker = [...arr]
    faker = faker.slice(faker.indexOf(piece))
    if(arr.indexOf(piece) !== -1){
        const thing = arr.filter((key) => {
            if(faker.indexOf(key) === -1){return key}
        })
        if(theRealPieceReference.currentPieceColour !== pieceColour){thing.push(piece)}
        return thing
    }
    return arr
}

export const createPiece = ({coordinates, piece=null, moved=false}) => {
    return {
        coordinates,
        isDead: false,
        piece: piece,
        die: function(){
            this.isDead = true
        },
        moved,
        times: 0,
        justMoved: false
    }
}

export const diagonalMovement = () => ({
    diagonalMoves: function(state, gameboard, yes=false){
        //Two diagonals possible
        //while loop per diagonal
        //Store possible moves in array
        //add checking ofr occupied spaces

        let topRight1 = []
        let topLeft1 = []
        let topRight2 = []
        let topLeft2 = []
        
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
                topRight1.push({x: newX1, y: newY1})
                newX1 = newX1 + 1
                newY1 = newY1 + 1
            }
            if((newX2 < 8 && newX2 > -1) && (newY2 < 8 && newY2 > -1)){
                topRight2.push({x: newX2, y: newY2})
                newX2 = newX2 - 1
                newY2 = newY2 - 1
            }
        }

        for(let i = 0; i < 8; i++){
            if((newX3 < 8 && newX3 > -1) && (newY3 < 8 && newY3 > -1)){
                topLeft1.push({x: newX3, y: newY3})
                newX3 = newX3 - 1
                newY3 = newY3 + 1
            }
            if((newX4 < 8 && newX4 > -1) && (newY4 < 8 && newY4 > -1)){
                topLeft2.push({x: newX4, y: newY4})
                newX4 = newX4 + 1
                newY4 = newY4 - 1
            }
        }
    
        //Find the first piece that is occupied and records its x and y
        //Delete every move that is greater than or less than (depends on which one) that move
        topRight1 = checker(topRight1.sort((a,b) => {return a.x - b.x}), gameboard, state.colour)
        topLeft1 = checker(topLeft1.sort((a,b) => {return b.x - a.x}), gameboard, state.colour)
        topRight2 = checker(topRight2.sort((a,b) => {return b.x - a.x}), gameboard, state.colour)
        topLeft2 = checker(topLeft2.sort((a,b) => {return a.x - b.x}), gameboard, state.colour)
        
        return yes ? [topRight1, topRight2, topLeft1, topLeft2] : [...topRight1, ...topRight2, ...topLeft1, ...topLeft2] 
    }
})

export const verticalHorizontalMovement = () => ({
    //Add checking for moves occupied + current move
    verticalHorizontalMoves: function(state, gameboard, poo=false, yes=false){
        //refactor later
        let vertical1 = []
        let horizontal1 = []
        let vertical2 = []
        let horizontal2 = []
        
        for(let i = 0; i < state.coordinates.x; i++){
            vertical1.push({x: i, y: state.coordinates.y})
        }
        for(let i = state.coordinates.x; i < 8; i++){
            vertical2.push({x: i, y: state.coordinates.y})
        }
        for(let i = state.coordinates.y; i < 8; i++){
            horizontal2.push({x: state.coordinates.x, y: i})
        }
        for(let i = 0; i < state.coordinates.y; i++){
            horizontal1.push({x: state.coordinates.x, y: i})
        }
        vertical1 = checker(vertical1.reverse(), gameboard, {x: state.coordinates.x, y: state.coordinates.y}, state.colour)
        horizontal1 = checker(horizontal1.reverse(), gameboard, {x: state.coordinates.x, y: state.coordinates.y}, state.colour)
        vertical2 = checker(vertical2, gameboard, {x: state.coordinates.x, y: state.coordinates.y}, state.colour)
        horizontal2 = checker(horizontal2, gameboard, {x: state.coordinates.x, y: state.coordinates.y}, state.colour)

        if(poo){this.moved = true} 

        return yes ? [vertical1, horizontal1, vertical2, horizontal2] : 
        [...vertical1, ...horizontal1, ...vertical2, ...horizontal2]
    }
})

export const coolFunction = () => ({
    queenMoves: function(state, gameboard, yes=false){
        let horizontalVertical = []
        let diagonal = []
        if(yes){
            horizontalVertical = this.verticalHorizontalMoves(state, gameboard, false, true)
            diagonal = this.diagonalMoves(state, gameboard, true)
        } else {
            horizontalVertical = this.verticalHorizontalMoves(state, gameboard)
            diagonal = this.diagonalMoves(state, gameboard)
        }
        
        const possibleMoves = yes ? [horizontalVertical, diagonal] : [...horizontalVertical, ...diagonal]

        return possibleMoves
    }
})
export const pawnMovement = () => ({
    //rfeactor tjis
    pawnMoves: function(state, currentBoard, cool = false){
        let possibleMoves = []
        let adjacents5 = [{x: state.coordinates.x+1, y: state.coordinates.y - 1}, 
            {x: state.coordinates.x+1, y: state.coordinates.y + 1}]
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
                const safe = currentBoard.filter(key => (key.x === one.x && key.y === one.y) || (key.x === two.x && key.y 
                    === two.y))

                if(safe[1].currentPiece === false){possibleMoves.push(one)}
                if(safe[0].currentPiece === false){possibleMoves.push(two)}

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
                    const up = {x: state.coordinates.x - 1, y: state.coordinates.y}
                    if(currentBoard.find(key => key.x === up.x && key.y === up.y).currentPiece === false){
                        possibleMoves.push(up)
                    }
                }
            }
        } else {
            if(state.coordinates.x === 1){
                let one = {
                    x: 2,
                    y: state.coordinates.y
                }
                let two = {
                    x: 3,
                    y: state.coordinates.y
                }
                const safe = currentBoard.filter(key => (key.x === one.x && key.y === one.y) || (key.x === two.x && key.y 
                    === two.y))

                if(safe[1].currentPiece === false){possibleMoves.push(one)}
                if(safe[0].currentPiece === false){possibleMoves.push(two)}

                const adjacents = [{x: state.coordinates.x+1, y: state.coordinates.y - 1}, 
                    {x: state.coordinates.x+1, y: state.coordinates.y + 1}]
                
                if(adjacents[0].x > -1 && adjacents[0].x < 8 && adjacents[0].y < 8 && adjacents[0].y > -1){
                    const adjacent1 = currentBoard.find((key) => {
                        if(key.x === adjacents[0].x && key.y === adjacents[0].y){
                            return key
                        }
                    })
                    if(adjacent1.currentPieceColour === 'WHITE'){possibleMoves.push(adjacent1)}
                }
                if(adjacents[1].x > -1 && adjacents[1].x < 8 && adjacents[1].y < 8 && adjacents[1].y > -1){
                    const adjacent2 = currentBoard.find((key) => {
                        if(key.x === adjacents[1].x && key.y === adjacents[1].y){
                            return key
                        }
                    })
                    if(adjacent2.currentPieceColour === 'WHITE'){possibleMoves.push(adjacent2)}
                }
            } else {
                if(state.coordinates.x !== 7){
                    const adjacents = [{x: state.coordinates.x+1, y: state.coordinates.y - 1}, 
                        {x: state.coordinates.x+1, y: state.coordinates.y + 1}]
                    
                    if(adjacents[0].x > -1 && adjacents[0].x < 8 && adjacents[0].y < 8 && adjacents[0].y > -1){
                        const adjacent1 = currentBoard.find((key) => {
                            if(key.x === adjacents[0].x && key.y === adjacents[0].y){
                                return key
                            }
                        })
                        if(adjacent1.currentPieceColour === 'WHITE'){possibleMoves.push(adjacent1)}
                    }
                    if(adjacents[1].x > -1 && adjacents[1].x < 8 && adjacents[1].y < 8 && adjacents[1].y > -1){
                        const adjacent2 = currentBoard.find((key) => {
                            if(key.x === adjacents[1].x && key.y === adjacents[1].y){
                                return key
                            }
                        })
                        if(adjacent2.currentPieceColour === 'WHITE'){possibleMoves.push(adjacent2)}
                    }
                    const up = {x: state.coordinates.x + 1, y: state.coordinates.y}
                    if(currentBoard.find(key => key.x === up.x && key.y === up.y).currentPiece === false){
                        possibleMoves.push(up)
                    }
                }
            }
        }
        return cool ? adjacents5 : possibleMoves
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

export const kingFunctions = () => ({
    inCheck: function(gameBoard, state){
        const realState = {
            coordinates: {x: state.x, y: state.y},
            colour: state.currentPieceColour,
            moved: true
        }
        const moves = this.kingMoves(realState, gameBoard)
        if(!moves.find(key => key.x === state.x && key.y === state.y)){
            return true
        }
        return false
    },
    kingChecker: function(gameboard, pieceLocation){
        //Checks gameboard to see where checks are to the king B)))))))))
        //Tells you where check is i.e 7,7 2,2, 1,1 
        //Other sht
        //Im tired
        //Find all potential threats 1 first, (queen, rook, bishop)
        //determine if there is a check from these three
        //Then check knight and pawn
        const {x,y} = pieceLocation

        const bishopsQueensRooks = gameboard.filter((key) => {
            return pieceLocation.colour === 'WHITE' ? (key.currentPiece === 'ROOK' && key.currentPieceColour === 'BLACK') 
            || (key.currentPiece === 'QUEEN' && key.currentPieceColour === 'BLACK') || (key.currentPiece === 'BISHOP' &&
            key.currentPieceColour === 'BLACK') || (key.currentPiece === 'PAWN' &&
            key.currentPieceColour === 'BLACK') || (key.currentPiece === 'KNIGHT' &&
            key.currentPieceColour === 'BLACK'): (key.currentPiece === 'ROOK' && key.currentPieceColour === 'WHITE') 
            || (key.currentPiece === 'QUEEN' && key.currentPieceColour === 'WHITE') || (key.currentPiece === 'BISHOP' &&
            key.currentPieceColour === 'WHITE') || (key.currentPiece === 'PAWN' &&
            key.currentPieceColour === 'BLACK') || (key.currentPiece === 'KNIGHT' &&
            key.currentPieceColour === 'WHITE')
        })

        const potentialChecks = [{x, y}, {x: x + 1, y}, {x: x+1, y: y+1}, {x: x+1, y:y-1}, {x, y: y+1},
        {x: x-1, y:y+1}, {x: x-1, y}, {x: x-1, y: y-1}, {x, y: y-1}].filter(key => key.x > -1 && key.x < 8 && key.y > -1 && 
            key.y < 8)

        let realCoveredTiles = []

        const coveredTiles = bishopsQueensRooks.map((key) => {
            const state = {
                coordinates: {x: key.x, y: key.y},
                colour: key.colour
            }
            switch(key.currentPiece){
                case 'QUEEN':
                    return key.pieceFunctions.queenMoves(state, gameboard)
                case 'ROOK':
                    return key.pieceFunctions.verticalHorizontalMoves(state, gameboard)
                case 'BISHOP':
                    return key.pieceFunctions.diagonalMoves(state, gameboard)
                case 'PAWN':
                    return key.pieceFunctions.pawnMoves(state, gameboard, true)
                case 'KNIGHT':
                    return key.pieceFunctions.knightMoves(state)
            }
        })

        for(let j = 0; j < coveredTiles.length; j++){
            for(let k = 0; k < coveredTiles[j].length; k++){
                realCoveredTiles.push(coveredTiles[j][k])
            }
        }

        return {checks: potentialChecks.filter((key) => {
            if(realCoveredTiles.find(poop => poop.x === key.x && poop.y === key.y)){return key} 
        }), moves: potentialChecks}
    },
    kingMoves: function(state, gameboard){
        //Uses kingchecker to determine if you an movel lmao
        const {checks, moves} = this.kingChecker(gameboard, {x: state.coordinates.x, y: state.coordinates.y, 
            colour: state.colour})
        let doubleDouble = moves.filter((key) => {
            if(!checks.find(poop => poop.x === key.x && poop.y === key.y)){return key}
        })

        this.moved = true
        this.times = this.times + 1
        
        const rooks = gameboard.filter(key => key.currentPiece === 'ROOK' && key.pieceFunctions.moved === false && 
        key.currentPieceColour === state.colour).sort((a,b) => a.y - b.y)
        //REfactor this (if statement stuff into a function)
        if(state.colour === 'WHITE' && state.moved === false){
            const piecesOfConcern = gameboard.filter(key => (key.x === 7 && key.y === 6) || (key.x === 7 && key.y === 2) ||
            (key.x === 7 && key.y === 5) || (key.x === 7 && key.y === 3) || (key.x === 7 && key.y === 1)).sort((a,b) => {
                return a.y - b.y
            })
            const leftCastle = piecesOfConcern.slice(0, 3).filter(key => key.currentPiece === false)
            const rightCastle = piecesOfConcern.slice(3, 6).filter(key => key.currentPiece === false)

            if(rightCastle.length === 2 && rooks[1].pieceFunctions.moved === false){
                doubleDouble.push({x: 7, y: 6})
            } else if(leftCastle.length === 3 && rooks[0].pieceFunctions.moved === false){
                doubleDouble.push({x: 7, y: 2})
            }
        } else if(state.colour === 'BLACK' && state.moved === false){
            const piecesOfConcern = gameboard.filter(key => (key.x === 0 && key.y === 6) || (key.x === 0 && key.y === 2) ||
            (key.x === 0 && key.y === 5) || (key.x === 0 && key.y === 3) || (key.x === 0 && key.y === 1)).sort((a,b) => {
                return a.y - b.y
            })
            const leftCastle = piecesOfConcern.slice(0, 3).filter(key => key.currentPiece === false)
            const rightCastle = piecesOfConcern.slice(3, 6).filter(key => key.currentPiece === false)

            if(rightCastle.length === 2 && rooks[1].pieceFunctions.moved === false){
                doubleDouble.push({x: 0, y: 6})
            } else if(leftCastle.length === 3 && rooks[0].pieceFunctions.moved === false){
                doubleDouble.push({x: 0, y: 2})
            }
        }
        return doubleDouble
    },
    getOutOfCheck: function(state, gameboard, attackPiece){
        //Find every move that can get the king out of check
        //consider moves where king can go
        //block where the checks are coming from
        //Takes in kings position and considers where the check is coming from
        //If the piece is killed a ok
        //If the piece is blocked a ok
        //If the king is removed from the checked area a ok

        let moves = []
        const fakeState = {
            coordinates: {x: state.x, y: state.y},
            colour: state.currentPieceColour,
        }
        const where = {
            coordinates: {x: attackPiece.x, y: attackPiece.y}
        }
        moves.push(this.kingMoves(fakeState, gameboard))

        if(attackPiece.currentPiece === 'BISHOP'){
            //Whatever
            const location = attackPiece.pieceFunctions.diagonalMoves(where, gameboard, true)
            for(let i = 0; i < location.length; i++){
                if(location[i].find(key => key.x === state.x && key.y === state.y)){
                    moves.push(...location[i])
                }
            }
        }

        if(attackPiece.currentPiece === 'ROOK'){
            const location = attackPiece.pieceFunctions.verticalHorizontalMoves(where, gameboard, false, true)
            for(let i = 0; i < location.length; i++){
                if(location[i].find(key => key.x === state.x && key.y === state.y)){
                    moves.push(...location[i])
                }
            }
        } 

        if(attackPiece.currentPiece === 'QUEEN'){
            const location = attackPiece.pieceFunctions.queenMoves(where,gameboard,true)
            
            let shouldIBreak = false
            for(let i = 0; i < location[1].length; i++){
                if(location[1][i].find(key => key.x === state.x && key.y === state.y)){
                    moves.push(...location[1][i])
                    shouldIBreak = true
                }
            }

            if(!shouldIBreak){
                for(let i = 0; i < location[1].length; i++){
                    if(location[0][i].find(key => key.x === state.x && key.y === state.y)){
                        moves.push(...location[0][i])
                    }
                }
            }
        }
        moves.push({x: attackPiece.x, y: attackPiece.y})
        let checkmated = true
        let realEveryPiece = []
        const everyPiece = gameboard.filter(key => key.currentPieceColour === state.currentPieceColour).map((key) => {
            const state = {
                coordinates: {x: key.x, y: key.y},
                colour: key.currentPieceColour,
                moved: true
            } 
            let container = []
            switch(key.currentPiece){
                case 'PAWN':
                    container = key.pieceFunctions.pawnMoves(state, gameboard)
                    break;
                case 'KNIGHT':
                    container = key.pieceFunctions.knightMoves(state, gameboard)
                    break;
                case 'QUEEN':
                    container = key.pieceFunctions.queenMoves(state, gameboard)
                    break;
                case 'BISHOP':
                    container = key.pieceFunctions.diagonalMoves(state, gameboard)
                    break;
                case 'ROOK':
                    container = key.pieceFunctions.verticalHorizontalMoves(state, gameboard)
                    break;
            }
            realEveryPiece.push(...container)
            return container
        })
        
        moves[0] = moves[0].filter((key) => {
            const poopo = gameboard.find(pee => pee.x === key.x && pee.y === key.y)
            if(poopo.currentPiece === false){
                return key
            }
        })
        if(moves[0].length !== 0){checkmated = false}
        for(let i = 0; i < realEveryPiece.length; i++){
            if(moves.find(key => key.x === realEveryPiece[i].x && key.y === realEveryPiece[i].y)){
                i = 1000
                checkmated = false
            }
        }
        return checkmated ? checkmated : moves 
    }
})