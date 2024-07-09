import React, { useState, useEffect } from 'react';
import PokemonSelector from './components/PokemonSelector';
import Battle from './components/Battle';
import WinnerDisplay from './components/WinnerDisplay';
import DarkModeToggle from './components/DarkModeToggle';
import Popup from './components/Popup';

function App() {
  const [gameState, setGameState] = useState('selection');
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [winner, setWinner] = useState(null);
  const [showPopup, setShowPopup] = useState(true);

  const startBattle = (player, opponent) => {
    setPlayerPokemon(player);
    setOpponentPokemon(opponent);
    setGameState('battle');
  };

  const endBattle = (winner) => {
    setWinner(winner);
    setGameState('winner');
  };

  const resetGame = () => {
    setPlayerPokemon(null);
    setOpponentPokemon(null);
    setWinner(null);
    setGameState('selection');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    setShowPopup(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <DarkModeToggle />
      <Popup show={showPopup} onClose={handleClosePopup} />
      {gameState === 'selection' && <PokemonSelector onStartBattle={startBattle} />}
      {gameState === 'battle' && <Battle playerPokemon={playerPokemon} opponentPokemon={opponentPokemon} onBattleEnd={endBattle} />}
      {gameState === 'winner' && <WinnerDisplay winner={winner} onReset={resetGame} />}
    </div>
  );
}

export default App;


