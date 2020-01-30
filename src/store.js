import { createStore, combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import pokemonPageReducer from './reducers/pokemonPageReducer'
import pokemonReducer from './reducers/pokemonReducer'

const reducer=combineReducers({ 
    pokemons:pokemonPageReducer,
    poke:pokemonReducer
})
const store=createStore(
    reducer,
    applyMiddleware(thunk)
)
export default store