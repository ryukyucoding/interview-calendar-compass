
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
      className={`absolute rounded border-l-4 p-1.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden
        ${departmentColor.bgColor} ${departmentColor.borderColor} ${departmentColor.color}`}
      style={style}
      title={`${interview.Name} - ${interview.Start_Time} to ${interview.End_Time}`}
    >
      <div className="font-medium text-xs leading-tight truncate">{interview.Name}</div>
      <div className="text-xs opacity-75 mt-0.5 truncate">
        {interview.Start_Time} - {interview.End_Time}
      </div>
      <div className="text-xs opacity-60 mt-0.5">
        {interview.Department}
      </div>
    </div>
  );
};

export default InterviewCard;
