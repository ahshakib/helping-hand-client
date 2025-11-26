import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ViewAllAppointments from "../../components/Admin/AppointmentsModule/ViewAllAppointments";
import CreateCategory from "../../components/Admin/CategoryModule/CreateCategory";
import ViewCategory from "../../components/Admin/CategoryModule/ViewCategory";
import CreateEmployee from "../../components/Admin/EmployeeModule/CreateEmployee";
import ViewEmployee from "../../components/Admin/EmployeeModule/ViewEmployee";
import ViewAllPayments from "../../components/Admin/PaymentsModule/ViewAllPayments";
import CreateService from "../../components/Admin/ServiceModule/CreateService";
import ViewService from "../../components/Admin/ServiceModule/ViewService";
import CreateSlot from "../../components/Admin/SlotModule/CreateSlot";
import ViewSlot from "../../components/Admin/SlotModule/ViewSlot";
import CreateUser from "../../components/Admin/UserModule/CreateUser";
import ViewUsers from "../../components/Admin/UserModule/ViewUsers";
import Navbar from "../../components/Navbar";
import useAuth from "../../hooks/useAuth";

function Admin() {
    const { user, logout } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        user.role === 'admin' && navigate('/admin');
        user.role === 'user' && navigate('/dashboard');
        user.role === 'employee' && navigate('/employee');
    }, [user.role, navigate])
    
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            {/* Page Header */}
            <div className="relative bg-gradient-to-r from-secondary-600 via-primary-600 to-secondary-700 py-12 mb-8">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold font-heading text-white mb-2 animate-fade-in">
                        Admin Dashboard
                    </h1>
                    <p className="text-white/90 text-lg animate-fade-in delay-200">
                        Manage all system modules and settings
                    </p>
                </div>
            </div>

            {/* Welcome Banner */}
            <div className="container mx-auto px-4 mb-8">
                <div className="bg-gradient-to-r from-secondary-50 to-primary-50 border border-secondary-200 rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row items-center justify-between animate-slide-up">
                    <div>
                        <h2 className="text-2xl font-bold font-heading text-gray-800">
                            Welcome back, <span className="text-secondary-600">{user.name}</span>! 👨‍💼
                        </h2>
                        <p className="text-gray-600 mt-1">Manage your services platform efficiently</p>
                    </div>
                    <button 
                        onClick={logout} 
                        className="mt-4 sm:mt-0 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Admin Modules */}
            <div className="container mx-auto px-4 pb-16">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
                    {/* User Module */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-slide-up delay-100">
                        <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-4">
                            <h2 className="font-bold font-heading text-white text-lg">👤 User Module</h2>
                        </div>
                        <div className="p-4">
                            <CreateUser />
                            <ViewUsers />
                        </div>
                    </div>

                    {/* Category Module */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-slide-up delay-200">
                        <div className="bg-gradient-to-r from-secondary-600 to-secondary-700 p-4">
                            <h2 className="font-bold font-heading text-white text-lg">📂 Category Module</h2>
                        </div>
                        <div className="p-4">
                            <CreateCategory />
                            <ViewCategory />
                        </div>
                    </div>

                    {/* Slot Module */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-slide-up delay-300">
                        <div className="bg-gradient-to-r from-accent-600 to-accent-700 p-4">
                            <h2 className="font-bold font-heading text-white text-lg">🕐 Slot Module</h2>
                        </div>
                        <div className="p-4">
                            <CreateSlot />
                            <ViewSlot />
                        </div>
                    </div>

                    {/* Employee Module */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-slide-up delay-400">
                        <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-4">
                            <h2 className="font-bold font-heading text-white text-lg">👷 Employee Module</h2>
                        </div>
                        <div className="p-4">
                            <CreateEmployee />
                            <ViewEmployee />
                        </div>
                    </div>

                    {/* Service Module */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-slide-up delay-500">
                        <div className="bg-gradient-to-r from-secondary-600 to-secondary-700 p-4">
                            <h2 className="font-bold font-heading text-white text-lg">🛠️ Service Module</h2>
                        </div>
                        <div className="p-4">
                            <CreateService />
                            <ViewService />
                        </div>
                    </div>

                    {/* Payments Module */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-slide-up delay-600">
                        <div className="bg-gradient-to-r from-accent-600 to-accent-700 p-4">
                            <h2 className="font-bold font-heading text-white text-lg">💳 Payments Module</h2>
                        </div>
                        <div className="p-4">
                            <ViewAllPayments />
                        </div>
                    </div>

                    {/* Appointments Module */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-slide-up delay-700">
                        <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-4">
                            <h2 className="font-bold font-heading text-white text-lg">📅 Appointments Module</h2>
                        </div>
                        <div className="p-4">
                            <ViewAllAppointments />
                        </div>
                    </div>
                </div>
            </div>
            
            <ToastContainer autoClose={2000}/>
        </div>
    );
}

export default Admin;