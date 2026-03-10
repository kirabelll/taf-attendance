import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { attendanceRecords, employees, departments } from "@/lib/mockData";
import { Search, Filter, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const PAGE_SIZE = 6;

export default function Employees() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<typeof employees[number] | null>(null);

  const filtered = attendanceRecords.filter(r => {
    const matchSearch = r.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      r.employeeId.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === "All" || r.department === dept;
    return matchSearch && matchDept;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const getEmployee = (id: string) => employees.find(e => e.id === id);

  const weeklyData = [
    { day: "Mon", status: "Present" }, { day: "Tue", status: "Present" },
    { day: "Wed", status: "Absent" }, { day: "Thu", status: "Present" },
    { day: "Fri", status: "Late" },
  ];

  return (
    <AppLayout>
      <div className="space-y-5 animate-fade-in">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by name or ID..."
              className="pl-9 h-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={dept}
              onChange={e => { setDept(e.target.value); setPage(1); }}
              className="h-10 px-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="All">All Departments</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Table */}
          <div className="xl:col-span-2 stat-card">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-foreground">
                Employee Attendance — <span className="text-muted-foreground font-normal">{filtered.length} records</span>
              </p>
            </div>
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["ID", "Employee", "Department", "Check In", "Check Out", "Date", "Status"].map(h => (
                      <th key={h} className="text-left text-xs font-medium text-muted-foreground py-3 px-2">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(r => (
                    <tr
                      key={r.id}
                      onClick={() => setSelected(getEmployee(r.employeeId) ?? null)}
                      className={`border-b border-border/40 cursor-pointer transition-colors ${
                        selected?.id === r.employeeId ? "bg-primary-subtle" : "hover:bg-muted/30"
                      }`}
                    >
                      <td className="py-3 px-2 font-mono text-xs text-muted-foreground">{r.employeeId}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary-subtle flex items-center justify-center text-primary text-[10px] font-semibold flex-shrink-0">
                            {r.employeeName.split(" ").map(n => n[0]).join("")}
                          </div>
                          <span className="font-medium text-foreground text-xs truncate max-w-[100px]">{r.employeeName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-xs text-muted-foreground">{r.department}</td>
                      <td className="py-3 px-2 font-mono text-xs text-foreground">{r.checkIn ?? "—"}</td>
                      <td className="py-3 px-2 font-mono text-xs text-foreground">{r.checkOut ?? "—"}</td>
                      <td className="py-3 px-2 text-xs text-muted-foreground">{r.date}</td>
                      <td className="py-3 px-2">
                        <span className={
                          r.status === "Present" ? "badge-present" :
                          r.status === "Absent" ? "badge-absent" : "badge-late"
                        }>
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {paginated.length === 0 && (
                    <tr><td colSpan={7} className="text-center py-12 text-muted-foreground">No records found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-1.5 rounded hover:bg-muted disabled:opacity-40 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
                        page === i + 1 ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-1.5 rounded hover:bg-muted disabled:opacity-40 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Employee Profile Panel */}
          <div className="stat-card">
            {selected ? (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-foreground">Employee Profile</p>
                  <button onClick={() => setSelected(null)} className="p-1 rounded hover:bg-muted">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                {/* Avatar */}
                <div className="flex flex-col items-center text-center pb-4 border-b border-border">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground text-xl font-bold mb-3 shadow-primary">
                    {selected.avatar}
                  </div>
                  <p className="text-base font-bold text-foreground">{selected.name}</p>
                  <p className="text-sm text-muted-foreground">{selected.position}</p>
                  <span className="mt-2 text-xs bg-primary-subtle text-primary px-2.5 py-1 rounded-full font-medium">
                    {selected.department}
                  </span>
                </div>
                {/* Details */}
                <div className="py-4 space-y-3 border-b border-border">
                  {[
                    { label: "Employee ID", value: selected.id },
                    { label: "Email", value: selected.email },
                    { label: "Department", value: selected.department },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium text-foreground truncate max-w-[140px]">{item.value}</span>
                    </div>
                  ))}
                </div>
                {/* Weekly attendance */}
                <div className="pt-4">
                  <p className="text-xs font-semibold text-foreground mb-3">This Week's Attendance</p>
                  <div className="flex gap-2 justify-between">
                    {weeklyData.map(w => (
                      <div key={w.day} className="flex flex-col items-center gap-1.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                          w.status === "Present" ? "bg-success-subtle text-success" :
                          w.status === "Absent" ? "bg-danger-subtle text-danger" : "bg-warning-subtle text-warning"
                        }`}>
                          {w.status === "Present" ? "P" : w.status === "Absent" ? "A" : "L"}
                        </div>
                        <span className="text-[10px] text-muted-foreground">{w.day}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[
                      { label: "Present", value: 3, color: "text-success" },
                      { label: "Absent", value: 1, color: "text-danger" },
                      { label: "Late", value: 1, color: "text-warning" },
                    ].map(s => (
                      <div key={s.label} className="text-center bg-muted rounded-lg py-2">
                        <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                        <p className="text-[10px] text-muted-foreground">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-3">
                  <Search className="w-7 h-7 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">Select an Employee</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-[160px]">
                  Click any row to view employee profile and attendance details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
