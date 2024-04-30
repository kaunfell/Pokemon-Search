import React from 'react';
import './App.css';
//import pokemon from "./Pokemon.json";



const PokemonRow = ({pokemon, onSelect}) => (
  <p onClick={() => onSelect(pokemon)} className='PokemonItems'>
  <p>{pokemon.name.english}</p>
 
  

        <img 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} 
          alt={pokemon.name.english} 
        />

      
</p>

);
//    <h1>{name.english}</h1>
const PokemonInfo = ({id, name, base}) => (
  <div className='PokemonInfo'>


    <div>
    <h2>{name.english}</h2>
    </div>
    <div className='PokemonImage'>
          <img 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
          alt={name.english}

        />
      </div>

    <div className='InfoInner'>
      {
        Object.keys(base).map((key) =>(
          <div key={key} >
            <p>{key}</p>
            <p>{base[key]}</p>

          </div>
          
        ))
      }

      </div>


  </div>
)



function App() {
  const [filter, setFilter] = React.useState("");
  const [pokemon, setPokemon] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState(null);
  console.log(selectedItem)


  //async, this is like getting stuff from other website etc. The pokemon.json is in other file to represent that
  React.useEffect(() => {
    fetch("https://gist.githubusercontent.com/jherr/23ae3f96cf5ac341c98cd9aa164d2fe3/raw/f8d792f5b2cf97eaaf9f0c2119918f333e348823/pokemon.json")
    .then((resp) => resp.json())
  .then((data) => setPokemon(data))
  }, []);

  return (
    <div
    > 
      <div className='header'>
        {/*<h1>Pokemon Search</h1>*/}
        <img 
        src= "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi.svg?sanitize=true" 
        width={"20%"}
        height={"50%"}
        
        />



        <input
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          />
      </div>

      <div className='PokemonContainer'>
    
        <div className='Pokemons'>
          {pokemon
          .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
          .map(pokemon => (


          < PokemonRow
          pokemon={pokemon}
          key={pokemon.id}
          onSelect={(pokemon) => setSelectedItem(pokemon)} />
          

          ))}
   
        
        </div>

        
        {selectedItem && <PokemonInfo {... selectedItem} />}


        </div>
      </div>
    
  );
}

export default App;
