import React, { useState, useEffect } from 'react';
import { Filter, Shield, Trash2, Mail, UserCheck } from 'lucide-react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Firebase bazasiga ulanish

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Firebase Firestore'dan real foydalanuvchilarni olib kelish
  useEffect(() => {
    const fetchUsersFromFirebase = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Foydalanuvchilarni olishda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersFromFirebase();
  }, []);

  // Foydalanuvchini Firebase bazasidan o'chirish
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Rostdan ham bu foydalanuvchini o'chirmoqchimisiz?")) return;

    try {
      await deleteDoc(doc(db, "users", id));
      setUsers(users.filter(user => user.id !== id && user.uid !== id));
    } catch (error) {
      console.error("O'chirishda xatolik:", error);
      alert("Foydalanuvchini o'chirib bo'lmadi.");
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Sarlavha qismi */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Foydalanuvchilar</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Railway'dagi Firebase bazasidan real vaqtda olingan foydalanuvchilar.</p>
        </div>
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-300 shadow-sm">
            <Filter size={14} className="text-slate-400" />
            <span>Jami: {users.length} ta</span>
          </div>
        </div>
      </div>

      {/* Kontent qismi */}
      {loading ? (
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-12 text-center text-slate-500 text-xs">
          Yuklanmoqda...
        </div>
      ) : users.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-12 text-center text-slate-500 text-xs">
          Hozircha hech qanday foydalanuvchi yo'q.
        </div>
      ) : (
        <>
          {/* 1. TELEFONLAR UCHUN KARTALAR KO'RINISHI (Faqat sm dan kichik ekranlarda ko'rinadi) */}
          <div className="grid grid-cols-1 gap-4 sm:hidden">
            {users.map((u) => (
              <div key={u.id || u.uid} className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 space-y-4 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
                      {u.username ? u.username[0].toUpperCase() : (u.name ? u.name[0].toUpperCase() : 'U')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">{u.username || u.name || 'Nomaʼlum'}</h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <Mail size={12} className="text-slate-500" /> {u.email}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteUser(u.id || u.uid)}
                    className="p-2 bg-rose-500/10 rounded-xl text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                    title="O'chirish"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold bg-slate-800 text-slate-300">
                    <Shield size={12} className="text-indigo-400" /> {u.role || 'learner'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium bg-emerald-500/10 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Faol
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 2. KOMPYUTER VA PLANSHETLAR UCHUN JADVAL KO'RINISHI (Faqat sm va undan katta ekranlarda) */}
          <div className="hidden sm:block bg-slate-900 border border-slate-800/80 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/40 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Foydalanuvchi</th>
                    <th className="py-4 px-6">Email Manzil</th>
                    <th className="py-4 px-6">Roli</th>
                    <th className="py-4 px-6">Holati</th>
                    <th className="py-4 px-6 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {users.map((u) => (
                    <tr key={u.id || u.uid} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-6 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
                          {u.username ? u.username[0].toUpperCase() : (u.name ? u.name[0].toUpperCase() : 'U')}
                        </div>
                        <span className="font-semibold text-white">{u.username || u.name}</span>
                      </td>
                      <td className="py-4 px-6 text-slate-400 text-xs">{u.email}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300">
                          <Shield size={12} /> {u.role || 'learner'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          Faol
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button 
                          onClick={() => handleDeleteUser(u.id || u.uid)}
                          className="p-2 hover:bg-rose-500/10 rounded-lg text-slate-400 hover:text-rose-400 transition-all cursor-pointer"
                          title="Foydalanuvchini o'chirish"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
