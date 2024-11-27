import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const EmployeeCard = ({ employee }) => {
    const navigate = useNavigate();
    const {setEmployee} = useAuth()
    return (
        <div className="bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105 p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300 rounded-full filter blur-3xl opacity-50 -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-300 rounded-full filter blur-3xl opacity-50 -ml-16 -mb-16"></div>
            <div className="flex items-center relative z-10">
                <div className="flex-shrink-0">
                    <img
                        src={employee.image}
                        alt={employee.name}
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                </div>
                <div className="ml-6">
                    <h2 className="text-3xl font-bold text-white mb-1 hover:text-yellow-300 transition duration-200">{employee.name}</h2>
                    <h3 className="text-lg font-medium text-white opacity-90">{employee.bio}</h3>
                    <div className="flex items-center mt-2">
                        <span className="text-yellow-300 mr-2">📍</span>
                        <h3 className="text-sm text-white opacity-80">{employee.location}</h3>
                    </div>
                    <div className="flex items-center mt-2">
                        <span className="text-yellow-300 mr-2">৳</span>
                        <h4 className="text-xl text-white font-bold">
                            {Number(employee.rate).toLocaleString()}
                        </h4>
                    </div>
                </div>
            </div>
            <p className="line-clamp-3 mt-6 text-justify text-sm text-white opacity-90">{employee.details}</p>
            <div className="flex flex-wrap gap-3 my-4 text-xs items-center">
                {
                    employee.services.length > 3 ? 
                    <>
                        {
                            employee.services.slice(0, 3).map((service, index) => (
                                <p key={index} className="bg-white text-cyan-700 rounded-full px-4 py-2 font-semibold transition duration-200 transform hover:scale-105 hover:bg-yellow-300 hover:text-blue-700">{service}</p>
                            ))
                        }
                        <p className="text-white opacity-80">+{employee.services.length - 3} more</p>
                    </> : 
                    employee.services.map((service, index) => (
                        <p key={index} className="bg-white text-cyan-700 rounded-full px-4 py-2 font-semibold transition duration-200 transform hover:scale-105 hover:bg-yellow-300 hover:text-blue-700">{service}</p>
                    ))
                }
            </div>
            <div className="flex items-center justify-between mt-6">
                <div className="flex items-center">
                    <span className="text-yellow-300 mr-1">⭐</span>
                    <span className="text-white font-bold">4.9</span>
                    <span className="text-white opacity-80 ml-1">(120 reviews)</span>
                </div>
                <button 
                    onClick={() => {
                        setEmployee(employee);
                        navigate(`/employee-details/${employee._id}`);
                    }} 
                    className="bg-white text-cyan-700 hover:bg-yellow-300 hover:text-blue-700 rounded-full text-sm py-3 px-6 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl font-bold">
                    View Profile
                </button>
            </div>
        </div>
    );
};

export default EmployeeCard;