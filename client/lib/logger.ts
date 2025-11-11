export type ActivityType =
  | "job_applied"
  | "job_reviewed"
  | "job_not_interested"
  | "search_performed"
  | "filter_applied";

export interface Activity {
  id: string;
  type: ActivityType;
  timestamp: string;
  details: Record<string, any>;
  description: string;
}

const ACTIVITY_LOG_KEY = "job_activity_logs";
const APPLICATIONS_KEY = "job_applications";

export function logActivity(
  type: ActivityType,
  details: Record<string, any>,
  description: string,
): Activity {
  const activity: Activity = {
    id: `activity-${Date.now()}`,
    type,
    timestamp: new Date().toISOString(),
    details,
    description,
  };

  const logs = getActivityLogs();
  logs.unshift(activity);
  localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(logs.slice(0, 100)));

  console.log(`[${type}]`, description, details);

  return activity;
}

export function getActivityLogs(): Activity[] {
  const logs = localStorage.getItem(ACTIVITY_LOG_KEY);
  return logs ? JSON.parse(logs) : [];
}

export function clearActivityLogs(): void {
  localStorage.removeItem(ACTIVITY_LOG_KEY);
}

export function getApplicationsMap(): Map<string, any> {
  const data = localStorage.getItem(APPLICATIONS_KEY);
  if (!data) return new Map();
  try {
    const obj = JSON.parse(data);
    return new Map(Object.entries(obj));
  } catch {
    return new Map();
  }
}

export function saveApplicationsMap(map: Map<string, any>): void {
  const obj = Object.fromEntries(map);
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(obj));
}

export function formatActivityTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
