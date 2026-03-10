import AppLayout from "@/components/AppLayout";
import { devices } from "@/lib/mockData";
import { Wifi, WifiOff, RefreshCw, Activity, Server, MapPin, Clock } from "lucide-react";
import { useState } from "react";

export default function DeviceStatus() {
  const [deviceList, setDeviceList] = useState(devices);
  const [syncing, setSyncing] = useState<string | null>(null);

  const handleSync = (id: string) => {
    setSyncing(id);
    setTimeout(() => setSyncing(null), 1500);
  };

  const online = deviceList.filter(d => d.status === "Online").length;
  const offline = deviceList.filter(d => d.status === "Offline").length;

  return (
    <AppLayout>
      <div className="space-y-5 animate-fade-in">
        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Devices", value: deviceList.length, icon: Server, color: "bg-primary-subtle text-primary" },
            { label: "Online", value: online, icon: Wifi, color: "bg-success-subtle text-success" },
            { label: "Offline", value: offline, icon: WifiOff, color: "bg-danger-subtle text-danger" },
            { label: "Total Scans", value: deviceList.reduce((a, d) => a + d.totalScans, 0).toLocaleString(), icon: Activity, color: "bg-warning-subtle text-warning" },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
                </div>
                <div className={`p-2.5 rounded-xl ${s.color}`}>
                  <s.icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Device cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {deviceList.map(device => (
            <div key={device.id} className="stat-card space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-foreground">{device.name}</p>
                    <span className={device.status === "Online" ? "badge-online" : "badge-offline"}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {device.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{device.model}</p>
                </div>
                <button
                  onClick={() => handleSync(device.id)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  title="Sync device"
                >
                  <RefreshCw className={`w-4 h-4 text-muted-foreground ${syncing === device.id ? "animate-spin" : ""}`} />
                </button>
              </div>

              {/* Details */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-sm">
                  <Server className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">IP:</span>
                  <span className="font-mono text-foreground font-medium">{device.ip}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">Location:</span>
                  <span className="text-foreground">{device.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">Last Sync:</span>
                  <span className="text-foreground">{device.lastSync}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{device.totalScans.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Scans</p>
                </div>
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                    device.status === "Online"
                      ? "bg-success-subtle"
                      : "bg-danger-subtle"
                  }`}>
                    {device.status === "Online"
                      ? <Wifi className="w-6 h-6 text-success" />
                      : <WifiOff className="w-6 h-6 text-danger" />
                    }
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{device.id}</p>
                  <p className="text-xs text-muted-foreground">Device ID</p>
                </div>
              </div>

              {device.status === "Offline" && (
                <div className="flex items-center gap-2 bg-danger-subtle border border-danger/20 rounded-lg px-3 py-2">
                  <WifiOff className="w-4 h-4 text-danger flex-shrink-0" />
                  <p className="text-xs text-danger font-medium">Device offline — Check network connection</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Device table */}
        <div className="stat-card">
          <p className="text-sm font-semibold text-foreground mb-4">Device Overview</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Device", "Model", "IP Address", "Location", "Status", "Last Sync", "Total Scans", "Action"].map(h => (
                    <th key={h} className="text-left text-xs font-medium text-muted-foreground py-3 px-3 first:pl-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {deviceList.map(d => (
                  <tr key={d.id} className="border-b border-border/40 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-3 first:pl-0 font-semibold text-foreground">{d.name}</td>
                    <td className="py-3 px-3 text-muted-foreground text-xs">{d.model}</td>
                    <td className="py-3 px-3 font-mono text-xs text-foreground">{d.ip}</td>
                    <td className="py-3 px-3 text-muted-foreground">{d.location}</td>
                    <td className="py-3 px-3">
                      <span className={d.status === "Online" ? "badge-online" : "badge-offline"}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {d.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground text-xs">{d.lastSync}</td>
                    <td className="py-3 px-3 text-foreground font-medium">{d.totalScans.toLocaleString()}</td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => handleSync(d.id)}
                        className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        <RefreshCw className={`w-3 h-3 ${syncing === d.id ? "animate-spin" : ""}`} />
                        Sync
                      </button>
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
