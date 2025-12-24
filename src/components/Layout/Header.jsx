import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  
  // Get dynamic admin info from localStorage
  const adminData = JSON.parse(localStorage.getItem('adminUser') || '{}');

  const handleLogout = () => {
    // 1. Clear the session
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    // 2. Redirect to Login to test the "Protected Route" flow
    alert("Logging out...");
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6">
      <button onClick={onMenuClick} className="lg:hidden p-2 text-slate-600">
        <Menu size={24} />
      </button>
      
      <div className="flex items-center gap-4 ml-auto">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white" />
        </Button>

        {/* User Profile & Logout Section */}
        <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <User size={18} className="text-indigo-600" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-bold text-slate-800 leading-none">
                {adminData.name || 'Admin User'}
              </p>
              <p className="text-[10px] text-slate-500 font-medium uppercase mt-1">NBFC Staff</p>
            </div>
          </div>

        
        </div>
      </div>
    </header>
  );
};

export default Header;