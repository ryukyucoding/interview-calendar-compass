
import React from 'react';
import InterviewCalendar from '../components/InterviewCalendar';
import { sampleInterviews, departmentColors } from '../data/sampleData';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <InterviewCalendar
        interviews={sampleInterviews}
        departmentColors={departmentColors}
      />
    </div>
  );
};

export default Index;
