let APIKEY = config.RIOT_KEY;
let riotURL = 'https://na1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=';
let championJSONURL = 'http://ddragon.leagueoflegends.com/cdn/10.9.1/data/en_US/champion.json';
let queryURL = riotURL + APIKEY;
var riotChampionJson = {};
var freeChampionRotations = {};

function parseChampionJSON(championJSONURL){
    fetch(championJSONURL).then(results =>{
        return results.json();
    }).then(results =>{
        riotChampionJson = results;
        console.log(riotChampionJson);
    })
}

function freeChampionRotationJSON(){
    fetch(queryURL).then(results => {
        return results.json();
    }).then(results => {
        freeChampionRotations = results;
        console.log(freeChampionRotations);
    })
}

function searchChampion(){
    initRiot();
    let championSearch = document.getElementById("searchInput3").value;
    let arrayOfChampions = [];
    let champion = "";
    for(x in riotChampionJson.data){
        arrayOfChampions.push(riotChampionJson.data[x]);
        if(championSearch == arrayOfChampions[x]){
            champion = x.name;
            let modifiedChampionJSONURL = championJSONURL;
            modifiedChampionJSONURL.splice(-4,0,"/"+champion);
            parseChampionJSON(modifiedChampionJSONURL);
            console.log(modifiedChampionJSONURL);
        }
    }
}

function initRiot(){
    parseChampionJSON(championJSONURL);
    freeChampionRotationJSON();
}

/*window.onload = init();*/