import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Orqa fondagi yorug'lik effekti */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full bg-slate-900 border border-slate-800/80 rounded-2xl p-8 text-center shadow-2xl relative z-10">
        
        {/* Ogohlantirish belgisi */}
        <div className="w-20 h-20 bg-rose-500/10 border border-rose-500/20 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-rose-500/10 mb-6">
          <AlertTriangle size={36} className="text-rose-400" />
        </div>

        {/* Xato raqami */}
        <h1 className="text-6xl font-extrabold text-white tracking-tight mb-2">404</h1>
        <h2 className="text-lg font-bold text-slate-200 mb-2">Sahifa topilmadi</h2>
        <p className="text-xs text-slate-400 leading-relaxed mb-8">
          Siz qidirayotgan sahifa mavjud emas, o'chirilgan yoki uning manzili o'zgartirilgan bo'lishi mumkin.
        </p>

        {/* Harakat tugmalari */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-all border border-slate-700/60"
          >
            <ArrowLeft size={16} /> Ortga qaytish
          </button>
          
          <button 
            onClick={() => navigate('/skill')}
            className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
          >
            <Home size={16} /> Bosh sahifa
          </button>
        </div>
      </div>
    </div>
  );
}