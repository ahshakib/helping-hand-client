import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import CreateUser from "../../components/Admin/UserModule/CreateUser";
import { ToastContainer } from "react-toastify";
import ViewUsers from "../../components/Admin/UserModule/ViewUsers";
import CreateCategory from "../../components/Admin/CategoryModule/CreateCategory";
import ViewCategory from "../../components/Admin/CategoryModule/ViewCategory";
import CreateSlot from "../../components/Admin/SlotModule/CreateSlot";
import ViewSlot from "../../components/Admin/SlotModule/ViewSlot";
import CreateService from "../../components/Admin/ServiceModule/CreateService";
import ViewService from "../../components/Admin/ServiceModule/ViewService";
import CreateEmployee from "../../components/Admin/EmployeeModule/CreateEmployee";
import ViewEmployee from "../../components/Admin/EmployeeModule/ViewEmployee";

function Admin() {
    const { user, logout } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        user.role === 'admin' && navigate('/admin');
        user.role === 'user' && navigate('/dashboard');
        user.role === 'employee' && navigate('/employee');
    }, [user.role, navigate])
    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <div className="bg-pink-100 p-4 sm:flex items-center justify-between rounded mt-2">
                    <h1 className="text-gray-500 text-xl font-semibold">Welcome, <span className="text-pink-700 capitalize font-mono">{user.name}</span></h1>
                    <button onClick={logout} className="bg-pink-700 hover:bg-pink-800 text-white font-medium border px-4 py-2 rounded-full mt-2 sm:mt-0">Logout</button>
                </div>

                <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 my-10 mx-3 sm:mx-0">
                    <div className="min-w-full shadow rounded border border-gray-300">
                        <h2 className="flex items-center justify-center bg-pink-800 font-semibold text-white p-2">User Module</h2>
                        <CreateUser />
                        <ViewUsers />
                    </div>

                    <div className="min-w-full shadow rounded border border-gray-300">
                        <h2 className="flex items-center justify-center bg-pink-800 font-semibold text-white p-2">Category Module</h2>
                        <CreateCategory />
                        <ViewCategory />
                    </div>

                    <div className="min-w-full shadow rounded border border-gray-300">
                        <h2 className="flex items-center justify-center bg-pink-800 font-semibold text-white p-2">Slot Module</h2>
                        <CreateSlot />
                        <ViewSlot />
                    </div>

                    <div className="min-w-full shadow rounded border border-gray-300">
                        <h2 className="flex items-center justify-center bg-pink-800 font-semibold text-white p-2">Service Module</h2>
                        <CreateService />
                        <ViewService />
                    </div>

                    <div className="min-w-full shadow rounded border border-gray-300">
                        <h2 className="flex items-center justify-center bg-pink-800 font-semibold text-white p-2">Employee Module</h2>
                        <CreateEmployee />
                        <ViewEmployee />
                    </div>
                </div>
            </div>
            <ToastContainer autoClose={2000}/>
        </div>
    );
}

export default Admin;