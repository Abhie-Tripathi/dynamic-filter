
import React from 'react';
import { Select, MenuItem, Checkbox, ListItemText, FormControl } from '@mui/material';
import { FilterCondition } from '../../../types/filter';

interface SelectFilterInputProps {
  value: any;
  onChange: (value: any) => void;
  options: string[];
  operator: FilterCondition['operator']; // 'is', 'isNot', 'in', 'notIn'
}

export const SelectFilterInput: React.FC<SelectFilterInputProps> = ({ value, onChange, options, operator }) => {
  const isMulti = operator === 'in' || operator === 'notIn';

  const handleChange = (event: any) => {
     const val = event.target.value;
     onChange(val);
  };
  
  // Ensure value is appropriate for mode
  const safeValue = isMulti 
    ? (Array.isArray(value) ? value : []) 
    : (value || '');

  return (
    <FormControl size="small" fullWidth>
      <Select
        multiple={isMulti}
        value={safeValue}
        onChange={handleChange}
        renderValue={(selected) => isMulti ? (selected as string[]).join(', ') : (selected as string)}
        displayEmpty
      >
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {isMulti && <Checkbox checked={(safeValue as string[]).indexOf(opt) > -1} />}
            <ListItemText primary={opt} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
