
import { FieldType, Operator } from '../types/filter';

export const getOperatorsForType = (type: FieldType): Operator[] => {
  switch (type) {
    case 'text':
      return ['contains', 'equals', 'startsWith', 'endsWith', 'doesNotContain'];
    case 'number':
    case 'amount':
      return ['equals', 'gt', 'lt', 'gte', 'lte', 'between'];
    case 'date':
      return ['between', 'gt', 'lt', 'equals'];
    case 'select':
      return ['is', 'isNot'];
    case 'multi-select':
      return ['in', 'notIn'];
    case 'boolean':
      return ['is'];
    default:
      return ['equals'];
  }
};

export const getOperatorLabel = (op: Operator): string => {
  const map: Record<Operator, string> = {
    contains: 'Contains',
    equals: 'Equals',
    startsWith: 'Starts with',
    endsWith: 'Ends with',
    doesNotContain: 'Does not contain',
    gt: 'Greater than',
    lt: 'Less than',
    gte: 'Greater than or equal',
    lte: 'Less than or equal',
    between: 'Between',
    is: 'Is',
    isNot: 'Is not',
    in: 'Is any of',
    notIn: 'Is not any of'
  };
  return map[op];
};
