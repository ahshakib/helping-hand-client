import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import useAuth from "../../hooks/useAuth";

function Login() {
  const { user, setUser } = useAuth();
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    user?.email && navigate(from, { replace: true });
  }, [from, navigate, user?.email]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => login(data);

  const login = (data) => {
    const formData = {
      email: data.email,
      password: data.password,
    };
    const btn = document.getElementById("login_btn");
    btn.innerText = "Login...";
    btn.disabled = true;

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.status) {
          setUser(result.user);
          localStorage.setItem("userId", result.user._id);
          result.user.role === "user" && navigate("/dashboard") 
          result.user.role === "admin" && navigate("/admin")
          result.user.role === "employee" && navigate("/employee")
          setErr("");
          document.getElementById("login_form").reset();
          btn.innerText = "Login";
          btn.disabled = false;
        } else {
          document.getElementById("login_form").reset();
          btn.innerText = "Login";
          btn.disabled = false;
          setErr(result.message);
        }
      } catch (error) {
        fetchData();
      }
    };

    fetchData();
  };

  return (
    <div className="min-h-screen relative">
      <Navbar />
      
      {/* Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-accent-500 to-secondary-500 -z-10"></div>
      <div className="absolute inset-0 bg-black/20 -z-10"></div>

      {/* Login Form Container */}
      <div className="container mx-auto px-4 flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <div className="w-full max-w-md animate-fade-in">
          {/* Glassmorphism Card */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10">
            <form
              id="login_form"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold font-heading bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-600">Sign in to continue to Helping Hand</p>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                    {...register("email", { required: true })}
                  />
                </div>
                {errors.email && (
                  <span className="text-red-500 text-sm">Email is required</span>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                    {...register("password", { required: true })}
                  />
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm">Password is required</span>
                )}
              </div>

              {/* Error Message */}
              {err && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
                  {err}
                </div>
              )}

              {/* Login Button */}
              <button
                id="login_btn"
                className="w-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Login
              </button>

              {/* Register Link */}
              <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <Link 
                  className="text-primary-600 hover:text-primary-700 font-semibold hover:underline transition-all" 
                  to="/register"
                >
                  Register as user
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
