
import React from 'react';

const TimeAxis: React.FC = () => {
  const hours = Array.from({ length: 10 }, (_, i) => i + 9); // 9 AM to 6 PM

  return (
    <div className="relative">
      {hours.map((hour, index) => (
        <div key={hour} className="relative h-16">
          {/* 主要小時標籤 */}
          <div className="absolute -left-14 top-0 text-xs text-gray-700 font-semibold w-12 text-right">
            {hour}:00
          </div>
          
          {/* 半小時標籤 */}
          <div className="absolute -left-14 top-8 text-xs text-gray-500 w-12 text-right">
            {hour}:30
          </div>
          
          {/* 時間分隔線 */}
          <div className="absolute -left-1 top-0 w-1 h-px bg-gray-400"></div>
          <div className="absolute -left-1 top-8 w-1 h-px bg-gray-300"></div>
        </div>
      ))}
      
      {/* 最後一個時間點 (18:00) */}
      <div className="relative h-0">
        <div className="absolute -left-14 top-0 text-xs text-gray-700 font-semibold w-12 text-right">
          18:00
        </div>
        <div className="absolute -left-1 top-0 w-1 h-px bg-gray-400"></div>
      </div>
    </div>
  );
};

export default TimeAxis;
