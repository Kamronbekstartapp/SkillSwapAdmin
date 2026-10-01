import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminUsers from './admin/AdminUsers';
import AdminLogin from './admin/AdminLogin';
import NotFound from './admin/NotFound';
import ProtectedRoute from './admin/ProtectedRoute';
import AdminSettings from './admin/AdminSettings'; // <-- AdminSettings import qilindi
import { initAdmin } from './services/authService'; // <-- initAdmin import qilindi

function App() {
  useEffect(() => {
    // Dastur ishga tushganda adminni xotiraga shifrlab yozib qo'yadi (Username: skill, Parol: swap123)
    initAdmin();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Login sahifasi */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Himoyalangan Admin Panel sahifalari */}
        <Route element={<ProtectedRoute />}>
          <Route path="/skill" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;