let APIKEY = config.RIOT_KEY;
let riotURL = 'https://na1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=';
let championJSONURL = 'http://ddragon.leagueoflegends.com/cdn/10.9.1/data/en_US/champion.json';
let championSplashArt = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/';
let championSkins = 'http://ddragon.leagueoflegends.com/cdn/10.12.1/data/en_US/champion/';
let championSplashArtEnd = '_';
let championSplashArtEnd2 = 0;
let queryURL = riotURL + APIKEY;
var riotChampionJson = {};
var championSkinsJson = {};
var numSkins = 0;

var champion_display_block = document.getElementById("display_champions");
var table_of_champions = document.getElementById("table_of_champions");
var lol_prev_button = document.getElementById("lol_prev_nav");
var lol_next_button = document.getElementById("lol_next_nav");

lol_prev_button.style.visibility = "hidden";
lol_next_button.style.visibility = "hidden";

function parseChampionJSON(championJSONURL){
    fetch(championJSONURL).then(results =>{
        return results.json();
    }).then(results =>{
        riotChampionJson = results;
        console.log(riotChampionJson);
        //champion_display_block.innerHTML = riotChampionJson.type + '<br/>' + riotChampionJson.version;
        
        
        //var table = "<tr><th>Champion</th><th>Data</th></tr>";
        var championArray = new Array();
        var i = 0;
        for(x in riotChampionJson.data){
            championArray[i] = x;
            i++;
            /*
            table += "<tr onclick='display_champion_data(" + JSON.stringify(x) + ")'><td>";
            table += x;
            table += "</td><td>";
            table += riotChampionJson.data[x].title;
            table += "</td></tr>";
            */
        }
        //table_of_champions.innerHTML = table;
        console.log(championArray);
        //populateDropdownFields(championArray);
    })
}

function populateDropdownFields(championArray){
    let champion_dropdown = document.getElementById("champion-dropdown");
    champion_dropdown.length = 0;

    let default_champion_dropdown = document.createElement("option");
    default_champion_dropdown.text = "Type in a champion name";

    champion_dropdown.add(default_champion_dropdown);
    champion_dropdown.selectedIndex = 0;

    for(let i = 0; i < championArray.length; i++){
        let champion_dropdown_option = document.createElement("option");
        champion_dropdown_option.text = championArray[i];
        champion_dropdown_option.value = championArray[i];
        champion_dropdown.add(champion_dropdown_option);
    }
}

/*function riotStartUp(){
    parseChampionJSON(championJSONURL);
    retrieveChampionSkins("Ahri");
}
*/

function display_champion_data(){
    lol_prev_button.style.visibility = "visible";
    lol_next_button.style.visibility = "visible";
    lol_prev_button.disabled = false;
    lol_next_button.disabled = false;

    let championName = document.getElementById("champion_name").value;
    //retrieveChampionSkins(championName);    
    
    let splash_art = document.getElementById("champion_splash_art");
    //let splash_art = document.createElement("img");
    splash_art.id = "champion_splash_art";
    let championSplashArtUrl = championSplashArt + championName + championSplashArtEnd + championSplashArtEnd2 + '.jpg'; 
    splash_art.src = championSplashArtUrl;
    //retrieveChampionSkins(championName);
    //document.getElementById("champion-display").appendChild(splash_art);
}

function showNewSkin(){
    lol_prev_button.style.visibility = "visible";
    lol_next_button.style.visibility = "visible";
    lol_prev_button.disabled = false;
    lol_next_button.disabled = false;
    let championName = document.getElementById("champion_name").value;
    let splash_art = document.getElementById("champion_splash_art");
    splash_art.id = "champion_splash_art";
    let championSplashArtUrl = championSplashArt + championName + championSplashArtEnd + championSplashArtEnd2 + '.jpg';
    splash_art.src = championSplashArtUrl;

}

function freeChampionRotationJSON(){
    fetch(queryURL).then(results => {
        return results.json();
    }).then(results => {
        freeChampionRotations = results;
        console.log(freeChampionRotations);
    })
}

function retrieveChampionSkins(championName){
    let championSkinsUrl = championSkins + championName + '.json';
    fetch(championSkinsUrl).then(results => {
        return results.json();
    }).then(results => {
        championSkinsJson = results;
        console.log(championSkinsJson);
        numSkins = championSkinsJson.data[championName].skins.length;
        console.log(numSkins);
    });
}

/*
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
*/


function lol_next_nav(){
    let championName = document.getElementById("champion_name").value;
    try{
        if(i < numSkins - 1)
        {
            i++;
            championSplashArtEnd2 = championSkinsJson.data[championName].skins[i].num;
            showNewSkin();
        }
        else{
            lol_next_button.disabled = true;
        }
    }
    catch(err){
        console.log(err.message);
        console.log("This skin does not exist yet.");
    }
    console.log(championSplashArtEnd2);

}

function lol_prev_nav(){
    let championName = document.getElementById("champion_name").value;
    try{
        if(i > 0){
        i--;
        championSplashArtEnd2 = championSkinsJson.data[championName].skins[i].num;
        showNewSkin();
        }
        else{
            lol_prev_button.disabled = true;
        }
    }
    catch(err){
        console.log(err.message);
        console.log("This skin does not exist yet.");
    }
}

window.onload = parseChampionJSON(championJSONURL);
/*window.onload = riotStartUp();*/