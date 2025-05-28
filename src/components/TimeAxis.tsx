
import React from 'react';

const TimeAxis: React.FC = () => {
  const hours = Array.from({ length: 10 }, (_, i) => i + 9); // 9 AM to 6 PM

  return (
    <div className="relative min-h-[640px]">
      {/* 時間軸標籤和分隔線 */}
      {hours.map((hour, index) => (
        <div key={hour} className="absolute w-full" style={{ top: index * 64 }}>
          {/* 主要小時標籤 */}
          <div className="absolute -left-16 -top-3 text-xs text-gray-700 font-semibold w-14 text-right">
            {hour}:00
          </div>
          
          {/* 半小時標籤 */}
          <div className="absolute -left-16 top-29 text-xs text-gray-500 w-14 text-right" style={{ top: '29px' }}>
            {hour}:30
          </div>
          
          {/* 時間分隔線延伸到日程區域 */}
          <div className="absolute -right-4 top-0 w-6 h-px bg-gray-300"></div>
          <div className="absolute -right-4 top-8 w-4 h-px bg-gray-200" style={{ top: '32px' }}></div>
        </div>
      ))}
      
      {/* 最後一個時間點 (18:00) */}
      <div className="absolute w-full" style={{ top: 10 * 64 }}>
        <div className="absolute -left-16 -top-3 text-xs text-gray-700 font-semibold w-14 text-right">
          18:00
        </div>
        <div className="absolute -right-4 top-0 w-6 h-px bg-gray-300"></div>
      </div>
    </div>
  );
};

export default TimeAxis;
