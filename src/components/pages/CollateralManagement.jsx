import React, { useState, useEffect } from 'react';
import { loanService } from '../../services/api';

export default function CollateralManagement() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    loanService.getLoans().then(data => setLoans(Array.isArray(data) ? data : data.data || []));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Module 5: Collateral Inventory</h2>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-bold tracking-wider">
            <tr>
              <th className="p-4">Fund Name</th>
              <th className="p-4">Units Pledged</th>
              <th className="p-4">Current NAV</th>
              <th className="p-4">Total Value</th>
              <th className="p-4">Linked Loan ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loans.map(loan => loan.collateral?.map((item, idx) => (
              <tr key={`${loan._id}-${idx}`} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-sm font-medium text-slate-900">{item.fundName}</td>
                <td className="p-4 text-sm text-slate-600">{item.units}</td>
                <td className="p-4 text-sm text-slate-600">₹{item.currentNav}</td>
                <td className="p-4 text-sm font-bold text-indigo-600">₹{(item.units * item.currentNav).toLocaleString()}</td>
                <td className="p-4 text-xs font-mono text-slate-400">{loan._id.substring(0, 8)}...</td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
}