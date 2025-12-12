import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="mb-6">
          <span className="text-7xl font-display text-primary">404</span>
        </div>
        <h1 className="text-title text-foreground font-display mb-3">Page not found</h1>
        <p className="text-body text-muted-foreground mb-8">
          Oops! This page seems to have wandered off. Let's get you back on track! 🏃‍♂️
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary-pill"
            size="lg"
            asChild
          >
            <Link to="/">
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
