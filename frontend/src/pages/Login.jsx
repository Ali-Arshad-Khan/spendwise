import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthProvider";
import api from "../../api";
import googleIcon from "../assets/images/icons/google.png";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  // 👇 Put useLocation and useEffect here
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  useEffect(() => {
    if (query.get("googleLogin") === "true") {
      (async () => {
        try {
          const me = await api.get("/api/auth/me"); // ensures session is recognized
          if (me.data.isLoggedIn) {
            setUser({ name: me.data.name });
            setIsLoggedIn(true);
            navigate("/dashboard");
          }
        } catch (err) {
          console.error("Failed to fetch session after Google login", err);
        }
      })();
    }
  }, []); // run once on component mount

  // Handle input changes
  function handleInput(e) {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  }

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Send POST request with credentials for session cookies
      await api.post("/api/auth/login", login); // <-- uses api.js baseURL
      const me = await api.get("/api/auth/me");
      if (me.data.isLoggedIn) {
        setUser({ name: me.data.name });
        setIsLoggedIn(true);
      }

      console.log("✅ Login successful");
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Login failed:", err);
      const msg = err.response?.data?.message || "Server Error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative h-screen bg-gray-950 overflow-hidden p-5">
      {/* <Header /> */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,transparent_35%)] scale-250"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,transparent_20%)] scale-300"></div>

      <div className="header flex flex-col gap-[25px] p-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/4 backdrop-blur-md text-white z-50 rounded-xl w-[90%] max-w-[400px] min-w-[300px]">
        {/* <a
          href={`${import.meta.env.VITE_API_URL}/api/auth/google`}
          className="h-10 mt-2 flex justify-center items-center gap-2 px-4 rounded border bg-white text-black hover:bg-gray-100"
        >
          <img src={googleIcon} alt="Google" className="w-5 h-5" />
          Login with Google
        </a> */}

        <div className="top">
          <h1 className="text-3xl font-semibold">Log in</h1>
          <h2 className="mt-[5px] text-gray-300">
            Don’t have an account?
            <Link
              to="/signup"
              className="ml-[5px] font-semibold underline hover:text-primary"
            >
              Create an Account
            </Link>
          </h2>
        </div>

        <form className="flex flex-col gap-[10px]" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            onChange={handleInput}
            type="email"
            placeholder="Email"
            required
            value={login.email}
            className="h-10 px-[15px] border border-[#D1D5DB] placeholder-[#4D4D4D] text-white
            text-base rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            onChange={handleInput}
            type="password"
            placeholder="Password"
            required
            value={login.password}
            className="h-10 px-[15px] border border-[#D1D5DB] placeholder-[#4D4D4D] text-white 
            text-base rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            disabled={loading}
            className="h-10 mt-3 text-black bg-white px-[20px] py-[5px] rounded-[8px] 
            flex justify-center items-center cursor-pointer hover:bg-blue-600 
            hover:text-white transition-colors ease-in-out duration-300 disabled:opacity-50"
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Show error only if exists */}
          {error && (
            <div className="error-message flex justify-center items-center mt-1 mb-1 text-red-500">
              {error}
            </div>
          )}
        </form>
        <div className="flex flex-col justify-center items-center w-full">
          <p className="text-gray-400">OR</p>
          <a
            href={`${import.meta.env.VITE_API_URL}/api/auth/google`}
            className="h-10 mt-2 flex justify-center items-center gap-2 px-4 rounded-[8px] bg-white text-black hover:bg-blue-600 hover:text-white cursor-pointer w-full transition-colors ease-in-out duration-300"
          >
            <img src={googleIcon} alt="Google" className="w-5 h-5" />
            Login with Google
          </a>
        </div>
      </div>
    </div>
  );
}
