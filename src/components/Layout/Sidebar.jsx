import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FilePlus, 
  Activity, 
  ShieldCheck, 
  X,
  LogOut 
} from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
   localStorage.clear();
  navigate('/signup'); // or '/'
  };

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/apply', icon: FilePlus, label: 'New Application' },
    { to: '/ongoing', icon: Activity, label: 'Ongoing Loans' },
    { to: '/collateral', icon: ShieldCheck, label: 'Collateral' },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}
      
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-indigo-900 text-white flex flex-col transform transition-transform duration-200 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-6 bg-indigo-950">
          <span className="text-xl font-bold tracking-tight">1Fi LMS</span>
          <button onClick={onClose} className="lg:hidden text-indigo-100">
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 mt-6 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive ? "bg-indigo-700 text-white shadow-sm" : "text-indigo-100 hover:bg-indigo-800"
              )}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Auth Testing Footer */}
        <div className="p-4 border-t border-indigo-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-indigo-300 hover:text-white hover:bg-red-600/20 rounded-lg transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;