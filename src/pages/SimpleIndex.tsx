import React, { useState } from 'react';
import { sampleInterviews, departmentColors } from '../data/sampleData';
import { Interview } from '../types/interview';

const SimpleIndex = () => {
  const [interviews] = useState<Interview[]>(sampleInterviews);

  console.log('SimpleIndex rendering with', interviews.length, 'interviews');
  console.log('Sample interview:', interviews[0]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">面試行事曆測試版本</h1>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">數據統計</h2>
        <p className="text-lg">總面試數: {interviews.length}</p>
        <p className="text-sm text-gray-600 mt-2">部門數: {departmentColors.length}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">面試列表</h2>
        <div className="space-y-2">
          {interviews.slice(0, 5).map(interview => (
            <div key={interview.Applicant_ID} className="p-3 border border-gray-200 rounded">
              <div className="font-medium">{interview.Name}</div>
              <div className="text-sm text-gray-600">
                {interview.Department} - Day {interview.Date_K} - {interview.Start_Time}-{interview.End_Time}
              </div>
            </div>
          ))}
          {interviews.length > 5 && (
            <div className="text-sm text-gray-500 pt-2">
              ...還有 {interviews.length - 5} 筆面試資料
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleIndex;
