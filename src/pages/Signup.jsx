import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loanService } from '../services/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Calls the POST /api/v1/admin/register endpoint
      await loanService.register(formData);
      alert("Admin Account Created Successfully! Please Login.");
      navigate('/login');
    } catch (err) {
      alert("Signup Failed: " + (err.response?.data?.message || "Error"));
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-indigo-950">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">NBFC Registration</h2>
          <p className="text-slate-500 mt-2">Create an internal staff account</p>
        </div>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <Input 
            placeholder="Full Name" 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            required 
          />
          <Input 
            placeholder="Work Email" 
            type="email"
            onChange={e => setFormData({...formData, email: e.target.value})} 
            required 
          />
          <Input 
            placeholder="Password" 
            type="password" 
            onChange={e => setFormData({...formData, password: e.target.value})} 
            required 
          />
          <Button className="w-full bg-indigo-600 py-6 text-lg font-bold hover:bg-indigo-700">
            Register Admin
          </Button>
        </form>
        
        <p className="text-center mt-6 text-sm text-slate-600">
          Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}