import { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { recentActivity, attendanceRecords } from "@/lib/mockData";
import { LogIn, LogOut, RefreshCw, Wifi, Clock } from "lucide-react";

type Activity = typeof recentActivity[number] & { id: number };

let feedId = 20;
const extraNames = ["Alice Johnson", "Bob Martinez", "Emma Wilson", "Iris Chen", "Frank Brown", "David Lee"];
const devices = ["Device-01", "Device-02", "Device-03", "Device-05"];
const avatars = ["AJ", "BM", "EW", "IC", "FB", "DL"];

function generateActivity(): Activity {
  const idx = Math.floor(Math.random() * extraNames.length);
  const types = ["checkin", "checkout"] as const;
  const type = types[Math.floor(Math.random() * 2)];
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  return {
    id: ++feedId,
    type,
    employee: extraNames[idx],
    time,
    device: devices[Math.floor(Math.random() * devices.length)],
    avatar: avatars[idx],
  };
}

export default function AttendanceMonitor() {
  const [feed, setFeed] = useState<Activity[]>([...recentActivity] as Activity[]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshing(true);
      setTimeout(() => {
        setFeed(prev => [generateActivity(), ...prev.slice(0, 19)]);
        setLastRefresh(new Date());
        setRefreshing(false);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const manualRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setFeed(prev => [generateActivity(), ...prev.slice(0, 19)]);
      setLastRefresh(new Date());
      setRefreshing(false);
    }, 600);
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Checked In", value: attendanceRecords.filter(r => r.checkIn).length, color: "text-success", bg: "bg-success-subtle" },
            { label: "Checked Out", value: attendanceRecords.filter(r => r.checkOut).length, color: "text-primary", bg: "bg-primary-subtle" },
            { label: "Still Working", value: attendanceRecords.filter(r => r.checkIn && !r.checkOut).length, color: "text-warning", bg: "bg-warning-subtle" },
            { label: "Absent", value: attendanceRecords.filter(r => !r.checkIn).length, color: "text-danger", bg: "bg-danger-subtle" },
          ].map(s => (
            <div key={s.label} className="stat-card text-center">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Live feed */}
          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">Live Attendance Feed</p>
                  <div className="flex items-center gap-1.5">
                    <span className="pulse-dot online" />
                    <span className="text-xs text-success font-medium">Live</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Last updated: {lastRefresh.toLocaleTimeString()}
                </p>
              </div>
              <button
                onClick={manualRefresh}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 text-muted-foreground ${refreshing ? "animate-spin" : ""}`} />
              </button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {feed.map((item, i) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-muted/20 ${i === 0 ? "animate-fade-up" : ""}`}
                >
                  <div className="w-9 h-9 rounded-full bg-primary-subtle flex items-center justify-center text-primary text-xs font-semibold flex-shrink-0">
                    {item.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.employee}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Wifi className="w-3 h-3" /> {item.device}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                      item.type === "checkin"
                        ? "bg-success-subtle text-success"
                        : "bg-primary-subtle text-primary"
                    }`}>
                      {item.type === "checkin"
                        ? <LogIn className="w-3 h-3" />
                        : <LogOut className="w-3 h-3" />}
                      {item.type === "checkin" ? "Check In" : "Check Out"}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's full attendance */}
          <div className="stat-card">
            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground">Today's Attendance Log</p>
              <p className="text-xs text-muted-foreground mt-0.5">All employee check-in/out times</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Employee", "Check In", "Check Out", "Status", "Device"].map(h => (
                      <th key={h} className="text-left text-xs font-medium text-muted-foreground py-2 px-2 first:pl-0">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map(r => (
                    <tr key={r.id} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                      <td className="py-2.5 px-2 first:pl-0">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary-subtle flex items-center justify-center text-primary text-[10px] font-semibold flex-shrink-0">
                            {r.employeeName.split(" ").map(n => n[0]).join("")}
                          </div>
                          <span className="text-xs font-medium text-foreground truncate max-w-[80px]">{r.employeeName}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-2 font-mono text-xs text-foreground">{r.checkIn ?? "—"}</td>
                      <td className="py-2.5 px-2 font-mono text-xs text-foreground">{r.checkOut ?? "—"}</td>
                      <td className="py-2.5 px-2">
                        <span className={
                          r.status === "Present" ? "badge-present text-[10px]" :
                          r.status === "Absent" ? "badge-absent text-[10px]" : "badge-late text-[10px]"
                        }>
                          {r.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-xs text-muted-foreground">{r.device}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
