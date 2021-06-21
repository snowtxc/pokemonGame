window.addEventListener('load',function(){
 var pokemonsArr$ = new Array();
 var correctPokemon$ = [];
 var randomPokemonsArr$ = [];
 var points = 0;

 //DOMS Components.
 var imagenPokemonDOM = document.getElementById('imagenPokemon');
 var contenedorRespuestasDOM = document.getElementById('respuestas');
 var  opcionesElementsDOM  = document.getElementsByClassName('opciones');
 var pointsElementDOM = document.getElementById('points');

async function loadPokemons(){
    response = await fetch("https://pokeapi.co/api/v2/pokedex/kanto/");

    const kanto = await response.json();
    const pokemons = kanto.pokemon_entries;

    for(let i=0;i< pokemons.length; i++){
      let name = pokemons[i].pokemon_species.name;
      let id = pokemons[i].entry_number;

      res = await fetch("https://pokeapi.co/api/v2/pokemon/"+name);
      res = await res.json();
      
      let imageUrl = res.sprites.front_default;

      let pokemon_item = {
        name: name,
        id: id,
        imageUrl: imageUrl
      }

      pokemonsArr$.push(pokemon_item);

    }


    
    loadGame(); 
}







function render(pokemonsArr,correctPokemon){
   imagenPokemonDOM.src = correctPokemon.imageUrl;
   for(let i=0; i< opcionesElementsDOM.length;i++){
        opcionesElementsDOM[i].innerHTML = randomPokemonArr$[i].name; 
        opcionesElementsDOM[i].setAttribute('data-id',randomPokemonArr$[i].id);
   }

 }


function checkIfRepeat(pokemonItem){ 
  let repetido = false;
  for(i = 0;i < randomPokemonArr$.length; i++){
    if(pokemonItem.id ==  randomPokemonArr$[i].id){
      repetido = true;
      break;;
    }
  }
  return repetido;
}


function generateAnswerPokemons(){
  randomPokemonArr$ = [];
  let contador = 0;
  while(contador <= 3){
      let randomPokemon = pokemonsArr$[Math.floor(Math.random()*150)];
      if(checkIfRepeat(randomPokemon) == false){
        randomPokemonArr$.push(randomPokemon);
        contador ++;
     }
   }
  
}


function sumPoint(){
  points++;
  pointsElementDOM.innerHTML = "Points: " + points;

}


function resetPoints(){
  points = 0;
  pointsElementDOM.innerHTML = "Points" + points;
}


document.querySelectorAll('.opciones').forEach(item => {
  item.addEventListener('click', event => {
    opcion = item.getAttribute('data-id');
    if(opcion == correctPokemon$.id){
      sumPoint();
    }else{
      resetPoints();
    }

    loadGame();

  })
})

function loadGame(){
   generateAnswerPokemons();
   ocultarPreloader();
   showGame();
   correctPokemon$ = randomPokemonArr$[Math.floor(Math.random()*3)]; 
   render(randomPokemonArr$,correctPokemon$);
   
}

function ocultarPreloader(){
  const preloaderDOM = document.getElementById('preloader');
  console.log(preloaderDOM);
  preloaderDOM.style.display = "none";
}


function showGame(){
   const container_gameDOM = document.getElementById('container_game');
   console.log(container_gameDOM);
   container_gameDOM.style.display = "block";

}



loadPokemons();

});
