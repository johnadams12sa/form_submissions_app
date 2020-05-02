let pokemonWebURL = 'https://api.pokemontcg.io/v1/cards?name=';
let i = 0;
/*var jsonObject = {};*/

function validateInput(){
    let searchInput = document.getElementById('searchBtn2').value;
    if(searchInput){
        searchPokemonCard(searchInput);
    }
}

function searchPokemonCard(searchInput){
    fetch(pokemonWebURL + searchInput)
        .then(results => {
            return results.json();
        }).then(results =>{
            inits(results);
            /*jsonObject = results;*/
            console.log(jsonObject);
        })
}

function inits(results){
    let displayCards = document.getElementById("pokemon-display");
    displayCards.src = results.cards[i].imageUrl;
}