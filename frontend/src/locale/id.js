const localeId = {
  translation: {
    byCreator: "by LinxBrain Indonesia",
    isNeeded: "Wajib diisi",
    tagPlaceHolder: "Tuliskan text dan tekan Enter atau Comma",
    areaUploadTitle: "Click to upload or drag and drop",
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
      next: "Lanjut",
      nextWithoutSave: "Lanjut tanpa menyimpan",
      saveChanged: "Simpan Perubahan"
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
      lastName: "Nama Belakang",
      dateOfBirth: "Tanggal Lahir",
      gender: "Jenis Kelamin",
      contactNumber: "Nomor Kontak",
      about: "About",
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
      editCourse: "Edit Kelas",
      courseNotFound: "Kelas tidak ditemukan",
      courseTitle: "Judul Course",
      courseDescription: "Deskripsi Course",
      courseBenefits: "Keunggulan Course",
      courseCategory: "Kategori Course",
      courseTags: "Tag Course",
      courseInstructions: "Persyaratan/Petunjuk",
      courseThumbnail: "Thumbnail Course",
      courseSelectCategory: "Pilih Kategori",
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