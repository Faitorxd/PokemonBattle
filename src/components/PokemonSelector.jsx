// src/components/PokemonSelector.js
import React, { useState, useEffect } from 'react';

const PokemonSelector = ({ onStartBattle }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => {
        const promises = data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
        Promise.all(promises).then(results => setPokemonList(results));
      });
  }, []);

  const handleSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleStartBattle = () => {
    const randomOpponent = pokemonList[Math.floor(Math.random() * pokemonList.length)];
    onStartBattle(selectedPokemon, randomOpponent);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Select your Pokémon</h1>
      <div className='text-center py-2'>
        {selectedPokemon && (
          <button onClick={handleStartBattle} className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800">
            Start Battle
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8  gap-4 fade-in-fwd">
        {pokemonList.map((pokemon, index) => (
          <div key={index} className={`border rounded-lg p-4 cursor-pointer shadow-md transition-transform transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700 ${selectedPokemon && selectedPokemon.name === pokemon.name ? 'border-blue-500' : 'border-gray-200'}`}
               onClick={() => handleSelect(pokemon)}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-20 h-20 mx-auto" />
            <h2 className="text-center text-lg capitalize">{pokemon.name}</h2>
            <p className="text-center text-sm text-gray-500 capitalize dark:text-gray-400">{pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default PokemonSelector;



