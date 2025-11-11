import { RequestHandler } from "express";
import { Job, JobsResponse } from "@shared/api";

interface JSearchJob {
  job_id: string;
  job_title: string;
  employer_name: string;
  job_location?: string;
  job_employment_type?: string;
  job_description?: string;
  job_posted_at_datetime_utc?: string;
  job_apply_link?: string;
}

interface JSearchResponse {
  data: JSearchJob[];
  request_id?: string;
}

export const handleSearchJobs: RequestHandler = async (req, res) => {
  try {
    const {
      query = "developer",
      location = "United States",
      employment_type = "",
      page = 1,
    } = req.query;

    const apiKey = process.env.JSEARCH_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API key not configured" });
    }

    const params = new URLSearchParams({
      query: String(query),
      page: String(page),
      num_pages: "1",
      ...(employment_type && { employment_type: String(employment_type) }),
      ...(location && { location: String(location) }),
    });

    const response = await fetch(
      `https://jsearch.p.rapidapi.com/search?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "jsearch.p.rapidapi.com",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("JSearch API Error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(
        `JSearch API error (${response.status}): ${response.statusText}`
      );
    }

    const data: JSearchResponse = await response.json();

    const jobs: Job[] = (data.data || []).map((jobData: JSearchJob) => {
      const postedTime = jobData.job_posted_at_datetime_utc
        ? new Date(jobData.job_posted_at_datetime_utc).toISOString()
        : new Date().toISOString();

      return {
        id: jobData.job_id,
        title: jobData.job_title,
        company: jobData.employer_name,
        location: jobData.job_location || "Location not specified",
        jobType: (jobData.job_employment_type || "Full-time") as
          | "Full-time"
          | "Part-time"
          | "Contract"
          | "Temporary",
        workMode: "Remote",
        postedTime,
        jobLink: jobData.job_apply_link || `https://jsearch.p.rapidapi.com`,
        applyLink: jobData.job_apply_link,
        description: jobData.job_description,
        isExternal: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    });

    const response_body: JobsResponse = {
      jobs,
      total: jobs.length,
      page: parseInt(String(page)) || 1,
    };

    res.status(200).json(response_body);
  } catch (error) {
    console.error("Jobs fetch error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to fetch jobs",
    });
  }
};
