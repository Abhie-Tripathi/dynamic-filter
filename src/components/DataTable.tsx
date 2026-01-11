
import {
  Chip,
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from '@mui/material';
import React, { useState } from 'react';
import { Address, Employee } from '../data/mockData';

interface DataTableProps {
  data: Employee[];
}

type Order = 'asc' | 'desc';

// Helper to get nested value for sorting
const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<keyof Employee>('id');
  const [order, setOrder] = useState<Order>('asc');

  const handleRequestSort = (property: keyof Employee) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortData = (array: Employee[]) => {
    return array.sort((a, b) => {
      const aValue = getNestedValue(a, String(orderBy));
      const bValue = getNestedValue(b, String(orderBy));

      if (bValue < aValue) return order === 'asc' ? 1 : -1;
      if (bValue > aValue) return order === 'asc' ? -1 : 1;
      return 0;
    });
  };

  // Avoid sorting if not needed/expensive, but here it's fine for 50 records
  const sortedData = sortData([...data]);
  const visibleRows = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const formatValue = (value: any, key: string) => {
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (key === 'salary') return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    if (key === 'address') return `${(value as Address).city}, ${(value as Address).country}`;
    if (Array.isArray(value)) return value.join(', ');
    return value;
  };

  const headCells: { id: keyof Employee; label: string; numeric: boolean }[] = [
    { id: 'name', label: 'Name', numeric: false },
    { id: 'role', label: 'Role', numeric: false },
    { id: 'department', label: 'Department', numeric: false },
    { id: 'salary', label: 'Salary', numeric: true },
    { id: 'joinDate', label: 'Join Date', numeric: false },
    { id: 'isActive', label: 'Active', numeric: false },
    { id: 'performanceRating', label: 'Rating', numeric: true },
  ];

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} size="medium">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={() => handleRequestSort(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Skills</TableCell> 
              <TableCell>City</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              visibleRows.map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    <Chip label={row.department} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell align="right">{formatValue(row.salary, 'salary')}</TableCell>
                  <TableCell>{row.joinDate}</TableCell>
                  <TableCell>
                     <Chip 
                       label={row.isActive ? 'Active' : 'Inactive'} 
                       color={row.isActive ? 'success' : 'default'} 
                       size="small" 
                     />
                  </TableCell>
                  <TableCell align="right">{row.performanceRating}</TableCell>
                  <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {row.skills.join(', ')}
                  </TableCell>
                  <TableCell>{row.address.city}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
