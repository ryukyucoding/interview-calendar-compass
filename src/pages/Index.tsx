
import React from 'react';
import InterviewCalendar from '../components/InterviewCalendar';
import { sampleInterviews, departmentColors } from '../data/sampleData';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">面試行事曆</h1>
          <p className="text-gray-600">8天面試安排總覽</p>
        </div>
        
        <div className="mb-4 text-sm text-gray-600">
          目前顯示 {sampleInterviews.length} 筆面試資料 (9/19 ~ 9/26)
        </div>
        
        <InterviewCalendar
          interviews={sampleInterviews}
          departmentColors={departmentColors}
        />
      </div>
    </div>
  );
};

export default Index;
