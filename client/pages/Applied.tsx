import { useState } from "react";
import { Layout } from "@/components/Layout";
import { CheckCircle2, AlertCircle, ExternalLink, Trash2 } from "lucide-react";

interface AppliedJob {
  id: string;
  jobId: string;
  title: string;
  company: string;
  status: "Applied" | "Pending" | "External";
  appliedAt: string;
  location: string;
}

export default function Applied() {
  const [appliedJobs] = useState<AppliedJob[]>([
    {
      id: "1",
      jobId: "1",
      title: "Senior React Developer",
      company: "TechCorp",
      status: "Applied",
      appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      location: "San Francisco, CA",
    },
    {
      id: "2",
      jobId: "3",
      title: "Full Stack Developer",
      company: "StartupXYZ",
      status: "External",
      appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      location: "Austin, TX",
    },
  ]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Applied":
        return {
          icon: CheckCircle2,
          color: "text-success",
          bg: "bg-success/10",
          label: "Applied",
        };
      case "Pending":
        return {
          icon: AlertCircle,
          color: "text-warning",
          bg: "bg-warning/10",
          label: "Pending",
        };
      case "External":
        return {
          icon: ExternalLink,
          color: "text-accent",
          bg: "bg-accent/10",
          label: "External Site",
        };
      default:
        return {
          icon: AlertCircle,
          color: "text-muted-foreground",
          bg: "bg-muted",
          label: status,
        };
    }
  };

  return (
    <Layout>
      <div className="h-full flex flex-col bg-background">
        {/* Header */}
        <div className="px-6 py-6 border-b border-border">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-6 h-6 text-success" />
            <h1 className="text-2xl font-bold text-foreground">Applied Jobs</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Track your job applications and their status
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {appliedJobs.length > 0 ? (
            <div className="space-y-3">
              {appliedJobs.map((job) => {
                const statusConfig = getStatusConfig(job.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={job.id}
                    className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow animate-slide-in"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-card-foreground">
                            {job.title}
                          </h3>
                          <div
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${statusConfig.bg} ${statusConfig.color} text-xs font-medium`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {statusConfig.label}
                          </div>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          {job.company}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-muted-foreground">
                          <span>{job.location}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>Applied {formatDate(job.appliedAt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No applications yet
                </h3>
                <p className="text-muted-foreground">
                  Browse jobs and apply to get started
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
