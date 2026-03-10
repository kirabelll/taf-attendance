export const departments = ["Engineering", "HR", "Finance", "Marketing", "Operations", "Legal", "Design"];

export const employees = [
  { id: "EMP001", name: "Alice Johnson", department: "Engineering", avatar: "AJ", email: "alice@company.com", position: "Senior Developer" },
  { id: "EMP002", name: "Bob Martinez", department: "HR", avatar: "BM", email: "bob@company.com", position: "HR Manager" },
  { id: "EMP003", name: "Carol White", department: "Finance", avatar: "CW", email: "carol@company.com", position: "Financial Analyst" },
  { id: "EMP004", name: "David Lee", department: "Marketing", avatar: "DL", email: "david@company.com", position: "Marketing Lead" },
  { id: "EMP005", name: "Emma Wilson", department: "Engineering", avatar: "EW", email: "emma@company.com", position: "Frontend Engineer" },
  { id: "EMP006", name: "Frank Brown", department: "Operations", avatar: "FB", email: "frank@company.com", position: "Ops Manager" },
  { id: "EMP007", name: "Grace Kim", department: "Design", avatar: "GK", email: "grace@company.com", position: "UX Designer" },
  { id: "EMP008", name: "Henry Davis", department: "Legal", avatar: "HD", email: "henry@company.com", position: "Legal Counsel" },
  { id: "EMP009", name: "Iris Chen", department: "Engineering", avatar: "IC", email: "iris@company.com", position: "DevOps Engineer" },
  { id: "EMP010", name: "James Taylor", department: "Finance", avatar: "JT", email: "james@company.com", position: "Accountant" },
  { id: "EMP011", name: "Karen Moore", department: "HR", avatar: "KM", email: "karen@company.com", position: "Recruiter" },
  { id: "EMP012", name: "Leo Garcia", department: "Marketing", avatar: "LG", email: "leo@company.com", position: "Content Strategist" },
];

export type AttendanceStatus = "Present" | "Absent" | "Late";

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  checkIn: string | null;
  checkOut: string | null;
  status: AttendanceStatus;
  date: string;
  device: string;
}

const today = new Date().toISOString().slice(0, 10);
const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

export const attendanceRecords: AttendanceRecord[] = [
  { id: "A001", employeeId: "EMP001", employeeName: "Alice Johnson", department: "Engineering", checkIn: "08:52", checkOut: "17:30", status: "Present", date: today, device: "Device-01" },
  { id: "A002", employeeId: "EMP002", employeeName: "Bob Martinez", department: "HR", checkIn: "09:45", checkOut: null, status: "Late", date: today, device: "Device-02" },
  { id: "A003", employeeId: "EMP003", employeeName: "Carol White", department: "Finance", checkIn: null, checkOut: null, status: "Absent", date: today, device: "-" },
  { id: "A004", employeeId: "EMP004", employeeName: "David Lee", department: "Marketing", checkIn: "08:58", checkOut: "18:00", status: "Present", date: today, device: "Device-01" },
  { id: "A005", employeeId: "EMP005", employeeName: "Emma Wilson", department: "Engineering", checkIn: "09:02", checkOut: null, status: "Present", date: today, device: "Device-03" },
  { id: "A006", employeeId: "EMP006", employeeName: "Frank Brown", department: "Operations", checkIn: "08:45", checkOut: "17:15", status: "Present", date: today, device: "Device-02" },
  { id: "A007", employeeId: "EMP007", employeeName: "Grace Kim", department: "Design", checkIn: null, checkOut: null, status: "Absent", date: today, device: "-" },
  { id: "A008", employeeId: "EMP008", employeeName: "Henry Davis", department: "Legal", checkIn: "09:30", checkOut: null, status: "Late", date: today, device: "Device-01" },
  { id: "A009", employeeId: "EMP009", employeeName: "Iris Chen", department: "Engineering", checkIn: "08:55", checkOut: "17:55", status: "Present", date: today, device: "Device-03" },
  { id: "A010", employeeId: "EMP010", employeeName: "James Taylor", department: "Finance", checkIn: "09:00", checkOut: null, status: "Present", date: today, device: "Device-02" },
  { id: "A011", employeeId: "EMP011", employeeName: "Karen Moore", department: "HR", checkIn: "08:50", checkOut: "17:00", status: "Present", date: today, device: "Device-01" },
  { id: "A012", employeeId: "EMP012", employeeName: "Leo Garcia", department: "Marketing", checkIn: "10:05", checkOut: null, status: "Late", date: today, device: "Device-02" },
];

export const recentActivity = [
  { id: 1, type: "checkin", employee: "Alice Johnson", time: "08:52 AM", device: "Device-01", avatar: "AJ" },
  { id: 2, type: "checkin", employee: "David Lee", time: "08:58 AM", device: "Device-01", avatar: "DL" },
  { id: 3, type: "checkin", employee: "Frank Brown", time: "08:45 AM", device: "Device-02", avatar: "FB" },
  { id: 4, type: "checkout", employee: "Frank Brown", time: "05:15 PM", device: "Device-02", avatar: "FB" },
  { id: 5, type: "checkin", employee: "Emma Wilson", time: "09:02 AM", device: "Device-03", avatar: "EW" },
  { id: 6, type: "checkin", employee: "Bob Martinez", time: "09:45 AM", device: "Device-02", avatar: "BM" },
  { id: 7, type: "checkout", employee: "Alice Johnson", time: "05:30 PM", device: "Device-01", avatar: "AJ" },
  { id: 8, type: "checkin", employee: "Iris Chen", time: "08:55 AM", device: "Device-03", avatar: "IC" },
];

export const weeklyTrend = [
  { day: "Mon", present: 9, absent: 2, late: 1 },
  { day: "Tue", present: 10, absent: 1, late: 1 },
  { day: "Wed", present: 8, absent: 3, late: 1 },
  { day: "Thu", present: 11, absent: 0, late: 1 },
  { day: "Fri", present: 7, absent: 2, late: 3 },
  { day: "Sat", present: 4, absent: 7, late: 1 },
  { day: "Sun", present: 2, absent: 9, late: 1 },
];

export const monthlyTrend = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1}`,
  rate: Math.floor(70 + Math.random() * 25),
}));

export const departmentStats = [
  { dept: "Engineering", present: 3, total: 3 },
  { dept: "HR", present: 1, total: 2 },
  { dept: "Finance", present: 1, total: 2 },
  { dept: "Marketing", present: 1, total: 2 },
  { dept: "Operations", present: 1, total: 1 },
  { dept: "Legal", present: 0, total: 1 },
  { dept: "Design", present: 0, total: 1 },
];

export interface Device {
  id: string;
  name: string;
  ip: string;
  location: string;
  status: "Online" | "Offline";
  lastSync: string;
  totalScans: number;
  model: string;
}

export const devices: Device[] = [
  { id: "DEV001", name: "Device-01", ip: "192.168.1.101", location: "Main Entrance", status: "Online", lastSync: "2 min ago", totalScans: 1204, model: "ZK-BIO800" },
  { id: "DEV002", name: "Device-02", ip: "192.168.1.102", location: "Floor 2 - HR", status: "Online", lastSync: "1 min ago", totalScans: 980, model: "ZK-BIO800" },
  { id: "DEV003", name: "Device-03", ip: "192.168.1.103", location: "Engineering Lab", status: "Online", lastSync: "5 min ago", totalScans: 756, model: "Suprema BS2" },
  { id: "DEV004", name: "Device-04", ip: "192.168.1.104", location: "Cafeteria", status: "Offline", lastSync: "2 hrs ago", totalScans: 432, model: "ZK-BIO800" },
  { id: "DEV005", name: "Device-05", ip: "192.168.1.105", location: "Back Exit", status: "Online", lastSync: "3 min ago", totalScans: 210, model: "Hikvision DS" },
];

export const notifications = [
  { id: 1, type: "warning", title: "Device-04 Offline", message: "Cafeteria device has been offline for 2 hours", time: "2 hrs ago" },
  { id: 2, type: "info", title: "Late Arrivals", message: "3 employees arrived after 9:30 AM today", time: "1 hr ago" },
  { id: 3, type: "error", title: "Sync Failed", message: "Device-04 failed to sync attendance data", time: "2 hrs ago" },
  { id: 4, type: "success", title: "Report Generated", message: "Monthly attendance report is ready to download", time: "30 min ago" },
];
