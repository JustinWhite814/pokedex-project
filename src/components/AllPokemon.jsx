import React, { useState, useEffect } from 'react';
import {getPokemon} from './pokemon'

function AllPokemon(props) {
  const [pokemon, setPokemon] = useState([])
  useEffect(()=> {
    getPokemon().then((data)=>{
      console.log(data.results)
      setPokemon(data.results)
    })
  }, [])
  const pokemonFeed = pokemon.map(pokemons => {
  return (
    <div>
       <p>{pokemons.name}</p> <a href={pokemons.url}>1</a>
    </div>
  )
})

return (
  <>
  {pokemonFeed}
  </>
)}

export default AllPokemon;