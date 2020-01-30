import React from 'react';
import '../css/PokeCard.css'

const PokeCard = (props) => {
    const id=props.id
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    
    return (
        <div className='cardContainer'>
            <img className='cardImage' src={imageUrl} alt='not found'></img>
            <span className='cardText'>{props.name}</span>
        </div>)
}

export default PokeCard