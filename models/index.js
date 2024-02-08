const axios = require('axios');

module.exports ={ 
    getAllPokemon: async function () {
        const pokedex = await axios.get('https://pokeapi.co/api/v2/pokedex/3/')

        const allPokemon = pokedex.data.pokemon_entries 

        const allPokemonDetails = []

        for(let pokemon of allPokemon){
            const newUrl = pokemon.pokemon_species.url.replace("-species", '')
            const detailsResponse = await axios.get(newUrl)
            const pokemonDetails = detailsResponse.data
            const cardData = {
                id: pokemonDetails.id,
                name: pokemonDetails.name,
                type: pokemonDetails.types[0].type.name,
                picture: pokemonDetails.sprites.other["official-artwork"].front_default
            }
            allPokemonDetails.push(cardData)
        }
        return allPokemonDetails

    },
    getPokemonDetails: async function(pokemonId){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        return response.data
    }
}