import React, {useState, useEffect} from 'react';
import useSound from 'use-sound';
import './App.css';
import { clear } from '@testing-library/user-event/dist/clear';
//import pokemon from "./Pokemon.json";



const PokemonRow = ({pokemon, onSelect}) => (
  <p onClick={() => onSelect(pokemon)} className='PokemonItems'>
  <p className='IdNum'>#{pokemon.id}</p>
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



    <div className='Container'>
      

    <div className='PokemonImage'>
    <div >
    <h2>{name.english}</h2>
    <h4>{name.japanese}</h4>
    </div>

          <img 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
          alt={name.english}
          
        />



      <button  onClick={playSound}>Play Sound</button>
      </div>

      </div>

    <div className='InfoInner'>
      {
        Object.keys(base).map((key) =>(
          <div key={key} >
            <h4>{key}</h4>
            <p>{base[key]}</p>

          </div>
          
        ))
      }

      </div>


  </div>
  );
}



function App() {
  const [filter, setFilter] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  console.log(selectedItem)
  const [theme, setTheme] = useState("normal");

  const toggleTheme = () => {
    if (theme === 'normal'){
      setTheme('iconic');
    }else if(theme === "iconic"){
      setTheme('dark')
    }else{
      setTheme('normal')
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);



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
          onChange={(event) => setFilter(event.target.value) 
          }
          
          />
          <button
          onClick={() => setFilter("")}
          >X</button>
          </div>

        <div className={`App ${theme}`} >
        <div className='X' onClick={toggleTheme}>
          <p>
          Toggle Theme
          </p>
        </div>
        
        </div>

      </div>

      <div className='PokemonContainer'>
    
        <div className='Pokemons'>
          {pokemon
          .filter((pokemon) =>
          pokemon.name.english.toLowerCase().includes(filter.toLowerCase()) ||
          pokemon.name.japanese.includes(filter) ||
          pokemon.id.toString().includes(filter)
          )
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
