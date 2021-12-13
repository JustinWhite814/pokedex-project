import React from 'react';

const URL = 'https://pokeapi.co/api/v2/pokemon/?limit=200&offset=0';

export const getPokemon = () => {
  
  return fetch(URL).then((response )=> response.json());
}
