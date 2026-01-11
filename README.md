# Dynamic Filter Component System

A reuseable, type-safe matching filter system built with React, TypeScript, and Material UI.

## Features
- **Dynamic Filter Building**: Add, remove, and modify filter conditions.
- **Multi-Type Support**: Text, Number, Date, Select, Multi-Select, Boolean, Amount.
- **Complex Logic**: Supports AND logic across fields and custom operators per type.
- **Real-Time Filtering**: Client-side filtering of 50+ mock records.
- **Sortable Data Table**: View results in a paginated, sortable table.

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Application**:
   Navigate to `http://localhost:5173` in your browser.

## Component Usage
The `FilterBuilder` can be used with any dataset by defining `FieldDefinition`s:

```tsx
const fields = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'price', label: 'Price', type: 'amount' },
  // ...
];

<FilterBuilder 
  conditions={conditions} 
  fields={fields} 
  onChange={setConditions} 
/>
```
