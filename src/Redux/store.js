import {createStore} from 'redux'
import reducer from './Reducers/reducer'


const store = createStore(reducer)

store.subscribe(() => {
})

export default store