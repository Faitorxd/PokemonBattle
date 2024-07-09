import React from 'react';

const HealthBar = ({ health }) => (
  <div className="flex items-center space-x-2">
    <span className="text-sm">HP:</span>
    <div className="bg-gray-300 w-32 h-6 rounded-full overflow-hidden">
      <div className="bg-green-500 h-full transition-all duration-300" style={{ width: `${health}%` }}></div>
    </div>
    <span className="text-sm mt-1">{health} / 100</span>
  </div>
);

export default HealthBar;
