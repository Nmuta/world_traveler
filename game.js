var gameRunning = true;
var currentLanguage = "Spanish";
var playerHistory;

var historicalData = localStorage.getItem("playerHistory");
if(historicalData){
    playerHistory = JSON.parse(historicalData);
} else {
    playerHistory = [{playername: "sample", countries: ['france', 'cuba']}];
}
var username = null;


var possibleCountries = [ 
    {name: "spain", language: "spanish", color: "red", flag: "es"}, 
    {name: "england", language: "english", color: "blue", flag: "gb-eng"},
    {name: "portugal", language: "portuguese", color: "purple", flag: "pt"}, 
    {name: "kenya", language: "swahili", color: "black", flag: "ke"},
    {name: "france", language: "french", color: "red", flag: "fr"},
    {name: "cuba", language: "spanish", color: "blue", flag: "cu"},
   ]

var currentCountryIndex = Math.floor(Math.random() * possibleCountries.length);
console.log(" currentCountryIndex is ",currentCountryIndex );

var currentCountry = possibleCountries[currentCountryIndex]; 
console.log(" country is ", currentCountry )


function play(){

    if(!username){
        username = prompt("Enter your name ");
    }

    setNewCountry(currentCountry)
    var countries = possibleCountries.map(country => country.name);
    console.log('just the names', countries);

    var newCountry = prompt(username+" enter a name of a new country from the list : "+ countries.join(", "));
    
    let foundIndex; 

    for( let i=0 ; i<possibleCountries.length; i++){
        if(possibleCountries[i].name == newCountry){
            foundIndex = i;
        }
    }

    currentCountry = possibleCountries[foundIndex]; 
    setNewCountry(currentCountry);
    saveCountry();

    setTimeout(function(){
        var playmore = confirm(username+" choose another country?");
        if(playmore){
            playAgain();
        } else {
            gameRunning = false;
            gameOver();
        }
    },2000)
}

function playAgain(){
       play();
}

function saveCountry(){
    foundIndex=-1; 

    console.log("here is our history", playerHistory)

    for(let i=0 ; i<playerHistory.length; i++){
        if(playerHistory[i].playername===username){
            foundIndex = i; 
        }
    }
    if (foundIndex > -1){
        playerHistory[foundIndex].countries.push(currentCountry.name);
    } else {
        playerHistory.push({playername: username, countries: [currentCountry.name]});
    }
    
    localStorage.setItem("playerHistory", JSON.stringify(playerHistory));
    console.log("here is the history", playerHistory)
}

function setNewCountry(currentCountry){
      /* access dom elements */
      var countrydiv = document.querySelector("#countryName");
      countrydiv.innerHTML = currentCountry.name;
      var countrylang= document.querySelector("#countryLanguage");
      countrylang.innerHTML = currentCountry.language;

      var image= document.querySelector(".flag");
      image.src = "flags/"+currentCountry.flag+".png";
  
      var box = document.querySelector(".box");
      box.style.setProperty("background-color", currentCountry.color);
}

function gameOver(){
    /* access dom elements */
    var countrydiv = document.querySelector("#countryName");
    countrydiv.innerHTML = "GAME OVER";

    var countrylang= document.querySelector("#countryLanguage");
    countrylang.innerHTML = username+ " thank you for playing";

    var box = document.querySelector(".box");
    box.style.setProperty("background-color", "grey");

    var image= document.querySelector(".flag");
    image.src = "flags/placeholder.png";
}

play();