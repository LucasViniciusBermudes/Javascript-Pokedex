const pokeApi = {}                   

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()          

    let numberString = pokeDetail.id.toString()
    while (numberString.length < 3) {
        numberString = "0" + numberString
    }
    pokemon.number = numberString
                                        
    pokemon.name = pokeDetail.name                                          
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types    

    pokemon.types = types                                                   
    pokemon.type = type 

    const stats = pokeDetail.stats.map((statSlot) => statSlot)
    const [stat] = stats
    pokemon.stats = stats
    pokemon.stat = stat

    pokemon.photo = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeDetail.id}.png`          
    pokemon.height = pokeDetail.height                                                  
    pokemon.weight = pokeDetail.weight
    
    pokemon.abilities = pokeDetail.abilities.map((abilitie) => abilitie.ability.name)

    fetch(pokeDetail.species.url)
    .then((response) => response.json())
    .then((item) => {
        pokemon.shape = item.shape.name
        pokemon.habitat = item.habitat.name
        pokemon.eggGroup = item.egg_groups.map((value) => value.name)
    })
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {                
    return fetch(pokemon.url)                            
        .then((response) => response.json())             
        .then(convertPokeApiDetailToPokemon)           
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
}







    
