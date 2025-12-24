import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/Protectedroutes';
import AppLayout from './components/Layout/AppLayout';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateApplication from './components/pages/CreateApplication';
import OngoingLoans from './components/pages/OngoingLoans';
import CollateralManagement from './components/pages/CollateralManagement';

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/apply" element={<CreateApplication />} />
        <Route path="/ongoing" element={<OngoingLoans />} />
        <Route path="/collateral" element={<CollateralManagement />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
