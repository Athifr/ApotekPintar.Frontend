import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { Menu } from 'lucide-react';

const MainLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Determine active tab based on path
    const getActiveTab = () => {
        const path = location.pathname;
        if (path === '/' || path === '/inventory') return 'inventory';
        if (path === '/pos') return 'pos';
        if (path === '/reports') return 'revenue';
        return 'inventory';
    };

    const handleTabChange = (tab) => {
        if (tab === 'inventory') navigate('/inventory');
        if (tab === 'pos') navigate('/pos');
        if (tab === 'revenue') navigate('/reports');
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans text-gray-900 overflow-hidden">
            {/* Sidebar */}
            <Sidebar activeTab={getActiveTab()} onTabChange={handleTabChange} />

            {/* Mobile Header */}
            <div className="md:hidden fixed w-full bg-teal-600 z-20 flex items-center justify-between p-4 shadow-md">
                <span className="font-bold text-xl text-white">Apotek Pintar</span>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
                    <Menu size={24} />
                </button>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto md:ml-64 p-4 md:p-8 pt-20 md:pt-8 transition-all duration-300">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
