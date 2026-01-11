
import React from 'react';
import { TextField, Box } from '@mui/material';
import { FilterCondition } from '../../../types/filter';
// We'll use simple native date inputs efficiently if MUI DatePicker isn't fully set up with LocalizationProvider yet, 
// or implement that wrapper later.
// Requirement: "Date range picker with calendar interface"
// I'll stick to native inputs for simplicity and robustness without weighty deps configuration, 
// OR I can try to use MUI if I configure the Provider in App.tsx. 
// Let's use native type="date" which provides a calendar picker in all modern browsers.

interface DateFilterInputProps {
  value: any;
  onChange: (value: any) => void;
  operator: FilterCondition['operator'];
}

export const DateFilterInput: React.FC<DateFilterInputProps> = ({ value, onChange, operator }) => {
  if (operator === 'between') {
    const [start, end] = Array.isArray(value) ? value : ['', ''];
    return (
      <Box display="flex" gap={1}>
        <TextField
          size="small"
          type="date"
          value={start}
          onChange={(e) => onChange([e.target.value, end])}
          InputLabelProps={{ shrink: true }}
          placeholder="Start Date"
        />
        <TextField
          size="small"
          type="date"
          value={end}
          onChange={(e) => onChange([start, e.target.value])}
          InputLabelProps={{ shrink: true }}
          placeholder="End Date"
        />
      </Box>
    );
  }

  return (
    <TextField
      size="small"
      type="date"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      InputLabelProps={{ shrink: true }}
      fullWidth
    />
  );
};
