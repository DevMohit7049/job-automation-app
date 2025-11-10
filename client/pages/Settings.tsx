import { useState } from "react";
import { Layout } from "@/components/Layout";
import {
  Settings as SettingsIcon,
  Upload,
  FileText,
  Trash2,
  CheckCircle2,
} from "lucide-react";

interface ResumeFile {
  id: string;
  filename: string;
  uploadedAt: string;
  isPrimary: boolean;
}

export default function Settings() {
  const [resumes, setResumes] = useState<ResumeFile[]>([
    {
      id: "1",
      filename: "John_Doe_Resume_2024.pdf",
      uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      isPrimary: true,
    },
  ]);

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      alert("Please upload a PDF file");
      return;
    }

    const newResume: ResumeFile = {
      id: Date.now().toString(),
      filename: file.name,
      uploadedAt: new Date().toISOString(),
      isPrimary: resumes.length === 0,
    };

    setResumes([newResume, ...resumes]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const setAsPrimary = (id: string) => {
    setResumes(
      resumes.map((resume) => ({
        ...resume,
        isPrimary: resume.id === id,
      }))
    );
  };

  const deleteResume = (id: string) => {
    setResumes(resumes.filter((resume) => resume.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Layout>
      <div className="h-full flex flex-col bg-background">
        {/* Header */}
        <div className="px-6 py-6 border-b border-border">
          <div className="flex items-center gap-3 mb-2">
            <SettingsIcon className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Manage your profile and resume
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl space-y-6">
            {/* Resume Upload Section */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-card-foreground mb-4">
                Resume Management
              </h2>

              {/* Upload Area */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-border bg-secondary/30"
                }`}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleInputChange}
                  className="hidden"
                  id="resume-input"
                />
                <label
                  htmlFor="resume-input"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">
                      Drag and drop your resume here
                    </p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse (PDF only)
                    </p>
                  </div>
                </label>
              </div>

              {/* Resumes List */}
              {resumes.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-card-foreground mb-3">
                    Your Resumes
                  </h3>
                  <div className="space-y-2">
                    {resumes.map((resume) => (
                      <div
                        key={resume.id}
                        className="flex items-center justify-between p-4 bg-secondary/50 border border-border rounded-lg hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-card-foreground truncate">
                              {resume.filename}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Uploaded {formatDate(resume.uploadedAt)}
                            </p>
                          </div>
                          {resume.isPrimary && (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20">
                              <CheckCircle2 className="w-3 h-3" />
                              <span className="text-xs font-medium">
                                Primary
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {!resume.isPrimary && (
                            <button
                              onClick={() => setAsPrimary(resume.id)}
                              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                            >
                              Set as Primary
                            </button>
                          )}
                          <button
                            onClick={() => deleteResume(resume.id)}
                            className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Account Settings Section */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-card-foreground mb-4">
                Account Settings
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value="user@example.com"
                    readOnly
                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-card-foreground cursor-not-allowed opacity-75"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-input text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div className="pt-4">
                  <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium text-sm">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-card border border-destructive/20 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-destructive mb-2">
                Danger Zone
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                These actions are irreversible. Please proceed with caution.
              </p>
              <button className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors font-medium text-sm">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
