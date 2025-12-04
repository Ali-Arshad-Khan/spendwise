// src/components/AuthRequired.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";
import api from "../../api";

export default function AuthRequired() {
  const { isLoggedIn, loading, setUser, setIsLoggedIn, setLoading, fetchCurrentUser } = useAuth();
  const location = useLocation();

  // Refetch session after Google login redirect
  useEffect(() => {
    const handleGoogleLogin = async () => {
      if (window.location.search.includes("googleLogin=true") && !isLoggedIn) {
        setLoading(true);
        await fetchCurrentUser();
        window.history.replaceState({}, document.title, location.pathname);
      }
    };
    handleGoogleLogin();
  }, [location.pathname, fetchCurrentUser, isLoggedIn, setLoading]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-dashboardbg z-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-white/30 rounded-full animate-spin mb-4"></div>
          <div className="text-white text-xl animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
