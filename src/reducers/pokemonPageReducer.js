import pokemonService from '../services/pokemonService'

const pokemonPageReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT':
            state = state.concat({
                page:action.data.page,
                pokemons:action.data.pokemons})
            return state
        default:
            return state
    }
}

export const getStuff = (page) => {
    return async (dispatch) => {
        const pokemons = await pokemonService.getPage(page)
        dispatch({
            type: 'INIT',
            data: {
                page,
                pokemons:pokemons.results
            }
        })
    }
}
export default pokemonPageReducer 