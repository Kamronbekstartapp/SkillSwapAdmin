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

  // Excel hisobotini yuklab olish funksiyasi (Faqat 01/10/2026 sanasi bo'yicha)
  const handleDownloadExcel = () => {
    const todayDate = "01/10/2026";
    
    // 1. Umumiy statistika varag'i uchun ma'lumotlar
    const summaryData = [
      { "Ko'rsatkich": "Hisobot Sanasi", "Qiymat": todayDate },
      { "Ko'rsatkich": "Jami Foydalanuvchilar", "Qiymat": users.length },
      { "Ko'rsatkich": "Faol Sessiyalar", "Qiymat": 1 },
      { "Ko'rsatkich": "Xavfsizlik Ogohlantirishlari", "Qiymat": 0 },
      { "Ko'rsatkich": "Xavfsizlik Darajasi", "Qiymat": "99.9%" },
      { "Ko'rsatkich": "Server Yuklamasi", "Qiymat": "14%" },
      { "Ko'rsatkich": "Tizim Holati", "Qiymat": "Mukammal ishlamoqda" }
    ];

    // 2. Foydalanuvchilar ro'yxati varag'i uchun ma'lumotlar
    const usersData = users.map((u, index) => ({
      "№": index + 1,
      "Foydalanuvchi Ismi": u.name || "Noma'lum",
      "Email Manzil": u.email,
      "Roli": u.role || 'learner',
      "Holati": u.status || 'Faol',
      "Sana": todayDate
    }));

    // 3. Excel faylini yaratish va varaqlarni qo'shish
    const wb = XLSX.utils.book_new();

    const wsSummary = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, "Umumiy Statistika");

    const wsUsers = XLSX.utils.json_to_sheet(usersData);
    XLSX.utils.book_append_sheet(wb, wsUsers, "Foydalanuvchilar");

    // 4. Faylni kompyuterga yuklab berish
    XLSX.writeFile(wb, `SkillSwap_Hisobot_01_10_2026.xlsx`);
  };

  return (
    <div className="space-y-6 px-3 sm:px-6 py-4 max-w-7xl mx-auto">
      {/* Sarlavha qismi (Responsive flex va text wrap) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Boshqaruv Paneli</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Tizimdagi so'nggi o'zgarishlar va umumiy statistika ko'rsatkichi.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Hisobotni Yuklab Olish tugmasi ulandi va mobil uchun moslashtirildi */}
          <button 
            onClick={handleDownloadExcel}
            className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download size={14} />
            Hisobotni Yuklab Olish
          </button>
        </div>
      </div>
      
      {/* Statistika Grid (Mobil uchun 1 ustun, planshet uchun 2, kompyuter uchun 3 ustun) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* 1. Jami Foydalanuvchilar - 100% Real */}
        <div className="bg-slate-900 border border-slate-800/80 p-5 sm:p-6 rounded-2xl relative overflow-hidden shadow-xl hover:border-slate-700 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-medium text-slate-400">Jami Foydalanuvchilar</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">{users.length}</h2>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
              <Users size={20} className="text-blue-400 sm:w-[22px] sm:h-[22px]" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-800/60">
            <TrendingUp size={14} className="text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">Real vaqtda</span>
            <span className="text-xs text-slate-500">yangilanmoqda</span>
          </div>
        </div>

        {/* Faol Sessiyalar */}
        <div className="bg-slate-900 border border-slate-800/80 p-5 sm:p-6 rounded-2xl relative overflow-hidden shadow-xl hover:border-slate-700 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-medium text-slate-400">Faol Sessiyalar</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">1</h2>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center">
              <MessageSquare size={20} className="text-amber-400 sm:w-[22px] sm:h-[22px]" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-800/60">
            <TrendingUp size={14} className="text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">Admin</span>
            <span className="text-xs text-slate-500">onlayn</span>
          </div>
        </div>

        {/* Xavfsizlik Ogohlantirishi */}
        <div className="bg-slate-900 border border-slate-800/80 p-5 sm:p-6 rounded-2xl relative overflow-hidden shadow-xl hover:border-slate-700 transition-all sm:col-span-2 lg:col-span-1">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-medium text-slate-400">Xavfsizlik Ogohlantirishi</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">0</h2>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-center">
              <ShieldAlert size={20} className="text-rose-400 sm:w-[22px] sm:h-[22px]" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-800/60">
            <span className="text-xs font-semibold text-emerald-400">0.0%</span>
            <span className="text-xs text-slate-500">xavfsizlik darajasi a'lo</span>
          </div>
        </div>
      </div>

      {/* Oxirgi faoliyatlar va jadval */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* So'nggi ro'yxatdan o'tgan real foydalanuvchilar */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-white">So'nggi Ro'yxatdan O'tganlar</h3>
            <Link to="/skill/users" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
              Barchasini ko'rish <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {recentUsers.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs bg-slate-950/40 rounded-xl border border-slate-800/60">
                Hozircha saytda hech kim ro'yxatdan o'tmadi.
              </div>
            ) : (
              recentUsers.map((u) => (
                <div key={u.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center text-xs sm:text-sm uppercase">
                      {u.name ? u.name[0] : 'U'}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-semibold text-white truncate">{u.name}</div>
                      <div className="text-[11px] sm:text-xs text-slate-400 truncate">{u.email}</div>
                    </div>
                  </div>
                  <span className="self-start sm:self-auto text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
                    {u.status || 'Faol'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tizim Holati */}
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-white mb-2">Tizim Holati</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Barcha xizmatlar mukammal ishlamoqda. Xavfsizlik qoidalari to'liq faollashtirilgan.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 mt-6 space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Server yuklamasi:</span>
              <span className="text-white font-semibold">14%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full w-[14%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
