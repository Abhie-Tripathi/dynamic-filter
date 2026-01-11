
export type FieldType = 'text' | 'number' | 'date' | 'boolean' | 'select' | 'multi-select' | 'amount';

export type Operator = 
  | 'equals' 
  | 'contains' 
  | 'startsWith' 
  | 'endsWith' 
  | 'doesNotContain'
  | 'gt' // greater than
  | 'lt' // less than
  | 'gte' // greater than or equal
  | 'lte' // less than or equal
  | 'between'
  | 'is' 
  | 'isNot'
  | 'in'
  | 'notIn';

export interface FilterCondition {
  id: string; // Unique ID for the filter row
  fieldId: string; // The dot-notation path to the field (e.g., "address.city")
  operator: Operator;
  value: any; // The filter value (string, number, [date, date], etc.)
}

export interface FieldDefinition {
  id: string; // Dot notation path (e.g. "name", "address.city")
  label: string; // Display name
  type: FieldType;
  options?: string[]; // For select/multi-select
}

export interface FilterState {
  conditions: FilterCondition[];
  logicOperator: 'AND' | 'OR'; // Though requirement implies mixed logic, we'll start with global AND/OR or per-group. 
  // Requirement says: "AND between different fields, OR within same field" - this functionality is often intrinsic or handled by the filter engine.
  // We will store a flat list of conditions for the UI, and the engine will apply the logic rule.
}
