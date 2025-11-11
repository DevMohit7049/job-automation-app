import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { JobCard } from "@/components/JobCard";
import { FilterBar } from "@/components/FilterBar";
import { Job, Application, JobsResponse } from "@shared/api";
import { Briefcase, Loader2 } from "lucide-react";
import { logActivity, getApplicationsMap, saveApplicationsMap } from "@/lib/logger";

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Map<string, Application>>(() =>
    getApplicationsMap()
  );
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("India");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [workModeFilter, setWorkModeFilter] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();

        // Build query combining role and location for better India job search
        let query = roleFilter || "developer";
        if (locationFilter && locationFilter !== "India") {
          params.append("location", locationFilter);
        } else if (locationFilter === "India") {
          // For India searches, include it in the query string for better results
          query = query + " india";
        }

        params.append("query", query);
        if (jobTypeFilter) params.append("employment_type", jobTypeFilter);

        const url = `/api/jobs/search?${params.toString()}`;
        console.log("Fetching jobs from:", url);

        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("API Error Response:", {
            status: response.status,
            statusText: response.statusText,
            data: errorData,
          });
          throw new Error(
            errorData.error ||
              `Failed to fetch jobs (${response.status}: ${response.statusText})`
          );
        }

        const data: JobsResponse = await response.json();
        console.log("Jobs fetched successfully:", data.jobs?.length || 0);
        setJobs(data.jobs || []);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load jobs. Please try again.";
        console.error("Error fetching jobs:", errorMessage, err);
        setError(errorMessage);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [roleFilter, locationFilter, jobTypeFilter, workModeFilter]);

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = jobs;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query)
      );
    }

    if (roleFilter) {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(roleFilter.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (jobTypeFilter) {
      filtered = filtered.filter((job) => job.jobType === jobTypeFilter);
    }

    if (workModeFilter) {
      filtered = filtered.filter((job) => job.workMode === workModeFilter);
    }

    setFilteredJobs(filtered);
  }, [jobs, searchQuery, roleFilter, locationFilter, jobTypeFilter, workModeFilter]);

  const handleMarkReviewed = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    const newApp: Application = {
      id: `app-${jobId}`,
      jobId,
      userId: "current-user",
      status: "Reviewed",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const newApplications = new Map(applications);
    newApplications.set(jobId, newApp);
    setApplications(newApplications);
    saveApplicationsMap(newApplications);
    logActivity(
      "job_reviewed",
      { jobId, jobTitle: job?.title, company: job?.company },
      `Reviewed job: ${job?.title} at ${job?.company}`
    );
  };

  const handleApply = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    const newApp: Application = {
      id: `app-${jobId}`,
      jobId,
      userId: "current-user",
      status: "Applied",
      appliedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const newApplications = new Map(applications);
    newApplications.set(jobId, newApp);
    setApplications(newApplications);
    saveApplicationsMap(newApplications);
    logActivity(
      "job_applied",
      { jobId, jobTitle: job?.title, company: job?.company, location: job?.location },
      `✅ Applied to job: ${job?.title} at ${job?.company}`
    );
  };

  const handleNotInterested = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    const newApp: Application = {
      id: `app-${jobId}`,
      jobId,
      userId: "current-user",
      status: "Not Interested",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const newApplications = new Map(applications);
    newApplications.set(jobId, newApp);
    setApplications(newApplications);
    saveApplicationsMap(newApplications);
    logActivity(
      "job_not_interested",
      { jobId, jobTitle: job?.title, company: job?.company },
      `Marked as not interested: ${job?.title} at ${job?.company}`
    );
  };

  return (
    <Layout>
      <div className="h-full flex flex-col bg-background">
        {/* Header */}
        <div className="px-6 py-6 border-b border-border">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Browse Jobs</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Discover and apply to jobs matching your profile
          </p>
        </div>

        {/* Filter Bar */}
        <FilterBar
          onSearchChange={setSearchQuery}
          onRoleChange={setRoleFilter}
          onLocationChange={setLocationFilter}
          onJobTypeChange={setJobTypeFilter}
          onWorkModeChange={setWorkModeFilter}
        />

        {/* Jobs Content */}
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading jobs...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Briefcase className="w-12 h-12 text-red-400 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Error loading jobs
                </h3>
                <p className="text-muted-foreground mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  application={applications.get(job.id)}
                  onMarkReviewed={handleMarkReviewed}
                  onApply={handleApply}
                  onNotInterested={handleNotInterested}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No jobs found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search filters
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
