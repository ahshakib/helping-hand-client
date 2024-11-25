import React from "react";
import Navbar from "../../components/Navbar";
import EmployeeCard from "../../components/Employees/EmployeeCard";
import useAuth from "../../hooks/useAuth";

function Employees() {
  const { employees } = useAuth()
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-2 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {
          employees.map(employee => (
            <EmployeeCard key={employee._id} employee={employee} />
          ))
        }
        </div>
      </div>
    </div>
  );
}

export default Employees;
