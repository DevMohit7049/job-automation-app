import { Link } from "react-router-dom";
import {
  Briefcase,
  Zap,
  Upload,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Moon,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const features = [
    {
      icon: Zap,
      title: "Auto-Apply",
      description:
        "Automatically apply to jobs matching your criteria with one click",
    },
    {
      icon: Upload,
      title: "Smart Resume",
      description:
        "Upload and manage multiple resumes for different positions",
    },
    {
      icon: BarChart3,
      title: "Track Progress",
      description: "Monitor your applications and see your job search stats",
    },
    {
      icon: Briefcase,
      title: "Smart Filters",
      description: "Find the perfect job with advanced search and filtering",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Upload Your Resume",
      description: "Add your resume to get started with auto-applying",
    },
    {
      number: "2",
      title: "Set Your Preferences",
      description: "Choose job types, locations, and roles you're interested in",
    },
    {
      number: "3",
      title: "Browse & Apply",
      description: "Review jobs and apply with a single click",
    },
    {
      number: "4",
      title: "Track Applications",
      description: "Monitor all your applications in one place",
    },
  ];

  return (
    <div
      className={`min-h-screen bg-background transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary group-hover:shadow-lg transition-shadow">
              <Briefcase className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              JobAutoApply
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <Moon className="w-5 h-5 text-foreground" />
            </button>
            <Link
              to="/dashboard"
              className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium text-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-8">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">
              Automate Your Job Search
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Find and Apply to Jobs
            <span className="block text-primary">Automatically</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stop spending hours searching and applying for jobs. JobAutoApply
            helps you find the perfect position and apply automatically,
            freeing up your time for interviews.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium flex items-center gap-2 group"
            >
              Start Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#features"
              className="px-8 py-3 rounded-lg bg-secondary text-secondary-foreground hover:opacity-80 transition-opacity font-medium"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to land your dream job
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow animate-slide-in"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in just 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative animate-slide-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+2rem)] right-auto w-[calc(100%-4rem)] h-0.5 bg-primary/20" />
                )}

                <div className="relative">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mx-auto mb-4 relative z-10">
                    {step.number}
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of job seekers using JobAutoApply to find their
            dream jobs faster.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary-foreground text-primary hover:opacity-90 transition-opacity font-medium group"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
          <p>
            &copy; 2024 JobAutoApply. All rights reserved. | Built with ❤️ for
            job seekers
          </p>
        </div>
      </footer>
    </div>
  );
}
