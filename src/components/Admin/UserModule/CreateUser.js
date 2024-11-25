import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

function CreateUser() {
  const { setUsers } = useAuth();
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
      role: data.role,
    };
    const btn = document.getElementById("register_btn_admin");
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
          toast.success(result.message);
          const fetchData = async () => {
            try {
              const response = await fetch("http://localhost:5000/user");
              const result = await response.json();

              if (result.status) {
                setUsers(result.users);
              } else {
                setUsers([]);
              }
            } catch (error) {
              setUsers([]);
            }
          };
          fetchData();
        } else {
          toast.error(result.message);
        }
        document.getElementById("register_form_admin").reset();
        btn.innerText = "Register";
        btn.disabled = false;
      } catch (error) {
        fetchData();
      }
    };

    fetchData();
  };
  return (
    <form
      id="register_form_admin"
      onSubmit={handleSubmit(onSubmit)}
      className="w-5/6 mx-auto flex items-center content-center px-5 my-5"
    >
      <div className="w-full">
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

        <select
          {...register("role", { required: true })}
          defaultValue={``}
          className="p-2 border-2 border-pink-700 focus:outline-pink-400 rounded-md w-full mb-2"
        >
          <option value="" disabled>
            Role
          </option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>

        <button
          id="register_btn_admin"
          className="bg-pink-700 hover:bg-pink-800 text-white w-full py-2 rounded-md"
        >
          Register
        </button>
      </div>
    </form>
  );
}

export default CreateUser;
