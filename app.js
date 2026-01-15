// app.js - Main Application Logic (COMPLETE VERSION) - UPDATED

// ========== Check Authentication ==========
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');
    
    if (!isLoggedIn || !username) {
        window.location.href = 'index.html';
        return false;
    }
    
    return true;
}

// Only check auth if not on login page
if (!window.location.pathname.includes('index.html')) {
    if (!checkAuth()) {
        throw new Error('Not authenticated');
    }
}

// ========== Global Variables ==========
let currentData = {
    students: [],
    teachers: [],
    courses: [],
    departments: [],
    absences: [],
    schedule: [],
    rooms: []
};

let currentPage = {
    students: 1,
    teachers: 1,
    courses: 1,
    absences: 1,
    schedule: 1,
    rooms: 1
};

let charts = {};

// ========== DOM Ready ==========
document.addEventListener('DOMContentLoaded', async function() {
    try {
        await initializeApp();
    } catch (error) {
        console.error('Application initialization error:', error);
        showAlert('Erreur lors du chargement de l\'application. Veuillez rafraîchir la page.', 'danger');
    }
});

// ========== Initialize App ==========
async function initializeApp() {
    console.log('Initializing app...');
    
    // Setup event listeners
    setupNavigationListeners();
    setupLanguageSelector();
    setupLogout();
    setupSidebarToggle();
    
    // Load initial data
    await loadAllData();
    
    // Show dashboard by default
    showPage('dashboard');
    
    // Initialize dashboard
    initializeDashboard();
    
    console.log('App initialized successfully');
}

// ========== Navigation ==========
function setupNavigationListeners() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            
            // Update active state
            sidebarItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Show page
            showPage(page);
        });
    });
    
    // Déconnexion dans la sidebar
    const sidebarLogout = document.getElementById('sidebarLogout');
    if (sidebarLogout) {
        sidebarLogout.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            window.location.href = 'index.html';
        });
    }
}

function showPage(pageName) {
    console.log('Showing page:', pageName);
    
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const pageView = document.getElementById(`${pageName}View`);
    if (pageView) {
        pageView.classList.add('active');
        
        // Load page content
        switch(pageName) {
            case 'dashboard':
                updateDashboardStats();
                createCharts();
                break;
            case 'students':
                renderStudentsPage();
                break;
            case 'teachers':
                renderTeachersPage();
                break;
            case 'courses':
                renderCoursesPage();
                break;
            case 'departments':
                renderDepartmentsPage();
                break;
            case 'absences':
                renderAbsencesPage();
                break;
            case 'schedule':
                renderSchedulePage();
                break;
            case 'rooms':
                renderRoomsPage();
                break;
        }
    }
}

// ========== Language Selector ==========
function setupLanguageSelector() {
    const langLinks = document.querySelectorAll('.dropdown-menu a[data-lang]');
    langLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            i18n.setLanguage(lang);
        });
    });
}

// ========== Logout ==========
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            window.location.href = 'index.html';
        });
    }
}

// ========== Sidebar Toggle ==========
function setupSidebarToggle() {
    const toggleBtn = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (toggleBtn && sidebar && mainContent) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
            
            // For mobile
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle('show');
            }
        });
    }
}

// ========== Load All Data ==========
async function loadAllData() {
    try {
        console.log('Loading all data...');
        showLoading();
        
        // Load all data in parallel
        const [students, teachers, courses, departments, absences, schedule, rooms] = 
            await Promise.all([
                apiService.getStudents(1),
                apiService.getTeachers(2),
                apiService.getCourses(),
                apiService.getDepartments(),
                apiService.getAbsences(),
                apiService.getSchedule(),
                apiService.getRooms()
            ]);
        
        console.log('Data loaded:', {
            students: students.data?.length || 0,
            teachers: teachers.data?.length || 0,
            courses: courses?.length || 0,
            departments: departments?.length || 0,
            absences: absences?.length || 0,
            schedule: schedule?.length || 0,
            rooms: rooms?.length || 0
        });
        
        currentData.students = students.data || [];
        currentData.teachers = teachers.data || [];
        currentData.courses = courses || [];
        currentData.departments = departments || [];
        currentData.absences = absences || [];
        currentData.schedule = schedule || [];
        currentData.rooms = rooms || [];
        
        hideLoading();
        console.log('All data loaded successfully');
    } catch (error) {
        console.error('Error loading data:', error);
        hideLoading();
        showAlert('Erreur de chargement des données. Veuillez rafraîchir la page.', 'danger');
    }
}

// ========== Dashboard Functions ==========
function initializeDashboard() {
    updateDashboardStats();
    createCharts();
}

function updateDashboardStats() {
    console.log('Updating dashboard stats...');
    
    const totalStudentsEl = document.getElementById('totalStudents');
    const totalTeachersEl = document.getElementById('totalTeachers');
    const totalCoursesEl = document.getElementById('totalCourses');
    const totalAbsencesEl = document.getElementById('totalAbsences');
    const availableRoomsEl = document.getElementById('availableRooms');
    const totalDepartmentsEl = document.getElementById('totalDepartments'); // إضافة هذا السطر
    
    if (totalStudentsEl) totalStudentsEl.textContent = currentData.students.length;
    if (totalTeachersEl) totalTeachersEl.textContent = currentData.teachers.length;
    if (totalCoursesEl) totalCoursesEl.textContent = currentData.courses.length;
    if (totalAbsencesEl) totalAbsencesEl.textContent = 
        currentData.absences.filter(a => a.status === 'unjustified').length;
    if (availableRoomsEl) availableRoomsEl.textContent = 
        currentData.rooms.filter(r => r.status === 'available').length;
    if (totalDepartmentsEl) totalDepartmentsEl.textContent = currentData.departments.length; // إضافة هذا السطر
    
    console.log('Departments count:', currentData.departments.length);
}

function createCharts() {
    console.log('Creating charts...');
    
    // Destroy existing charts
    Object.values(charts).forEach(chart => {
        if (chart && typeof chart.destroy === 'function') {
            chart.destroy();
        }
    });
    
    charts = {};
    
    // Create new charts
    createStudentsChart();
    createCoursesChart();
    createAbsencesChart();
    createRoomsChart();
    createScheduleChart();
}

function createStudentsChart() {
    const ctx = document.getElementById('studentsChart');
    if (!ctx) return;
    
    // Group students by department
    const deptCounts = {};
    currentData.students.forEach(student => {
        deptCounts[student.department] = (deptCounts[student.department] || 0) + 1;
    });
    
    charts.students = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(deptCounts),
            datasets: [{
                data: Object.values(deptCounts),
                backgroundColor: [
                    '#28a745', '#17a2b8', '#ffc107', '#dc3545', '#6f42c1',
                    '#e83e8c', '#fd7e14', '#20c997'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function createCoursesChart() {
    const ctx = document.getElementById('coursesChart');
    if (!ctx) return;
    
    // Group courses by department
    const deptCounts = {};
    currentData.courses.forEach(course => {
        deptCounts[course.department] = (deptCounts[course.department] || 0) + 1;
    });
    
    charts.courses = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(deptCounts),
            datasets: [{
                label: 'Nombre de cours',
                data: Object.values(deptCounts),
                backgroundColor: 'rgba(40, 167, 69, 0.8)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createAbsencesChart() {
    const ctx = document.getElementById('absencesChart');
    if (!ctx) return;
    
    // Group absences by month
    const monthCounts = {};
    currentData.absences.forEach(absence => {
        const month = new Date(absence.date).toLocaleString('fr-FR', { month: 'short' });
        monthCounts[month] = (monthCounts[month] || 0) + 1;
    });
    
    charts.absences = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(monthCounts),
            datasets: [{
                label: 'Absences',
                data: Object.values(monthCounts),
                borderColor: '#dc3545',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createRoomsChart() {
    const ctx = document.getElementById('roomsChart');
    if (!ctx) return;
    
    const available = currentData.rooms.filter(r => r.status === 'available').length;
    const occupied = currentData.rooms.filter(r => r.status === 'occupied').length;
    
    charts.rooms = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Disponible', 'Occupée'],
            datasets: [{
                data: [available, occupied],
                backgroundColor: ['#28a745', '#dc3545']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function createScheduleChart() {
    const ctx = document.getElementById('scheduleChart');
    if (!ctx) return;
    
    // Count classes per day
    const dayCounts = {};
    currentData.schedule.forEach(session => {
        dayCounts[session.day] = (dayCounts[session.day] || 0) + 1;
    });
    
    charts.schedule = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(dayCounts),
            datasets: [{
                label: 'Séances programmées',
                data: Object.values(dayCounts),
                backgroundColor: '#6f42c1'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// ========== PAGE RENDERING FUNCTIONS ==========

// ========== Students Page ==========
function renderStudentsPage() {
    const container = document.getElementById('studentsView');
    
    if (!container) return;
    
    const html = `
        <h1>Gestion des Étudiants</h1>
        
        <div class="table-container">
            <div class="table-header">
                <div class="table-filters">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" id="searchStudents" placeholder="Rechercher...">
                    </div>
                    <select id="filterDepartment" class="form-select">
                        <option value="">Tous les départements</option>
                        ${[...new Set(currentData.students.map(s => s.department))].map(dept => 
                            `<option value="${dept}">${dept}</option>`
                        ).join('')}
                    </select>
                    <select id="filterStatus" class="form-select">
                        <option value="">Tous les statuts</option>
                        <option value="active">Actif</option>
                        <option value="inactive">Inactif</option>
                    </select>
                </div>
                <div>
                    <button class="btn btn-success" onclick="addStudent()">
                        <i class="fas fa-plus"></i> Ajouter
                    </button>
                    <button class="btn btn-info" onclick="exportToCSV('students')">
                        <i class="fas fa-file-csv"></i> CSV
                    </button>
                </div>
            </div>
            
            <div class="table-responsive">
                <table id="studentsTable">
                    <thead>
                        <tr>
                            <th onclick="sortTable('students', 'id')">ID <i class="fas fa-sort"></i></th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Département</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="studentsTableBody"></tbody>
                </table>
            </div>
            
            <div class="pagination" id="studentsPagination"></div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // Setup filters
    setupStudentFilters();
    
    // Render table
    renderStudentsTable(currentData.students);
}

function setupStudentFilters() {
    const searchInput = document.getElementById('searchStudents');
    const deptFilter = document.getElementById('filterDepartment');
    const statusFilter = document.getElementById('filterStatus');
    
    if (!searchInput || !deptFilter || !statusFilter) return;
    
    const applyFilters = () => {
        let filtered = currentData.students;
        
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(s => 
                s.firstName.toLowerCase().includes(searchTerm) ||
                s.lastName.toLowerCase().includes(searchTerm) ||
                s.email.toLowerCase().includes(searchTerm)
            );
        }
        
        const dept = deptFilter.value;
        if (dept) {
            filtered = filtered.filter(s => s.department === dept);
        }
        
        const status = statusFilter.value;
        if (status) {
            filtered = filtered.filter(s => s.status === status);
        }
        
        renderStudentsTable(filtered);
    };
    
    searchInput.addEventListener('input', applyFilters);
    deptFilter.addEventListener('change', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
}

function renderStudentsTable(students, page = 1, perPage = 10) {
    const tbody = document.getElementById('studentsTableBody');
    if (!tbody) return;
    
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedStudents = students.slice(start, end);
    
    tbody.innerHTML = paginatedStudents.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${student.avatar}" alt="${student.firstName}" 
                         style="width: 40px; height: 40px; border-radius: 50%;">
                    <span>${student.firstName} ${student.lastName}</span>
                </div>
            </td>
            <td>${student.email}</td>
            <td>${student.department}</td>
            <td>
                <span class="badge badge-${student.status === 'active' ? 'success' : 'danger'}">
                    ${student.status === 'active' ? 'Actif' : 'Inactif'}
                </span>
            </td>
            <td class="table-actions">
                <button class="btn btn-info btn-sm" onclick="viewStudent(${student.id})" 
                        title="Voir détails">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-warning btn-sm" onclick="editStudent(${student.id})"
                        title="Modifier">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})"
                        title="Supprimer">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    renderPagination('students', students.length, page, perPage);
}

// ========== Teachers Page ==========
function renderTeachersPage() {
    const container = document.getElementById('teachersView');
    
    if (!container) return;
    
    const html = `
        <h1>Gestion des Professeurs</h1>
        
        <div class="table-container">
            <div class="table-header">
                <div class="table-filters">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" id="searchTeachers" placeholder="Rechercher...">
                    </div>
                    <select id="filterSubject" class="form-select">
                        <option value="">Toutes les matières</option>
                        ${[...new Set(currentData.teachers.map(t => t.subject))].map(subj => 
                            `<option value="${subj}">${subj}</option>`
                        ).join('')}
                    </select>
                </div>
                <div>
                    <button class="btn btn-success" onclick="addTeacher()">
                        <i class="fas fa-plus"></i> Ajouter
                    </button>
                    <button class="btn btn-info" onclick="exportToCSV('teachers')">
                        <i class="fas fa-file-csv"></i> CSV
                    </button>
                </div>
            </div>
            
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th onclick="sortTable('teachers', 'id')">ID <i class="fas fa-sort"></i></th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Matière</th>
                            <th>Expérience</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="teachersTableBody"></tbody>
                </table>
            </div>
            
            <div class="pagination" id="teachersPagination"></div>
        </div>
    `;
    
    container.innerHTML = html;
    setupTeacherFilters();
    renderTeachersTable(currentData.teachers);
}

function setupTeacherFilters() {
    const searchInput = document.getElementById('searchTeachers');
    const subjectFilter = document.getElementById('filterSubject');
    
    if (!searchInput || !subjectFilter) return;
    
    const applyFilters = () => {
        let filtered = currentData.teachers;
        
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(t => 
                t.firstName.toLowerCase().includes(searchTerm) ||
                t.lastName.toLowerCase().includes(searchTerm) ||
                t.email.toLowerCase().includes(searchTerm)
            );
        }
        
        const subject = subjectFilter.value;
        if (subject) {
            filtered = filtered.filter(t => t.subject === subject);
        }
        
        renderTeachersTable(filtered);
    };
    
    searchInput.addEventListener('input', applyFilters);
    subjectFilter.addEventListener('change', applyFilters);
}

function renderTeachersTable(teachers, page = 1, perPage = 10) {
    const tbody = document.getElementById('teachersTableBody');
    if (!tbody) return;
    
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedTeachers = teachers.slice(start, end);
    
    tbody.innerHTML = paginatedTeachers.map(teacher => `
        <tr>
            <td>${teacher.id}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${teacher.avatar}" alt="${teacher.firstName}" 
                         style="width: 40px; height: 40px; border-radius: 50%;">
                    <span>${teacher.firstName} ${teacher.lastName}</span>
                </div>
            </td>
            <td>${teacher.email}</td>
            <td>${teacher.subject}</td>
            <td>${teacher.yearsExperience} ans</td>
            <td class="table-actions">
                <button class="btn btn-info btn-sm" onclick="viewTeacher(${teacher.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-warning btn-sm" onclick="editTeacher(${teacher.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteTeacher(${teacher.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    renderPagination('teachers', teachers.length, page, perPage);
}

// ========== Courses Page ==========
function renderCoursesPage() {
    const container = document.getElementById('coursesView');
    
    if (!container) return;
    
    const html = `
        <h1>Gestion des Cours</h1>
        
        <div class="table-container">
            <div class="table-header">
                <div class="table-filters">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" id="searchCourses" placeholder="Rechercher...">
                    </div>
                </div>
                <div>
                    <button class="btn btn-success" onclick="addCourse()">
                        <i class="fas fa-plus"></i> Ajouter
                    </button>
                    <button class="btn btn-info" onclick="exportToCSV('courses')">
                        <i class="fas fa-file-csv"></i> CSV
                    </button>
                </div>
            </div>
            
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Nom</th>
                            <th>Département</th>
                            <th>Crédits</th>
                            <th>Semestre</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="coursesTableBody"></tbody>
                </table>
            </div>
            
            <div class="pagination" id="coursesPagination"></div>
        </div>
    `;
    
    container.innerHTML = html;
    setupCourseFilters();
    renderCoursesTable(currentData.courses);
}

function setupCourseFilters() {
    const searchInput = document.getElementById('searchCourses');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filtered = currentData.courses.filter(c => 
            c.name.toLowerCase().includes(searchTerm) ||
            c.code.toLowerCase().includes(searchTerm)
        );
        renderCoursesTable(filtered);
    });
}

function renderCoursesTable(courses, page = 1, perPage = 10) {
    const tbody = document.getElementById('coursesTableBody');
    if (!tbody) return;
    
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedCourses = courses.slice(start, end);
    
    tbody.innerHTML = paginatedCourses.map(course => `
        <tr>
            <td><strong>${course.code}</strong></td>
            <td>${course.name}</td>
            <td>${course.department}</td>
            <td>${course.credits}</td>
            <td>S${course.semester}</td>
            <td class="table-actions">
                <button class="btn btn-info btn-sm" onclick="viewCourse(${course.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-warning btn-sm" onclick="editCourse(${course.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteCourse(${course.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    renderPagination('courses', courses.length, page, perPage);
}

// ========== Departments Page ==========
function renderDepartmentsPage() {
    const container = document.getElementById('departmentsView');
    
    if (!container) return;
    
    const html = `
        <h1>Gestion des Départements</h1>
        
        <div class="table-container">
            <div class="table-header">
                <button class="btn btn-success" onclick="addDepartment()">
                    <i class="fas fa-plus"></i> Ajouter
                </button>
            </div>
            
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Nom</th>
                            <th>Responsable</th>
                            <th>Étudiants</th>
                            <th>Professeurs</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="departmentsTableBody"></tbody>
                </table>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    renderDepartmentsTable(currentData.departments);
}

function renderDepartmentsTable(departments) {
    const tbody = document.getElementById('departmentsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = departments.map(dept => `
        <tr>
            <td><strong>${dept.code}</strong></td>
            <td>${dept.name}</td>
            <td>${dept.headOfDepartment}</td>
            <td><span class="badge badge-info">${dept.studentsCount}</span></td>
            <td><span class="badge badge-success">${dept.teachersCount}</span></td>
            <td class="table-actions">
                <button class="btn btn-info btn-sm" onclick="viewDepartment(${dept.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-warning btn-sm" onclick="editDepartment(${dept.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteDepartment(${dept.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// ========== Absences Page ==========
function renderAbsencesPage() {
    const container = document.getElementById('absencesView');
    
    if (!container) return;
    
    const html = `
        <h1>Gestion des Absences</h1>
        
        <div class="table-container">
            <div class="table-header">
                <div class="table-filters">
                    <select id="filterAbsenceStatus" class="form-select">
                        <option value="">Tous</option>
                        <option value="justified">Justifiées</option>
                        <option value="unjustified">Non justifiées</option>
                    </select>
                </div>
                <button class="btn btn-success" onclick="addAbsence()">
                    <i class="fas fa-plus"></i> Ajouter
                </button>
            </div>
            
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Étudiant</th>
                            <th>Cours</th>
                            <th>Date</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="absencesTableBody"></tbody>
                </table>
            </div>
            
            <div class="pagination" id="absencesPagination"></div>
        </div>
    `;
    
    container.innerHTML = html;
    setupAbsenceFilters();
    renderAbsencesTable(currentData.absences);
}

function setupAbsenceFilters() {
    const statusFilter = document.getElementById('filterAbsenceStatus');
    
    if (!statusFilter) return;
    
    statusFilter.addEventListener('change', () => {
        const status = statusFilter.value;
        const filtered = status ? 
            currentData.absences.filter(a => a.status === status) : 
            currentData.absences;
        renderAbsencesTable(filtered);
    });
}

function renderAbsencesTable(absences, page = 1, perPage = 10) {
    const tbody = document.getElementById('absencesTableBody');
    if (!tbody) return;
    
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedAbsences = absences.slice(start, end);
    
    tbody.innerHTML = paginatedAbsences.map(absence => `
        <tr>
            <td>${absence.studentName}</td>
            <td>${absence.courseName}</td>
            <td>${new Date(absence.date).toLocaleDateString('fr-FR')}</td>
            <td>
                <span class="badge badge-${absence.justified ? 'success' : 'danger'}">
                    ${absence.justified ? 'Justifiée' : 'Non justifiée'}
                </span>
            </td>
            <td class="table-actions">
                <button class="btn btn-warning btn-sm" onclick="editAbsence(${absence.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteAbsence(${absence.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    renderPagination('absences', absences.length, page, perPage);
}

// ========== SCHEDULE PAGE ==========
function renderSchedulePage() {
    const container = document.getElementById('scheduleView');
    
    if (!container) return;
    
    const html = `
        <h1>Emploi du temps</h1>
        
        <div class="table-container">
            <div class="table-header">
                <div class="table-filters">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" id="searchSchedule" placeholder="Rechercher...">
                    </div>
                    <select id="filterDay" class="form-select">
                        <option value="">Tous les jours</option>
                        <option value="Lundi">Lundi</option>
                        <option value="Mardi">Mardi</option>
                        <option value="Mercredi">Mercredi</option>
                        <option value="Jeudi">Jeudi</option>
                        <option value="Vendredi">Vendredi</option>
                    </select>
                </div>
                <div>
                    <button class="btn btn-success" onclick="addSchedule()">
                        <i class="fas fa-plus"></i> Ajouter
                    </button>
                    <button class="btn btn-info" onclick="exportToCSV('schedule')">
                        <i class="fas fa-file-csv"></i> CSV
                    </button>
                </div>
            </div>
            
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Jour</th>
                            <th>Heure</th>
                            <th>Cours</th>
                            <th>Professeur</th>
                            <th>Salle</th>
                            <th>Département</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="scheduleTableBody"></tbody>
                </table>
            </div>
            
            <div class="pagination" id="schedulePagination"></div>
        </div>
    `;
    
    container.innerHTML = html;
    setupScheduleFilters();
    renderScheduleTable(currentData.schedule);
}

function setupScheduleFilters() {
    const searchInput = document.getElementById('searchSchedule');
    const dayFilter = document.getElementById('filterDay');
    
    if (!searchInput || !dayFilter) return;
    
    const applyFilters = () => {
        let filtered = currentData.schedule;
        
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(s => 
                s.courseName.toLowerCase().includes(searchTerm) ||
                s.teacherName.toLowerCase().includes(searchTerm)
            );
        }
        
        const day = dayFilter.value;
        if (day) {
            filtered = filtered.filter(s => s.day === day);
        }
        
        renderScheduleTable(filtered);
    };
    
    searchInput.addEventListener('input', applyFilters);
    dayFilter.addEventListener('change', applyFilters);
}

function renderScheduleTable(schedule, page = 1, perPage = 10) {
    const tbody = document.getElementById('scheduleTableBody');
    if (!tbody) return;
    
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedSchedule = schedule.slice(start, end);
    
    tbody.innerHTML = paginatedSchedule.map(session => `
        <tr>
            <td><strong>${session.day}</strong></td>
            <td><span class="badge badge-info">${session.time}</span></td>
            <td>${session.courseName}</td>
            <td>${session.teacherName}</td>
            <td><i class="fas fa-door-open"></i> ${session.roomName}</td>
            <td>${session.department}</td>
            <td class="table-actions">
                <button class="btn btn-info btn-sm" onclick="viewSchedule(${session.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-warning btn-sm" onclick="editSchedule(${session.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteSchedule(${session.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    renderPagination('schedule', schedule.length, page, perPage);
}

// ========== Rooms Page ==========
function renderRoomsPage() {
    const container = document.getElementById('roomsView');
    
    if (!container) return;
    
    const html = `
        <h1>Gestion des Salles</h1>
        
        <div class="table-container">
            <div class="table-header">
                <div class="table-filters">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" id="searchRooms" placeholder="Rechercher...">
                    </div>
                    <select id="filterRoomStatus" class="form-select">
                        <option value="">Tous les statuts</option>
                        <option value="available">Disponible</option>
                        <option value="occupied">Occupée</option>
                    </select>
                    <select id="filterRoomType" class="form-select">
                        <option value="">Tous les types</option>
                        <option value="Cours">Cours</option>
                        <option value="TP">TP</option>
                        <option value="Amphithéâtre">Amphithéâtre</option>
                        <option value="Laboratoire">Laboratoire</option>
                    </select>
                </div>
                <div>
                    <button class="btn btn-success" onclick="addRoom()">
                        <i class="fas fa-plus"></i> Ajouter
                    </button>
                    <button class="btn btn-info" onclick="exportToCSV('rooms')">
                        <i class="fas fa-file-csv"></i> CSV
                    </button>
                </div>
            </div>
            
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th onclick="sortTable('rooms', 'name')">Nom <i class="fas fa-sort"></i></th>
                            <th>Code</th>
                            <th>Type</th>
                            <th onclick="sortTable('rooms', 'capacity')">Capacité <i class="fas fa-sort"></i></th>
                            <th>Bâtiment</th>
                            <th>Étage</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="roomsTableBody"></tbody>
                </table>
            </div>
            
            <div class="pagination" id="roomsPagination"></div>
        </div>
    `;
    
    container.innerHTML = html;
    setupRoomFilters();
    renderRoomsTable(currentData.rooms);
}

function setupRoomFilters() {
    const searchInput = document.getElementById('searchRooms');
    const statusFilter = document.getElementById('filterRoomStatus');
    const typeFilter = document.getElementById('filterRoomType');
    
    if (!searchInput || !statusFilter || !typeFilter) return;
    
    const applyFilters = () => {
        let filtered = currentData.rooms;
        
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(r => 
                r.name.toLowerCase().includes(searchTerm) ||
                r.code.toLowerCase().includes(searchTerm)
            );
        }
        
        const status = statusFilter.value;
        if (status) {
            filtered = filtered.filter(r => r.status === status);
        }
        
        const type = typeFilter.value;
        if (type) {
            filtered = filtered.filter(r => r.type === type);
        }
        
        renderRoomsTable(filtered);
    };
    
    searchInput.addEventListener('input', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
    typeFilter.addEventListener('change', applyFilters);
}

function renderRoomsTable(rooms, page = 1, perPage = 15) {
    const tbody = document.getElementById('roomsTableBody');
    if (!tbody) return;
    
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedRooms = rooms.slice(start, end);
    
    tbody.innerHTML = paginatedRooms.map(room => `
        <tr>
            <td><strong><i class="fas fa-door-open"></i> ${room.name}</strong></td>
            <td>${room.code}</td>
            <td><span class="badge badge-info">${room.type}</span></td>
            <td>${room.capacity} places</td>
            <td>${room.building}</td>
            <td>Étage ${room.floor}</td>
            <td>
                <span class="badge badge-${room.status === 'available' ? 'success' : 'danger'}">
                    ${room.status === 'available' ? 'Disponible' : 'Occupée'}
                </span>
            </td>
            <td class="table-actions">
                <button class="btn btn-info btn-sm" onclick="viewRoom(${room.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-warning btn-sm" onclick="editRoom(${room.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteRoom(${room.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    renderPagination('rooms', rooms.length, page, perPage);
}

// ========== Pagination ==========
function renderPagination(entity, total, currentPageNum = 1, perPage = 10) {
    const totalPages = Math.ceil(total / perPage);
    const paginationDiv = document.getElementById(`${entity}Pagination`);
    
    if (!paginationDiv || totalPages <= 1) return;
    
    paginationDiv.innerHTML = `
        <button ${currentPageNum === 1 ? 'disabled' : ''} 
                onclick="changePage('${entity}', ${currentPageNum - 1})">
            <i class="fas fa-chevron-left"></i> Précédent
        </button>
        <span>Page ${currentPageNum} sur ${totalPages}</span>
        <button ${currentPageNum === totalPages ? 'disabled' : ''} 
                onclick="changePage('${entity}', ${currentPageNum + 1})">
            Suivant <i class="fas fa-chevron-right"></i>
        </button>
    `;
}

function changePage(entity, page) {
    if (page < 1) return;
    
    const perPage = entity === 'schedule' || entity === 'rooms' ? 15 : 10;
    const total = currentData[entity].length;
    const totalPages = Math.ceil(total / perPage);
    
    if (page > totalPages) return;
    
    currentPage[entity] = page;
    
    switch(entity) {
        case 'students':
            renderStudentsTable(currentData.students, page, perPage);
            break;
        case 'teachers':
            renderTeachersTable(currentData.teachers, page, perPage);
            break;
        case 'courses':
            renderCoursesTable(currentData.courses, page, perPage);
            break;
        case 'absences':
            renderAbsencesTable(currentData.absences, page, perPage);
            break;
        case 'schedule':
            renderScheduleTable(currentData.schedule, page, perPage);
            break;
        case 'rooms':
            renderRoomsTable(currentData.rooms, page, perPage);
            break;
    }
}

// ========== Sorting ==========
let sortOrder = {};

function sortTable(entity, field) {
    sortOrder[entity] = sortOrder[entity] === 'asc' ? 'desc' : 'asc';
    
    const sorted = [...currentData[entity]].sort((a, b) => {
        let aVal = a[field];
        let bVal = b[field];
        
        if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        
        if (sortOrder[entity] === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });
    
    switch(entity) {
        case 'students':
            renderStudentsTable(sorted, currentPage.students);
            break;
        case 'teachers':
            renderTeachersTable(sorted, currentPage.teachers);
            break;
        case 'courses':
            renderCoursesTable(sorted, currentPage.courses);
            break;
        case 'rooms':
            renderRoomsTable(sorted, currentPage.rooms);
            break;
    }
}

// ========== Export CSV ==========
function exportToCSV(entity) {
    const data = currentData[entity];
    if (!data || data.length === 0) {
        showAlert('Aucune donnée à exporter', 'warning');
        return;
    }
    
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => 
            headers.map(header => {
                const value = row[header];
                return typeof value === 'string' && value.includes(',') 
                    ? `"${value}"` 
                    : value;
            }).join(',')
        )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${entity}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    showAlert('Export CSV réussi!', 'success');
}

// ========== CRUD Operations ==========
function addStudent() { 
    if (typeof window.addStudent === 'function') {
        window.addStudent(); 
    } else {
        showAlert('Fonction addStudent non disponible', 'warning');
    }
}
function editStudent(id) { 
    if (typeof window.editStudent === 'function') {
        window.editStudent(id); 
    } else {
        showAlert('Fonction editStudent non disponible', 'warning');
    }
}
function viewStudent(id) { 
    if (typeof window.viewStudent === 'function') {
        window.viewStudent(id); 
    } else {
        showAlert('Fonction viewStudent non disponible', 'warning');
    }
}
function deleteStudent(id) { 
    if (typeof window.deleteStudent === 'function') {
        window.deleteStudent(id); 
    } else {
        showAlert('Fonction deleteStudent non disponible', 'warning');
    }
}

function addTeacher() { 
    if (typeof window.addTeacher === 'function') {
        window.addTeacher(); 
    } else {
        showAlert('Fonction addTeacher non disponible', 'warning');
    }
}
function editTeacher(id) { 
    if (typeof window.editTeacher === 'function') {
        window.editTeacher(id); 
    } else {
        showAlert('Fonction editTeacher non disponible', 'warning');
    }
}
function viewTeacher(id) { 
    if (typeof window.viewTeacher === 'function') {
        window.viewTeacher(id); 
    } else {
        showAlert('Fonction viewTeacher non disponible', 'warning');
    }
}
function deleteTeacher(id) { 
    if (typeof window.deleteTeacher === 'function') {
        window.deleteTeacher(id); 
    } else {
        showAlert('Fonction deleteTeacher non disponible', 'warning');
    }
}

function addCourse() { 
    if (typeof window.addCourse === 'function') {
        window.addCourse(); 
    } else {
        showAlert('Fonction addCourse non disponible', 'warning');
    }
}
function editCourse(id) { 
    if (typeof window.editCourse === 'function') {
        window.editCourse(id); 
    } else {
        showAlert('Fonction editCourse non disponible', 'warning');
    }
}
function viewCourse(id) { 
    if (typeof window.viewCourse === 'function') {
        window.viewCourse(id); 
    } else {
        showAlert('Fonction viewCourse non disponible', 'warning');
    }
}
function deleteCourse(id) { 
    if (typeof window.deleteCourse === 'function') {
        window.deleteCourse(id); 
    } else {
        showAlert('Fonction deleteCourse non disponible', 'warning');
    }
}

function addDepartment() { 
    if (typeof window.addDepartment === 'function') {
        window.addDepartment(); 
    } else {
        showAlert('Fonction addDepartment non disponible', 'warning');
    }
}
function editDepartment(id) { 
    if (typeof window.editDepartment === 'function') {
        window.editDepartment(id); 
    } else {
        showAlert('Fonction editDepartment non disponible', 'warning');
    }
}
function viewDepartment(id) { 
    if (typeof window.viewDepartment === 'function') {
        window.viewDepartment(id); 
    } else {
        showAlert('Fonction viewDepartment non disponible', 'warning');
    }
}
function deleteDepartment(id) { 
    if (typeof window.deleteDepartment === 'function') {
        window.deleteDepartment(id); 
    } else {
        showAlert('Fonction deleteDepartment non disponible', 'warning');
    }
}

function addAbsence() { 
    if (typeof window.addAbsence === 'function') {
        window.addAbsence(); 
    } else {
        showAlert('Fonction addAbsence non disponible', 'warning');
    }
}
function editAbsence(id) { 
    if (typeof window.editAbsence === 'function') {
        window.editAbsence(id); 
    } else {
        showAlert('Fonction editAbsence non disponible', 'warning');
    }
}
function deleteAbsence(id) { 
    if (typeof window.deleteAbsence === 'function') {
        window.deleteAbsence(id); 
    } else {
        showAlert('Fonction deleteAbsence non disponible', 'warning');
    }
}

function addSchedule() { 
    if (typeof window.addSchedule === 'function') {
        window.addSchedule(); 
    } else {
        showAlert('Fonction addSchedule non disponible', 'warning');
    }
}
function editSchedule(id) { 
    if (typeof window.editSchedule === 'function') {
        window.editSchedule(id); 
    } else {
        showAlert('Fonction editSchedule non disponible', 'warning');
    }
}
function viewSchedule(id) { 
    if (typeof window.viewSchedule === 'function') {
        window.viewSchedule(id); 
    } else {
        showAlert('Fonction viewSchedule non disponible', 'warning');
    }
}
function deleteSchedule(id) { 
    if (typeof window.deleteSchedule === 'function') {
        window.deleteSchedule(id); 
    } else {
        showAlert('Fonction deleteSchedule non disponible', 'warning');
    }
}

function addRoom() { 
    if (typeof window.addRoom === 'function') {
        window.addRoom(); 
    } else {
        showAlert('Fonction addRoom non disponible', 'warning');
    }
}
function editRoom(id) { 
    if (typeof window.editRoom === 'function') {
        window.editRoom(id); 
    } else {
        showAlert('Fonction editRoom non disponible', 'warning');
    }
}
function viewRoom(id) { 
    if (typeof window.viewRoom === 'function') {
        window.viewRoom(id); 
    } else {
        showAlert('Fonction viewRoom non disponible', 'warning');
    }
}
function deleteRoom(id) { 
    if (typeof window.deleteRoom === 'function') {
        window.deleteRoom(id); 
    } else {
        showAlert('Fonction deleteRoom non disponible', 'warning');
    }
}

// ========== Confirm Delete ==========
function confirmDelete(entity, id) {
    switch(entity) {
        case 'student': 
            if (typeof window.deleteStudent === 'function') {
                window.deleteStudent(id); 
            }
            break;
        case 'teacher': 
            if (typeof window.deleteTeacher === 'function') {
                window.deleteTeacher(id); 
            }
            break;
        case 'course': 
            if (typeof window.deleteCourse === 'function') {
                window.deleteCourse(id); 
            }
            break;
        case 'department': 
            if (typeof window.deleteDepartment === 'function') {
                window.deleteDepartment(id); 
            }
            break;
        case 'absence': 
            if (typeof window.deleteAbsence === 'function') {
                window.deleteAbsence(id); 
            }
            break;
        case 'schedule': 
            if (typeof window.deleteSchedule === 'function') {
                window.deleteSchedule(id); 
            }
            break;
        case 'room': 
            if (typeof window.deleteRoom === 'function') {
                window.deleteRoom(id); 
            }
            break;
        default:
            showAlert('Type d\'élément non reconnu', 'danger');
    }
}

// ========== Utility Functions ==========
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '90px';
    alertDiv.style.right = '25px';
    alertDiv.style.zIndex = '9999';
    
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    document.body.appendChild(alertDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

function showLoading() {
    const existingLoading = document.getElementById('loadingOverlay');
    if (existingLoading) existingLoading.remove();
    
    const loading = document.createElement('div');
    loading.id = 'loadingOverlay';
    loading.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    loading.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:9999';
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.getElementById('loadingOverlay');
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => loading.remove(), 300);
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.classList.remove('active');
}

// Make these functions available globally
window.showAlert = showAlert;
window.closeModal = closeModal;
window.changePage = changePage;
window.sortTable = sortTable;
window.exportToCSV = exportToCSV;

// Modal close on click outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Modal close button
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
});

console.log('app.js loaded successfully');
// ========== Internationalization Support ==========

// Update dynamic content when language changes
document.addEventListener('languageChanged', function() {
    console.log('Language changed, updating content...');
    
    // Update sidebar
    const sidebarItems = document.querySelectorAll('.sidebar-item span');
    sidebarItems.forEach(item => {
        const page = item.closest('.sidebar-item').getAttribute('data-page');
        if (page) {
            const key = `sidebar.${page}`;
            item.textContent = i18n.t(key);
        }
    });
    
    // Update current page
    const activePage = document.querySelector('.page-content.active');
    if (activePage) {
        const pageId = activePage.id.replace('View', '');
        if (pageId === 'dashboard') {
            // Update dashboard stats labels
            updateDashboardTexts();
        } else {
            // Re-render current page
            showPage(pageId);
        }
    }
    
    // Update navbar
    const navbarTitle = document.querySelector('.navbar-title');
    if (navbarTitle) navbarTitle.textContent = i18n.t('navbar.title');
    
    const logoutBtn = document.querySelector('#logoutBtn span');
    if (logoutBtn) logoutBtn.textContent = i18n.t('navbar.logout');
    
    const sidebarLogout = document.querySelector('#sidebarLogout span');
    if (sidebarLogout) sidebarLogout.textContent = i18n.t('sidebar.logout');
});

function updateDashboardTexts() {
    // Update dashboard title
    const dashboardTitle = document.querySelector('#dashboardView h1');
    if (dashboardTitle) dashboardTitle.textContent = i18n.t('dashboard.title');
    
    // Update stat card labels
    const statCards = document.querySelectorAll('.stat-info p');
    statCards.forEach((card, index) => {
        const labels = [
            'dashboard.students',
            'dashboard.teachers', 
            'dashboard.courses',
            'dashboard.departments',
            'dashboard.absences',
            'dashboard.rooms'
        ];
        if (labels[index]) {
            card.textContent = i18n.t(labels[index]);
        }
    });
    
    // Update chart titles
    const chartTitles = document.querySelectorAll('.chart-card h3');
    chartTitles.forEach((title, index) => {
        const keys = [
            'dashboard.studentsDistribution',
            'dashboard.coursesByDepartment',
            'dashboard.monthlyAbsences',
            'dashboard.roomsStatus',
            'dashboard.weeklySchedule'
        ];
        if (keys[index]) {
            title.textContent = i18n.t(keys[index]);
        }
    });
    
    // Update hint texts
    const hints = document.querySelectorAll('.stat-hint');
    hints.forEach(hint => {
        hint.textContent = i18n.t('dashboard.clickToView');
    });
}

// Listen for custom language change event
window.addEventListener('languageChanged', function() {
    console.log('Language changed event received');
    updatePageTexts();
});

// Helper function to update all page texts
function updatePageTexts() {
    console.log('Updating page texts for language:', i18n.currentLanguage);
    
    // Update page title
    const activePage = document.querySelector('.page-content.active');
    if (activePage) {
        const pageId = activePage.id.replace('View', '');
        const pageTitle = activePage.querySelector('h1');
        if (pageTitle && pageId !== 'dashboard') {
            pageTitle.textContent = i18n.t(`page.${pageId}`);
        }
    }
    
    // Update table headers
    updateTableHeaders();
}

function updateTableHeaders() {
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        const headers = table.querySelectorAll('thead th');
        headers.forEach(header => {
            const text = header.textContent.trim();
            const key = Object.keys(translations[i18n.currentLanguage]).find(k => 
                translations[i18n.currentLanguage][k] === text
            );
            if (key) {
                header.innerHTML = header.innerHTML.replace(text, i18n.t(key));
            }
        });
    });
}

// Extend showPage function to support i18n
const originalShowPage = window.showPage;
window.showPage = function(pageName) {
    originalShowPage(pageName);
    
    // Update page title with i18n
    setTimeout(() => {
        const pageTitle = document.querySelector(`#${pageName}View h1`);
        if (pageTitle) {
            const translationKey = `page.${pageName}`;
            pageTitle.textContent = i18n.t(translationKey);
        }
        
        // Update buttons and filters
        updatePageControls();
    }, 100);
};

function updatePageControls() {
    // Update button texts
    const buttons = document.querySelectorAll('.btn:not(.btn-icon)');
    buttons.forEach(button => {
        const text = button.textContent.trim();
        const icon = button.querySelector('i');
        const buttonText = icon ? text.replace(icon.outerHTML, '').trim() : text;
        
        const key = Object.keys(translations[i18n.currentLanguage]).find(k => 
            translations[i18n.currentLanguage][k] === buttonText
        );
        
        if (key) {
            if (icon) {
                button.innerHTML = icon.outerHTML + ' ' + i18n.t(key);
            } else {
                button.textContent = i18n.t(key);
            }
        }
    });
    
    // Update select options
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        Array.from(select.options).forEach(option => {
            const text = option.textContent.trim();
            const key = Object.keys(translations[i18n.currentLanguage]).find(k => 
                translations[i18n.currentLanguage][k] === text
            );
            if (key) {
                option.textContent = i18n.t(key);
            }
        });
    });
    
    // Update search placeholders
    const searchInputs = document.querySelectorAll('input[type="text"]');
    searchInputs.forEach(input => {
        if (input.placeholder) {
            const key = Object.keys(translations[i18n.currentLanguage]).find(k => 
                translations[i18n.currentLanguage][k] === input.placeholder
            );
            if (key) {
                input.placeholder = i18n.t(key);
            }
        }
    });
}

// Initialize language on load
document.addEventListener('DOMContentLoaded', function() {
    // Set initial language
    i18n.setLanguage(i18n.currentLanguage);
    
    // Update all texts after a short delay
    setTimeout(() => {
        updatePageTexts();
        updatePageControls();
    }, 500);
});