
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DepartmentFilterProps {
  departments: string[];
  selectedDepartment: string | null;
  onDepartmentChange: (department: string | null) => void;
  departmentColors: { name: string; color: string; bgColor: string; borderColor: string }[];
}

const DepartmentFilter: React.FC<DepartmentFilterProps> = ({
  departments,
  selectedDepartment,
  onDepartmentChange,
  departmentColors
}) => {
  const getDepartmentColor = (dept: string) => {
    return departmentColors.find(d => d.name === dept) || departmentColors[0];
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={selectedDepartment === null ? "default" : "outline"}
        onClick={() => onDepartmentChange(null)}
        className="h-8"
      >
        全部部門
      </Button>
      {departments.map((dept) => {
        const color = getDepartmentColor(dept);
        return (
          <Button
            key={dept}
            variant={selectedDepartment === dept ? "default" : "outline"}
            onClick={() => onDepartmentChange(dept)}
            className={`h-8 ${selectedDepartment === dept ? color.bgColor + ' ' + color.color : ''}`}
          >
            {dept}
          </Button>
        );
      })}
    </div>
  );
};

export default DepartmentFilter;
