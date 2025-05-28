
import React, { useState, useMemo } from 'react';
import { Interview, DepartmentColor } from '../types/interview';
import InterviewCard from './InterviewCard';
import TimeAxis from './TimeAxis';
import DepartmentFilter from './DepartmentFilter';
import { Card } from '@/components/ui/card';

interface InterviewCalendarProps {
  interviews: Interview[];
  departmentColors: DepartmentColor[];
}

const InterviewCalendar: React.FC<InterviewCalendarProps> = ({ interviews, departmentColors }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const departments = useMemo(() => {
    return [...new Set(interviews.map(interview => interview.Department))];
  }, [interviews]);

  const filteredInterviews = useMemo(() => {
    if (!selectedDepartment) return interviews;
    return interviews.filter(interview => interview.Department === selectedDepartment);
  }, [interviews, selectedDepartment]);

  const getDepartmentColor = (department: string): DepartmentColor => {
    return departmentColors.find(d => d.name === department) || departmentColors[0];
  };

  const getTimePosition = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = (hours - 9) * 60 + minutes; // 9 AM is our baseline
    return (totalMinutes / 60) * 64; // 64px per hour
  };

  const getInterviewHeight = (startTime: string, endTime: string): number => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    const durationMinutes = endTotalMinutes - startTotalMinutes;
    return (durationMinutes / 60) * 64; // 64px per hour
  };

  const days = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">面試行事曆</h1>
        <p className="text-gray-600">8天面試安排總覽</p>
      </div>

      <DepartmentFilter
        departments={departments}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        departmentColors={departmentColors}
      />

      <Card className="p-6">
        <div className="flex">
          {/* 時間軸區域 */}
          <div className="flex-shrink-0 w-20 mr-4">
            <div className="h-20"></div> {/* 為標題留出空間 */}
            <TimeAxis />
          </div>
          
          {/* 日程區域 */}
          <div className="flex-1">
            <div className="grid grid-cols-8 gap-4">
              {days.map(day => {
                const dayInterviews = filteredInterviews.filter(interview => interview.Date_K === day);
                
                return (
                  <div key={day} className="relative">
                    <div className="sticky top-0 bg-white z-10 pb-4 border-b border-gray-200 mb-4 h-20 flex flex-col justify-center">
                      <h3 className="font-semibold text-center text-gray-900">
                        Day {day}
                      </h3>
                      <div className="text-xs text-center text-gray-500 mt-1">
                        {dayInterviews.length} 場面試
                      </div>
                    </div>

                    <div className="relative">
                      <div className="relative min-h-[640px] border-l border-gray-200">
                        {/* Hour grid lines */}
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div key={i} className="absolute w-full border-b border-gray-100" style={{ top: i * 64 }} />
                        ))}
                        
                        {/* Interview cards */}
                        {dayInterviews.map(interview => {
                          const departmentColor = getDepartmentColor(interview.Department);
                          const top = getTimePosition(interview.Start_Time);
                          const height = getInterviewHeight(interview.Start_Time, interview.End_Time);
                          
                          return (
                            <InterviewCard
                              key={interview.Applicant_ID}
                              interview={interview}
                              departmentColor={departmentColor}
                              style={{
                                top: `${top}px`,
                                height: `${height}px`,
                                left: '4px',
                                right: '4px',
                                minHeight: '40px'
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
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
