// import React, { useState, useEffect } from 'react';
// import { Filter, Shield, Trash2, Mail, AlertTriangle } from 'lucide-react';
// import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
// import { db } from '../firebase'; // Firebase bazasiga ulanish

// export default function AdminUsers() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Modal uchun state'lar
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);

//   // Firebase Firestore'dan real foydalanuvchilarni olib kelish
//   useEffect(() => {
//     const fetchUsersFromFirebase = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "users"));
//         const usersList = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setUsers(usersList);
//       } catch (error) {
//         console.error("Foydalanuvchilarni olishda xatolik:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsersFromFirebase();
//   }, []);

//   // O'chirish tugmasi bosilganda modalni ochish
//   const openDeleteModal = (user) => {
//     setUserToDelete(user);
//     setDeleteModalOpen(true);
//   };

//   // Foydalanuvchini Firebase bazasidan haqiqiy o'chirish
//   const confirmDeleteUser = async () => {
//     if (!userToDelete) return;
//     const targetId = userToDelete.id || userToDelete.uid;

//     try {
//       await deleteDoc(doc(db, "users", targetId));
//       setUsers(users.filter(user => (user.id !== targetId && user.uid !== targetId)));
//       setDeleteModalOpen(false);
//       setUserToDelete(null);
//     } catch (error) {
//       console.error("O'chirishda xatolik:", error);
//       alert("Foydalanuvchini o'chirib bo'lmadi.");
//     }
//   };

//   return (
//     <div className="space-y-6 pb-20">
//       {/* Sarlavha qismi */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Foydalanuvchilar</h1>
//           <p className="text-xs sm:text-sm text-slate-400 mt-1">Railway'dagi Firebase bazasidan real vaqtda olingan foydalanuvchilar.</p>
//         </div>
//         <div className="flex items-center gap-3 self-start sm:self-auto">
//           <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-300 shadow-sm">
//             <Filter size={14} className="text-slate-400" />
//             <span>Jami: {users.length} ta</span>
//           </div>
//         </div>
//       </div>

//       {/* Kontent qismi */}
//       {loading ? (
//         <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-12 text-center text-slate-500 text-xs">
//           Yuklanmoqda...
//         </div>
//       ) : users.length === 0 ? (
//         <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-12 text-center text-slate-500 text-xs">
//           Hozircha hech qanday foydalanuvchi yo'q.
//         </div>
//       ) : (
//         <>
//           {/* 1. TELEFONLAR UCHUN KARTALAR KO'RINISHI */}
//           <div className="grid grid-cols-1 gap-4 sm:hidden">
//             {users.map((u) => (
//               <div key={u.id || u.uid} className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 space-y-4 shadow-md">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
//                       {u.username ? u.username[0].toUpperCase() : (u.name ? u.name[0].toUpperCase() : 'U')}
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-white text-sm">{u.username || u.name || 'Nomaʼlum'}</h3>
//                       <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
//                         <Mail size={12} className="text-slate-500" /> {u.email}
//                       </p>
//                     </div>
//                   </div>
//                   <button 
//                     onClick={() => openDeleteModal(u)}
//                     className="p-2 bg-rose-500/10 rounded-xl text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
//                     title="O'chirish"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>

//                 <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
//                   <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold bg-slate-800 text-slate-300">
//                     <Shield size={12} className="text-indigo-400" /> {u.role || 'learner'}
//                   </span>
//                   <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium bg-emerald-500/10 text-emerald-400">
//                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
//                     Faol
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* 2. KOMPYUTER VA PLANSHETLAR UCHUN JADVAL KO'RINISHI */}
//           <div className="hidden sm:block bg-slate-900 border border-slate-800/80 rounded-2xl shadow-xl overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="border-b border-slate-800 bg-slate-950/40 text-xs font-semibold text-slate-400 uppercase tracking-wider">
//                     <th className="py-4 px-6">Foydalanuvchi</th>
//                     <th className="py-4 px-6">Email Manzil</th>
//                     <th className="py-4 px-6">Roli</th>
//                     <th className="py-4 px-6">Holati</th>
//                     <th className="py-4 px-6 text-right">Amallar</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-800/60 text-sm">
//                   {users.map((u) => (
//                     <tr key={u.id || u.uid} className="hover:bg-slate-800/30 transition-colors">
//                       <td className="py-4 px-6 flex items-center gap-3">
//                         <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
//                           {u.username ? u.username[0].toUpperCase() : (u.name ? u.name[0].toUpperCase() : 'U')}
//                         </div>
//                         <span className="font-semibold text-white">{u.username || u.name}</span>
//                       </td>
//                       <td className="py-4 px-6 text-slate-400 text-xs">{u.email}</td>
//                       <td className="py-4 px-6">
//                         <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300">
//                           <Shield size={12} /> {u.role || 'learner'}
//                         </span>
//                       </td>
//                       <td className="py-4 px-6">
//                         <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
//                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
//                           Faol
//                         </span>
//                       </td>
//                       <td className="py-4 px-6 text-right">
//                         <button 
//                           onClick={() => openDeleteModal(u)}
//                           className="p-2 hover:bg-rose-500/10 rounded-lg text-slate-400 hover:text-rose-400 transition-all cursor-pointer"
//                           title="Foydalanuvchini o'chirish"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </>
//       )}

//       {/* O'CHIRISHNI TASDIQLASH MODAL OYNASI (O'rtadagi div) */}
//       {deleteModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
//           <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
//             <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto">
//               <AlertTriangle size={24} />
//             </div>
//             <div className="text-center space-y-1">
//               <h3 className="text-lg font-bold text-white">Foydalanuvchini o'chirish</h3>
//               <p className="text-xs text-slate-400">
//                 Haqiqatan ham <span className="text-white font-semibold">{userToDelete?.username || userToDelete?.name || 'bu foydalanuvchini'}</span> o'chirib yubormoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.
//               </p>
//             </div>
//             <div className="flex gap-3 pt-2">
//               <button
//                 onClick={() => setDeleteModalOpen(false)}
//                 className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-all cursor-pointer"
//               >
//                 Bekor qilish
//               </button>
//               <button
//                 onClick={confirmDeleteUser}
//                 className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-rose-600/25 transition-all cursor-pointer"
//               >
//                 O'chirish
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { Filter, Shield, Trash2, Mail, AlertTriangle } from 'lucide-react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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

  useEffect(() => {
    fetchUsersFromFirebase();
  }, []);

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    const targetId = userToDelete.id || userToDelete.uid;

    try {
      // 1. Firebase Firestore'dan o'chirish
      await deleteDoc(doc(db, "users", targetId));

      // 2. Admin panel ekranidagi ro'yxatni yangilash
      const updatedList = users.filter(user => (user.id !== targetId && user.uid !== targetId));
      setUsers(updatedList);

      // 3. localStorage'dagi 'skillswap_users' ni ham tozalash
      const localUsers = JSON.parse(localStorage.getItem('skillswap_users')) || [];
      const filteredLocalUsers = localUsers.filter(u => u.id !== targetId && u.uid !== targetId);
      localStorage.setItem('skillswap_users', JSON.stringify(filteredLocalUsers));

      // 4. Agar o'chirilgan foydalanuvchi ayni paytda tizimga kirgan foydalanuvchi bo'lsa, chiqib ketishini ta'minlash
      const currentUser = JSON.parse(localStorage.getItem('current_user'));
      if (currentUser && (currentUser.uid === targetId || currentUser.id === targetId)) {
        localStorage.removeItem('current_user');
        window.location.href = '/login';
      }

      setDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("O'chirishda xatolik:", error);
      alert("Foydalanuvchini o'chirib bo'lmadi.");
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Foydalanuvchilar</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Firebase bazasidan ro'yxat.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-300">
            <Filter size={14} className="text-slate-400" />
            <span>Jami: {users.length} ta</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-xs">
          Yuklanmoqda...
        </div>
      ) : users.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-xs">
          Hozircha hech qanday foydalanuvchi yo'q.
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
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
                        onClick={() => openDeleteModal(u)}
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
      )}

      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto">
              <AlertTriangle size={24} />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white">Foydalanuvchini o'chirish</h3>
              <p className="text-xs text-slate-400">
                Haqiqatan ham <span className="text-white font-semibold">{userToDelete?.username || userToDelete?.name || 'bu foydalanuvchini'}</span> o'chirib yubormoqchimisiz?
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Bekor qilish
              </button>
              <button
                onClick={confirmDeleteUser}
                className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
