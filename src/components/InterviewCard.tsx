
import React from 'react';
import { Interview, DepartmentColor } from '../types/interview';

interface InterviewCardProps {
  interview: Interview;
  departmentColor: DepartmentColor;
  style: React.CSSProperties;
}

const InterviewCard: React.FC<InterviewCardProps> = ({ interview, departmentColor, style }) => {
  return (
    <div
      className={`absolute rounded-lg border-l-4 p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer
        ${departmentColor.bgColor} ${departmentColor.borderColor} ${departmentColor.color}`}
      style={style}
    >
      <div className="font-medium text-sm leading-tight">{interview.Name}</div>
      <div className="text-xs opacity-75 mt-1">
        {interview.Start_Time} - {interview.End_Time}
      </div>
      <div className="text-xs font-medium mt-1">
        {interview.Department}
      </div>
    </div>
  );
};

export default InterviewCard;
