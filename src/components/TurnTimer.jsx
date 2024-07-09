import React from 'react';

const TurnTimer = ({ turnTimer }) => (
  <div className="mt-4">
    <h4 className="text-lg mb-2">Turn Timer</h4>
    <div className="bg-gray-300 w-full h-4 rounded-full overflow-hidden">
      <div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${(turnTimer / 30) * 100}%` }}></div>
    </div>
  </div>
);

export default TurnTimer;
