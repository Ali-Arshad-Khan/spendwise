import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import upArrow from "../assets/images/up-arrow.png";

export default function Layout() {
  const [atTop, setAtTop] = useState(true);
  const SCROLL_THRESHOLD = 100; // show after 50px scroll

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setAtTop(false); // hide nav after 50px scroll
      } else {
        setAtTop(true); // show nav when within 50px from top
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="site-wrapper">
      {/* Global Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "rgba(17, 17, 17, 0.9)",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
          },
          success: {
            iconTheme: {
              primary: "#22c55e", // green
              secondary: "#1a1a1a",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444", // red
              secondary: "#1a1a1a",
            },
          },
        }}
      />
      <main>
        <Outlet />
      </main>
      {!atTop && (
        <button
          onClick={scrollToTop}
          className="backtoTop flex fixed bottom-0 right-6 bottom-6 h-10 w-10 sm:hidden items-center justify-center 
                rounded-full text-white shadow-xl 
                transition-all duration-300 hover:scale-110 hover:shadow-2xl cursor-pointer"
        >
          <img src={upArrow} alt="upArrow" />
        </button>
      )}
    </div>
  );
}
