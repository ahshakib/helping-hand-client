import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../../components/Navbar";
import useAuth from "../../hooks/useAuth";

function Register() {
  const [err, setErr] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => signUp(data);

  const signUp = (data) => {
    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: "user",
    };
    const btn = document.getElementById("login_btn");
    btn.innerText = "Registering...";
    btn.disabled = true;

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.status) {
          setErr("");
          setUser(result.user);
          localStorage.setItem("userId", result.user._id);
          result.user.role === "user" && navigate("/dashboard");
          result.user.role === "admin" && navigate("/admin");
          result.user.role === "employee" && navigate("/employee");
          document.getElementById("register_form").reset();
          btn.innerText = "Register";
          btn.disabled = false;
        } else {
          document.getElementById("register_form").reset();
          btn.innerText = "Register";
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
        id="register_form"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-1/3 xl:w-1/2 mx-auto flex items-center content-center px-5 h-96"
      >
        <div className="w-full">
          <h1 className="text-center text-2xl font-semibold my-5 text-pink-900">
            Sign Up
          </h1>

          <div className="my-2">
            <input
              type="text"
              placeholder="Enter your name"
              autoComplete={`name`}
              className="w-full p-2 border-2 rounded-md border-pink-700 focus:outline-pink-400"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-rose-500">Name is required</span>
            )}
          </div>

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
            Already have an account?{" "}
            <Link className="underline" to="/login">
              Login
            </Link>
          </p>

          <button
            id="login_btn"
            className="bg-pink-700 hover:bg-pink-800 text-white w-full py-2 rounded-md"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
