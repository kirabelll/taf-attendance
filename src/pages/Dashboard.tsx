import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { attendanceRecords, weeklyTrend, departmentStats, employees } from "@/lib/mockData";
import {
  Users, UserCheck, UserX, Clock, TrendingUp, TrendingDown, ChevronRight
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell
} from "recharts";
import { Link } from "react-router-dom";

const present = attendanceRecords.filter(r => r.status === "Present").length;
const absent = attendanceRecords.filter(r => r.status === "Absent").length;
const late = attendanceRecords.filter(r => r.status === "Late").length;
const total = employees.length;

const statsData = [
  {
    label: "Total Employees",
    value: total,
    icon: Users,
    color: "bg-primary-subtle text-primary",
    trend: "+2 this month",
    positive: true,
  },
  {
    label: "Present Today",
    value: present,
    icon: UserCheck,
    color: "bg-success-subtle text-success",
    trend: `${Math.round((present / total) * 100)}% attendance rate`,
    positive: true,
  },
  {
    label: "Absent Today",
    value: absent,
    icon: UserX,
    color: "bg-danger-subtle text-danger",
    trend: `${Math.round((absent / total) * 100)}% absent`,
    positive: false,
  },
  {
    label: "Late Arrivals",
    value: late,
    icon: Clock,
    color: "bg-warning-subtle text-warning",
    trend: "After 9:15 AM",
    positive: false,
  },
];

const PIE_COLORS = ["hsl(142 71% 45%)", "hsl(0 84% 60%)", "hsl(38 92% 50%)"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-4 py-3 shadow-elevated text-sm">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
            <span className="text-muted-foreground capitalize">{p.name}:</span>
            <span className="font-medium text-foreground">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {statsData.map(stat => (
            <div key={stat.label} className="stat-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                {stat.positive
                  ? <TrendingUp className="w-3.5 h-3.5 text-success" />
                  : <TrendingDown className="w-3.5 h-3.5 text-danger" />}
                <span className="text-xs text-muted-foreground">{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Weekly trend */}
          <div className="xl:col-span-2 stat-card">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-sm font-semibold text-foreground">Weekly Attendance Trend</p>
                <p className="text-xs text-muted-foreground mt-0.5">Present, Absent & Late breakdown</p>
              </div>
              <Link to="/reports" className="text-xs text-primary hover:underline flex items-center gap-1">
                View Reports <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyTrend} barSize={10} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
                <Bar dataKey="present" name="Present" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" name="Absent" fill="hsl(var(--danger))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="late" name="Late" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Today's summary */}
          <div className="stat-card">
            <div className="mb-5">
              <p className="text-sm font-semibold text-foreground">Today's Summary</p>
              <p className="text-xs text-muted-foreground mt-0.5">Attendance distribution</p>
            </div>
            <div className="flex justify-center">
              <PieChart width={180} height={160}>
                <Pie
                  data={[
                    { name: "Present", value: present },
                    { name: "Absent", value: absent },
                    { name: "Late", value: late },
                  ]}
                  cx={85} cy={75} innerRadius={48} outerRadius={72}
                  paddingAngle={3} dataKey="value"
                >
                  {PIE_COLORS.map((color, i) => <Cell key={i} fill={color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </div>
            <div className="space-y-2 mt-2">
              {[
                { label: "Present", value: present, color: "bg-success" },
                { label: "Absent", value: absent, color: "bg-danger" },
                { label: "Late", value: late, color: "bg-warning" },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{item.value}</span>
                    <span className="text-xs text-muted-foreground">({Math.round((item.value / total) * 100)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Department stats + recent activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Department breakdown */}
          <div className="xl:col-span-2 stat-card">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-sm font-semibold text-foreground">Department Attendance</p>
                <p className="text-xs text-muted-foreground mt-0.5">Today's attendance by department</p>
              </div>
            </div>
            <div className="space-y-3">
              {departmentStats.map(d => {
                const pct = Math.round((d.present / d.total) * 100);
                return (
                  <div key={d.dept} className="flex items-center gap-3">
                    <span className="text-sm text-foreground w-28 flex-shrink-0 truncate">{d.dept}</span>
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          background: pct >= 80 ? "hsl(var(--success))" : pct >= 50 ? "hsl(var(--warning))" : "hsl(var(--danger))"
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground w-16 text-right flex-shrink-0">
                      {d.present}/{d.total} <span className="text-muted-foreground text-xs">({pct}%)</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Attendance rate area chart */}
          <div className="stat-card">
            <div className="mb-5">
              <p className="text-sm font-semibold text-foreground">Attendance Rate</p>
              <p className="text-xs text-muted-foreground mt-0.5">Last 7 days trend</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weeklyTrend.map(w => ({ ...w, rate: Math.round((w.present / 12) * 100) }))}>
                <defs>
                  <linearGradient id="rateGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone" dataKey="rate" name="Rate"
                  stroke="hsl(var(--primary))" strokeWidth={2}
                  fill="url(#rateGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent attendance table */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Recent Attendance</p>
              <p className="text-xs text-muted-foreground mt-0.5">Today's check-in overview</p>
            </div>
            <Link to="/employees" className="text-xs text-primary hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto -mx-1">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Employee", "Department", "Check In", "Check Out", "Status"].map(h => (
                    <th key={h} className="text-left text-xs font-medium text-muted-foreground py-3 px-2 first:pl-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.slice(0, 6).map(r => (
                  <tr key={r.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-2 first:pl-0">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary-subtle flex items-center justify-center text-primary text-xs font-semibold flex-shrink-0">
                          {r.employeeName.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="font-medium text-foreground truncate max-w-[120px]">{r.employeeName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground">{r.department}</td>
                    <td className="py-3 px-2 font-mono text-sm text-foreground">{r.checkIn ?? "—"}</td>
                    <td className="py-3 px-2 font-mono text-sm text-foreground">{r.checkOut ?? "—"}</td>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
