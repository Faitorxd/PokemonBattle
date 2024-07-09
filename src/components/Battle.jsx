import React, { useState, useEffect, useRef } from 'react';
import Player from './Player';
import MoveButton from './MoveButton';
import TurnTimer from './TurnTimer';

const Battle = ({ playerPokemon, opponentPokemon, onBattleEnd }) => {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [opponentHealth, setOpponentHealth] = useState(100);
  const [playerMoves, setPlayerMoves] = useState([]);
  const [opponentMoves, setOpponentMoves] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [playerAttack, setPlayerAttack] = useState('');
  const [opponentAttack, setOpponentAttack] = useState('');
  const [turnTimer, setTurnTimer] = useState(30);

  const timerRef = useRef(null);

  useEffect(() => {
    setPlayerHealth(100);
    setOpponentHealth(100);
    setPlayerTurn(true);
    setPlayerAttack('');
    setOpponentAttack('');

    fetch(`https://pokeapi.co/api/v2/pokemon/${playerPokemon.name}`)
      .then(response => response.json())
      .then(data => setPlayerMoves(data.moves.slice(0, 4).map(move => move.move.name.toUpperCase())));

    fetch(`https://pokeapi.co/api/v2/pokemon/${opponentPokemon.name}`)
      .then(response => response.json())
      .then(data => setOpponentMoves(data.moves.slice(0, 4).map(move => move.move.name.toUpperCase())));

    startTurnTimer();

    return () => clearInterval(timerRef.current);
  }, [playerPokemon, opponentPokemon]);

  const startTurnTimer = () => {
    setTurnTimer(30);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTurnTimer(prev => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          endTurn();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endTurn = () => {
    if (playerTurn) {
      setPlayerTurn(false);
      setPlayerAttack('');
      setTimeout(() => {
        const opponentMove = opponentMoves[Math.floor(Math.random() * opponentMoves.length)];
        setOpponentAttack(opponentMove);
        const opponentDamage = Math.floor(Math.random() * 20) + 10;
        setPlayerHealth(prev => {
          const newHealth = prev - opponentDamage;
          if (newHealth <= 0) {
            setTimeout(() => onBattleEnd('Player 1'), 0);
            return 0;
          }
          return newHealth;
        });
        setPlayerTurn(true);
        startTurnTimer();
      }, 1000);
    }
  };

  const handleAttack = (move) => {
    if (!playerTurn) return;
    setPlayerAttack(move);
    const damage = Math.floor(Math.random() * 20) + 10;
    setOpponentHealth(prev => {
      const newHealth = prev - damage;
      if (newHealth <= 0) {
        setTimeout(() => onBattleEnd('You'), 0);
        return 0;
      }
      return newHealth;
    });
    setPlayerTurn(false);
    startTurnTimer();

    setTimeout(() => {
      const opponentMove = opponentMoves[Math.floor(Math.random() * opponentMoves.length)];
      setOpponentAttack(opponentMove);
      const opponentDamage = Math.floor(Math.random() * 20) + 10;
      setPlayerHealth(prev => {
        const newHealth = prev - opponentDamage;
        if (newHealth <= 0) {
          setTimeout(() => onBattleEnd('Player 1'), 0);
          return 0;
        }
        return newHealth;
      });
      setPlayerTurn(true);
      startTurnTimer();
    }, 1000);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4 text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 shadow-lg p-4 rounded-lg">
        Battleground
      </h1>

      <div className="flex flex-col md:flex-row justify-between mb-4 border-b border-gray-500 pb-5">
        <Player
          name={capitalizeFirstLetter(playerPokemon.name)}
          sprite={playerPokemon.sprites.front_default}
          health={playerHealth}
          attack={playerAttack}
          isPlayer={true}
        />
        <div className="text-center flex items-center justify-center fade-in-fwd md:w-1/3 lg:w-1/4">
          <div className="text-4xl font-bold">VS</div>
        </div>
        <Player
          name={capitalizeFirstLetter(opponentPokemon.name)}
          sprite={opponentPokemon.sprites.front_default}
          health={opponentHealth}
          attack={opponentAttack}
          isPlayer={false}
        />
      </div>
      <div>
        <h3 className="text-xl mb-2">Choose Your Attack</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {playerMoves.map((move, index) => (
            <MoveButton key={index} move={move} handleClick={handleAttack} disabled={!playerTurn} />
          ))}
        </div>
        <TurnTimer turnTimer={turnTimer} />
      </div>
    </div>
  );
};

export default Battle;







