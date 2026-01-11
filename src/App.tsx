
import { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, Typography, Container, Grid, CardContent, Card, Button, Stack } from '@mui/material';
import { MOCK_DATA } from './data/mockData';
import { FilterBuilder } from './components/filter/FilterBuilder';
import { DataTable } from './components/DataTable';
import { useDataFilter } from './hooks/useDataFilter';
import { FilterCondition, FieldDefinition } from './types/filter';
import { exportToCSV, exportToJSON } from './utils/exportUtils';
import { Download as DownloadIcon, FileJson as JsonIcon } from 'lucide-react';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1', // Indigo 500
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#ec4899', // Pink 500
    },
    background: {
      default: 'transparent', // Handled by body gradient
      paper: 'rgba(255, 255, 255, 0.8)', // Glassmorphism base
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Plus Jakarta Sans", "Roboto", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: '#0f172a',
    },
    subtitle1: {
      fontSize: '1.1rem',
      color: '#475569',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    }
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease-in-out',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 20,
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
          backdropFilter: 'blur(12px)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: 'rgba(248, 250, 252, 0.5)',
          color: '#475569',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(255,255,255,0.5)',
            '& fieldset': {
              borderColor: 'rgba(226, 232, 240, 0.8)',
            },
            '&:hover fieldset': {
              borderColor: '#6366f1',
            },
          }
        }
      }
    }
  },
});

const FIELD_DEFINITIONS: FieldDefinition[] = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'role', label: 'Role', type: 'select', options: ['Junior Developer', 'Senior Developer', 'Manager', 'Director', 'Intern', 'Designer'] },
  { id: 'department', label: 'Department', type: 'select', options: ['Engineering', 'Sales', 'Marketing', 'HR', 'Product'] },
  { id: 'salary', label: 'Salary', type: 'amount' },
  { id: 'joinDate', label: 'Join Date', type: 'date' },
  { id: 'isActive', label: 'Active Status', type: 'boolean' },
  { id: 'skills', label: 'Skills', type: 'multi-select', options: ['React', 'TypeScript', 'Node.js', 'Python', 'Go', 'Java', 'SQL', 'GraphQL', 'AWS'] },
  { id: 'address.city', label: 'City', type: 'text' }, // Nested field test
  { id: 'performanceRating', label: 'Perf Rating', type: 'number' },
];

function App() {
  const [conditions, setConditions] = useState<FilterCondition[]>([]);
  const { filteredData, totalCount, filteredCount } = useDataFilter(MOCK_DATA, conditions);

  const handleExportCSV = () => {
    exportToCSV(filteredData, 'filtered-data');
  };

  const handleExportJSON = () => {
    exportToJSON(filteredData, 'filtered-data');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <Box sx={{ position: 'sticky', top: 24 }}>
              <FilterBuilder 
                conditions={conditions} 
                fields={FIELD_DEFINITIONS} 
                onChange={setConditions} 
              />
              
              <Card variant="outlined" sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Statistics
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Total Records:</Typography>
                    <Typography variant="body2" fontWeight="bold">{totalCount}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="body2">Showing:</Typography>
                    <Typography variant="body2" fontWeight="bold" color="primary">{filteredCount}</Typography>
                  </Box>

                  <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
                    Export Actions
                  </Typography>
                  <Stack direction="column" spacing={1}>
                    <Button 
                      variant="outlined" 
                      fullWidth 
                      startIcon={<DownloadIcon size={16} />}
                      onClick={handleExportCSV}
                    >
                      Export CSV
                    </Button>
                    <Button 
                      variant="outlined" 
                      fullWidth 
                      startIcon={<JsonIcon size={16} />}
                      onClick={handleExportJSON}
                    >
                      Export JSON
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={8} lg={9}>
            <DataTable data={filteredData} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
