const pokemonList = document.getElementById('pokemonList');              
const loadMoreButton = document.getElementById('loadMoreButton');        

const maxRecords = 151;         
const limit = 10;                
let offset = 0;                 
let pokemonStats = [];      

function convertPokemonToLi(pokemon) {
    return `
        <li  class="pokemon ${pokemon.type}" id="${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <div class='pokeImages'>
                    <img clas='pokeImage' src="${pokemon.photo}" alt="${pokemon.name}">
                    <img class='greypoke' src="assets/images/pokeball-gray.svg" alt="">
                </div>
            </div>
        </li>
    `
}



function CreatePokemonDetail(pokemon) {
    return `
        <div class="detailPage ${pokemon.type} ">
            <div id="detailContent" >
                <div>
                    <header class="detailHeader">
                        <div class="detailHeaderArrow">
                            <button onclick="arrow()" title="Back">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </button>
                        </div>
                    </header>
                    
                    <div class="mainInformation">
                        <div class="InformationContainer">
                            <div class="InformationContainerTitle">
                                <h1>${pokemon.name}</h1>
                            </div>
                            <div class="InformationContainerTypes">
                                <ol>
                                    ${pokemon.types.map(type => `<li class="${type}">${type}</li>`).join('')}
                                </ol>
                            </div>
                        </div>
                        <div class="InformationContainerNumber">
                            #${pokemon.number}
                        </div>
                    </div>
                </div>
                <div class="pokemonDetailsStats">
                    <div class="pokemonDetailsStatsHeader">
                        <ol class="pokemonDetailsStatsHeaderList" >
                            <li>Details</li>
                        </ol>
                    </div>
                    <div class="pokemonDetailsStatsDetailBar" >
                        <hr>
                        <div></div>
                    </div>
                    <div class="statsDetails">
                        <div class="pokemonStatsDetails">
                            <div class="pokemonStatsDetailsContainer">
                                <div class="pokemonStatsDetailsContainerTitle">Shape</div>
                                <div class="pokemonStatsDetailsContent">${pokemon.shape}</div>
                            </div>
                            <div class="pokemonStatsDetailsContainer">
                                <div class="pokemonStatsDetailsContainerTitle">Height</div>
                                <div class="pokemonStatsDetailsContent">${pokemon.height}0 cm</div>
                            </div>
                            <div class="pokemonStatsDetailsContainer">
                                <div class="pokemonStatsDetailsContainerTitle">Weight</div>
                                <div class="pokemonStatsDetailsContent">${pokemon.weight} Kg</div>
                            </div>
                            <div class="pokemonStatsDetailsContainer">
                                <div class="pokemonStatsDetailsContainerTitle">Abilities</div>
                                <div class="pokemonStatsDetailsContent">
                                ${pokemon.abilities.map((hability) => ` ${hability} `)}
                                </div>
                            </div>
                        <div class="pokemonBreedingContainer">
                            <div class="pokemonBreedingContainerTitle"><h3>Breeding</h3></div>
                                <div class="pokemonStatsBreedingDetailBox">
                                    <div class="pokemonStatsBreedingDetailBoxTitle">Habitat</div>
                                    <div class="pokemonStatsBreedingDetailBoxContent">${pokemon.habitat}</div>
                                </div>
                                <div class="pokemonStatsBreedingDetailBox">
                                    <div class="pokemonStatsBreedingDetailBoxTitle">Egg Groups</div>
                                    <div class="pokemonStatsBreedingDetailBoxContent">
                                        ${pokemon.eggGroup.map((item) => ` ${item} `)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pokemonProgressBarDetails">
                            <ul class="stats">
                                ${pokemon.stats.map((stat) => `
                                <li class="stat ${stat.stat.name}">
                                    <h3>${stat.stat.name}</h3> 
                                        <div class="progress">
                                            <span>${stat.base_stat}</span>
                                        <progress value="${stat.base_stat}" max="100"></progress>
                                        </div>
                                </li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>   
            <div class="pokemonDetailImageContainer" >
                <div class="pokemonDetailImage">
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </div>
    `
}

function loadPokemonItens(offset, limit) {                              
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {  
            const newHtml = pokemons.map(convertPokemonToLi)
            .join('');       
            pokemonList.innerHTML += newHtml;                            
            for (let i = 0; i < pokemons.length; i++){               
                pokemonStats.push(pokemons[i]);                               
            }
            pokemonClick();
        })
}

loadPokemonItens(offset, limit);                                        

loadMoreButton.addEventListener('click', () => {                  
    offset += limit;                                                  
    const qtdRecordsWithNexPage = offset + limit;                    

    if (qtdRecordsWithNexPage >= maxRecords) {                       
        const newLimit = maxRecords - offset;                         
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);    
    } else {
        loadPokemonItens(offset, limit);                              
    }
})

let content_pokedex = document.getElementById('content_pokedex');
let content = document.querySelector('section.content');

function showPokemonStatus (id)  {
    content_pokedex.classList.add('hidden');
    
    let PokemonStatus = pokemonStats.filter(object => object.number == id);
    
    
    let pokemonDetails = document.createElement('div');
    pokemonDetails.id = 'pokeDetailId';

    pokemonDetails.innerHTML = CreatePokemonDetail(PokemonStatus[0]);

    content.appendChild(pokemonDetails);
}

function pokemonClick() {
    let pokemon = document.getElementsByClassName('pokemon');  
    
    for ( let i = 0; i < pokemon.length; i++){
        pokemon[i].addEventListener('click', () => {             
            let idPokemon = pokemon[i].id;                           
            showPokemonStatus(idPokemon);                            
        })
    }
}

function arrow() {
    let pokeDetailId = document.getElementById('pokeDetailId');
    pokeDetailId.remove();
    content_pokedex.classList.remove('hidden');
}








