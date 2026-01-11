
import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { Plus, X } from 'lucide-react';
import { FilterCondition, FieldDefinition } from '../../types/filter';
import { FilterRow } from './FilterRow';
import { v4 as uuidv4 } from 'uuid';

interface FilterBuilderProps {
  conditions: FilterCondition[];
  fields: FieldDefinition[];
  onChange: (conditions: FilterCondition[]) => void;
}

export const FilterBuilder: React.FC<FilterBuilderProps> = ({ conditions, fields, onChange }) => {
  
  const addFilter = () => {
    const newCondition: FilterCondition = {
      id: uuidv4(),
      fieldId: fields[0].id,
      operator: 'equals', // will be fixed by row logic usually, but defaults safely
      value: ''
    };
    onChange([...conditions, newCondition]);
  };

  const updateCondition = (index: number, newCond: FilterCondition) => {
    const newConditions = [...conditions];
    newConditions[index] = newCond;
    onChange(newConditions);
  };

  const removeCondition = (index: number) => {
    const newConditions = conditions.filter((_, i) => i !== index);
    onChange(newConditions);
  };

  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Filters</Typography>
        {conditions.length > 0 && (
          <Button 
            startIcon={<X size={16} />} 
            color="inherit" 
            onClick={() => onChange([])}
            size="small"
          >
            Clear All
          </Button>
        )}
      </Box>

      {conditions.length === 0 ? (
        <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
          No filters applied. Add a filter to simple search data.
        </Typography>
      ) : (
        <Box>
          {conditions.map((cond, index) => (
            <FilterRow
              key={cond.id}
              condition={cond}
              fields={fields}
              onChange={(newCond) => updateCondition(index, newCond)}
              onRemove={() => removeCondition(index)}
            />
          ))}
        </Box>
      )}

      <Button variant="outlined" startIcon={<Plus size={18} />} onClick={addFilter}>
        Add Filter
      </Button>
    </Paper>
  );
};
