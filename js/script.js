window.addEventListener('load',function(){
 var pokemonsArr = new Array();


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

      pokemonsArr.push(pokemon_item);

    }

    loadGame(); 
 }



function loadGame(){
   var pokemonsGenerados = generateAnswerPokemons();
   correctPokemon = pokemonsGenerados[Math.floor(Math.random()*4)];

   render(pokemonsGenerados,correctPokemon);


}






function render(pokemonsArr,correctPokemon){
   let imagenPokemon = document.getElementById('imagenPokemon');
   let contenedorRespuestas = document.getElementById('respuestas');

   imagenPokemon.src = correctPokemon.imageUrl;


   pokemonsArr.forEach((item) =>{
    var newDiv = document.createElement("div");
    newDiv.innerHTML = item.name;
    contenedorRespuestas.appendChild(newDiv);
    

     })



}






function generateAnswerPokemons(){
  let pokemons = [];
  for(i=0;i<=4;i++){
      pokemons.push(pokemonsArr[Math.floor(Math.random()*150)]);
  }
  return pokemons;

}



loadPokemons();

});
