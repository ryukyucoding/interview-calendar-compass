import React, { useState } from 'react';
import { sampleInterviews, departmentColors } from '../data/sampleData';
import { Interview } from '../types/interview';

const TestCalendar = () => {
  const [interviews] = useState<Interview[]>(sampleInterviews);

  // 基本的時間位置計算
  const getTimePosition = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = (hours - 9) * 60 + minutes; // 9 AM is our baseline
    return (totalMinutes / 60) * 80; // 80px per hour
  };

  const getInterviewHeight = (startTime: string, endTime: string): number => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    const durationMinutes = endTotalMinutes - startTotalMinutes;
    return (durationMinutes / 60) * 80; // 80px per hour
  };

  const days = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">面試行事曆測試</h1>
      
      <div className="mb-4 text-sm text-gray-600">
        面試資料載入成功：{interviews.length} 筆資料
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex">
          {/* 時間軸 */}
          <div className="flex-shrink-0 w-20 pr-1">
            <div className="h-20 border-b border-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-500">時間</span>
            </div>
            {/* 簡化的時間軸 */}
            <div className="relative min-h-[800px]">
              {Array.from({ length: 10 }, (_, i) => i + 9).map((hour, index) => (
                <div key={hour} className="absolute w-full" style={{ top: index * 80 }}>
                  <div className="text-xs text-gray-700 font-semibold w-16 text-right">
                    {hour}:00
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 日程區域 */}
          <div className="flex-1">
            {/* 日程標題行 */}
            <div className="grid grid-cols-8 gap-1 h-20 border-b border-gray-200">
              {days.map(day => {
                const dayInterviews = interviews.filter(interview => interview.Date_K === day);
                return (
                  <div key={day} className="flex flex-col justify-center items-center bg-gray-50 border-l border-gray-200">
                    <h3 className="font-semibold text-gray-900">Day {day}</h3>
                    <div className="text-xs text-gray-500">{dayInterviews.length} 場面試</div>
                  </div>
                );
              })}
            </div>
            
            {/* 日程內容區域 */}
            <div className="relative">
              <div className="grid grid-cols-8 gap-1">
                {days.map(day => {
                  const dayInterviews = interviews.filter(interview => interview.Date_K === day);
                  
                  return (
                    <div key={day} className="relative">
                      <div className="relative min-h-[800px] border-l border-gray-200">
                        {/* 時間格線 */}
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div key={i} className="absolute w-full border-b border-gray-100" style={{ top: i * 80 }} />
                        ))}
                        
                        {/* 面試卡片 */}
                        {dayInterviews.map(interview => {
                          const top = getTimePosition(interview.Start_Time);
                          const height = getInterviewHeight(interview.Start_Time, interview.End_Time);
                          
                          return (
                            <div
                              key={interview.Applicant_ID}
                              className="absolute bg-blue-100 border border-blue-300 rounded p-1 text-xs"
                              style={{
                                top: `${top}px`,
                                height: `${height}px`,
                                left: '2px',
                                right: '2px',
                                minHeight: '20px'
                              }}
                            >
                              <div className="font-medium text-blue-800 truncate">
                                {interview.Name}
                              </div>
                              <div className="text-blue-600 text-xs">
                                {interview.Start_Time}-{interview.End_Time}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCalendar;
