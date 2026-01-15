// i18n.js - Complete Internationalization System

const translations = {
    fr: {
        // Login Page
        'login.title': 'EMSI Moulay Youssef',
        'login.subtitle': 'Backoffice MyManager',
        'login.username': 'Nom d\'utilisateur',
        'login.password': 'Mot de passe',
        'login.language': 'Langue',
        'login.button': 'Se connecter',
        'login.error': 'Nom d\'utilisateur ou mot de passe incorrect',
        'login.footer': '© 2024 EMSI Moulay Youssef - Tous droits réservés',
        
        // Navbar
        'navbar.title': 'EMSI Moulay Youssef',
        'navbar.logout': 'Déconnexion',
        
        // Sidebar
        'sidebar.dashboard': 'Tableau de bord',
        'sidebar.students': 'Étudiants',
        'sidebar.teachers': 'Professeurs',
        'sidebar.courses': 'Cours',
        'sidebar.departments': 'Départements',
        'sidebar.absences': 'Absences',
        'sidebar.schedule': 'Emploi du temps',
        'sidebar.rooms': 'Salles',
        'sidebar.logout': 'Déconnexion',
        
        // Dashboard
        'dashboard.title': 'Tableau de bord',
        'dashboard.students': 'Étudiants',
        'dashboard.teachers': 'Professeurs',
        'dashboard.courses': 'Cours',
        'dashboard.departments': 'Départements',
        'dashboard.absences': 'Absences',
        'dashboard.rooms': 'Salles',
        'dashboard.clickToView': 'Cliquez pour voir la liste',
        'dashboard.studentsDistribution': 'Répartition des Étudiants',
        'dashboard.coursesByDepartment': 'Cours par Département',
        'dashboard.monthlyAbsences': 'Absences Mensuelles',
        'dashboard.roomsStatus': 'État des Salles',
        'dashboard.weeklySchedule': 'Occupation Hebdomadaire',
        
        // Page Titles
        'page.students': 'Gestion des Étudiants',
        'page.teachers': 'Gestion des Professeurs',
        'page.courses': 'Gestion des Cours',
        'page.departments': 'Gestion des Départements',
        'page.absences': 'Gestion des Absences',
        'page.schedule': 'Emploi du temps',
        'page.rooms': 'Gestion des Salles',
        
        // Table Headers
        'table.id': 'ID',
        'table.name': 'Nom',
        'table.email': 'Email',
        'table.department': 'Département',
        'table.status': 'Statut',
        'table.actions': 'Actions',
        'table.subject': 'Matière',
        'table.experience': 'Expérience',
        'table.code': 'Code',
        'table.credits': 'Crédits',
        'table.semester': 'Semestre',
        'table.head': 'Responsable',
        'table.studentsCount': 'Étudiants',
        'table.teachersCount': 'Professeurs',
        'table.student': 'Étudiant',
        'table.course': 'Cours',
        'table.date': 'Date',
        'table.justified': 'Justifiée',
        'table.day': 'Jour',
        'table.time': 'Heure',
        'table.teacher': 'Professeur',
        'table.room': 'Salle',
        'table.type': 'Type',
        'table.capacity': 'Capacité',
        'table.building': 'Bâtiment',
        'table.floor': 'Étage',
        'table.available': 'Disponible',
        'table.occupied': 'Occupée',
        
        // Buttons & Filters
        'button.add': 'Ajouter',
        'button.export': 'Exporter CSV',
        'button.view': 'Voir',
        'button.edit': 'Modifier',
        'button.delete': 'Supprimer',
        'button.save': 'Enregistrer',
        'button.cancel': 'Annuler',
        'button.search': 'Rechercher...',
        'button.filterAll': 'Tous',
        'button.filterActive': 'Actif',
        'button.filterInactive': 'Inactif',
        'button.filterJustified': 'Justifiées',
        'button.filterUnjustified': 'Non justifiées',
        'button.filterAvailable': 'Disponible',
        'button.filterOccupied': 'Occupée',
        'button.yes': 'Oui',
        'button.no': 'Non',
        
        // Filters
        'filter.allDepartments': 'Tous les départements',
        'filter.allStatus': 'Tous les statuts',
        'filter.allSubjects': 'Toutes les matières',
        'filter.allDays': 'Tous les jours',
        'filter.allTypes': 'Tous les types',
        'filter.monday': 'Lundi',
        'filter.tuesday': 'Mardi',
        'filter.wednesday': 'Mercredi',
        'filter.thursday': 'Jeudi',
        'filter.friday': 'Vendredi',
        
        // Status
        'status.active': 'Actif',
        'status.inactive': 'Inactif',
        'status.available': 'Disponible',
        'status.occupied': 'Occupée',
        'status.justified': 'Justifiée',
        'status.unjustified': 'Non justifiée',
        
        // Modal
        'modal.confirmation': 'Confirmation',
        'modal.confirmDelete': 'Êtes-vous sûr de vouloir supprimer cet élément ?',
        'modal.addStudent': 'Ajouter un Étudiant',
        'modal.editStudent': 'Modifier l\'Étudiant',
        'modal.addTeacher': 'Ajouter un Professeur',
        'modal.editTeacher': 'Modifier le Professeur',
        'modal.addCourse': 'Ajouter un Cours',
        'modal.editCourse': 'Modifier le Cours',
        'modal.addDepartment': 'Ajouter un Département',
        'modal.editDepartment': 'Modifier le Département',
        'modal.addAbsence': 'Ajouter une Absence',
        'modal.editAbsence': 'Modifier l\'Absence',
        'modal.addSchedule': 'Ajouter une Séance',
        'modal.editSchedule': 'Modifier la Séance',
        'modal.addRoom': 'Ajouter une Salle',
        'modal.editRoom': 'Modifier la Salle',
        
        // Form Labels
        'form.firstName': 'Prénom',
        'form.lastName': 'Nom de famille',
        'form.email': 'Email',
        'form.phone': 'Téléphone',
        'form.address': 'Adresse',
        'form.enrollmentDate': 'Date d\'inscription',
        'form.gpa': 'Moyenne',
        'form.department': 'Département',
        'form.selectDepartment': 'Sélectionner...',
        'form.status': 'Statut',
        'form.subject': 'Matière',
        'form.yearsExperience': 'Années d\'expérience',
        'form.courseName': 'Nom du cours',
        'form.courseCode': 'Code',
        'form.description': 'Description',
        'form.credits': 'Crédits',
        'form.semester': 'Semestre',
        'form.headOfDepartment': 'Responsable',
        'form.teachersCount': 'Nombre de professeurs',
        'form.studentName': 'Étudiant',
        'form.course': 'Cours',
        'form.reason': 'Raison',
        'form.selectStudent': 'Sélectionner un étudiant',
        'form.selectCourse': 'Sélectionner un cours',
        'form.selectTeacher': 'Sélectionner un professeur',
        'form.selectRoom': 'Sélectionner une salle',
        'form.roomName': 'Nom',
        'form.roomCode': 'Code',
        'form.capacity': 'Capacité',
        'form.building': 'Bâtiment',
        'form.floor': 'Étage',
        'form.equipment': 'Équipement',
        
        // Days
        'day.monday': 'Lundi',
        'day.tuesday': 'Mardi',
        'day.wednesday': 'Mercredi',
        'day.thursday': 'Jeudi',
        'day.friday': 'Vendredi',
        
        // Time Slots
        'time.morning1': '08:00-10:00',
        'time.morning2': '10:00-12:00',
        'time.afternoon1': '14:00-16:00',
        'time.afternoon2': '16:00-18:00',
        
        // Room Types
        'room.lecture': 'Cours',
        'room.lab': 'TP',
        'room.amphitheater': 'Amphithéâtre',
        'room.laboratory': 'Laboratoire',
        
        // Building Names
        'building.a': 'Bâtiment A',
        'building.b': 'Bâtiment B',
        'building.c': 'Bâtiment C',
        'building.d': 'Bâtiment D',
        'building.e': 'Bâtiment E',
        
        // Alerts
        'alert.success': 'Succès',
        'alert.error': 'Erreur',
        'alert.warning': 'Attention',
        'alert.info': 'Information',
        'alert.saved': 'Enregistré avec succès',
        'alert.deleted': 'Supprimé avec succès',
        'alert.added': 'Ajouté avec succès',
        'alert.updated': 'Mis à jour avec succès',
        'alert.exported': 'Exporté avec succès',
        
        // Pagination
        'pagination.previous': 'Précédent',
        'pagination.next': 'Suivant',
        'pagination.page': 'Page',
        'pagination.of': 'sur'
    },
    
    ar: {
        // Login Page
        'login.title': 'المدرسة المغربية للعلوم الهندسية',
        'login.subtitle': 'لوحة التحكم MyManager',
        'login.username': 'اسم المستخدم',
        'login.password': 'كلمة المرور',
        'login.language': 'اللغة',
        'login.button': 'تسجيل الدخول',
        'login.error': 'اسم المستخدم أو كلمة المرور غير صحيحة',
        'login.footer': '© 2024 المدرسة المغربية للعلوم الهندسية - جميع الحقوق محفوظة',
        
        // Navbar
        'navbar.title': 'المدرسة المغربية للعلوم الهندسية',
        'navbar.logout': 'تسجيل الخروج',
        
        // Sidebar
        'sidebar.dashboard': 'لوحة التحكم',
        'sidebar.students': 'الطلاب',
        'sidebar.teachers': 'الأساتذة',
        'sidebar.courses': 'الدروس',
        'sidebar.departments': 'الأقسام',
        'sidebar.absences': 'الغيابات',
        'sidebar.schedule': 'الجدول الزمني',
        'sidebar.rooms': 'القاعات',
        'sidebar.logout': 'تسجيل الخروج',
        
        // Dashboard
        'dashboard.title': 'لوحة التحكم',
        'dashboard.students': 'الطلاب',
        'dashboard.teachers': 'الأساتذة',
        'dashboard.courses': 'الدروس',
        'dashboard.departments': 'الأقسام',
        'dashboard.absences': 'الغيابات',
        'dashboard.rooms': 'القاعات',
        'dashboard.clickToView': 'انقر لعرض القائمة',
        'dashboard.studentsDistribution': 'توزيع الطلاب',
        'dashboard.coursesByDepartment': 'الدروس حسب القسم',
        'dashboard.monthlyAbsences': 'الغيابات الشهرية',
        'dashboard.roomsStatus': 'حالة القاعات',
        'dashboard.weeklySchedule': 'الجدول الأسبوعي',
        
        // Page Titles
        'page.students': 'إدارة الطلاب',
        'page.teachers': 'إدارة الأساتذة',
        'page.courses': 'إدارة الدروس',
        'page.departments': 'إدارة الأقسام',
        'page.absences': 'إدارة الغيابات',
        'page.schedule': 'الجدول الزمني',
        'page.rooms': 'إدارة القاعات',
        
        // Table Headers
        'table.id': 'المعرف',
        'table.name': 'الاسم',
        'table.email': 'البريد الإلكتروني',
        'table.department': 'القسم',
        'table.status': 'الحالة',
        'table.actions': 'الإجراءات',
        'table.subject': 'المادة',
        'table.experience': 'الخبرة',
        'table.code': 'الرمز',
        'table.credits': 'النقاط',
        'table.semester': 'الفصل',
        'table.head': 'المسؤول',
        'table.studentsCount': 'الطلاب',
        'table.teachersCount': 'الأساتذة',
        'table.student': 'الطالب',
        'table.course': 'المادة',
        'table.date': 'التاريخ',
        'table.justified': 'مبررة',
        'table.day': 'اليوم',
        'table.time': 'الوقت',
        'table.teacher': 'الأستاذ',
        'table.room': 'القاعة',
        'table.type': 'النوع',
        'table.capacity': 'السعة',
        'table.building': 'المبنى',
        'table.floor': 'الطابق',
        'table.available': 'متاحة',
        'table.occupied': 'مشغولة',
        
        // Buttons & Filters
        'button.add': 'إضافة',
        'button.export': 'تصدير CSV',
        'button.view': 'عرض',
        'button.edit': 'تعديل',
        'button.delete': 'حذف',
        'button.save': 'حفظ',
        'button.cancel': 'إلغاء',
        'button.search': 'بحث...',
        'button.filterAll': 'الكل',
        'button.filterActive': 'نشط',
        'button.filterInactive': 'غير نشط',
        'button.filterJustified': 'مبررة',
        'button.filterUnjustified': 'غير مبررة',
        'button.filterAvailable': 'متاحة',
        'button.filterOccupied': 'مشغولة',
        'button.yes': 'نعم',
        'button.no': 'لا',
        
        // Filters
        'filter.allDepartments': 'كل الأقسام',
        'filter.allStatus': 'كل الحالات',
        'filter.allSubjects': 'كل المواد',
        'filter.allDays': 'كل الأيام',
        'filter.allTypes': 'كل الأنواع',
        'filter.monday': 'الإثنين',
        'filter.tuesday': 'الثلاثاء',
        'filter.wednesday': 'الأربعاء',
        'filter.thursday': 'الخميس',
        'filter.friday': 'الجمعة',
        
        // Status
        'status.active': 'نشط',
        'status.inactive': 'غير نشط',
        'status.available': 'متاحة',
        'status.occupied': 'مشغولة',
        'status.justified': 'مبررة',
        'status.unjustified': 'غير مبررة',
        
        // Modal
        'modal.confirmation': 'تأكيد',
        'modal.confirmDelete': 'هل أنت متأكد من حذف هذا العنصر؟',
        'modal.addStudent': 'إضافة طالب',
        'modal.editStudent': 'تعديل الطالب',
        'modal.addTeacher': 'إضافة أستاذ',
        'modal.editTeacher': 'تعديل الأستاذ',
        'modal.addCourse': 'إضافة مادة',
        'modal.editCourse': 'تعديل المادة',
        'modal.addDepartment': 'إضافة قسم',
        'modal.editDepartment': 'تعديل القسم',
        'modal.addAbsence': 'إضافة غياب',
        'modal.editAbsence': 'تعديل الغياب',
        'modal.addSchedule': 'إضافة حصة',
        'modal.editSchedule': 'تعديل الحصة',
        'modal.addRoom': 'إضافة قاعة',
        'modal.editRoom': 'تعديل القاعة',
        
        // Form Labels
        'form.firstName': 'الاسم الأول',
        'form.lastName': 'اسم العائلة',
        'form.email': 'البريد الإلكتروني',
        'form.phone': 'الهاتف',
        'form.address': 'العنوان',
        'form.enrollmentDate': 'تاريخ التسجيل',
        'form.gpa': 'المعدل',
        'form.department': 'القسم',
        'form.selectDepartment': 'اختر...',
        'form.status': 'الحالة',
        'form.subject': 'المادة',
        'form.yearsExperience': 'سنوات الخبرة',
        'form.courseName': 'اسم المادة',
        'form.courseCode': 'الرمز',
        'form.description': 'الوصف',
        'form.credits': 'النقاط',
        'form.semester': 'الفصل',
        'form.headOfDepartment': 'مسؤول القسم',
        'form.teachersCount': 'عدد الأساتذة',
        'form.studentName': 'الطالب',
        'form.course': 'المادة',
        'form.reason': 'السبب',
        'form.selectStudent': 'اختر طالب',
        'form.selectCourse': 'اختر مادة',
        'form.selectTeacher': 'اختر أستاذ',
        'form.selectRoom': 'اختر قاعة',
        'form.roomName': 'الاسم',
        'form.roomCode': 'الرمز',
        'form.capacity': 'السعة',
        'form.building': 'المبنى',
        'form.floor': 'الطابق',
        'form.equipment': 'التجهيزات',
        
        // Days
        'day.monday': 'الإثنين',
        'day.tuesday': 'الثلاثاء',
        'day.wednesday': 'الأربعاء',
        'day.thursday': 'الخميس',
        'day.friday': 'الجمعة',
        
        // Time Slots
        'time.morning1': '08:00-10:00',
        'time.morning2': '10:00-12:00',
        'time.afternoon1': '14:00-16:00',
        'time.afternoon2': '16:00-18:00',
        
        // Room Types
        'room.lecture': 'محاضرة',
        'room.lab': 'تمرين عملي',
        'room.amphitheater': 'مدرج',
        'room.laboratory': 'مختبر',
        
        // Building Names
        'building.a': 'المبنى أ',
        'building.b': 'المبنى ب',
        'building.c': 'المبنى ج',
        'building.d': 'المبنى د',
        'building.e': 'المبنى ه',
        
        // Alerts
        'alert.success': 'نجاح',
        'alert.error': 'خطأ',
        'alert.warning': 'تحذير',
        'alert.info': 'معلومة',
        'alert.saved': 'تم الحفظ بنجاح',
        'alert.deleted': 'تم الحذف بنجاح',
        'alert.added': 'تم الإضافة بنجاح',
        'alert.updated': 'تم التحديث بنجاح',
        'alert.exported': 'تم التصدير بنجاح',
        
        // Pagination
        'pagination.previous': 'السابق',
        'pagination.next': 'التالي',
        'pagination.page': 'الصفحة',
        'pagination.of': 'من'
    },
    
    en: {
        // Login Page
        'login.title': 'EMSI Moulay Youssef',
        'login.subtitle': 'MyManager Backoffice',
        'login.username': 'Username',
        'login.password': 'Password',
        'login.language': 'Language',
        'login.button': 'Login',
        'login.error': 'Incorrect username or password',
        'login.footer': '© 2024 EMSI Moulay Youssef - All rights reserved',
        
        // Navbar
        'navbar.title': 'EMSI Moulay Youssef',
        'navbar.logout': 'Logout',
        
        // Sidebar
        'sidebar.dashboard': 'Dashboard',
        'sidebar.students': 'Students',
        'sidebar.teachers': 'Teachers',
        'sidebar.courses': 'Courses',
        'sidebar.departments': 'Departments',
        'sidebar.absences': 'Absences',
        'sidebar.schedule': 'Schedule',
        'sidebar.rooms': 'Rooms',
        'sidebar.logout': 'Logout',
        
        // Dashboard
        'dashboard.title': 'Dashboard',
        'dashboard.students': 'Students',
        'dashboard.teachers': 'Teachers',
        'dashboard.courses': 'Courses',
        'dashboard.departments': 'Departments',
        'dashboard.absences': 'Absences',
        'dashboard.rooms': 'Rooms',
        'dashboard.clickToView': 'Click to view list',
        'dashboard.studentsDistribution': 'Students Distribution',
        'dashboard.coursesByDepartment': 'Courses by Department',
        'dashboard.monthlyAbsences': 'Monthly Absences',
        'dashboard.roomsStatus': 'Rooms Status',
        'dashboard.weeklySchedule': 'Weekly Schedule',
        
        // Page Titles
        'page.students': 'Students Management',
        'page.teachers': 'Teachers Management',
        'page.courses': 'Courses Management',
        'page.departments': 'Departments Management',
        'page.absences': 'Absences Management',
        'page.schedule': 'Schedule',
        'page.rooms': 'Rooms Management',
        
        // Table Headers
        'table.id': 'ID',
        'table.name': 'Name',
        'table.email': 'Email',
        'table.department': 'Department',
        'table.status': 'Status',
        'table.actions': 'Actions',
        'table.subject': 'Subject',
        'table.experience': 'Experience',
        'table.code': 'Code',
        'table.credits': 'Credits',
        'table.semester': 'Semester',
        'table.head': 'Head',
        'table.studentsCount': 'Students',
        'table.teachersCount': 'Teachers',
        'table.student': 'Student',
        'table.course': 'Course',
        'table.date': 'Date',
        'table.justified': 'Justified',
        'table.day': 'Day',
        'table.time': 'Time',
        'table.teacher': 'Teacher',
        'table.room': 'Room',
        'table.type': 'Type',
        'table.capacity': 'Capacity',
        'table.building': 'Building',
        'table.floor': 'Floor',
        'table.available': 'Available',
        'table.occupied': 'Occupied',
        
        // Buttons & Filters
        'button.add': 'Add',
        'button.export': 'Export CSV',
        'button.view': 'View',
        'button.edit': 'Edit',
        'button.delete': 'Delete',
        'button.save': 'Save',
        'button.cancel': 'Cancel',
        'button.search': 'Search...',
        'button.filterAll': 'All',
        'button.filterActive': 'Active',
        'button.filterInactive': 'Inactive',
        'button.filterJustified': 'Justified',
        'button.filterUnjustified': 'Unjustified',
        'button.filterAvailable': 'Available',
        'button.filterOccupied': 'Occupied',
        'button.yes': 'Yes',
        'button.no': 'No',
        
        // Filters
        'filter.allDepartments': 'All Departments',
        'filter.allStatus': 'All Status',
        'filter.allSubjects': 'All Subjects',
        'filter.allDays': 'All Days',
        'filter.allTypes': 'All Types',
        'filter.monday': 'Monday',
        'filter.tuesday': 'Tuesday',
        'filter.wednesday': 'Wednesday',
        'filter.thursday': 'Thursday',
        'filter.friday': 'Friday',
        
        // Status
        'status.active': 'Active',
        'status.inactive': 'Inactive',
        'status.available': 'Available',
        'status.occupied': 'Occupied',
        'status.justified': 'Justified',
        'status.unjustified': 'Unjustified',
        
        // Modal
        'modal.confirmation': 'Confirmation',
        'modal.confirmDelete': 'Are you sure you want to delete this item?',
        'modal.addStudent': 'Add Student',
        'modal.editStudent': 'Edit Student',
        'modal.addTeacher': 'Add Teacher',
        'modal.editTeacher': 'Edit Teacher',
        'modal.addCourse': 'Add Course',
        'modal.editCourse': 'Edit Course',
        'modal.addDepartment': 'Add Department',
        'modal.editDepartment': 'Edit Department',
        'modal.addAbsence': 'Add Absence',
        'modal.editAbsence': 'Edit Absence',
        'modal.addSchedule': 'Add Session',
        'modal.editSchedule': 'Edit Session',
        'modal.addRoom': 'Add Room',
        'modal.editRoom': 'Edit Room',
        
        // Form Labels
        'form.firstName': 'First Name',
        'form.lastName': 'Last Name',
        'form.email': 'Email',
        'form.phone': 'Phone',
        'form.address': 'Address',
        'form.enrollmentDate': 'Enrollment Date',
        'form.gpa': 'GPA',
        'form.department': 'Department',
        'form.selectDepartment': 'Select...',
        'form.status': 'Status',
        'form.subject': 'Subject',
        'form.yearsExperience': 'Years Experience',
        'form.courseName': 'Course Name',
        'form.courseCode': 'Code',
        'form.description': 'Description',
        'form.credits': 'Credits',
        'form.semester': 'Semester',
        'form.headOfDepartment': 'Head of Department',
        'form.teachersCount': 'Teachers Count',
        'form.studentName': 'Student',
        'form.course': 'Course',
        'form.reason': 'Reason',
        'form.selectStudent': 'Select a student',
        'form.selectCourse': 'Select a course',
        'form.selectTeacher': 'Select a teacher',
        'form.selectRoom': 'Select a room',
        'form.roomName': 'Name',
        'form.roomCode': 'Code',
        'form.capacity': 'Capacity',
        'form.building': 'Building',
        'form.floor': 'Floor',
        'form.equipment': 'Equipment',
        
        // Days
        'day.monday': 'Monday',
        'day.tuesday': 'Tuesday',
        'day.wednesday': 'Wednesday',
        'day.thursday': 'Thursday',
        'day.friday': 'Friday',
        
        // Time Slots
        'time.morning1': '08:00-10:00',
        'time.morning2': '10:00-12:00',
        'time.afternoon1': '14:00-16:00',
        'time.afternoon2': '16:00-18:00',
        
        // Room Types
        'room.lecture': 'Lecture',
        'room.lab': 'Lab',
        'room.amphitheater': 'Amphitheater',
        'room.laboratory': 'Laboratory',
        
        // Building Names
        'building.a': 'Building A',
        'building.b': 'Building B',
        'building.c': 'Building C',
        'building.d': 'Building D',
        'building.e': 'Building E',
        
        // Alerts
        'alert.success': 'Success',
        'alert.error': 'Error',
        'alert.warning': 'Warning',
        'alert.info': 'Information',
        'alert.saved': 'Saved successfully',
        'alert.deleted': 'Deleted successfully',
        'alert.added': 'Added successfully',
        'alert.updated': 'Updated successfully',
        'alert.exported': 'Exported successfully',
        
        // Pagination
        'pagination.previous': 'Previous',
        'pagination.next': 'Next',
        'pagination.page': 'Page',
        'pagination.of': 'of'
    }
};

class I18n {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'fr';
        this.init();
    }
    
    init() {
        this.updatePageText();
        this.updateLanguageSelector();
    }
    
    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        this.updatePageText();
        this.updateLanguageSelector();
        this.updateDynamicContent();
    }
    
    t(key) {
        return translations[this.currentLanguage][key] || translations['fr'][key] || key;
    }
    
    updatePageText() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });
    }
    
    updateLanguageSelector() {
        const currentLangEl = document.getElementById('currentLang');
        if (currentLangEl) {
            currentLangEl.textContent = this.currentLanguage.toUpperCase();
        }
        
        // Update selected option in dropdown
        const langOptions = document.querySelectorAll('select option, .dropdown-menu a');
        langOptions.forEach(option => {
            const lang = option.getAttribute('data-lang') || option.value;
            if (lang === this.currentLanguage) {
                if (option.tagName === 'OPTION') {
                    option.selected = true;
                } else {
                    option.classList.add('active');
                }
            } else {
                if (option.tagName === 'A') {
                    option.classList.remove('active');
                }
            }
        });
    }
    
    updateDynamicContent() {
        // Update current page if needed
        const currentPage = document.querySelector('.page-content.active');
        if (currentPage && typeof window.showPage === 'function') {
            const pageName = currentPage.id.replace('View', '');
            window.showPage(pageName);
        }
        
        // Update alert messages if any
        const alerts = document.querySelectorAll('.alert');
        if (alerts.length > 0) {
            setTimeout(() => {
                this.updatePageText();
            }, 100);
        }
    }
}

// Initialize i18n
const i18n = new I18n();

// Make i18n available globally
window.i18n = i18n;