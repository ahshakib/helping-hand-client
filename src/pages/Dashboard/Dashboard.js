import { useEffect } from 'react';
import { FaCalendarAlt, FaWallet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AppointmentHistory from '../../components/Dashboard/AppointmentHistory';
import PaymentHistory from '../../components/Dashboard/PaymentHistory';
import Footer from '../../components/Home/Footer';
import Navbar from '../../components/Navbar';
import useAuth from '../../hooks/useAuth';

function Dashboard() {
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
            <div className="relative bg-gradient-to-r from-primary-600 via-accent-500 to-primary-700 py-12 mb-8">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold font-heading text-white mb-2 animate-fade-in">
                        My Dashboard
                    </h1>
                    <p className="text-white/90 text-lg animate-fade-in delay-200">
                        Manage your bookings and payments
                    </p>
                </div>
            </div>

            {/* Welcome Banner */}
            <div className="container mx-auto px-4 mb-8">
                <div className="bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row items-center justify-between animate-slide-up">
                    <div>
                        <h2 className="text-2xl font-bold font-heading text-gray-800">
                            Welcome back, <span className="text-primary-600">{user.name}</span>! 👋
                        </h2>
                        <p className="text-gray-600 mt-1">Here's what's happening with your account</p>
                    </div>
                    <button 
                        onClick={logout} 
                        className="mt-4 sm:mt-0 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="container mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 gap-8">
                    {/* Payment History Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 animate-slide-up delay-200">
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-3 rounded-xl mr-4">
                                <FaWallet className="text-white text-2xl" />
                            </div>
                            <h2 className="text-2xl font-bold font-heading text-gray-800">Payment History</h2>
                        </div>
                        <PaymentHistory />
                    </div>
                    
                    {/* Appointment History Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 animate-slide-up delay-300">
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-3 rounded-xl mr-4">
                                <FaCalendarAlt className="text-white text-2xl" />
                            </div>
                            <h2 className="text-2xl font-bold font-heading text-gray-800">Appointment History</h2>
                        </div>
                        <AppointmentHistory />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Dashboard;