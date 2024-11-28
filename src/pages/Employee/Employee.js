import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import useAuth from "../../hooks/useAuth";
import ViewAllEmployeePayments from "../../components/Employees/ViewAllEmployeePayments";
import ViewAllEmployeeAppointments from "../../components/Employees/ViewAllEmployeeAppointments";

function Employee() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    user.role === "admin" && navigate("/admin");
    user.role === "user" && navigate("/dashboard");
    user.role === "employee" && navigate("/employee");
  }, [user.role, navigate]);
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="bg-emerald-100 p-4 sm:flex items-center justify-between rounded">
          <h1 className="text-gray-500 text-xl font-semibold">
            Welcome,{" "}
            <span className="text-lime-600 capitalize">{user.name}</span>
          </h1>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-700 text-white font-medium border px-4 py-2 rounded-full mt-2 sm:mt-0"
          >
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 gap-8 my-5">
          <div className="bg-white rounded shadow shadow-lime-400 p-4">
            <h1 className="text-gray-500 text-2xl font-bold mb-4">Payment History</h1>
            <ViewAllEmployeePayments />
          </div>
          <div className="bg-white rounded shadow shadow-purple-400 p-4">
            <h1 className="text-gray-500 text-2xl font-bold mb-4">Appointment History</h1>
            <ViewAllEmployeeAppointments />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employee;
