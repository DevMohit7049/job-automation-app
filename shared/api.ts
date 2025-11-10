/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: "Full-time" | "Part-time" | "Contract" | "Temporary";
  workMode: "Remote" | "Hybrid" | "On-site";
  postedTime: string;
  jobLink: string;
  applyLink?: string;
  description?: string;
  isExternal?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: "Applied" | "Pending" | "External" | "Not Interested" | "Reviewed";
  appliedAt?: string;
  resumeFileId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Resume {
  id: string;
  userId: string;
  filename: string;
  fileUrl: string;
  uploadedAt: string;
  isPrimary: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
  page: number;
}

export interface ApplicationsResponse {
  applications: Application[];
  total: number;
}

export interface DemoResponse {
  message: string;
}
