
import React from 'react';

const TimeAxis: React.FC = () => {
  const hours = Array.from({ length: 10 }, (_, i) => i + 9); // 9 AM to 6 PM

  return (
    <div className="relative">
      {hours.map((hour) => (
        <div key={hour} className="relative h-16 border-b border-gray-100">
          <div className="absolute -left-16 top-0 text-sm text-gray-500 font-medium w-14 text-right">
            {hour}:00
          </div>
          <div className="absolute -left-16 top-8 text-xs text-gray-400 w-14 text-right">
            {hour + 1}:00
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeAxis;
