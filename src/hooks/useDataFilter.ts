
import { useMemo } from 'react';
import { FilterCondition, Operator } from '../types/filter';
import { useDebounce } from './useDebounce';

// Helper to access nested properties safely
const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const checkCondition = (itemValue: any, condition: FilterCondition): boolean => {
  const { operator, value } = condition;

  // Handle null/undefined checks if needed, but for now strict equality on nulls
  if (itemValue === undefined || itemValue === null) return false;

  switch (operator) {
    // Text
    case 'equals':
      return String(itemValue).toLowerCase() === String(value).toLowerCase();
    case 'contains':
      return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
    case 'startsWith':
      return String(itemValue).toLowerCase().startsWith(String(value).toLowerCase());
    case 'endsWith':
      return String(itemValue).toLowerCase().endsWith(String(value).toLowerCase());
    case 'doesNotContain':
      return !String(itemValue).toLowerCase().includes(String(value).toLowerCase());

    // Number
    case 'gt':
      return Number(itemValue) > Number(value);
    case 'lt':
      return Number(itemValue) < Number(value);
    case 'gte':
      return Number(itemValue) >= Number(value);
    case 'lte':
      return Number(itemValue) <= Number(value);
    // case 'between': ... implemented below as mostly ranges are handled differently or via 'between' operator logic
    
    // Arrays (Multi-select)
    case 'in':
      return Array.isArray(value) && value.includes(itemValue);
    case 'notIn':
      return Array.isArray(value) && !value.includes(itemValue); // check if itemValue is NOT in the selected list
    
    // Boolean
    case 'is':
      return itemValue === value;

    // Custom for specific types if needed
    default:
      // Handle 'between' for numbers/dates if passed as array
      if (operator === 'between' && Array.isArray(value) && value.length === 2) {
        if (typeof itemValue === 'number') {
            return itemValue >= value[0] && itemValue <= value[1];
        }
        // Date handling
        const d = new Date(itemValue).getTime();
        const start = new Date(value[0]).getTime();
        const end = new Date(value[1]).getTime();
        return d >= start && d <= end;
      }
      
      return false;
  }
};

export const useDataFilter = <T>(data: T[], conditions: FilterCondition[]) => {
  // Debounce the conditions to prevent heavy filtering on every keystroke
  // 300ms delay is standard for UI responsiveness
  const debouncedConditions = useDebounce(conditions, 300);

  const filteredData = useMemo(() => {
    if (!debouncedConditions || debouncedConditions.length === 0) return data;

    return data.filter((item) => {
      // Logic: AND all conditions (as per requirement "Multiple filter logic: AND between different fields")
      // Wait, requirement says "AND between different fields, OR within same field".
      // This implies if I have two filters for "Role", it's OR. If "Role" and "Salary", it's AND.
      // I need to group conditions by fieldId.
      
      const conditionsByField = debouncedConditions.reduce((acc, cond) => {
        if (!acc[cond.fieldId]) acc[cond.fieldId] = [];
        acc[cond.fieldId].push(cond);
        return acc;
      }, {} as Record<string, FilterCondition[]>);

      // Verify EVERY field group matches (AND)
      return Object.values(conditionsByField).every((fieldConditions) => {
        // Verify ANY condition in the field group matches (OR)
        return fieldConditions.some((cond) => {
          const itemValue = getNestedValue(item, cond.fieldId);
          
          // Special handling for array fields in data (e.g. skills: ['React', 'TS'])
          // Requirement: "Array filtering for multi-select fields (IN/NOT IN operations)"
          // If the data item itself is an array (like skills), and operator is 'contains' or 'in'
          if (Array.isArray(itemValue)) {
             // If operator is 'contains' (text), check if ANY item in array matches
             if (cond.operator === 'contains') {
                 return itemValue.some(v => String(v).toLowerCase().includes(String(cond.value).toLowerCase()));
             }
             // If operator is 'in' (multi-select), check if intersection exists?
             // Usually "Skills IN ['React', 'Node']" means "Does user have React OR Node?"
             // Or does it mean "Does user have ONE of these?" -> Yes.
             if (cond.operator === 'in' && Array.isArray(cond.value)) {
                 return itemValue.some(v => cond.value.includes(v));
             }
          }

          return checkCondition(itemValue, cond);
        });
      });
    });
  }, [data, debouncedConditions]);

  return { filteredData, totalCount: data.length, filteredCount: filteredData.length };
};
