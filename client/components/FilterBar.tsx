import { useState } from "react";
import { Search, Filter, X } from "lucide-react";

interface FilterBarProps {
  onSearchChange: (search: string) => void;
  onRoleChange: (role: string) => void;
  onLocationChange: (location: string) => void;
  onJobTypeChange: (jobType: string) => void;
}

export function FilterBar({
  onSearchChange,
  onRoleChange,
  onLocationChange,
  onJobTypeChange,
}: FilterBarProps) {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange(value);
  };

  const handleRoleChange = (value: string) => {
    setRole(value);
    onRoleChange(value);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    onLocationChange(value);
  };

  const handleJobTypeChange = (value: string) => {
    setJobType(value);
    onJobTypeChange(value);
  };

  const hasActiveFilters = search || role || location || jobType;

  const clearFilters = () => {
    setSearch("");
    setRole("");
    setLocation("");
    setJobType("");
    onSearchChange("");
    onRoleChange("");
    onLocationChange("");
    onJobTypeChange("");
  };

  return (
    <div className="bg-card border-b border-border">
      {/* Search Bar */}
      <div className="px-6 py-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search jobs by title or company..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border border-input text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:opacity-80 transition-opacity font-medium text-sm"
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              {[search, role, location, jobType].filter(Boolean).length}
            </span>
          )}
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-sm text-destructive hover:opacity-80 transition-opacity font-medium"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="px-6 py-4 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Role Filter */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Job Title
            </label>
            <input
              type="text"
              placeholder="e.g., Senior Developer"
              value={role}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-secondary border border-input text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="e.g., New York"
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-secondary border border-input text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Job Type Filter */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Job Type
            </label>
            <select
              value={jobType}
              onChange={(e) => handleJobTypeChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-secondary border border-input text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
