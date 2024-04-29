import React from 'react';
import './App.css';
//import pokemon from "./Pokemon.json";



const PokemonRow = ({pokemon, onSelect}) => (
  <tr >
  <td>{pokemon.name.english}</td>
  <td>{pokemon.type.join(", ")}</td>
  <td>
    <button
      onClick={() => onSelect(pokemon)}
      >Select</button>

  </td>
</tr>
);
//    <h1>{name.english}</h1>
const PokemonInfo = ({name, base}) => (
  <div className='test'>


    <table className='test2'>
    <h3>{name.english}</h3>
      {
        Object.keys(base).map((key) =>(
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))
      }
    </table>
  </div>
)



function App() {
  const [filter, setFilter] = React.useState("");
  const [pokemon, setPokemon] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState(null);
  console.log(selectedItem)


  //async, this is like getting stuff from other website etc. The pokemon.json is in other file to represent that
  React.useEffect(() => {
    fetch("http://localhost:3000/pokemon.json")
    .then((resp) => resp.json())
  .then((data) => setPokemon(data))
  }, []);

  return (
    <div
    > 
      <div className='header'>
        <h1>Pokemon Search</h1>
        <input
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          />
      </div>

      <div className='pokemonContainer'>
      <table >
        <thead >
        <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody >
 
          {pokemon
          .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
          .map(pokemon => (


          < PokemonRow
          pokemon={pokemon}
          key={pokemon.id}
          onSelect={(pokemon) => setSelectedItem(pokemon)} />
          

          ))}
   
        </tbody>


        </table>
        {selectedItem && <PokemonInfo {... selectedItem} />}
      

      </div>
    </div>
  );
}

export default App;
