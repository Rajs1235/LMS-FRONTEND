import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/Protectedroutes';
import AppLayout from './components/Layout/AppLayout'; // Ensure path is correct

// Import your pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateApplication from './components/pages/CreateApplication';
import OngoingLoans from './components/pages/OngoingLoans';
import CollateralManagement from './components/pages/CollateralManagement';

function App() {
  return (
    <Routes>
      {/* 1. AUTH ROUTES: No Sidebar/Header here */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
       <Route path="/" element={<Signup />} /> 
      {/* 2. PUBLIC FORM: Usually full screen for customers */}
    

      {/* 3. PROTECTED ADMIN ROUTES: Wrapped in AppLayout for Sidebar/Header */}
      <Route 
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        {/* All these children will render inside the <Outlet /> of AppLayout */}
       
         <Route path="/apply" element={<CreateApplication />} />
        <Route path="/ongoing" element={<OngoingLoans />} />
        <Route path="/collateral" element={<CollateralManagement />} />
      </Route>

      {/* Fallback to Dashboard (which redirects to login if no token) */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;