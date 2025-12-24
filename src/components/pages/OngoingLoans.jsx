import React, { useState, useEffect } from 'react';
import { loanService } from '../../services/api';
import { X } from 'lucide-react'; // Optional: for the close icon

export default function OngoingLoans() {
  const [ongoingLoans, setOngoingLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null); // Track which loan is being viewed

  useEffect(() => {
    loanService.getLoans().then(data => {
      const apps = Array.isArray(data) ? data : data.data || [];
      setOngoingLoans(apps.filter(loan => loan.status === 'Ongoing'));
    });
  }, []);

  return (
    <div className="p-8 relative">
      <h2 className="text-2xl font-bold mb-6 text-green-700 underline decoration-2 underline-offset-8">
        Module 4: Active Ongoing Loans
      </h2>

      {/* Grid of Loans */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ongoingLoans.length > 0 ? ongoingLoans.map(loan => (
          <div key={loan._id} className="bg-white p-5 rounded-xl border-l-4 border-green-500 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-slate-800">{loan.applicantName}</h3>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">Active</span>
            </div>
            <p className="text-sm text-slate-500">Loan Amount: <span className="text-slate-900 font-semibold">₹{loan.loanAmount.toLocaleString()}</span></p>
            <p className="text-sm text-slate-500">Product: {loan.product?.name || "LAMF Standard"}</p>
            
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">Collateral Verified</span>
              {/* Trigger the Popup */}
              <button 
                onClick={() => setSelectedLoan(loan)}
                className="text-xs text-indigo-600 font-bold hover:underline"
              >
                View Details
              </button>
            </div>
          </div>
        )) : (
          <p className="text-slate-400 italic">No ongoing loans at the moment.</p>
        )}
      </div>

      {/* --- POPUP / MODAL UI --- */}
      {selectedLoan && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-slate-50 px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Loan Detailed Information</h3>
              <button onClick={() => setSelectedLoan(null)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Applicant</p>
                  <p className="text-sm font-semibold">{selectedLoan.applicantName}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Loan ID</p>
                  <p className="text-sm font-mono text-indigo-600">{selectedLoan._id}</p>
                </div>
              </div>

              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <p className="text-xs text-indigo-400 uppercase font-bold mb-1">Financial Overview</p>
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-2xl font-bold text-indigo-900">₹{selectedLoan.loanAmount.toLocaleString()}</p>
                        <p className="text-xs text-indigo-600 italic">Disbursed via {selectedLoan.product?.name || "LAMF"}</p>
                    </div>
                    <span className="bg-white text-green-600 border border-green-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                        STATUS: {selectedLoan.status}
                    </span>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase font-bold mb-2">Collateral Details</p>
                <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-md border border-slate-200">
                  {/* Assuming your DB stores collateral data like this */}
                  <p>Type: <span className="text-slate-900 font-medium">Mutual Funds / Equity</span></p>
                  <p>Verified on: <span className="text-slate-900 font-medium">{new Date(selectedLoan.updatedAt).toLocaleDateString()}</span></p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t flex justify-end">
              <button 
                onClick={() => setSelectedLoan(null)}
                className="bg-slate-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-700 transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}