import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, LogOut, ShieldCheck, Bell, Search, ArrowLeft } from 'lucide-react';
import { adminLogout } from '../services/authService';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/skill', label: 'Bosh sahifa', icon: LayoutDashboard },
    { path: '/skill/users', label: 'Foydalanuvchilar', icon: Users },
    { path: '/skill/settings', label: 'Sozlamalar', icon: Settings },
  ];

  const handleLogout = () => {
    adminLogout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      
      {/* SIDEBAR (Kompyuterda chap tomonda fiksirlangan, ortiqcha bo'shliqsiz) */}
      <aside className="hidden lg:flex lg:w-64 bg-slate-900 border-r border-slate-800/80 flex-col h-screen sticky top-0 z-50 shrink-0">
        
        {/* Logo qismi */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-800/80">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <ShieldCheck size={22} className="text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">SkillSwap</h2>
            <span className="text-[10px] text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded">SECURE ADMIN</span>
          </div>
        </div>

        {/* Menyu linklari */}
        <nav className="flex-1 p-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Pastki qism: Chiqish va Asosiy saytga qaytish */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <button 
            onClick={handleLogout} 
            className="w-full py-2.5 px-4 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 hover:bg-indigo-500/20 transition-all cursor-pointer"
          >
            <LogOut size={16} /> Tizimdan Chiqish
          </button>

          <button 
            onClick={() => window.location.href = 'https://skill-swap.up.railway.app'} 
            className="w-full py-2.5 px-4 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all cursor-pointer"
          >
            <ArrowLeft size={16} /> Asosiy saytga qaytish
          </button>
        </div>
      </aside>

      {/* Telefon uchun pastki navbar (O'zgartirilmadi, faqat mobil uchun ishlaydi) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-800 flex justify-around items-center h-16 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className={`flex flex-col items-center gap-1 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`}>
              <Icon size={20} />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Asosiy Kontent Qismi (Chapda ortiqcha bo'shliq qolmasligi uchun to'liq moslandi) */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0">
        
        {/* Top Navbar */}
        <header className="h-20 bg-slate-900/85 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between px-4 lg:px-9 sticky top-0 z-40">
          <div className="hidden sm:flex items-center gap-3 bg-slate-950/60 border border-slate-800 px-4 py-2 rounded-xl w-60 lg:w-80">
            <Search size={16} className="text-slate-500" />
            <input 
              type="text" 
              placeholder="Tizim bo'ylab qidirish..." 
              className="bg-transparent border-none text-white text-xs outline-none w-full placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-center gap-3 lg:gap-5 ml-auto">
            <div className="w-10 h-10 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-center cursor-pointer relative hover:border-slate-700 transition-all">
              <Bell size={18} className="text-slate-400" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
            </div>

            <div className="flex items-center gap-3 border-l border-slate-800 pl-4 lg:pl-5">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-semibold text-slate-200">Super Admin</div>
                <div className="text-[10px] text-emerald-400 flex items-center justify-end gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Faol
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center font-bold text-white text-sm shadow-md shadow-blue-500/20">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Sahifalar render bo'ladigan joy */}
        <main className="p-4 lg:p-9 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
