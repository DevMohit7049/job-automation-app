import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import {
  Activity,
  getActivityLogs,
  clearActivityLogs,
  formatActivityTime,
} from "@/lib/logger";
import { CheckCircle2, Eye, Trash2, Search, Zap, Trash } from "lucide-react";

export default function ActivityLog() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filterType, setFilterType] = useState<string>("");

  useEffect(() => {
    const logs = getActivityLogs();
    setActivities(logs);
  }, []);

  const handleClearAll = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all activity logs? This cannot be undone.",
      )
    ) {
      clearActivityLogs();
      setActivities([]);
    }
  };

  const filteredActivities = filterType
    ? activities.filter((a) => a.type === filterType)
    : activities;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "job_applied":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "job_reviewed":
        return <Eye className="w-5 h-5 text-primary" />;
      case "job_not_interested":
        return <Trash2 className="w-5 h-5 text-destructive" />;
      case "search_performed":
        return <Search className="w-5 h-5 text-accent" />;
      case "filter_applied":
        return <Zap className="w-5 h-5 text-warning" />;
      default:
        return <Zap className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "job_applied":
        return "border-success/20 bg-success/5";
      case "job_reviewed":
        return "border-primary/20 bg-primary/5";
      case "job_not_interested":
        return "border-destructive/20 bg-destructive/5";
      case "search_performed":
        return "border-accent/20 bg-accent/5";
      case "filter_applied":
        return "border-warning/20 bg-warning/5";
      default:
        return "border-border bg-card";
    }
  };

  const activityCounts = {
    job_applied: activities.filter((a) => a.type === "job_applied").length,
    job_reviewed: activities.filter((a) => a.type === "job_reviewed").length,
    job_not_interested: activities.filter(
      (a) => a.type === "job_not_interested",
    ).length,
    search_performed: activities.filter((a) => a.type === "search_performed")
      .length,
    filter_applied: activities.filter((a) => a.type === "filter_applied")
      .length,
  };

  return (
    <Layout>
      <div className="h-full flex flex-col bg-background">
        {/* Header */}
        <div className="px-6 py-6 border-b border-border">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Activity Log</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Complete history of all your job search activities
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {activities.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No activities yet
                </h3>
                <p className="text-muted-foreground">
                  Start browsing jobs to see your activity history
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl space-y-4">
              {/* Activity Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                <div className="bg-card border border-border rounded-lg p-3">
                  <p className="text-2xl font-bold text-success">
                    {activityCounts.job_applied}
                  </p>
                  <p className="text-xs text-muted-foreground">Applied</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-3">
                  <p className="text-2xl font-bold text-primary">
                    {activityCounts.job_reviewed}
                  </p>
                  <p className="text-xs text-muted-foreground">Reviewed</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-3">
                  <p className="text-2xl font-bold text-destructive">
                    {activityCounts.job_not_interested}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Not Interested
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-3">
                  <p className="text-2xl font-bold text-accent">
                    {activityCounts.search_performed}
                  </p>
                  <p className="text-xs text-muted-foreground">Searches</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-3">
                  <p className="text-2xl font-bold text-warning">
                    {activityCounts.filter_applied}
                  </p>
                  <p className="text-xs text-muted-foreground">Filters</p>
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setFilterType("")}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    filterType === ""
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:opacity-80"
                  }`}
                >
                  All ({activities.length})
                </button>
                <button
                  onClick={() => setFilterType("job_applied")}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
                    filterType === "job_applied"
                      ? "bg-success/20 text-success border border-success/30"
                      : "bg-secondary text-secondary-foreground hover:opacity-80"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Applied ({activityCounts.job_applied})
                </button>
                <button
                  onClick={() => setFilterType("job_reviewed")}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
                    filterType === "job_reviewed"
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "bg-secondary text-secondary-foreground hover:opacity-80"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  Reviewed ({activityCounts.job_reviewed})
                </button>
              </div>

              {/* Activities List */}
              <div className="space-y-3">
                {filteredActivities.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No activities for this filter
                  </div>
                ) : (
                  filteredActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className={`border rounded-lg p-4 animate-slide-in ${getActivityColor(
                        activity.type,
                      )}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-card-foreground">
                            {activity.description}
                          </p>
                          {activity.details.jobTitle && (
                            <p className="text-sm text-muted-foreground mt-1">
                              <span className="font-semibold">
                                {activity.details.jobTitle}
                              </span>
                              {activity.details.company && (
                                <span> at {activity.details.company}</span>
                              )}
                            </p>
                          )}
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                            <span>
                              {formatActivityTime(activity.timestamp)}
                            </span>
                            {activity.details.location && (
                              <>
                                <span>•</span>
                                <span>{activity.details.location}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Clear All Button */}
              {activities.length > 0 && (
                <div className="flex justify-end mt-6 pt-6 border-t border-border">
                  <button
                    onClick={handleClearAll}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors font-medium text-sm"
                  >
                    <Trash className="w-4 h-4" />
                    Clear All Logs
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
