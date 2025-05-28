
import React, { useState, useMemo } from 'react';
import { Interview, DepartmentColor } from '../types/interview';
import InterviewCard from './InterviewCard';
import TimeAxis from './TimeAxis';
import { Card } from '@/components/ui/card';

interface InterviewCalendarProps {
  interviews: Interview[];
  departmentColors: DepartmentColor[];
}

const InterviewCalendar: React.FC<InterviewCalendarProps> = ({ interviews, departmentColors }) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const departments = useMemo(() => {
    return [...new Set(interviews.map(interview => interview.Department))];
  }, [interviews]);

  const currentDayInterviews = useMemo(() => {
    return interviews.filter(interview => interview.Date_K === selectedDay);
  }, [interviews, selectedDay]);
  const getDepartmentColor = (department: string): DepartmentColor => {
    return departmentColors.find(d => d.name === department) || departmentColors[0];
  };

  const getActualDate = (dayNumber: number): string => {
    // Starting from September 19, 2024 (assuming current year)
    const startDate = new Date(2024, 8, 19); // Month is 0-indexed, so 8 = September
    const targetDate = new Date(startDate);
    targetDate.setDate(startDate.getDate() + (dayNumber - 1));
    
    const month = targetDate.getMonth() + 1;
    const day = targetDate.getDate();
    return `${month}/${day}`;
  };  const getTimePosition = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = (hours - 9) * 60 + minutes; // 9 AM is our baseline
    return (totalMinutes / 60) * 150; // 150px per hour
  };  const getInterviewHeight = (startTime: string, endTime: string): number => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    const durationMinutes = endTotalMinutes - startTotalMinutes;
    return (durationMinutes / 60) * 150; // 150px per hour
  };
  // Helper function to detect overlapping interviews and assign columns
  const getInterviewLayout = (interviews: Interview[]) => {
    const layout: { [key: string]: { column: number; totalColumns: number } } = {};
    
    // Group interviews by department and time slot to detect overlaps within department
    const departmentTimeSlots: { [key: string]: { [key: string]: Interview[] } } = {};
    
    interviews.forEach(interview => {
      const dept = interview.Department;
      const timeKey = `${interview.Start_Time}`;
      
      if (!departmentTimeSlots[dept]) {
        departmentTimeSlots[dept] = {};
      }
      if (!departmentTimeSlots[dept][timeKey]) {
        departmentTimeSlots[dept][timeKey] = [];
      }
      departmentTimeSlots[dept][timeKey].push(interview);
    });
    
    // Assign columns for overlapping interviews within each department
    Object.values(departmentTimeSlots).forEach(deptSlots => {
      Object.values(deptSlots).forEach(slotInterviews => {
        const totalColumns = slotInterviews.length;
        slotInterviews.forEach((interview, index) => {
          const key = `${interview.Applicant_ID}-${interview.Department}-${interview.Date_K}`;
          layout[key] = {
            column: index,
            totalColumns: totalColumns
          };
        });
      });
    });
    
    return layout;
  };

  const interviewLayout = getInterviewLayout(currentDayInterviews);

  const days = Array.from({ length: 8 }, (_, i) => i + 1);  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Day Navigation */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {days.map(day => {
            const dayInterviews = interviews.filter(interview => interview.Date_K === day);
            
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  selectedDay === day
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Day {day} ({getActualDate(day)})
                <div className="text-xs mt-1">
                  {dayInterviews.length} 場面試
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Day {selectedDay} - {getActualDate(selectedDay)}
          </h2>
          <p className="text-gray-600">
            {currentDayInterviews.length} 場面試安排
          </p>
        </div>
        
        <div className="flex">
          {/* 時間軸區域 */}
          <div className="flex-shrink-0 w-20 pr-1">
            {/* 與部門標題對齊的空白區域 */}
            <div className="h-20 border-b border-gray-200"></div>
            <TimeAxis />
          </div>
          
          {/* 部門欄位區域 */}
          <div className="flex-1">
            {/* 部門標題行 */}
            <div className="grid grid-cols-4 gap-1 h-20 border-b border-gray-200">
              {departments.map(dept => {
                const deptInterviews = currentDayInterviews.filter(interview => interview.Department === dept);
                const deptColor = getDepartmentColor(dept);
                
                return (
                  <div key={dept} className={`flex flex-col justify-center items-center border-l border-gray-200 first:border-l-0 ${deptColor.bgColor}`}>
                    <h3 className={`font-semibold ${deptColor.color}`}>
                      {dept}
                    </h3>
                    <div className="text-xs text-gray-600 mt-1">
                      {deptInterviews.length} 場面試
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* 面試內容區域 */}
            <div className="relative">
              <div className="grid grid-cols-4 gap-1">
                {departments.map(dept => {
                  const deptInterviews = currentDayInterviews.filter(interview => interview.Department === dept);
                  
                  return (
                    <div key={dept} className="relative">
                      <div className="relative min-h-[1800px] border-l border-gray-200 first:border-l-0">
                        {/* Hour grid lines - 從9:00到21:00 (13小時) */}
                        {Array.from({ length: 13 }).map((_, i) => (
                          <div key={i} className="absolute w-full border-b border-gray-100" style={{ top: i * 150 }} />
                        ))}
                        
                        {/* Half hour grid lines - 從9:30到20:30 (12個半小時) */}
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div key={`half-${i}`} className="absolute w-full border-b border-gray-50" style={{ top: i * 150 + 75 }} />
                        ))}
                        
                        {/* Interview cards */}
                        {deptInterviews.map(interview => {
                          const departmentColor = getDepartmentColor(interview.Department);
                          const top = getTimePosition(interview.Start_Time);
                          const height = getInterviewHeight(interview.Start_Time, interview.End_Time);
                          
                          // Get layout information for column splitting within department
                          const layoutKey = `${interview.Applicant_ID}-${interview.Department}-${interview.Date_K}`;
                          const layout = interviewLayout[layoutKey] || { column: 0, totalColumns: 1 };
                          
                          // Calculate position and width based on columns within the department column
                          const columnWidth = layout.totalColumns > 1 ? `${(100 / layout.totalColumns) - 1}%` : 'calc(100% - 4px)';
                          const leftOffset = layout.totalColumns > 1 ? `${(layout.column * 100) / layout.totalColumns}%` : '2px';
                          
                          return (
                            <InterviewCard
                              key={`${interview.Applicant_ID}-${interview.Department}-${interview.Date_K}`}
                              interview={interview}
                              departmentColor={departmentColor}
                              style={{
                                top: `${top}px`,
                                height: `${height}px`,
                                left: leftOffset,
                                width: columnWidth,
                                minHeight: '20px'
                              }}
                            />
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
      </Card>

      {/* Legend */}
      <Card className="mt-6 p-4">
        <h4 className="font-semibold mb-3">部門圖例</h4>
        <div className="flex flex-wrap gap-4">
          {departmentColors.map(dept => (
            <div key={dept.name} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded border-l-4 ${dept.bgColor} ${dept.borderColor}`} />
              <span className="text-sm font-medium">{dept.name}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default InterviewCalendar;
