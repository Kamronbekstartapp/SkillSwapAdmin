import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  // LocalStorage'dan admin tizimga kirganligini tekshiramiz
  const isAuthenticated = localStorage.getItem('is_admin_logged_in') === 'true';

  // Agar kirgan bo'lsa, sahifani ko'rsatamiz, aks holda login sahifasiga yo'naltiramiz
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}