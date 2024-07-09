import React from 'react';

const MoveButton = ({ move, handleClick, disabled }) => (
  <button onClick={() => handleClick(move)} className={`bg-red-500 text-white p-2 rounded ${disabled && 'opacity-50 cursor-not-allowed'}`}>
    {move}
  </button>
);

export default MoveButton;
