
import React from 'react';
import { TextField } from '@mui/material';
import { FilterCondition } from '../../../types/filter';

interface TextFilterInputProps {
  value: any;
  onChange: (value: any) => void;
  operator: FilterCondition['operator'];
}

export const TextFilterInput: React.FC<TextFilterInputProps> = ({ value, onChange }) => {
  return (
    <TextField
      size="small"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Value..."
      fullWidth
    />
  );
};
