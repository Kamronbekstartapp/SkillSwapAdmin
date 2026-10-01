import bcrypt from 'bcryptjs';

// 1. Dastlabki adminni localStorage'ga shifrlab saqlash
export const initAdmin = () => {
  const existingAdmin = localStorage.getItem('admin_data');
  if (!existingAdmin) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync('swap123', salt); // Parol: swap123

    const adminData = {
      username: 'skill',
      password: hashedPassword,
    };
    localStorage.setItem('admin_data', JSON.stringify(adminData));
  }
};

// 2. Login tekshirish va kirish huquqini saqlash
export const verifyAdminLogin = (enteredUsername, enteredPassword) => {
  const adminString = localStorage.getItem('admin_data');
  if (!adminString) {
    return { success: false, message: "Admin topilmadi!" };
  }

  const adminData = JSON.parse(adminString);

  if (adminData.username !== enteredUsername) {
    return { success: false, message: "Username yoki parol noto'g'ri!" };
  }

  // Kiritilgan parolni shifrlangan parol bilan solishtirish
  const isPasswordValid = bcrypt.compareSync(enteredPassword, adminData.password);

  if (!isPasswordValid) {
    return { success: false, message: "Username yoki parol noto'g'ri!" };
  }

  // Muvaffaqiyatli kirganda himoya uchun belgi yozib qo'yamiz
  localStorage.setItem('is_admin_logged_in', 'true');

  return { success: true, message: "Muvaffaqiyatli kirdingiz!" };
};

// 3. Tizimdan chiqish (Logout)
export const adminLogout = () => {
  localStorage.removeItem('is_admin_logged_in');
};