export interface Address {
  city: string;
  state: string;
  country: string;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  joinDate: string; // ISO date
  isActive: boolean;
  skills: string[];
  address: Address;
  projects: number;
  lastReview: string;
  performanceRating: number;
}

const DEPARTMENTS = ['Engineering', 'Sales', 'Marketing', 'HR', 'Product'];
const ROLES = ['Junior Developer', 'Senior Developer', 'Manager', 'Director', 'Intern', 'Designer'];
const SKILLS = ['React', 'TypeScript', 'Node.js', 'Python', 'Go', 'Java', 'SQL', 'GraphQL', 'AWS'];
const CITIES = ['San Francisco', 'New York', 'Austin', 'London', 'Berlin', 'Tokyo', 'Sydney'];

const random = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomDate = (start: Date, end: Date) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];

export const generateData = (count: number = 200): Employee[] => {
  return Array.from({ length: count }).map((_, i) => {
    const dept = random(DEPARTMENTS);
    const role = random(ROLES);
    const nameKeywords = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'Chris', 'Sarah', 'David', 'Jessica', 'Daniel', 'Ashley'];
    
    return {
      id: i + 1,
      name: `${random(firstNames)} ${random(nameKeywords)}`,
      email: `user${i}@company.com`,
      department: dept,
      role: role,
      salary: randomInt(50000, 200000),
      joinDate: randomDate(new Date(2015, 0, 1), new Date()),
      isActive: Math.random() > 0.1,
      skills: Array.from({ length: randomInt(1, 5) }).map(() => random(SKILLS)).filter((v, i, a) => a.indexOf(v) === i),
      address: {
        city: random(CITIES),
        state: 'State',
        country: 'Country'
      },
      projects: randomInt(0, 10),
      lastReview: randomDate(new Date(2023, 0, 1), new Date()),
      performanceRating: Number((Math.random() * (5 - 1) + 1).toFixed(1))
    };
  });
};

export const MOCK_DATA = generateData();
