
window.addEventListener('load',function(){
   var pokemons = [];


   function loadPokemons(){
    fetch('https://pokeapi.co/api/v2/pokedex/kanto/')
        .then(response => response.json())
        .then(data => {
            data.pokemon_entries.forEach(element => {
                let entry_number = element.entry_number;
                let name = element.pokemon_species.name;

                this.fetch("https://pokeapi.co/api/v2/pokemon/"+name).then(response => response.json()).then((data) =>{
                   let urlImage = data.sprites.front_default;     
                   pokemons.push({id: entry_number ,name: name,urlImage: urlImage});
                })
        });
    }).finally(() =>{
        console.log(pokemons);
    })

   }


   loadPokemons();
   
   
    
   

})