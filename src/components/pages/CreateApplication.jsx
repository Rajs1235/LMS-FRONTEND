import React, { useState, useEffect } from 'react';
import { loanService } from '../../services/api';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const PERMANENT_LOAN_OPTIONS = [
  { name: 'Standard Equity Loan', ltv: 50 },
  { name: 'Priority Equity Loan', ltv: 55 },
  { name: 'Standard Debt Loan', ltv: 80 },
  { name: 'Debt Plus Loan', ltv: 85 },
  { name: 'Hybrid Flexi Loan', ltv: 60 },
  { name: 'Instant Liquid Fund Loan', ltv: 90 },
  { name: 'Bluechip Specific Loan', ltv: 50 },
  { name: 'ELSS Tax-Saver Loan', ltv: 45 },
];

export default function CreateApplication() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '', // NEW: Capturing email for notifications
    loanAmount: '',
    productId: '',
    units: '',
    nav: '',
    fundName: 'Standard Equity Fund'
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await loanService.getProducts();
        setProducts(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };
    fetchProducts();
  }, []);

  const selectedProduct = products.find(p => p._id === formData.productId);
  const totalCollateralValue = Number(formData.units) * Number(formData.nav);
  const maxEligible = selectedProduct ? (totalCollateralValue * (selectedProduct.maxLTV / 100)) : 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (Number(formData.loanAmount) > maxEligible) {
      alert(`Error: Requested amount exceeds eligible limit of ₹${maxEligible.toFixed(2)}.`);
      return;
    }

    try {
      await loanService.applyLoan({
        applicantName: formData.applicantName,
        email: formData.email, // NEW: Sending email to backend
        loanAmount: Number(formData.loanAmount),
        productId: formData.productId,
        collateral: [{
          fundName: formData.fundName,
          units: Number(formData.units),
          currentNav: Number(formData.nav)
        }]
      });
      
      alert("Application Created! Email notification logic is now active.");
      setFormData({ 
        applicantName: '', 
        email: '', 
        loanAmount: '', 
        productId: '', 
        units: '', 
        nav: '', 
        fundName: 'Standard Equity Fund' 
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting application.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-2xl mt-10 border border-slate-100">
      <h2 className="text-2xl font-bold mb-2 text-indigo-900">Create New Application</h2>
      <p className="text-slate-500 mb-8 text-sm">Automated notifications will be sent to the email provided.</p>
      
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1 ml-1">Full Name</label>
            <Input 
              placeholder="Name as per PAN" 
              value={formData.applicantName}
              onChange={e => setFormData({...formData, applicantName: e.target.value})} 
              required
            />
          </div>
          <div>
            {/* NEW: UI Input for Email */}
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1 ml-1">Email Address</label>
            <Input 
              placeholder="notifications@example.com" 
              type="email"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})} 
              required
            />
          </div>
        </div>

        {/* ... (rest of your product select, units, and NAV fields remain same) ... */}

        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1 ml-1">Loan Product</label>
          <select 
            className="w-full p-2.5 border border-slate-300 rounded-md text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none" 
            value={formData.productId}
            onChange={e => setFormData({...formData, productId: e.target.value})}
            required
          >
            <option value="" disabled hidden>Select Loan Product</option>
            {products.map((p, index) => (
              <option key={p._id} value={p._id}>
                {PERMANENT_LOAN_OPTIONS[index]?.name || p.name} — {p.maxLTV}% LTV
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1 ml-1">Collateral Details</label>
          <div className="flex gap-3">
            <Input 
              placeholder="Units" 
              type="number" 
              value={formData.units}
              onChange={e => setFormData({...formData, units: e.target.value})} 
              required
            />
            <Input 
              placeholder="Current NAV" 
              type="number" 
              value={formData.nav}
              onChange={e => setFormData({...formData, nav: e.target.value})} 
              required
            />
          </div>
        </div>

        <div className={`p-4 rounded-xl border transition-colors ${maxEligible > 0 ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-indigo-700 uppercase">Max Eligible Loan</span>
            <span className="text-lg font-bold text-indigo-900">₹{maxEligible.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1 ml-1">Requested Amount</label>
          <Input 
            placeholder="Enter Loan Amount" 
            type="number" 
            value={formData.loanAmount}
            onChange={e => setFormData({...formData, loanAmount: e.target.value})} 
            required
          />
        </div>

        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 text-md font-bold">
          Submit & Notify Applicant
        </Button>
      </form>
    </div>
  );
}