import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
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
                <div className="bg-emerald-100 p-4 sm:flex items-center justify-between rounded">
                    <h1 className="text-gray-500 text-xl font-semibold">Welcome, <span className="text-lime-600 capitalize">{user.name}</span></h1>
                    <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-medium border px-4 py-2 rounded-full mt-2 sm:mt-0">Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;