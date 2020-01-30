import React, { useEffect, useState } from 'react';
import { getNewPoke } from '../reducers/pokemonReducer'
import { connect } from 'react-redux'
import '../css/Pokemon.css'


const Pokemon = (props) => {
    const [pokemon, setPokemon] = useState({})
    useEffect(() => {
        const data = props.poke[props.pokemonId]
        if (data !== undefined) {
            setPokemon(data)
        } else if (props.pokemonId !== '') {
            props.getNewPoke(props.pokemonId)
        }
    }, [props])

    if (!props.show) {
        return null
    }
    
    if(props.poke[props.pokemonId]===undefined){
        return(
            <div className='container'>Loading</div>
        )
    }
    const sprites = pokemon.sprites
    const abilities = pokemon.abilities
    let spriteUrls
    if (sprites) {
        spriteUrls = Object.values(sprites).filter(v => v !== null)
    }


    return (
        <div className='container'>
            {spriteUrls && spriteUrls.map(s => <img className='sprites' key={s} src={s} alt='notfound'></img>)}
            <br></br>
            <h3 className='stuff'>{pokemon.name}</h3>
            <span className='stuff'>{`height: ${pokemon.height}`}</span><br></br>
            <span className='stuff'>{`weight: ${pokemon.weight}`}</span>
            {pokemon.stats && pokemon.stats.map(s =>
                <li className='stuff' key={s.stat.name}>
                    <span className='textline'>{`${s.stat.name}: ${s.base_stat} \t`}</span>
                    <span className='textline'>{`Effort: ${s.effort}`}</span>
                </li>)}

            <h4 className='stuff'>Abilities</h4>
            {abilities && abilities.map(a=><li className='stuff' key={a.ability.name}>{a.ability.name}</li>)}
            <br></br>
            <br></br>


        </div>)
}
const mapDispatchToProps = {
    getNewPoke,
}
const mapStateToProps = (state) => {
    return {
        poke: state.poke,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Pokemon)