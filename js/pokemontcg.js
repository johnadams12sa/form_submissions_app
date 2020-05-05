let pokemonWebURL = 'https://api.pokemontcg.io/v1/cards?name=';
var i = 0;
var jsonObject = {};
var prev_button = document.getElementById("pokemon_prev_nav");
var next_button = document.getElementById("pokemon_next_nav");
var searchError = document.getElementById("ErrorMsgSearch");
var fetchMessage = document.getElementById("FetchingTitle");

function validateInput(){
    fetchMessage.innerHTML = "Fetching...";
    setTimeout(() =>{
        let searchInput = document.getElementById('searchBtn2').value;
        if (searchInput) {
            searchPokemonCard(searchInput);
            i = 0;
        }        
    }, 3000);
}

function searchPokemonCard(searchInput){
    fetchMessage.innerHTML = "";
    searchError.innerHTML = "";
    fetch(pokemonWebURL + searchInput)
        .then(results => {
            return results.json();
        }).then(results =>{
            if(results.cards.length == 0){
                searchError.innerHTML = "Please check the spelling of the name inputted";
            }    
            else {
                inits(results);
                /*jsonObject = results;*/
                console.log(results);
                jsonObject = results;
            }
        })
}

function inits(results){
    fetchMessage.innerHTML = "";
    prev_button.visible = true;
    next_button.visible = true;
    prev_button.disabled = false;
    next_button.disabled = false;
    try{
        let displayCards = document.getElementById("pokemon-display");
        displayCards.src = results.cards[i].imageUrl;   
    } 
    catch(err){
        console.log(err.message);
            if(i < 0){
                prev_button.disabled = true;
            }
            else if (i > results.length){
                next_button.disabled = true;
            }
                console.log(i);
    }
}

function next_nav(){
    i += 1;
    inits(jsonObject);
}

function prev_nav(){
    i -= 1;
    inits(jsonObject);
}