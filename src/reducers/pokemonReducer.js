import pokemonService from '../services/pokemonService'

const pokemonReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADDPOKE':
            return { ...state, [action.data.id]: action.data.poke }
        default:
            return state
    }
}
export const getNewPoke = (id) => {
    return async (dispatch) => {
        try {
            const poke = await pokemonService.getPoke(id)
            if (!poke.id) {
                return 'Check spelling, pokemon not found.'
            }
            const onlyNeededPoke = {
                id: poke.id,
                name: poke.name,
                sprites: poke.sprites,
                abilities: poke.abilities,
                height: poke.height,
                weight: poke.weight,
                stats: poke.stats
            }
            dispatch({
                type: 'ADDPOKE',
                data: {
                    id: poke.id,
                    poke: onlyNeededPoke
                }
            })
        } catch (error) {
            console.log(error, 'hiihoi')
        }
    }
}
export default pokemonReducer 