import React from 'react';
import useSound from 'use-sound';
import './App.css';
import { clear } from '@testing-library/user-event/dist/clear';
//import pokemon from "./Pokemon.json";



const PokemonRow = ({pokemon, onSelect}) => (
  <p onClick={() => onSelect(pokemon)} className='PokemonItems'>
  <h4>{pokemon.name.english}</h4>
  <p>{pokemon.name.japanese}</p>
 
  

        <img 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} 
          alt={pokemon.name.english}
          
        />

      
</p>

);
//    <h1>{name.english}</h1>
const PokemonInfo = ({id, name, base}) => {
  const [playSound] = useSound(`https://raw.githubusercontent.com/PokeAPI/cries/8584048df8f55ee1c436da23b378316e9d416a9b/cries/pokemon/latest/${id}.ogg`);


  return (
  <div className='PokemonInfo'>


    <div>
    <h2>{name.english}</h2>
    <h4>{name.japanese}</h4>
    </div>
    <div className='PokemonImage'>
          <img 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
          alt={name.english}
          
        />
        
      </div>
      <button onClick={playSound}>Play Sound</button>


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
  );
}



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
        width={"400px"}
        height={"120px"}
        
        
        />


        <div className='InputArea'>
        <input
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          />
          <button
          onClick={() => setFilter("")}
          >X</button>
          </div>

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
