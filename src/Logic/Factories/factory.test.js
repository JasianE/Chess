import { createPiece, diagonalMovement } from "./index.js";
import { createBishop, createKnight, createQueen, createRook, createPawn } from "./pieces.js";

describe("Creating a base piece works as intended", () => {
    const newPiece = createPiece({coordinates: {x: 3, y: 4}})
    it('Creates a piece that has coordinates', () => {
        expect(newPiece.coordinates).toEqual({x:3, y:4})
    })
    it('Returns alive when nothing is done', () => {
        expect(newPiece.isDead).toBe(false)
    })
    it('Returns dead when it is dead', () => {
        newPiece.die()
        expect(newPiece.isDead).toBe(true)
    })
})

describe("Creating a bishop piece works", () => {
    let state = {
        coordinates: {x:3, y:4},
        piece: 'BISHOP'
    }
    const newPiece = createBishop(state)

    it('Returns bishops piece', () => {
        expect(newPiece.piece).toBe('BISHOP')
    })
    it('Returns proper array of moves', () => {
        expect(newPiece.diagonalMoves()).toStrictEqual([{"x": 4, "y": 5}, {"x": 2, "y": 3}, {"x": 5, "y": 6}, {"x": 1, "y": 2}, {"x": 6, "y": 7}, {"x": 0, "y": 1}, {"x": 2, "y": 5}, {"x": 4, "y": 3}, {"x": 1, "y": 6}, {"x": 5, "y": 2}, {"x": 0, "y": 7}, {"x": 6, "y": 1}, {"x": 7, "y": 0}])
    })
    it('Returns proper array of moves', () => {
        let state = {
            coordinates: {x:3, y:6}
        }
        const newNewPiece = Object.assign(
            {},
            createPiece(state),
            diagonalMovement(state)
        )
        expect(newNewPiece.diagonalMoves()).toStrictEqual([{"x": 4, "y": 7}, {"x": 2, "y": 5}, {"x": 1, "y": 4}, {"x": 0, "y": 3}, {"x": 2, "y": 7}, {"x": 4, "y": 5}, {"x": 5, "y": 4}, {"x": 6, "y": 3}, {"x": 7, "y": 2}])
    })
})  

describe("Creating a rook piece works", () => {
    let state = {
        coordinates: {x:3, y:4},
        piece: 'ROOK'
    }
    const newPiece = createRook(state)

    it('Returns rook piece', () => {
        expect(newPiece.piece).toBe('ROOK')
    })
    it('Returns proper array of moves', () => {
        expect(newPiece.verticalHorizontalMoves()).toStrictEqual([{"x": 3, "y": 0}, {"x": 0, "y": 4}, {"x": 3, "y": 1}, {"x": 1, "y": 4}, {"x": 3, "y": 2}, {"x": 2, "y": 4}, {"x": 3, "y": 3}, {"x": 3, "y": 4}, {"x": 3, "y": 4}, {"x": 4, "y": 4}, {"x": 3, "y": 5}, {"x": 5, "y": 4}, {"x": 3, "y": 6}, {"x": 6, "y": 4}, {"x": 3, "y": 7}, {"x": 7, "y": 4}])
    })
    it('Returns proper array of moves 2', () => {
        const newPiece = createRook({coordinates: {x:2, y:3}, piece: 'ROOK'})
        expect(newPiece.verticalHorizontalMoves()).toStrictEqual([{"x": 2, "y": 0}, {"x": 0, "y": 3}, {"x": 2, "y": 1}, {"x": 1, "y": 3}, {"x": 2, "y": 2}, {"x": 2, "y": 3}, {"x": 2, "y": 3}, {"x": 3, "y": 3}, {"x": 2, "y": 4}, {"x": 4, "y": 3}, {"x": 2, "y": 5}, {"x": 5, "y": 3}, {"x": 2, "y": 6}, {"x": 6, "y": 3}, {"x": 2, "y": 7}, {"x": 7, "y": 3}])
    })
})

describe("Creating a queeeeñ12222223333 works", () => {
    let state = {
        coordinates: {x:3, y:4},
        piece: 'QUEEN'
    }
    const newPiece = createQueen(state)
    it('Returns queen piece', () => {
        expect(newPiece.piece).toBe('QUEEN')
    })
    it('Returns proper array of moves', () => {
        expect(newPiece.queenMoves()).toStrictEqual([{"x": 3, "y": 0}, {"x": 0, "y": 4}, {"x": 3, "y": 1}, {"x": 1, "y": 4}, {"x": 3, "y": 2}, {"x": 2, "y": 4}, {"x": 3, "y": 3}, {"x": 3, "y": 4}, {"x": 3, "y": 4}, {"x": 4, "y": 4}, {"x": 3, "y": 5}, {"x": 5, "y": 4}, {"x": 3, "y": 6}, {"x": 6, "y": 4}, {"x": 3, "y": 7}, {"x": 7, "y": 4}, {"x": 4, "y": 5}, {"x": 2, "y": 3}, {"x": 5, "y": 6}, {"x": 1, "y": 2}, {"x": 6, "y": 7}, {"x": 0, "y": 1}, {"x": 2, "y": 5}, {"x": 4, "y": 3}, {"x": 1, "y": 6}, {"x": 5, "y": 2}, {"x": 0, "y": 7}, {"x": 6, "y": 1}, {"x": 7, "y": 0}])
    })
})

describe("Creating a knight works", () => {
    let state = {
        coordinates: {x:3, y:4},
        piece: 'KNIGHT'
    }
    const newPiece = createKnight(state)
    it('Returns proper array of moves',() => {
        expect(newPiece.knightMoves()).toStrictEqual([{"x": 4, "y": 6}, {"x": 4, "y": 2}, {"x": 2, "y": 6}, {"x": 2, "y": 2}, {"x": 5, "y": 3}, {"x": 5, "y": 5}, {"x": 1, "y": 3}, {"x": 1, "y": 5}])
    })
    it('Retr', () => {
        const newPiece = createKnight({coordinates: {x: 0, y: 0}})
        expect(newPiece.knightMoves()).toStrictEqual([{"x": 1, "y": 2}, {"x": 2, "y": 1}])
    })
})

