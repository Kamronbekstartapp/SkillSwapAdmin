import React, { useState, useEffect } from 'react';
import { Users, CreditCard, MessageSquare, ShieldAlert, TrendingUp, ArrowUpRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  // Sahifa ochilganda localStorage'dan haqiqiy foydalanuvchilarni olib kelamiz
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('skillswap_users')) || [];
    setUsers(storedUsers);
  }, []);

  // So'nggi ro'yxatdan o'tgan oxirgi 3 ta foydalanuvchini olish
  const recentUsers = [...users].reverse().slice(0, 3);

  // Excel hisobotini yuklab olish funksiyasi
  const handleDownloadExcel = () => {
    const todayDate = new Date().toLocaleDateString();
    
    const summaryData = [
      { "Ko'rsatkich": "Hisobot Sanasi", "Qiymat": todayDate },
      { "Ko'rsatkich": "Jami Foydalanuvchilar", "Qiymat": users.length },
      { "Ko'rsatkich": "Faol Sessiyalar", "Qiymat": 1 },
      { "Ko'rsatkich": "Xavfsizlik Ogohlantirishlari", "Qiymat": 0 },
      { "Ko'rsatkich": "Xavfsizlik Darajasi", "Qiymat": "99.9%" },
      { "Ko'rsatkich": "Server Yuklamasi", "Qiymat": "14%" },
      { "Ko'rsatkich": "Tizim Holati", "Qiymat": "Mukammal ishlamoqda" }
    ];

    const usersData = users.map((u, index) => ({
      "№": index + 1,
      "Foydalanuvchi Ismi": u.name || "Noma'lum",
      "Email Manzil": u.email,
      "Roli": u.role || 'learner',
      "Holati": u.status || 'Faol',
      "Sana": todayDate
    }));

    const wb = XLSX.utils.book_new();

    const wsSummary = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, "Umumiy Statistika");

    const wsUsers = XLSX.utils.json_to_sheet(usersData);
    XLSX.utils.book_append_sheet(wb, wsUsers, "Foydalanuvchilar");

    XLSX.writeFile(wb, `SkillSwap_Hisobot_${todayDate.replace(/\//g, '-')}.xlsx`);
  };

  return (
    <div className="space-y-8 px-3 sm:px-6 py-6 max-w-7xl mx-auto">
      {/* Sarlavha qismi (Kompyuterda keng, tartibli) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Boshqaruv Paneli</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Tizimdagi so'nggi o'zgarishlar va umumiy statistika ko'rsatkichi.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDownloadExcel}
            className="w-full sm:w-auto px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download size={16} />
            Hisobotni Yuklab Olish
          </button>
        </div>
      </div>
      
      {/* Statistika Grid (Kompyuter uchun kengaytirilgan zamonaviy grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Jami Foydalanuvchilar */}
        <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl relative overflow-hidden shadow-xl hover:border-indigo-500/30 transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">Jami Foydalanuvchilar</span>
              <h2 className="text-3xl font-extrabold text-white mt-2 tracking-tight">{users.length}</h2>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users size={24} className="text-blue-400" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/60">
            <TrendingUp size={16} className="text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">Real vaqtda</span>
            <span className="text-xs text-slate-500">yangilanmoqda</span>
          </div>
        </div>

        {/* Faol Sessiyalar */}
        <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl relative overflow-hidden shadow-xl hover:border-amber-500/30 transition-all group">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">Faol Sessiyalar</span>
              <h2 className="text-3xl font-extrabold text-white mt-2 tracking-tight">1</h2>
            </div>
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare size={24} className="text-amber-400" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/60">
            <TrendingUp size={16} className="text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">Admin</span>
            <span className="text-xs text-slate-500">onlayn</span>
          </div>
        </div>

        {/* Xavfsizlik Ogohlantirishi */}
        {/* <div className="bg-slate-900 border border-slate-800/80 p-6 rounded-2xl relative overflow-hidden shadow-xl hover:border-rose-500/30 transition-all group sm:col-span-2 lg:col-span-1">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">Xavfsizlik Ogohlantirishi</span>
              <h2 className="text-3xl font-extrabold text-white mt-2 tracking-tight">0</h2>
            </div>
            <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldAlert size={24} className="text-rose-400" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/60">
            <span className="text-xs font-semibold text-emerald-400">0.0%</span>
            <span className="text-xs text-slate-500">xavfsizlik darajasi a'lo</span>
          </div>
        </div>
      </div>

      {/* Oxirgi faoliyatlar va jadval (Kompyuter uchun kengaytirilgan qism) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* So'nggi ro'yxatdan o'tgan real foydalanuvchilar */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-white">So'nggi Ro'yxatdan O'tganlar</h3>
              <Link to="/skill/users" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors">
                Barchasini ko'rish <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {recentUsers.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs bg-slate-950/40 rounded-xl border border-slate-800/60">
                  Hozircha saytda hech kim ro'yxatdan o'tmadi.
                </div>
              ) : (
                recentUsers.map((u) => (
                  <div key={u.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 hover:border-slate-700 transition-all">
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="w-11 h-11 shrink-0 rounded-xl bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center text-sm uppercase">
                        {u.name ? u.name[0] : 'U'}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{u.name}</div>
                        <div className="text-xs text-slate-400 truncate">{u.email}</div>
                      </div>
                    </div>
                    <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
                      {u.status || 'Faol'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div> */}

        {/* Tizim Holati */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-2">Tizim Holati</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Barcha xizmatlar mukammal ishlamoqda. Xavfsizlik qoidalari to'liq faollashtirilgan.</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 mt-6 space-y-4">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Server yuklamasi:</span>
              <span className="text-white font-bold">14%</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full w-[14%] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
