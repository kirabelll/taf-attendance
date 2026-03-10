import AppLayout from "@/components/AppLayout";
import { useTheme } from "@/hooks/useTheme";
import {
  Sun, Moon, Bell, Lock, Globe, Database,
  Server, Shield, Save, User, Mail, Phone
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SettingSection({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="stat-card space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-border">
        <div className="p-2 rounded-lg bg-primary-subtle">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
      </div>
      {children}
    </div>
  );
}

function ToggleRow({ label, desc, defaultOn }: { label: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn ?? false);
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${on ? "bg-primary" : "bg-muted"}`}
      >
        <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-4" : "translate-x-1"}`} />
      </button>
    </div>
  );
}

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [saved, setSaved] = useState(false);
  const [apiUrl, setApiUrl] = useState("https://api.company.com");
  const [checkInTime, setCheckInTime] = useState("09:00");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppLayout>
      <div className="space-y-5 animate-fade-in max-w-4xl">
        {/* Admin profile */}
        <SettingSection title="Admin Profile" icon={User}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground text-xl font-bold shadow-primary">
              HR
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">HR Administrator</p>
              <p className="text-xs text-muted-foreground">Super Admin</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground flex items-center gap-1"><User className="w-3.5 h-3.5" /> Full Name</Label>
              <Input defaultValue="HR Administrator" className="h-9" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email</Label>
              <Input defaultValue="admin@company.com" className="h-9" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Phone</Label>
              <Input defaultValue="+1 (555) 000-0000" className="h-9" />
            </div>
          </div>
        </SettingSection>

        {/* Appearance */}
        <SettingSection title="Appearance" icon={Sun}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Theme</p>
              <p className="text-xs text-muted-foreground mt-0.5">Switch between light and dark mode</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => theme !== "light" && toggleTheme()}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  theme === "light" ? "bg-primary text-primary-foreground shadow-primary" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <Sun className="w-3.5 h-3.5" /> Light
              </button>
              <button
                onClick={() => theme !== "dark" && toggleTheme()}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  theme === "dark" ? "bg-primary text-primary-foreground shadow-primary" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <Moon className="w-3.5 h-3.5" /> Dark
              </button>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Language</Label>
            <select className="w-full h-9 px-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>English (US)</option>
              <option>Arabic</option>
              <option>French</option>
            </select>
          </div>
        </SettingSection>

        {/* Attendance settings */}
        <SettingSection title="Attendance Settings" icon={Database}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Standard Check-in Time</Label>
              <input
                type="time"
                value={checkInTime}
                onChange={e => setCheckInTime(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Grace Period (minutes)</Label>
              <Input defaultValue="15" type="number" className="h-9" />
            </div>
          </div>
          <ToggleRow label="Auto Mark Absent" desc="Automatically mark employees absent if not checked in by cutoff" defaultOn />
          <ToggleRow label="Allow Manual Override" desc="Allow HR to manually adjust attendance records" defaultOn />
          <ToggleRow label="Overtime Tracking" desc="Track and flag overtime hours automatically" />
        </SettingSection>

        {/* API / Backend */}
        <SettingSection title="API Configuration" icon={Server}>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Django API Base URL</Label>
            <Input
              value={apiUrl}
              onChange={e => setApiUrl(e.target.value)}
              className="h-9 font-mono"
              placeholder="https://api.company.com"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">JWT Token Header</Label>
              <Input defaultValue="Authorization: Bearer" className="h-9 font-mono" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Polling Interval (sec)</Label>
              <Input defaultValue="5" type="number" className="h-9" />
            </div>
          </div>
          <div className="flex items-center gap-2 bg-success-subtle border border-success/20 rounded-lg px-3 py-2">
            <div className="w-2 h-2 rounded-full bg-success" />
            <p className="text-xs text-success font-medium">Connected to Django REST API</p>
          </div>
        </SettingSection>

        {/* Notifications */}
        <SettingSection title="Notifications" icon={Bell}>
          <ToggleRow label="Device Offline Alerts" desc="Get notified when an attendance device goes offline" defaultOn />
          <ToggleRow label="Late Arrival Alerts" desc="Send alerts when employees arrive late" defaultOn />
          <ToggleRow label="Daily Summary Email" desc="Receive a daily attendance summary via email" />
          <ToggleRow label="System Error Alerts" desc="Alerts for sync failures and system errors" defaultOn />
        </SettingSection>

        {/* Security */}
        <SettingSection title="Security" icon={Shield}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Current Password</Label>
              <Input type="password" placeholder="••••••••" className="h-9" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">New Password</Label>
              <Input type="password" placeholder="••••••••" className="h-9" />
            </div>
          </div>
          <ToggleRow label="Two-Factor Authentication" desc="Enable 2FA for extra account security" />
          <ToggleRow label="Session Timeout" desc="Auto-logout after 30 minutes of inactivity" defaultOn />
        </SettingSection>

        {/* Save */}
        <div className="flex items-center gap-3">
          <Button
            onClick={handleSave}
            className="bg-primary text-primary-foreground shadow-primary hover:opacity-90 transition-opacity"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          {saved && (
            <span className="text-sm text-success font-medium animate-fade-in flex items-center gap-1">
              ✓ Settings saved successfully
            </span>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
