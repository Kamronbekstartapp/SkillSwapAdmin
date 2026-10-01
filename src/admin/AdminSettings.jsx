import React, { useState } from 'react';
import { User, Lock, Moon, Sun, Save, ShieldCheck } from 'lucide-react';

export default function AdminSettings() {
  // Admin ma'lumotlari (buni o'zingizning state yoki localStorage'dan olsangiz ham bo'ladi)
  const [adminName, setAdminName] = useState('Admin Master');
  const [adminEmail, setAdminEmail] = useState('admin@skillswap.uz');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [message, setMessage] = useState('');

  // Ma'lumotlarni saqlash funksiyasi
  const handleSaveSettings = (e) => {
    e.preventDefault();
    
    // Bu yerda ma'lumotlarni saqlash logikasini yozasiz (masalan, localStorage yoki Firebase)
    localStorage.setItem('admin_name', adminName);
    localStorage.setItem('admin_email', adminEmail);

    setMessage('Sozlamalar muvaffaqiyatli saqlandi!');
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Sarlavha */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Admin Sozlamalari</h1>
        <p className="text-sm text-slate-400 mt-1">Admin panel sozlamalari va shaxsiy ma'lumotlarni boshqarish.</p>
      </div>

      {/* Muvaffaqiyatli xabar */}
      {message && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-2xl flex items-center gap-2">
          <ShieldCheck size={16} />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Shaxsiy ma'lumotlar kartasi */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <User size={18} className="text-indigo-400" />
            Profil Ma'lumotlari
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Admin Ismi</label>
              <input 
                type="text" 
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Email Manzil</label>
              <input 
                type="email" 
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>
          </div>
        </div>

        {/* Parolni o'zgartirish kartasi */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock size={18} className="text-indigo-400" />
            Xavfsizlik & Parol
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Joriy Parol</label>
              <input 
                type="password" 
                placeholder="********"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Yangi Parol</label>
              <input 
                type="password" 
                placeholder="********"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* Saqlash tugmasi */}
        <div className="flex justify-end">
          <button 
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
          >
            <Save size={16} />
            O'zgarishlarni Saqlash
          </button>
        </div>
      </form>
    </div>
  );
}