import React, { useState } from 'react';
import '../css/MenuBar.css'
import { connect } from 'react-redux'
import { getNewPoke } from '../reducers/pokemonReducer'


const MenuBar = (props) => {
    let previousButtonDisabled = false
    let nextButtonDisabled = false
    const [searching, setSearching] = useState(false)
    const [errMessage, setErrMessage] = useState('')

    const gotoPage = (page) => {
        props.setPage(page)
    }

    const arrOfPokemons = Object.values(props.poke)
    const namevalue = document.getElementById('searchInput')
    if (namevalue && arrOfPokemons.length) {
        const foundPokemon = arrOfPokemons.find(p => p.name === namevalue.value)
        if (searching && foundPokemon) {
            const pageNumber = Math.floor(foundPokemon.id / 50)
            gotoPage(Math.min(pageNumber, 17))
            setSearching(false)
        }
    }

    let selected = props.page
    const maxPage = 17

    if (props.page <= 0) {
        previousButtonDisabled = true
    }
    if (props.page >= maxPage) {
        nextButtonDisabled = true
    }
    const arr = Array(9)
    const lookahead = 4
    for (let [i,] of arr.entries()) {
        if (selected + lookahead >= maxPage) {
            arr[i] = maxPage + 1 - 9 + i
        } else if (selected - lookahead > 0) {
            arr[i] = selected - lookahead + i
        } else {
            arr[i] = i
        }
    }
    const showList = () => {
        props.setPokemonId('')
        props.setShow('list')
        props.setFilter('')
    }
    const handleFilterChange = (e) => {
        props.setFilter(e.target.value)
    }
    if (props.show === 'pokemon') {
        return (
            <div className='menucontainer'>
                <button className='backButton' onClick={showList}>back</button>
            </div>
        )
    }

    const searchPokemon = async () => {
        const name = document.getElementById('searchInput').value
        const message = await props.getNewPoke(name)
        setSearching(true)
        if (message) {
            setErrMessage(message)
            setTimeout(() => {
                setErrMessage('')
            }, 5000);
        }
    }

    return (
        <div className='menucontainer'>
            <button disabled={previousButtonDisabled} onClick={() => gotoPage(props.page - 1)}>previous</button>
            <button disabled={nextButtonDisabled} onClick={() => gotoPage(props.page + 1)}>next</button>
            <input id='searchInput' className='searchInput' placeholder='search' onChange={handleFilterChange}></input>
            <button onClick={searchPokemon}>s</button><br></br>
            {arr.map(n => <span className={selected === n ? 'selectedPage' : 'pagelist'} onClick={() => gotoPage(n)} key={n}>{n}</span>)}
            <span className='errorMessage'>{errMessage}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)