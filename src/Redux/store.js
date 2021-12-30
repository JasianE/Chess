import {createStore} from 'redux'
import reducer from './Reducers/reducer'


const store = createStore(reducer)

store.subscribe(() => {
    const storeNow = store.getState()
})

export default store