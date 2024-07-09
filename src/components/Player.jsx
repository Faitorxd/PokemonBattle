import React from 'react';
import PokeIcon from '../assets/pokebola.jpg';
import HealthBar from './HealthBar';

const Player = ({ name, sprite, health, attack, isPlayer }) => (
  <div className="text-center fade-in-fwd md:w-1/3 lg:w-1/4">
    <div className="flex flex-col items-center">
      <img src={PokeIcon} alt={isPlayer ? "You" : "Player 1"} className="w-12 h-12 rounded-full mb-2" />
      <span className="text-sm">{isPlayer ? "You" : "Player 1"}</span>
    </div>
    <img src={sprite} alt={name} className="w-20 h-20 mx-auto" />
    <h2 className="text-lg">{name}</h2>
    <div className="flex flex-col items-center mt-2">
      <HealthBar health={health} />
      {attack && <p className="text-red-500 mt-2">{`USED ${attack}`}</p>}
    </div>
  </div>
);

export default Player;
