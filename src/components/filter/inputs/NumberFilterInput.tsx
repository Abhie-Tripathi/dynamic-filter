
import React from 'react';
import { TextField, Box } from '@mui/material';
import { FilterCondition } from '../../../types/filter';

interface NumberFilterInputProps {
  value: any;
  onChange: (value: any) => void;
  operator: FilterCondition['operator'];
}

export const NumberFilterInput: React.FC<NumberFilterInputProps> = ({ value, onChange, operator }) => {
  if (operator === 'between') {
    const [min, max] = Array.isArray(value) ? value : ['', ''];
    return (
      <Box display="flex" gap={1}>
        <TextField
          size="small"
          type="number"
          value={min}
          onChange={(e) => onChange([e.target.value, max])}
          placeholder="Min"
        />
        <TextField
          size="small"
          type="number"
          value={max}
          onChange={(e) => onChange([min, e.target.value])}
          placeholder="Max"
        />
      </Box>
    );
  }

  return (
    <TextField
      size="small"
      type="number"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Value..."
      fullWidth
    />
  );
};
