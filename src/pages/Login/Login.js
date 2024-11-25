import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
    <div>
      <Navbar />
      <form
        id="login_form"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-1/3 xl:w-1/2 mx-auto flex items-center content-center px-5 h-96"
      >
        <div className="w-full">
          <h1 className="text-center text-2xl font-semibold my-5 text-pink-900">
            Sign In
          </h1>

          <div className="my-2">
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete={`email`}
              className="w-full p-2 border-2 rounded-md border-pink-700 focus:outline-pink-400"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-rose-500">Email is required</span>
            )}
          </div>
          <div className="my-2">
            <input
              type="password"
              placeholder="Enter your password"
              autoComplete={`current-password`}
              className="w-full p-2 border-2 rounded-md border-pink-700 focus:outline-pink-400"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-rose-500">Password is required</span>
            )}
          </div>

          <p className="my-3 text-rose-500 font-bold">{err}</p>

          <p className="my-3 text-pink-800">
            Don't have an account?{" "}
            <Link className="underline" to="/register">
              Resister as user
            </Link>
          </p>

          <button
            id="login_btn"
            className="bg-pink-700 hover:bg-pink-800 text-white w-full py-2 rounded-md"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
