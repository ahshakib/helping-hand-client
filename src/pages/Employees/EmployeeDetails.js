import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import EmployeeAbout from "../../components/Employees/EmployeeAbout";
import EmployeeReview from "../../components/Employees/EmployeeReview";
import useAuth from "../../hooks/useAuth";

const EmployeeDetails = () => {
  const [toggle, setToggle] = useState(false)
  const [tab, setTab] = useState("About")
  const { id } = useParams();
  const { employee, setEmployee } = useAuth()

  useEffect(() => {
    if(!employee.name) {
      const fetchData = async() => {
        try {
          const response = await fetch(`http://localhost:5000/employee/${id}`);
          const result = await response.json();
          if(result.status) {
            setEmployee(result.employee);
          } else {
            setEmployee({});
          }
        } catch (error) {
          fetchData();
        }
      }
      fetchData();
    }
  }, [employee.name, id, setEmployee])

  const handleTabChange = (tabName) => {
    if (tab !== tabName) {
      setToggle(curr => !curr)
      setTab(tabName)
    }
  }
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-2">
        <div className="md:flex items-center mt-5 h-44">
          <div className="">
            <img
              src={employee.image}
              alt={employee.name}
              className="w-24 rounded-full shadow"
            />
          </div>
          <div className="md:pl-5 md:m-0 mt-10">
            <h2 className="text-xl font-bold">{employee.name}</h2>
            <h3 className="text-sm text-gray-600">{employee.bio}</h3>
            <h4 className="text-sm text-gray-800">
              ৳{Number(employee.rate || 0).toLocaleString()}
            </h4>
          </div>
        </div>
        <div className="mt-5 pt-5 md:pt-0">
          <button onClick={() => handleTabChange("About")} className={`text-lg font-bold tracking-wide border-b-2 p-2 ${toggle ? 'text-sky-950 hover:border-sky-800' : 'text-sky-800 border-sky-800'}`}>About</button>
          <button onClick={() => handleTabChange("Review")} className={`text-lg font-bold tracking-wide border-b-2 p-2 ms-5 ${toggle ? 'text-sky-800 border-sky-800' : 'text-sky-950 hover:border-sky-800'}`}>Ratings and Reviews</button>
        </div>
        
      </div>
      {
          employee.name && tab === "About" && <EmployeeAbout employee={employee} />
        }
        {
          employee.name && tab === "Review" && <EmployeeReview />
        }
    </div>
  );
};

export default EmployeeDetails;
