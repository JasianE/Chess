import { createPiece, diagonalMovement, verticalHorizontalMovement, pawnMovement, knightMovement, coolFunction } from "./index";

//State is uh coordinates and uh piece name
export const createBishop = (state) => {
    const newPiece = Object.assign(
        {},
        createPiece(state),
        diagonalMovement()
    )

    return newPiece
}

export const createRook = (state) => {
    const newPiece = Object.assign(
        {},
        createPiece(state),
        verticalHorizontalMovement(state)
    )
    return newPiece
}

export const createQueen = (state) => {
    const newPiece = Object.assign(
        {},
        createPiece(state),
        verticalHorizontalMovement(),
        diagonalMovement(),
        coolFunction()
    )
    return newPiece
}

export const createPawn = (state) => {
    const newPiece = Object.assign(
        {},
        createPiece(state),
        pawnMovement(state)
    )
    return newPiece
}

export const createKnight = (state) => {
    const newPiece = Object.assign(
        {},
        createPiece(state),
        knightMovement(state)
    )
    return newPiece
}

const createWhich = (state) => {
    switch(state.piece){
        case 'KNIGHT':
            const knight = createKnight(state)
            return knight
        case 'QUEEN':
            const queen = createQueen(state)
            return queen
        case 'PAWN':
            const pawn = createPawn(state)
            return pawn
        case 'BISHOP':
            const bishop = createBishop(state)
            return bishop
        case 'ROOK':
            const rook = createRook(state)
            return rook
    }
}

export default createWhich