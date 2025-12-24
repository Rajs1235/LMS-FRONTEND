import React, { useState, useEffect } from 'react';
import { loanService } from '../services/api';
import { ShieldCheck, CheckCircle, Clock, ShieldAlert } from 'lucide-react';

export default function Dashboard() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await loanService.getLoans();
      // Handle array or wrapped object response
      const data = Array.isArray(response) ? response : response.data || [];
      
      // Filter out 'Ongoing' to clean up the workspace
      const pendingApps = data.filter(loan => 
        loan.status !== 'Ongoing' && loan.status !== 'Rejected'
      );
      
      setLoans(pendingApps);
    } catch (error) {
      console.error("Failed to fetch loans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

const handleKYCVerify = async (id) => {
  try {
    // 1. Wait for the server to confirm it saved the change
    await loanService.updateStatus(id, { isKYCVerified: true });

    // 2. Only AFTER the server is done, update the local UI state
    setLoans(prevLoans => 
      prevLoans.map(loan => 
        loan._id === id ? { ...loan, isKYCVerified: true } : loan
      )
    );
    
    alert("KYC verified successfully!");
    
    // 3. Optional: Re-sync one last time to be sure
    // await loadData(); 
  } catch (error) {
    console.error("KYC Error:", error);
    alert("Verification failed. Make sure isKYCVerified exists in your Backend Model.");
  }
};

  const handleApprove = async (id) => {
    try {
      await loanService.updateStatus(id, { status: 'Ongoing' });
      alert("Loan Approved and Disbursed!");
      await loadData(); // This removes the loan from this list via filter
    } catch (error) {
      alert("Approval Error: " + error.message);
    }
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
    </div>
  );
const handleReject = async (id) => {
  const confirmReject = window.confirm("Are you sure you want to reject this loan application?");
  if (!confirmReject) return;

  try {
    // Moves the status to 'Rejected' in the database
    await loanService.updateStatus(id, { status: 'Rejected' });
    alert("Application Rejected.");
    
    // Refresh list: The 'filter' logic will automatically remove it from view
    await loadData(); 
  } catch (err) {
    alert("Rejection failed: " + err.message);
  }
};
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Actionable Applications</h2>
          <p className="text-sm text-slate-500">Perform KYC verification and final loan approvals</p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full border border-indigo-100">
          <Clock size={14} />
          <span className="text-xs font-bold">{loans.length} Tasks Pending</span>
        </div>
      </div>

      <div className="bg-white shadow-xl border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-xs uppercase text-slate-500 font-bold tracking-wider">
              <th className="p-4">Applicant</th>
              <th className="p-4">Amount</th>
              <th className="p-4">KYC Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map(loan => (
              <tr key={loan._id} className="border-b hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-medium text-slate-900">{loan.applicantName}</td>
                <td className="p-4 font-semibold text-slate-700 italic">₹{loan.loanAmount.toLocaleString('en-IN')}</td>
                <td className="p-4">
                  {loan.isKYCVerified ? (
                    <span className="flex items-center gap-1.5 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-md border border-green-100 w-fit">
                      <CheckCircle size={14} /> KYC VERIFIED
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-amber-600 text-xs font-bold bg-amber-50 px-2 py-1 rounded-md border border-amber-100 w-fit">
                      <ShieldAlert size={14} /> PENDING KYC
                    </span>
                  )}
                </td>
               <td className="p-4 flex gap-2 justify-end">
  {!loan.isKYCVerified ? (
    <>
      <button 
        onClick={() => handleKYCVerify(loan._id)} 
        className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all"
      >
        Verify KYC
      </button>
      {/* REJECT OPTION: Available even before KYC */}
      <button 
        onClick={() => handleReject(loan._id)} 
        className="border border-red-500 text-red-500 hover:bg-red-50 px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
      >
        Reject
      </button>
    </>
  ) : (
    <>
      <button 
        onClick={() => handleApprove(loan._id)} 
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all"
      >
        Approve & Disburse
      </button>
      {/* REJECT OPTION: Still available after KYC if something is wrong */}
      <button 
        onClick={() => handleReject(loan._id)} 
        className="border border-red-500 text-red-500 hover:bg-red-50 px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
      >
        Reject
      </button>
    </>
  )}
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}