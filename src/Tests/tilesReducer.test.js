import tilesReducer from "../Redux/Reducers/tilesReducer"
import createGameBoard from '../Logic/createGameBoard'

describe(('Should perform actions properly'), () => {
    it('Returns default state if no action is given', () => {
        expect(tilesReducer(createGameBoard(), '')).toEqual(createGameBoard())
    })
})