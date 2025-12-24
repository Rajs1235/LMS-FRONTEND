import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loanService } from '../services/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Lock, Mail } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loanService.login(formData);
      
      // Store the JWT token and admin info
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminUser', JSON.stringify(res.data.admin));
      
      alert("Login Successful! Welcome to 1Fi LMS.");
      navigate('/dashboard'); // Redirect to Dashboard
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-950 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Lock size={28} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">NBFC Portal</h2>
          <p className="text-slate-500 mt-2 text-sm uppercase font-semibold tracking-wider">Internal Admin Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
              <Input 
                type="email"
                placeholder="admin@nbfc.com" 
                className="pl-10"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <Input 
                type="password"
                placeholder="••••••••" 
                className="pl-10"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                required 
              />
            </div>
          </div>

          <Button 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 text-lg font-bold shadow-md shadow-indigo-100 transition-all active:scale-[0.98]"
          >
            {loading ? "Authenticating..." : "Sign In to LMS"}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            New staff member?{" "}
            <Link to="/signup" className="text-indigo-600 font-bold hover:underline transition-all">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}