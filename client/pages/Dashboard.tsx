import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { JobCard } from "@/components/JobCard";
import { FilterBar } from "@/components/FilterBar";
import { Job, Application } from "@shared/api";
import { Briefcase, Loader2 } from "lucide-react";

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Map<string, Application>>(
    new Map()
  );
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");

  // Mock data - in production, fetch from API
  const mockJobs: Job[] = [
    {
      id: "1",
      title: "Senior React Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      jobType: "Full-time",
      workMode: "Remote",
      postedTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      jobLink: "https://linkedin.com/jobs/1",
      applyLink: "https://linkedin.com/jobs/1/apply",
      description:
        "We are looking for a senior React developer with 5+ years of experience. Strong knowledge of TypeScript, state management, and testing frameworks required.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "DevOps Engineer",
      company: "CloudInnovate",
      location: "New York, NY",
      jobType: "Full-time",
      workMode: "Hybrid",
      postedTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      jobLink: "https://linkedin.com/jobs/2",
      applyLink: "https://linkedin.com/jobs/2/apply",
      description:
        "Looking for experienced DevOps engineer to manage our cloud infrastructure. Kubernetes, Docker, and CI/CD pipeline experience essential.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Austin, TX",
      jobType: "Full-time",
      workMode: "On-site",
      postedTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      jobLink: "https://linkedin.com/jobs/3",
      description:
        "Seeking talented full-stack developer proficient in React, Node.js, and PostgreSQL. Join our fast-growing startup.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isExternal: true,
    },
    {
      id: "4",
      title: "Frontend Developer",
      company: "DesignStudio",
      location: "Los Angeles, CA",
      jobType: "Part-time",
      workMode: "Remote",
      postedTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      jobLink: "https://linkedin.com/jobs/4",
      description:
        "Creative frontend developer needed for our design-focused projects. Experience with CSS-in-JS and animation libraries preferred.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    // Simulate fetching jobs
    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 500);
  }, []);

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

    setFilteredJobs(filtered);
  }, [jobs, searchQuery, roleFilter, locationFilter, jobTypeFilter]);

  const handleMarkReviewed = (jobId: string) => {
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
  };

  const handleApply = (jobId: string) => {
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
  };

  const handleNotInterested = (jobId: string) => {
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
