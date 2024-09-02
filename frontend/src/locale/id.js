const localeId = {
  translation: {
    byCreator: "by LinxBrain Indonesia",
    login: {
      titleUser: "Welcome, BrainBooster!",
      emailInfo: "(Silakan gunakan email kantor Anda)",
      loginFailed: "Login gagal!\nPeriksa kembali Email dan Password"
    },
    dialog: {
      logOutTitle: "Apakah anda yakin ?",
      logOutDesc: "Anda akan keluar dari akun Anda.",
      deleteCourseTitle: "Hapus Course",
      deleteCourseDesc: "Anda yakin ingin menghapus course ini?",

    },
    btn: {
      logout: "Logout",
      cancel: "Batal",
      select: "Pilih",
      save: "Simpan",
      delete: "Hapus",
      upload: "Upload",
      uploading: "Uploading...",
      profile: "Profile",
      password: "Password",
      light: "Light",
      dark: "Dark",
      addCourse: "Tambah Kelas",
      courses: "Kelas",
      duration: "Durasi",
      actions: "Actions",
      created: "Dibuat",
      updated: "Updated",
      status: "Status",
    },
    dashboard: {
      title: "Dashboard",
      welcome: "Selamat datang",
      totalCourses: "Total Kelas",
      totalStudent: "Total Siswa",
      myCourses: "Kelas Saya",
      noCoursesFound: "Tidak ada kelas yang ditemukan",
      addCourses: "Tambah Kelas",
    },
    notification: {
      title: "Notifikasi",
      pageList: [{key: "all", label: "Semua"}, {key: "unread", label: "Belum Dibaca"}],
    },
    settings: {
      title: "Settings",
      myProfile: "Profile",
      editTheme: "Ganti Tema",
      editLanguage: "Ganti Bahasa",
      editProfile: "Edit Profile",
      editPassword: "Edit Password",
      changePicLabel: "Ubah gambar profile",
      pleaseAddImage: "Silahkan pilih gambar terlebih dahulu",
      successUpdateAvatar: "Sukses mengubah avatar",
      successUpdateProfile: "Sukses mengubah profile",
      successUpdatePassword: "Sukses mengubah password",
      successDeleteProfile: "Sukses menghapus profile",
      successUpdateTheme: "Sukses mengubah tampilan",
      avatar: "Avatar",
      profileInfo: "Informasi Profile",
      firstName: "Nama Depan",
      firstNamePlaceholder: "Tuliskan nama depan",
      lastName: "Nama Belakang",
      lastNamePlaceholder: "Tuliskan nama belakang",
      dateOfBirth: "Tanggal Lahir",
      gender: "Jenis Kelamin",
      contactNumber: "Nomor Kontak",
      contactNumberPlaceholder: "Tuliskan nomor kontak",
      about: "About",
      aboutPlaceholder: "Tuliskan informasi tambahan",
      currentPassword: "Passward Sekarang",
      newPassword: "Passward Baru",
      newPasswordConfirm: "Ulangi Passward Baru",
      currentPasswordError: "Silahkan tuliskan password saat ini",
      newPasswordError: "Tuliskan passward baru",
      newPasswordConfirmError: "Ulangi password baru",
      languageList: [{key: "id", label: "Bahasa Indonesia"}, {key: "en", label: "Bahasa Inggris"}],
      themeList: [{key: "light", label: "Light"}, {key: "dark", label: "Dark"}],
      genderList: [{key: "male", label: "Pria"}, {key: "female", label: "Wanita"}]
    },
    course: {
      addCourse: "Tambah Kelas",
      addCourseSteps: [{id: 1, title: "Course Information"}, {id: 2, title: "Course Builder"}, {id: 3, title: "Publish"}],
    },
  },
}

export default {
  language: 'id',
  country: 'id',
  name: 'Indonesia',
  embeddedLocale: localeId
}