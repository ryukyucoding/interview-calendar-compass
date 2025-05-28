
import React from 'react';

const TimeAxis: React.FC = () => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 9); // 9 AM to 8 PM (21:00)
  return (
    <div className="relative min-h-[1800px]">
      {/* 時間軸標籤和分隔線 */}
      {hours.map((hour, index) => (
        <div key={hour} className="absolute w-full" style={{ top: index * 150 }}>
          {/* 主要小時標籤 */}
          <div className="absolute -left-2 -top-4 text-xs text-gray-700 font-semibold w-16 text-right">
            {hour}:00
          </div>
          
          {/* 半小時標籤 */}
          <div className="absolute -left-2 text-xs text-gray-500 w-16 text-right" style={{ top: '60px' }}>
            {hour}:30
          </div>
          
          {/* 時間分隔線延伸到日程區域 */}
          <div className="absolute top-0 w-full h-px bg-gray-300" style={{ right: '-1px' }}></div>
          <div className="absolute h-px bg-gray-200 w-full" style={{ top: '75px', right: '-1px' }}></div>
        </div>
      ))}
      
      {/* 最後一個時間點 (21:00) */}
      <div className="absolute w-full" style={{ top: 12 * 150 }}>
        <div className="absolute -left-2 -top-4 text-xs text-gray-700 font-semibold w-16 text-right">
          21:00
        </div>
        <div className="absolute top-0 w-full h-px bg-gray-300" style={{ right: '-1px' }}></div>
      </div>
    </div>
  );
};

export default TimeAxis;
