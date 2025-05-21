
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="text-center max-w-md">
        <Logo size="lg" className="mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">The page you're looking for doesn't exist</p>
        <Button 
          onClick={() => navigate('/')} 
          size="lg" 
          className="bg-brand-500 hover:bg-brand-600"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
