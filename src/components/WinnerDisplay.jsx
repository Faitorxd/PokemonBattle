
import React from 'react';

const WinnerDisplay = ({ winner, onReset }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-80">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-lg text-center">
        <h2 className="text-2xl mb-4 dark:text-white">{`${winner} wins!`}</h2>
        <button onClick={onReset} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800">
          Play Again
        </button>
      </div>
    </div>
  );
};

export default WinnerDisplay;

