import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { departments, weeklyTrend, monthlyTrend, departmentStats } from "@/lib/mockData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, AreaChart, Area
} from "recharts";
import { Download, FileSpreadsheet, FileText, Calendar, Building2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-4 py-3 shadow-elevated text-sm">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-muted-foreground">{p.name}:</span>
            <span className="font-medium text-foreground">{p.value}{p.name === "Rate" ? "%" : ""}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Reports() {
  const [dateFrom, setDateFrom] = useState("2025-03-01");
  const [dateTo, setDateTo] = useState("2025-03-08");
  const [dept, setDept] = useState("All");
  const [generated, setGenerated] = useState(false);

  return (
    <AppLayout>
      <div className="space-y-5 animate-fade-in">
        {/* Filters */}
        <div className="stat-card">
          <p className="text-sm font-semibold text-foreground mb-4">Generate Report</p>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> From
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
                className="h-10 px-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> To
              </label>
              <input
                type="date"
                value={dateTo}
                onChange={e => setDateTo(e.target.value)}
                className="h-10 px-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> Department
              </label>
              <select
                value={dept}
                onChange={e => setDept(e.target.value)}
                className="h-10 px-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="All">All Departments</option>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <Button
              onClick={() => setGenerated(true)}
              className="h-10 bg-primary text-primary-foreground shadow-primary hover:opacity-90 transition-opacity"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Export buttons */}
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-sm font-medium text-foreground">
            <FileSpreadsheet className="w-4 h-4 text-success" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-sm font-medium text-foreground">
            <FileText className="w-4 h-4 text-danger" />
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-sm font-medium text-foreground">
            <Download className="w-4 h-4 text-primary" />
            Download Excel
          </button>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Monthly attendance rate */}
          <div className="stat-card">
            <div className="mb-5">
              <p className="text-sm font-semibold text-foreground">Monthly Attendance Rate</p>
              <p className="text-xs text-muted-foreground mt-0.5">Daily attendance % for selected period</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyTrend.slice(0, 20)}>
                <defs>
                  <linearGradient id="rateGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} unit="%" domain={[50, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="rate" name="Rate" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#rateGrad2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Department comparison */}
          <div className="stat-card">
            <div className="mb-5">
              <p className="text-sm font-semibold text-foreground">Department Comparison</p>
              <p className="text-xs text-muted-foreground mt-0.5">Present vs Total by department</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={departmentStats} barSize={14} barGap={4} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis dataKey="dept" type="category" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={70} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
                <Bar dataKey="present" name="Present" fill="hsl(var(--success))" radius={[0, 4, 4, 0]} />
                <Bar dataKey="total" name="Total" fill="hsl(var(--muted-foreground) / 0.3)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly breakdown */}
        <div className="stat-card">
          <div className="mb-5">
            <p className="text-sm font-semibold text-foreground">Weekly Breakdown</p>
            <p className="text-xs text-muted-foreground mt-0.5">Daily present, absent and late trends</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
              <Line type="monotone" dataKey="present" name="Present" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="absent" name="Absent" stroke="hsl(var(--danger))" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="late" name="Late" stroke="hsl(var(--warning))" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Summary table */}
        <div className="stat-card">
          <p className="text-sm font-semibold text-foreground mb-4">Department Summary</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Department", "Total Employees", "Present", "Absent", "Late", "Attendance %"].map(h => (
                    <th key={h} className="text-left text-xs font-medium text-muted-foreground py-3 px-3 first:pl-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {departmentStats.map(d => {
                  const pct = Math.round((d.present / d.total) * 100);
                  const absent = d.total - d.present;
                  return (
                    <tr key={d.dept} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-3 first:pl-0 font-medium text-foreground">{d.dept}</td>
                      <td className="py-3 px-3 text-muted-foreground">{d.total}</td>
                      <td className="py-3 px-3 text-success font-medium">{d.present}</td>
                      <td className="py-3 px-3 text-danger font-medium">{absent}</td>
                      <td className="py-3 px-3 text-warning font-medium">0</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden max-w-[80px]">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${pct}%`,
                                background: pct >= 80 ? "hsl(var(--success))" : pct >= 50 ? "hsl(var(--warning))" : "hsl(var(--danger))"
                              }}
                            />
                          </div>
                          <span className="font-medium text-foreground">{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
