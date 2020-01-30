import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { getStuff } from '../reducers/pokemonPageReducer'
import '../css/PokemonList.css'
import PokeCard from './PokeCard';

const PokemonList = (props) => {  
    const [pokemons, setPokemons] = useState([])
    let filteredPokes=pokemons.filter(p=>p.name.toLowerCase().includes(props.filter.toLowerCase()))
    useEffect(() => {
        const page = props.pokemons.find(p => p.page === props.page)
        if (page) {
            setPokemons(page.pokemons)
        } else {
            props.getStuff(props.page)
        }
    }, [props])

    if (!props.show) {
        return null
    }

    const idFromUrl = (url) => {
        const find = 'pokemon/'
        const indx = url.lastIndexOf(find) + find.length
        const id = url.substring(indx, url.length - 1)
        return id
    }
    const handleId = (url) => {
        const id = idFromUrl(url)
        props.setPokemonId(id)
        props.setShow('pokemon')
    }

    return ( 
        <div className='pokelist'>
            {filteredPokes.map(r =>
                <span key={r.name} onClick={()=>handleId(r.url)}>
                <PokeCard  key={r.name} id={idFromUrl(r.url)} name={r.name}></PokeCard></span>)}
        </div>)
}
const mapDispatchToProps = {
    getStuff
}
const mapStateToProps = (state) => {
    return {
        pokemons: state.pokemons,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PokemonList)