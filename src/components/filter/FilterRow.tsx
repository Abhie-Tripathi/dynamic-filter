
import React from 'react';
import { Box, MenuItem, Select, IconButton, FormControl, InputLabel } from '@mui/material';
import { Trash2 } from 'lucide-react';
import { FilterCondition, FieldDefinition, Operator } from '../../types/filter';
import { getOperatorsForType, getOperatorLabel } from '../../utils/filterUtils';
import { TextFilterInput } from './inputs/TextFilterInput';
import { NumberFilterInput } from './inputs/NumberFilterInput';
import { DateFilterInput } from './inputs/DateFilterInput';
import { SelectFilterInput } from './inputs/SelectFilterInput';
import { Typography } from '@mui/material';

interface FilterRowProps {
  condition: FilterCondition;
  fields: FieldDefinition[];
  onChange: (condition: FilterCondition) => void;
  onRemove: () => void;
}

export const FilterRow: React.FC<FilterRowProps> = ({ condition, fields, onChange, onRemove }) => {
  const selectedField = fields.find(f => f.id === condition.fieldId);
  
  if (!selectedField) return null;

  const operators = getOperatorsForType(selectedField.type);

  // When field changes, reset operator and value if incompatible
  const handleFieldChange = (fieldId: string) => {
    const newField = fields.find(f => f.id === fieldId)!;
    const newOps = getOperatorsForType(newField.type);
    onChange({
      ...condition,
      fieldId,
      operator: newOps[0],
      value: ''
    });
  };

  const handleOperatorChange = (op: Operator) => {
    onChange({ ...condition, operator: op });
  };

  const renderInput = () => {
    const commonProps = {
      value: condition.value,
      operator: condition.operator,
      onChange: (val: any) => onChange({ ...condition, value: val })
    };

    switch (selectedField.type) {
      case 'text':
        return <TextFilterInput {...commonProps} />;
      case 'number':
      case 'amount':
        return <NumberFilterInput {...commonProps} />;
      case 'date':
        return <DateFilterInput {...commonProps} />;
      case 'select':
      case 'multi-select':
        return <SelectFilterInput {...commonProps} options={selectedField.options || []} />;
      case 'boolean':
        return <SelectFilterInput {...commonProps} options={['True', 'False']} />;
      default:
        return null;
    }
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      gap={1.5} 
      mb={2} 
      p={1.5} 
      bgcolor="#f8fafc" 
      borderRadius={2}
      border="1px solid #e2e8f0"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          Condition
        </Typography>
        <IconButton onClick={onRemove} color="error" size="small" sx={{ p: 0.5 }}>
          <Trash2 size={16} />
        </IconButton>
      </Box>

      <FormControl size="small" fullWidth>
        <InputLabel>Field</InputLabel>
        <Select 
          value={condition.fieldId} 
          label="Field"
          onChange={(e) => handleFieldChange(e.target.value)}
        >
          {fields.map(f => (
            <MenuItem key={f.id} value={f.id}>{f.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth>
        <InputLabel>Operator</InputLabel>
        <Select 
          value={condition.operator} 
          label="Operator"
          onChange={(e) => handleOperatorChange(e.target.value as Operator)}
        >
          {operators.map(op => (
            <MenuItem key={op} value={op}>{getOperatorLabel(op)}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box width="100%">
        {renderInput()}
      </Box>
    </Box>
  );
};
