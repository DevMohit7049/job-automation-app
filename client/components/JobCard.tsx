import { Job, Application } from "@shared/api";
import {
  Bookmark,
  MapPin,
  Clock,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

interface JobCardProps {
  job: Job;
  application?: Application | null;
  onMarkReviewed: (jobId: string) => void;
  onApply: (jobId: string) => void;
  onNotInterested: (jobId: string) => void;
}

export function JobCard({
  job,
  application,
  onMarkReviewed,
  onApply,
  onNotInterested,
}: JobCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "Applied":
        return "bg-success/10 text-success border-success/20";
      case "Pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "External":
        return "bg-accent/10 text-accent border-accent/20";
      case "Not Interested":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "Reviewed":
        return "bg-primary/10 text-primary border-primary/20";
      default:
        return "bg-muted/50 text-muted-foreground border-border";
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "Applied":
      case "Reviewed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "External":
        return <ExternalLink className="w-4 h-4" />;
      case "Pending":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Bookmark className="w-4 h-4" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 animate-slide-in">
      {/* Card Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              {job.title}
            </h3>
            <p className="text-sm font-medium text-muted-foreground">
              {job.company}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {application && (
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${getStatusColor(application.status)}`}
              >
                {getStatusIcon(application.status)}
                {application.status}
              </div>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>
              {job.location}
              {job.workMode && ` • ${job.workMode}`}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>{formatTimeAgo(job.postedTime)}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
              {job.jobType}
            </span>
          </div>
        </div>

        {/* Description (Expanded) */}
        {isExpanded && job.description && (
          <div className="p-3 bg-secondary/30 rounded-lg mb-4 border border-border">
            <p className="text-sm text-card-foreground leading-relaxed">
              {job.description}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-2">
          {!application || application.status === "Not Interested" ? (
            <>
              <button
                onClick={() => onMarkReviewed(job.id)}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity font-medium text-sm"
              >
                View Details & Review
              </button>
              <button
                onClick={() => onApply(job.id)}
                className="w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium text-sm"
              >
                Apply Now
              </button>
              <button
                onClick={() => onNotInterested(job.id)}
                className="w-full px-4 py-2.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors font-medium text-sm"
              >
                Not Interested
              </button>
            </>
          ) : (
            <button
              disabled
              className="w-full px-4 py-2.5 rounded-lg bg-success/10 text-success border border-success/20 font-medium text-sm cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              {application.status}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
