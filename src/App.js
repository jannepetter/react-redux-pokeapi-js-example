import React, {  useState } from 'react';
import MenuBar from './components/MenuBar';
import PokemonList from './components/PokemonList';
import Header from './components/Header'
import Pokemon from './components/Pokemon';

const App = () => {
  const[page,setPage]=useState(0)
  const[show,setShow]=useState('list')
  const [pokemonId,setPokemonId]=useState('') 
  const[filter,setFilter]=useState('') 

  return ( 
    <div>
      <MenuBar setFilter={setFilter}show={show} setPokemonId={setPokemonId} setShow={setShow}
       page={page} setPage={setPage}></MenuBar>
      <Header></Header>
      <PokemonList filter={filter} setShow={setShow} setPokemonId={setPokemonId} 
      show={show==='list'} page={page}></PokemonList>
      <Pokemon show={show==='pokemon'} pokemonId={pokemonId}></Pokemon>
    </div>
  );
}

export default App

