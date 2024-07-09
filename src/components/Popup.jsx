import React from 'react';

const Popup = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Reglas del Juego</h2>
        <p className="mb-4">
          Bienvenido al juego de batalla Pokémon. Aquí tienes algunas reglas básicas:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Ambos jugadores comienzan con 100 puntos de vida.</li>
          <li>En cada turno, el jugador puede seleccionar uno de los cuatro movimientos disponibles.</li>
          <li>El daño causado por cada movimiento es aleatorio, entre 10 y 30 puntos.</li>
          <li>El primer jugador en reducir los puntos de vida del oponente a 0 gana.</li>
          <li>Si el tiempo del turno se acaba, se seleccionará un movimiento automáticamente.</li>
        </ul>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default Popup;
