// ========== INTERNATIONALIZATION FOR MODALS ==========

function updateModalTranslations() {
    // Update modal buttons
    const modalButtons = document.querySelectorAll('.modal-actions .btn');
    modalButtons.forEach(button => {
        const text = button.textContent.trim();
        const key = Object.keys(i18n.translations[i18n.currentLanguage]).find(k => 
            i18n.translations[i18n.currentLanguage][k] === text
        );
        if (key) {
            button.innerHTML = button.innerHTML.replace(text, i18n.t(key));
        }
    });
    
    // Update form labels
    const labels = document.querySelectorAll('#modalBody label');
    labels.forEach(label => {
        const text = label.textContent.trim();
        const key = Object.keys(i18n.translations[i18n.currentLanguage]).find(k => 
            i18n.translations[i18n.currentLanguage][k] === text
        );
        if (key) {
            label.textContent = i18n.t(key);
        }
    });
    
    // Update select options
    const selects = document.querySelectorAll('#modalBody select');
    selects.forEach(select => {
        Array.from(select.options).forEach(option => {
            const text = option.textContent.trim();
            const key = Object.keys(i18n.translations[i18n.currentLanguage]).find(k => 
                i18n.translations[i18n.currentLanguage][k] === text
            );
            if (key) {
                option.textContent = i18n.t(key);
            }
        });
    });
}

// Listen for language changes
document.addEventListener('languageChanged', function() {
    console.log('Updating modal translations');
    updateModalTranslations();
});
// fonction.js - Complete CRUD Operations for All Entities

// ========== GLOBAL FUNCTIONS DECLARATION ==========
window.addStudent = addStudent;
window.editStudent = editStudent;
window.viewStudent = viewStudent;
window.deleteStudent = deleteStudent;

window.addTeacher = addTeacher;
window.editTeacher = editTeacher;
window.viewTeacher = viewTeacher;
window.deleteTeacher = deleteTeacher;

window.addCourse = addCourse;
window.editCourse = editCourse;
window.viewCourse = viewCourse;
window.deleteCourse = deleteCourse;

window.addDepartment = addDepartment;
window.editDepartment = editDepartment;
window.viewDepartment = viewDepartment;
window.deleteDepartment = deleteDepartment;

window.addAbsence = addAbsence;
window.editAbsence = editAbsence;
window.deleteAbsence = deleteAbsence;

window.addSchedule = addSchedule;
window.editSchedule = editSchedule;
window.viewSchedule = viewSchedule;
window.deleteSchedule = deleteSchedule;

window.addRoom = addRoom;
window.editRoom = editRoom;
window.viewRoom = viewRoom;
window.deleteRoom = deleteRoom;

// ========== STUDENTS CRUD ==========

function addStudent() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-user-plus"></i> Ajouter un Étudiant</h2>
        <form id="studentForm" class="form">
            <div class="form-row">
                <div class="form-group">
                    <label for="studentFirstName">Prénom *</label>
                    <input type="text" id="studentFirstName" required>
                </div>
                <div class="form-group">
                    <label for="studentLastName">Nom de famille *</label>
                    <input type="text" id="studentLastName" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="studentEmail">Email *</label>
                    <input type="email" id="studentEmail" required>
                </div>
                <div class="form-group">
                    <label for="studentDepartment">Département *</label>
                    <select id="studentDepartment" required>
                        <option value="">Sélectionner...</option>
                        ${[...new Set(currentData.students.map(s => s.department))].map(dept => 
                            `<option value="${dept}">${dept}</option>`
                        ).join('')}
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="studentStatus">Statut *</label>
                    <select id="studentStatus" required>
                        <option value="active">Actif</option>
                        <option value="inactive">Inactif</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="studentEnrollmentDate">Date d'inscription</label>
                    <input type="date" id="studentEnrollmentDate" value="${new Date().toISOString().split('T')[0]}">
                </div>
            </div>
            
            <div class="modal-actions">
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> Enregistrer
                </button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">
                    <i class="fas fa-times"></i> Annuler
                </button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('studentForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const newStudent = {
            id: Date.now(),
            firstName: document.getElementById('studentFirstName').value,
            lastName: document.getElementById('studentLastName').value,
            email: document.getElementById('studentEmail').value,
            department: document.getElementById('studentDepartment').value,
            status: document.getElementById('studentStatus').value,
            enrollmentDate: document.getElementById('studentEnrollmentDate').value,
            avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
            phone: generatePhone(),
            address: generateAddress(),
            gpa: (Math.random() * 2 + 2).toFixed(2)
        };
        
        currentData.students.push(newStudent);
        await apiService.createItem('students', newStudent);
        
        closeModal();
        showAlert('Étudiant ajouté avec succès!', 'success');
        renderStudentsTable(currentData.students);
        updateDashboardStats();
        createCharts();
    });
}

function editStudent(id) {
    const student = currentData.students.find(s => s.id === id);
    if (!student) {
        showAlert('Étudiant non trouvé!', 'danger');
        return;
    }
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-user-edit"></i> Modifier l'Étudiant</h2>
        <form id="editStudentForm" class="form">
            <div class="form-row">
                <div class="form-group">
                    <label for="editStudentFirstName">Prénom *</label>
                    <input type="text" id="editStudentFirstName" value="${student.firstName}" required>
                </div>
                <div class="form-group">
                    <label for="editStudentLastName">Nom *</label>
                    <input type="text" id="editStudentLastName" value="${student.lastName}" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="editStudentEmail">Email *</label>
                    <input type="email" id="editStudentEmail" value="${student.email}" required>
                </div>
                <div class="form-group">
                    <label for="editStudentDepartment">Département *</label>
                    <select id="editStudentDepartment" required>
                        ${[...new Set(currentData.students.map(s => s.department))].map(dept => 
                            `<option value="${dept}" ${student.department === dept ? 'selected' : ''}>${dept}</option>`
                        ).join('')}
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="editStudentStatus">Statut *</label>
                    <select id="editStudentStatus" required>
                        <option value="active" ${student.status === 'active' ? 'selected' : ''}>Actif</option>
                        <option value="inactive" ${student.status === 'inactive' ? 'selected' : ''}>Inactif</option>
                    </select>
                </div>
            </div>
            
            <div class="modal-actions">
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> Enregistrer
                </button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">
                    <i class="fas fa-times"></i> Annuler
                </button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('editStudentForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        student.firstName = document.getElementById('editStudentFirstName').value;
        student.lastName = document.getElementById('editStudentLastName').value;
        student.email = document.getElementById('editStudentEmail').value;
        student.department = document.getElementById('editStudentDepartment').value;
        student.status = document.getElementById('editStudentStatus').value;
        
        await apiService.updateItem('students', id, student);
        
        closeModal();
        showAlert('Étudiant modifié avec succès!', 'success');
        renderStudentsTable(currentData.students);
    });
}

async function viewStudent(id) {
    try {
        showLoading();
        // Try to get student from API first
        let student;
        try {
            student = await apiService.getStudent(id);
        } catch (error) {
            // If API fails, try to get from local data
            student = currentData.students.find(s => s.id === id);
            if (!student) throw new Error('Étudiant non trouvé');
        }
        
        hideLoading();
        
        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = `
            <h2><i class="fas fa-user"></i> Détails de l'Étudiant #${student.id}</h2>
            
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="${student.avatar}" alt="${student.firstName}" 
                     style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid var(--primary-color);">
            </div>
            
            <div class="detail-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                <div class="detail-item">
                    <strong><i class="fas fa-id-badge"></i> ID:</strong>
                    <p>${student.id}</p>
                </div>
                <div class="detail-item">
                    <strong><i class="fas fa-user"></i> Nom Complet:</strong>
                    <p>${student.firstName} ${student.lastName}</p>
                </div>
                <div class="detail-item">
                    <strong><i class="fas fa-envelope"></i> Email:</strong>
                    <p>${student.email}</p>
                </div>
                <div class="detail-item">
                    <strong><i class="fas fa-building"></i> Département:</strong>
                    <p>${student.department}</p>
                </div>
                <div class="detail-item">
                    <strong><i class="fas fa-calendar"></i> Date d'inscription:</strong>
                    <p>${new Date(student.enrollmentDate).toLocaleDateString('fr-FR')}</p>
                </div>
                <div class="detail-item">
                    <strong><i class="fas fa-phone"></i> Téléphone:</strong>
                    <p>${student.phone || 'Non disponible'}</p>
                </div>
                <div class="detail-item">
                    <strong><i class="fas fa-map-marker-alt"></i> Adresse:</strong>
                    <p>${student.address || 'Non disponible'}</p>
                </div>
                <div class="detail-item">
                    <strong><i class="fas fa-chart-line"></i> GPA:</strong>
                    <p>${student.gpa || 'N/A'} / 4.00</p>
                </div>
                <div class="detail-item">
                    <strong><i class="fas fa-circle"></i> Statut:</strong>
                    <p><span class="badge badge-${student.status === 'active' ? 'success' : 'danger'}">
                        ${student.status === 'active' ? 'Actif' : 'Inactif'}
                    </span></p>
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn btn-info" onclick="exportToPDF('student', ${JSON.stringify(student).replace(/"/g, '&quot;')})">
                    <i class="fas fa-file-pdf"></i> Export PDF
                </button>
                <button class="btn btn-warning" onclick="closeModal(); editStudent(${student.id})">
                    <i class="fas fa-edit"></i> Modifier
                </button>
                <button class="btn btn-secondary" onclick="closeModal()">
                    <i class="fas fa-times"></i> Fermer
                </button>
            </div>
        `;
        
        modal.classList.add('active');
    } catch (error) {
        hideLoading();
        showAlert('Erreur lors du chargement des détails', 'danger');
        console.error(error);
    }
}

function deleteStudent(id) {
    confirmDelete('student', id, async () => {
        currentData.students = currentData.students.filter(s => s.id !== id);
        await apiService.deleteItem('students', id);
        renderStudentsTable(currentData.students);
        updateDashboardStats();
        createCharts();
        showAlert('Étudiant supprimé avec succès!', 'success');
    });
}

// ========== TEACHERS CRUD ==========

function addTeacher() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-chalkboard-teacher"></i> Ajouter un Professeur</h2>
        <form id="teacherForm" class="form">
            <div class="form-row">
                <div class="form-group">
                    <label for="teacherFirstName">Prénom *</label>
                    <input type="text" id="teacherFirstName" required>
                </div>
                <div class="form-group">
                    <label for="teacherLastName">Nom *</label>
                    <input type="text" id="teacherLastName" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="teacherEmail">Email *</label>
                    <input type="email" id="teacherEmail" required>
                </div>
                <div class="form-group">
                    <label for="teacherSubject">Matière *</label>
                    <select id="teacherSubject" required>
                        <option value="">Sélectionner...</option>
                        ${[...new Set(currentData.teachers.map(t => t.subject))].map(subj => 
                            `<option value="${subj}">${subj}</option>`
                        ).join('')}
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="teacherDepartment">Département *</label>
                    <select id="teacherDepartment" required>
                        <option value="">Sélectionner...</option>
                        ${currentData.departments.map(dept => 
                            `<option value="${dept.name}">${dept.name}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="teacherExperience">Années d'expérience *</label>
                    <input type="number" id="teacherExperience" min="0" max="50" required>
                </div>
            </div>
            
            <div class="modal-actions">
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> Enregistrer
                </button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">
                    <i class="fas fa-times"></i> Annuler
                </button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('teacherForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const newTeacher = {
            id: Date.now(),
            firstName: document.getElementById('teacherFirstName').value,
            lastName: document.getElementById('teacherLastName').value,
            email: document.getElementById('teacherEmail').value,
            subject: document.getElementById('teacherSubject').value,
            department: document.getElementById('teacherDepartment').value,
            yearsExperience: parseInt(document.getElementById('teacherExperience').value),
            avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
        };
        
        currentData.teachers.push(newTeacher);
        await apiService.createItem('teachers', newTeacher);
        
        closeModal();
        showAlert('Professeur ajouté avec succès!', 'success');
        renderTeachersTable(currentData.teachers);
        updateDashboardStats();
        createCharts();
    });
}

function editTeacher(id) {
    const teacher = currentData.teachers.find(t => t.id === id);
    if (!teacher) {
        showAlert('Professeur non trouvé!', 'danger');
        return;
    }
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-user-edit"></i> Modifier le Professeur</h2>
        <form id="editTeacherForm" class="form">
            <div class="form-row">
                <div class="form-group">
                    <label for="editTeacherFirstName">Prénom *</label>
                    <input type="text" id="editTeacherFirstName" value="${teacher.firstName}" required>
                </div>
                <div class="form-group">
                    <label for="editTeacherLastName">Nom *</label>
                    <input type="text" id="editTeacherLastName" value="${teacher.lastName}" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="editTeacherEmail">Email *</label>
                    <input type="email" id="editTeacherEmail" value="${teacher.email}" required>
                </div>
                <div class="form-group">
                    <label for="editTeacherSubject">Matière *</label>
                    <select id="editTeacherSubject" required>
                        ${[...new Set(currentData.teachers.map(t => t.subject))].map(subj => 
                            `<option value="${subj}" ${teacher.subject === subj ? 'selected' : ''}>${subj}</option>`
                        ).join('')}
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="editTeacherDepartment">Département *</label>
                    <select id="editTeacherDepartment" required>
                        ${currentData.departments.map(dept => 
                            `<option value="${dept.name}" ${teacher.department === dept.name ? 'selected' : ''}>${dept.name}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="editTeacherExperience">Années d'expérience *</label>
                    <input type="number" id="editTeacherExperience" value="${teacher.yearsExperience}" min="0" required>
                </div>
            </div>
            
            <div class="modal-actions">
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> Enregistrer
                </button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">
                    <i class="fas fa-times"></i> Annuler
                </button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('editTeacherForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        teacher.firstName = document.getElementById('editTeacherFirstName').value;
        teacher.lastName = document.getElementById('editTeacherLastName').value;
        teacher.email = document.getElementById('editTeacherEmail').value;
        teacher.subject = document.getElementById('editTeacherSubject').value;
        teacher.department = document.getElementById('editTeacherDepartment').value;
        teacher.yearsExperience = parseInt(document.getElementById('editTeacherExperience').value);
        
        await apiService.updateItem('teachers', id, teacher);
        
        closeModal();
        showAlert('Professeur modifié avec succès!', 'success');
        renderTeachersTable(currentData.teachers);
    });
}

function viewTeacher(id) {
    const teacher = currentData.teachers.find(t => t.id === id);
    if (!teacher) {
        showAlert('Professeur non trouvé!', 'danger');
        return;
    }
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-chalkboard-teacher"></i> Détails du Professeur #${teacher.id}</h2>
        
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="${teacher.avatar}" alt="${teacher.firstName}" 
                 style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid var(--primary-color);">
        </div>
        
        <div class="detail-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
            <div class="detail-item">
                <strong><i class="fas fa-id-badge"></i> ID:</strong>
                <p>${teacher.id}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-user"></i> Nom Complet:</strong>
                <p>${teacher.firstName} ${teacher.lastName}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-envelope"></i> Email:</strong>
                <p>${teacher.email}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-book"></i> Matière:</strong>
                <p>${teacher.subject}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-building"></i> Département:</strong>
                <p>${teacher.department}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-award"></i> Expérience:</strong>
                <p>${teacher.yearsExperience} années</p>
            </div>
        </div>
        
        <div class="modal-actions">
            <button class="btn btn-info" onclick="exportToPDF('teacher', ${JSON.stringify(teacher).replace(/"/g, '&quot;')})">
                <i class="fas fa-file-pdf"></i> Export PDF
            </button>
            <button class="btn btn-warning" onclick="closeModal(); editTeacher(${teacher.id})">
                <i class="fas fa-edit"></i> Modifier
            </button>
            <button class="btn btn-secondary" onclick="closeModal()">
                <i class="fas fa-times"></i> Fermer
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

function deleteTeacher(id) {
    confirmDelete('teacher', id, async () => {
        currentData.teachers = currentData.teachers.filter(t => t.id !== id);
        await apiService.deleteItem('teachers', id);
        renderTeachersTable(currentData.teachers);
        updateDashboardStats();
        createCharts();
        showAlert('Professeur supprimé avec succès!', 'success');
    });
}

// ========== COURSES CRUD ==========

function addCourse() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-book"></i> Ajouter un Cours</h2>
        <form id="courseForm" class="form">
            <div class="form-row">
                <div class="form-group">
                    <label for="courseName">Nom du cours *</label>
                    <input type="text" id="courseName" required>
                </div>
                <div class="form-group">
                    <label for="courseCode">Code *</label>
                    <input type="text" id="courseCode" placeholder="CS101" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="courseDescription">Description</label>
                <textarea id="courseDescription" rows="3"></textarea>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="courseCredits">Crédits *</label>
                    <input type="number" id="courseCredits" min="1" max="10" required>
                </div>
                <div class="form-group">
                    <label for="courseSemester">Semestre *</label>
                    <select id="courseSemester" required>
                        <option value="1">Semestre 1</option>
                        <option value="2">Semestre 2</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group">
                <label for="courseDepartment">Département *</label>
                <select id="courseDepartment" required>
                    <option value="">Sélectionner...</option>
                    ${currentData.departments.map(dept => 
                        `<option value="${dept.name}">${dept.name}</option>`
                    ).join('')}
                </select>
            </div>
            
            <div class="modal-actions">
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> Enregistrer
                </button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">
                    <i class="fas fa-times"></i> Annuler
                </button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('courseForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const newCourse = {
            id: Date.now(),
            name: document.getElementById('courseName').value,
            code: document.getElementById('courseCode').value,
            description: document.getElementById('courseDescription').value,
            credits: parseInt(document.getElementById('courseCredits').value),
            semester: parseInt(document.getElementById('courseSemester').value),
            department: document.getElementById('courseDepartment').value,
            teacherId: currentData.teachers.length > 0 ? currentData.teachers[Math.floor(Math.random() * currentData.teachers.length)].id : 101
        };
        
        currentData.courses.push(newCourse);
        await apiService.createItem('courses', newCourse);
        
        closeModal();
        showAlert('Cours ajouté avec succès!', 'success');
        renderCoursesTable(currentData.courses);
        updateDashboardStats();
        createCharts();
    });
}

function editCourse(id) {
    const course = currentData.courses.find(c => c.id === id);
    if (!course) {
        showAlert('Cours non trouvé!', 'danger');
        return;
    }
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-edit"></i> Modifier le Cours</h2>
        <form id="editCourseForm" class="form">
            <div class="form-row">
                <div class="form-group">
                    <label for="editCourseName">Nom du cours *</label>
                    <input type="text" id="editCourseName" value="${course.name}" required>
                </div>
                <div class="form-group">
                    <label for="editCourseCode">Code *</label>
                    <input type="text" id="editCourseCode" value="${course.code}" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="editCourseDescription">Description</label>
                <textarea id="editCourseDescription" rows="3">${course.description || ''}</textarea>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="editCourseCredits">Crédits *</label>
                    <input type="number" id="editCourseCredits" value="${course.credits}" min="1" max="10" required>
                </div>
                <div class="form-group">
                    <label for="editCourseSemester">Semestre *</label>
                    <select id="editCourseSemester" required>
                        <option value="1" ${course.semester === 1 ? 'selected' : ''}>Semestre 1</option>
                        <option value="2" ${course.semester === 2 ? 'selected' : ''}>Semestre 2</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group">
                <label for="editCourseDepartment">Département *</label>
                <select id="editCourseDepartment" required>
                    ${currentData.departments.map(dept => 
                        `<option value="${dept.name}" ${course.department === dept.name ? 'selected' : ''}>${dept.name}</option>`
                    ).join('')}
                </select>
            </div>
            
            <div class="modal-actions">
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> Enregistrer
                </button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">
                    <i class="fas fa-times"></i> Annuler
                </button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('editCourseForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        course.name = document.getElementById('editCourseName').value;
        course.code = document.getElementById('editCourseCode').value;
        course.description = document.getElementById('editCourseDescription').value;
        course.credits = parseInt(document.getElementById('editCourseCredits').value);
        course.semester = parseInt(document.getElementById('editCourseSemester').value);
        course.department = document.getElementById('editCourseDepartment').value;
        
        await apiService.updateItem('courses', id, course);
        
        closeModal();
        showAlert('Cours modifié avec succès!', 'success');
        renderCoursesTable(currentData.courses);
    });
}

function viewCourse(id) {
    const course = currentData.courses.find(c => c.id === id);
    if (!course) {
        showAlert('Cours non trouvé!', 'danger');
        return;
    }
    
    const teacher = currentData.teachers.find(t => t.id === course.teacherId);
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-book"></i> Détails du Cours</h2>
        
        <div class="detail-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
            <div class="detail-item">
                <strong><i class="fas fa-barcode"></i> Code:</strong>
                <p>${course.code}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-book"></i> Nom:</strong>
                <p>${course.name}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-building"></i> Département:</strong>
                <p>${course.department}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-star"></i> Crédits:</strong>
                <p>${course.credits}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-calendar"></i> Semestre:</strong>
                <p>Semestre ${course.semester}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-chalkboard-teacher"></i> Professeur:</strong>
                <p>${teacher ? teacher.firstName + ' ' + teacher.lastName : 'N/A'}</p>
            </div>
        </div>
        
        <div class="form-group" style="margin-top: 20px;">
            <strong><i class="fas fa-info-circle"></i> Description:</strong>
            <p style="margin-top: 10px; padding: 15px; background: var(--light-color); border-radius: 8px;">
                ${course.description || 'Aucune description disponible'}
            </p>
        </div>
        
        <div class="modal-actions">
            <button class="btn btn-info" onclick="exportToPDF('course', ${JSON.stringify(course).replace(/"/g, '&quot;')})">
                <i class="fas fa-file-pdf"></i> Export PDF
            </button>
            <button class="btn btn-warning" onclick="closeModal(); editCourse(${course.id})">
                <i class="fas fa-edit"></i> Modifier
            </button>
            <button class="btn btn-secondary" onclick="closeModal()">
                <i class="fas fa-times"></i> Fermer
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

function deleteCourse(id) {
    confirmDelete('course', id, async () => {
        currentData.courses = currentData.courses.filter(c => c.id !== id);
        await apiService.deleteItem('courses', id);
        renderCoursesTable(currentData.courses);
        updateDashboardStats();
        createCharts();
        showAlert('Cours supprimé avec succès!', 'success');
    });
}

// ========== DEPARTMENTS CRUD ==========

function addDepartment() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-building"></i> Ajouter un Département</h2>
        <form id="departmentForm" class="form">
            <div class="form-row">
                <div class="form-group">
                    <label for="departmentName">Nom *</label>
                    <input type="text" id="departmentName" required>
                </div>
                <div class="form-group">
                    <label for="departmentCode">Code *</label>
                    <input type="text" id="departmentCode" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="departmentDescription">Description</label>
                <textarea id="departmentDescription" rows="3"></textarea>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="departmentHead">Responsable *</label>
                    <input type="text" id="departmentHead" placeholder="Prof. Nom" required>
                </div>
                <div class="form-group">
                    <label for="departmentTeachersCount">Nombre de professeurs</label>
                    <input type="number" id="departmentTeachersCount" min="0" value="5">
                </div>
            </div>
            
            <div class="modal-actions">
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> Enregistrer
                </button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">
                    <i class="fas fa-times"></i> Annuler
                </button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('departmentForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const newDepartment = {
            id: Date.now(),
            name: document.getElementById('departmentName').value,
            code: document.getElementById('departmentCode').value,
            description: document.getElementById('departmentDescription').value,
            headOfDepartment: document.getElementById('departmentHead').value,
            teachersCount: parseInt(document.getElementById('departmentTeachersCount').value) || 5,
            studentsCount: Math.floor(Math.random() * 200) + 50
        };
        
        currentData.departments.push(newDepartment);
        await apiService.createItem('departments', newDepartment);
        
        closeModal();
        showAlert('Département ajouté avec succès!', 'success');
        renderDepartmentsTable(currentData.departments);
        updateDashboardStats();
        createCharts();
    });
}

function editDepartment(id) {
    const department = currentData.departments.find(d => d.id === id);
    if (!department) {
        showAlert('Département non trouvé!', 'danger');
        return;
    }
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-edit"></i> Modifier le Département</h2>
        <form id="editDepartmentForm" class="form">
            <div class="form-row">
                <div class="form-group">
                    <label for="editDepartmentName">Nom *</label>
                    <input type="text" id="editDepartmentName" value="${department.name}" required>
                </div>
                <div class="form-group">
                    <label for="editDepartmentCode">Code *</label>
                    <input type="text" id="editDepartmentCode" value="${department.code}" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="editDepartmentDescription">Description</label>
                <textarea id="editDepartmentDescription" rows="3">${department.description || ''}</textarea>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="editDepartmentHead">Responsable *</label>
                    <input type="text" id="editDepartmentHead" value="${department.headOfDepartment}" required>
                </div>
                <div class="form-group">
                    <label for="editDepartmentTeachersCount">Nombre de professeurs</label>
                    <input type="number" id="editDepartmentTeachersCount" value="${department.teachersCount}" min="0">
                </div>
            </div>
            
            <div class="modal-actions">
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> Enregistrer
                </button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">
                    <i class="fas fa-times"></i> Annuler
                </button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('editDepartmentForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        department.name = document.getElementById('editDepartmentName').value;
        department.code = document.getElementById('editDepartmentCode').value;
        department.description = document.getElementById('editDepartmentDescription').value;
        department.headOfDepartment = document.getElementById('editDepartmentHead').value;
        department.teachersCount = parseInt(document.getElementById('editDepartmentTeachersCount').value);
        
        await apiService.updateItem('departments', id, department);
        
        closeModal();
        showAlert('Département modifié avec succès!', 'success');
        renderDepartmentsTable(currentData.departments);
    });
}

function viewDepartment(id) {
    const department = currentData.departments.find(d => d.id === id);
    if (!department) {
        showAlert('Département non trouvé!', 'danger');
        return;
    }
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-building"></i> Détails du Département</h2>
        
        <div class="detail-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
            <div class="detail-item">
                <strong><i class="fas fa-barcode"></i> Code:</strong>
                <p>${department.code}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-building"></i> Nom:</strong>
                <p>${department.name}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-user-tie"></i> Responsable:</strong>
                <p>${department.headOfDepartment}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-chalkboard-teacher"></i> Nombre de professeurs:</strong>
                <p><span class="badge badge-success">${department.teachersCount}</span></p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-user-graduate"></i> Nombre d'étudiants:</strong>
                <p><span class="badge badge-info">${department.studentsCount}</span></p>
            </div>
        </div>
        
        <div class="form-group" style="margin-top: 20px;">
            <strong><i class="fas fa-info-circle"></i> Description:</strong>
            <p style="margin-top: 10px; padding: 15px; background: var(--light-color); border-radius: 8px;">
                ${department.description || 'Aucune description disponible'}
            </p>
        </div>
        
        <div class="modal-actions">
            <button class="btn btn-info" onclick="exportToPDF('department', ${JSON.stringify(department).replace(/"/g, '&quot;')})">
                <i class="fas fa-file-pdf"></i> Export PDF
            </button>
            <button class="btn btn-warning" onclick="closeModal(); editDepartment(${department.id})">
                <i class="fas fa-edit"></i> Modifier
            </button>
            <button class="btn btn-secondary" onclick="closeModal()">
                <i class="fas fa-times"></i> Fermer
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

function deleteDepartment(id) {
    confirmDelete('department', id, async () => {
        currentData.departments = currentData.departments.filter(d => d.id !== id);
        await apiService.deleteItem('departments', id);
        renderDepartmentsTable(currentData.departments);
        updateDashboardStats();
        createCharts();
        showAlert('Département supprimé avec succès!', 'success');
    });
}

// ========== ABSENCES CRUD ==========

function addAbsence() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-calendar-times"></i> Ajouter une Absence</h2>
        <form id="absenceForm" class="form">
            <div class="form-group">
                <label for="absenceStudent">Étudiant *</label>
                <select id="absenceStudent" required>
                    <option value="">Sélectionner un étudiant</option>
                    ${currentData.students.map(student => 
                        `<option value="${student.id}">${student.firstName} ${student.lastName}</option>`
                    ).join('')}
                </select>
            </div>
            
            <div class="form-group">
                <label for="absenceCourse">Cours *</label>
                <select id="absenceCourse" required>
                    <option value="">Sélectionner un cours</option>
                    ${currentData.courses.map(course => 
                        `<option value="${course.id}">${course.code} - ${course.name}</option>`
                    ).join('')}
                </select>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="absenceDate">Date *</label>
                    <input type="date" id="absenceDate" value="${new Date().toISOString().split('T')[0]}" required>
                </div>
                <div class="form-group">
                    <label for="absenceStatus">Statut *</label>
                    <select id="absenceStatus" required>
                        <option value="justified">Justifiée</option>
                        <option value="unjustified">Non justifiée</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group">
                <label for="absenceReason">Raison</label>
                <textarea id="absenceReason" rows="3" placeholder="Raison de l'absence..."></textarea>
            </div>
            
            <div class="modal-actions">
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> Enregistrer
                </button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">
                    <i class="fas fa-times"></i> Annuler
                </button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('absenceForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const studentId = parseInt(document.getElementById('absenceStudent').value);
        const student = currentData.students.find(s => s.id === studentId);
        
        const courseId = parseInt(document.getElementById('absenceCourse').value);
        const course = currentData.courses.find(c => c.id === courseId);
        
        const newAbsence = {
            id: Date.now(),
            studentId: studentId,
            studentName: student ? `${student.firstName} ${student.lastName}` : 'Étudiant inconnu',
            courseId: courseId,
            courseName: course ? course.name : 'Cours inconnu',
            date: document.getElementById('absenceDate').value,
            reason: document.getElementById('absenceReason').value,
            justified: document.getElementById('absenceStatus').value === 'justified',
            status: document.getElementById('absenceStatus').value
        };
        
        currentData.absences.push(newAbsence);
        await apiService.createItem('absences', newAbsence);
        
        closeModal();
        showAlert('Absence ajoutée avec succès!', 'success');
        renderAbsencesTable(currentData.absences);
        updateDashboardStats();
        createCharts();
    });
}

function editAbsence(id) {
    const absence = currentData.absences.find(a => a.id === id);
    if (!absence) {
        showAlert('Absence non trouvée!', 'danger');
        return;
    }
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-edit"></i> Modifier l'Absence</h2>
        <form id="editAbsenceForm" class="form">
            <div class="form-group">
                <label for="editAbsenceDate">Date *</label>
                <input type="date" id="editAbsenceDate" value="${absence.date}" required>
            </div>
            
            <div class="form-group">
                <label for="editAbsenceReason">Raison</label>
                <textarea id="editAbsenceReason" rows="3">${absence.reason || ''}</textarea>
            </div>
            
            <div class="form-group">
                <label for="editAbsenceStatus">Statut *</label>
                <select id="editAbsenceStatus" required>
                    <option value="justified" ${absence.justified ? 'selected' : ''}>Justifiée</option>
                    <option value="unjustified" ${!absence.justified ? 'selected' : ''}>Non justifiée</option>
                </select>
            </div>
            
            <div class="modal-actions">
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> Enregistrer
                </button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">
                    <i class="fas fa-times"></i> Annuler
                </button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('editAbsenceForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        absence.date = document.getElementById('editAbsenceDate').value;
        absence.reason = document.getElementById('editAbsenceReason').value;
        absence.justified = document.getElementById('editAbsenceStatus').value === 'justified';
        absence.status = document.getElementById('editAbsenceStatus').value;
        
        await apiService.updateItem('absences', id, absence);
        
        closeModal();
        showAlert('Absence modifiée avec succès!', 'success');
        renderAbsencesTable(currentData.absences);
    });
}

function deleteAbsence(id) {
    confirmDelete('absence', id, async () => {
        currentData.absences = currentData.absences.filter(a => a.id !== id);
        await apiService.deleteItem('absences', id);
        renderAbsencesTable(currentData.absences);
        updateDashboardStats();
        createCharts();
        showAlert('Absence supprimée avec succès!', 'success');
    });
}
// ========== SCHEDULE CRUD ==========
window.addSchedule = function() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    const times = ['08:00-10:00', '10:00-12:00', '14:00-16:00', '16:00-18:00'];
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-calendar-alt"></i> Ajouter une Séance</h2>
        <form id="scheduleForm" class="form">
            <div class="form-group">
                <label for="scheduleCourse">Cours *</label>
                <select id="scheduleCourse" required>
                    <option value="">Sélectionner un cours</option>
                    ${currentData.courses.map(course => 
                        `<option value="${course.id}">${course.code} - ${course.name}</option>`
                    ).join('')}
                </select>
            </div>
            
            <div class="form-group">
                <label for="scheduleTeacher">Professeur *</label>
                <select id="scheduleTeacher" required>
                    <option value="">Sélectionner un professeur</option>
                    ${currentData.teachers.map(teacher => 
                        `<option value="${teacher.id}">${teacher.firstName} ${teacher.lastName}</option>`
                    ).join('')}
                </select>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="scheduleDay">Jour *</label>
                    <select id="scheduleDay" required>
                        <option value="">Sélectionner un jour</option>
                        ${days.map(day => `<option value="${day}">${day}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="scheduleTime">Heure *</label>
                    <select id="scheduleTime" required>
                        <option value="">Sélectionner un créneau</option>
                        ${times.map(time => `<option value="${time}">${time}</option>`).join('')}
                    </select>
                </div>
            </div>
            
            <div class="form-group">
                <label for="scheduleRoom">Salle *</label>
                <select id="scheduleRoom" required>
                    <option value="">Sélectionner une salle</option>
                    ${currentData.rooms.map(room => 
                        `<option value="${room.id}">${room.name} - ${room.type}</option>`
                    ).join('')}
                </select>
            </div>
            
            <div class="modal-actions">
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> Enregistrer
                </button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">
                    <i class="fas fa-times"></i> Annuler
                </button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('scheduleForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const courseId = parseInt(document.getElementById('scheduleCourse').value);
        const teacherId = parseInt(document.getElementById('scheduleTeacher').value);
        const roomId = parseInt(document.getElementById('scheduleRoom').value);
        
        const course = currentData.courses.find(c => c.id === courseId);
        const teacher = currentData.teachers.find(t => t.id === teacherId);
        const room = currentData.rooms.find(r => r.id === roomId);
        
        const newSchedule = {
            id: Date.now(),
            courseId: courseId,
            courseName: course ? course.name : 'Cours inconnu',
            teacherId: teacherId,
            teacherName: teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Professeur inconnu',
            roomId: roomId,
            roomName: room ? room.name : 'Salle inconnue',
            day: document.getElementById('scheduleDay').value,
            time: document.getElementById('scheduleTime').value,
            department: course ? course.department : 'Informatique',
            semester: course ? course.semester : 1
        };
        
        currentData.schedule.push(newSchedule);
        await apiService.createItem('schedule', newSchedule);
        
        closeModal();
        showAlert('Séance ajoutée avec succès!', 'success');
        if (typeof renderScheduleTable === 'function') {
            renderScheduleTable(currentData.schedule);
        }
        showAlert('Séance ajoutée avec succès!', 'success');
    });
};

window.editSchedule = function(id) {
    const schedule = currentData.schedule.find(s => s.id === id);
    if (!schedule) {
        showAlert('Séance non trouvée!', 'danger');
        return;
    }
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    const times = ['08:00-10:00', '10:00-12:00', '14:00-16:00', '16:00-18:00'];
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-edit"></i> Modifier la Séance</h2>
        <form id="editScheduleForm" class="form">
            <div class="form-row">
                <div class="form-group">
                    <label for="editScheduleDay">Jour *</label>
                    <select id="editScheduleDay" required>
                        ${days.map(day => 
                            `<option value="${day}" ${schedule.day === day ? 'selected' : ''}>${day}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="editScheduleTime">Heure *</label>
                    <select id="editScheduleTime" required>
                        ${times.map(time => 
                            `<option value="${time}" ${schedule.time === time ? 'selected' : ''}>${time}</option>`
                        ).join('')}
                    </select>
                </div>
            </div>
            
            <div class="modal-actions">
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> Enregistrer
                </button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">
                    <i class="fas fa-times"></i> Annuler
                </button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('editScheduleForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        schedule.day = document.getElementById('editScheduleDay').value;
        schedule.time = document.getElementById('editScheduleTime').value;
        
        await apiService.updateItem('schedule', id, schedule);
        
        closeModal();
        showAlert('Séance modifiée avec succès!', 'success');
        if (typeof renderScheduleTable === 'function') {
            renderScheduleTable(currentData.schedule);
        }
    });
};

window.viewSchedule = function(id) {
    const schedule = currentData.schedule.find(s => s.id === id);
    if (!schedule) {
        showAlert('Séance non trouvée!', 'danger');
        return;
    }
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-calendar-alt"></i> Détails de la Séance</h2>
        
        <div class="detail-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
            <div class="detail-item">
                <strong><i class="fas fa-calendar"></i> Jour:</strong>
                <p><strong>${schedule.day}</strong></p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-clock"></i> Heure:</strong>
                <p><span class="badge badge-info">${schedule.time}</span></p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-book"></i> Cours:</strong>
                <p>${schedule.courseName}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-chalkboard-teacher"></i> Professeur:</strong>
                <p>${schedule.teacherName}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-door-open"></i> Salle:</strong>
                <p>${schedule.roomName}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-building"></i> Département:</strong>
                <p>${schedule.department}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-graduation-cap"></i> Semestre:</strong>
                <p>Semestre ${schedule.semester}</p>
            </div>
        </div>
        
        <div class="modal-actions">
            <button class="btn btn-warning" onclick="closeModal(); editSchedule(${schedule.id})">
                <i class="fas fa-edit"></i> Modifier
            </button>
            <button class="btn btn-secondary" onclick="closeModal()">
                <i class="fas fa-times"></i> Fermer
            </button>
        </div>
    `;
    
    modal.classList.add('active');
};

window.deleteSchedule = function(id) {
    confirmDelete('schedule', id, async () => {
        currentData.schedule = currentData.schedule.filter(s => s.id !== id);
        await apiService.deleteItem('schedule', id);
        if (typeof renderScheduleTable === 'function') {
            renderScheduleTable(currentData.schedule);
        }
        showAlert('Séance supprimée avec succès!', 'success');
    });
};

// ========== SCHEDULE CRUD ==========

function addSchedule() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    const times = ['08:00-10:00', '10:00-12:00', '14:00-16:00', '16:00-18:00'];
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-calendar-alt"></i> Ajouter une Séance</h2>
        <form id="scheduleForm" class="form">
            <div class="form-group">
                <label for="scheduleCourse">Cours *</label>
                <select id="scheduleCourse" required>
                    <option value="">Sélectionner un cours</option>
                    ${currentData.courses.map(course => 
                        `<option value="${course.id}">${course.code} - ${course.name}</option>`
                    ).join('')}
                </select>
            </div>
            
            <div class="form-group">
                <label for="scheduleTeacher">Professeur *</label>
                <select id="scheduleTeacher" required>
                    <option value="">Sélectionner un professeur</option>
                    ${currentData.teachers.map(teacher => 
                        `<option value="${teacher.id}">${teacher.firstName} ${teacher.lastName}</option>`
                    ).join('')}
                </select>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="scheduleDay">Jour *</label>
                    <select id="scheduleDay" required>
                        <option value="">Sélectionner un jour</option>
                        ${days.map(day => `<option value="${day}">${day}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="scheduleTime">Heure *</label>
                    <select id="scheduleTime" required>
                        <option value="">Sélectionner un créneau</option>
                        ${times.map(time => `<option value="${time}">${time}</option>`).join('')}
                    </select>
                </div>
            </div>
            
            <div class="form-group">
                <label for="scheduleRoom">Salle *</label>
                <select id="scheduleRoom" required>
                    <option value="">Sélectionner une salle</option>
                    ${currentData.rooms.map(room => 
                        `<option value="${room.id}">${room.name} - ${room.type}</option>`
                    ).join('')}
                </select>
            </div>
            
            <div class="modal-actions">
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> Enregistrer
                </button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">
                    <i class="fas fa-times"></i> Annuler
                </button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('scheduleForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const courseId = parseInt(document.getElementById('scheduleCourse').value);
        const teacherId = parseInt(document.getElementById('scheduleTeacher').value);
        const roomId = parseInt(document.getElementById('scheduleRoom').value);
        
        const course = currentData.courses.find(c => c.id === courseId);
        const teacher = currentData.teachers.find(t => t.id === teacherId);
        const room = currentData.rooms.find(r => r.id === roomId);
        
        const newSchedule = {
            id: Date.now(),
            courseId: courseId,
            courseName: course ? course.name : 'Cours inconnu',
            teacherId: teacherId,
            teacherName: teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Professeur inconnu',
            roomId: roomId,
            roomName: room ? room.name : 'Salle inconnue',
            day: document.getElementById('scheduleDay').value,
            time: document.getElementById('scheduleTime').value,
            department: course ? course.department : 'Informatique',
            semester: course ? course.semester : 1
        };
        
        currentData.schedule.push(newSchedule);
        await apiService.createItem('schedule', newSchedule);
        
        closeModal();
        showAlert('Séance ajoutée avec succès!', 'success');
        renderScheduleTable(currentData.schedule);
        updateDashboardStats();
        createCharts();
    });
}

function editSchedule(id) {
    const schedule = currentData.schedule.find(s => s.id === id);
    if (!schedule) {
        showAlert('Séance non trouvée!', 'danger');
        return;
    }
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    const times = ['08:00-10:00', '10:00-12:00', '14:00-16:00', '16:00-18:00'];
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-edit"></i> Modifier la Séance</h2>
        <form id="editScheduleForm" class="form">
            <div class="form-row">
                <div class="form-group">
                    <label for="editScheduleDay">Jour *</label>
                    <select id="editScheduleDay" required>
                        ${days.map(day => 
                            `<option value="${day}" ${schedule.day === day ? 'selected' : ''}>${day}</option>`
                        ).join('')}
                </div>
                <div class="form-group">
                    <label for="editScheduleTime">Heure *</label>
                    <select id="editScheduleTime" required>
                        ${times.map(time => 
                            `<option value="${time}" ${schedule.time === time ? 'selected' : ''}>${time}</option>`
                        ).join('')}
                    </select>
                </div>
            </div>
            
            <div class="modal-actions">
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> Enregistrer
                </button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">
                    <i class="fas fa-times"></i> Annuler
                </button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('editScheduleForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        schedule.day = document.getElementById('editScheduleDay').value;
        schedule.time = document.getElementById('editScheduleTime').value;
        
        await apiService.updateItem('schedule', id, schedule);
        
        closeModal();
        showAlert('Séance modifiée avec succès!', 'success');
        renderScheduleTable(currentData.schedule);
    });
}

function viewSchedule(id) {
    const schedule = currentData.schedule.find(s => s.id === id);
    if (!schedule) {
        showAlert('Séance non trouvée!', 'danger');
        return;
    }
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-calendar-alt"></i> Détails de la Séance</h2>
        
        <div class="detail-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
            <div class="detail-item">
                <strong><i class="fas fa-calendar"></i> Jour:</strong>
                <p><strong>${schedule.day}</strong></p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-clock"></i> Heure:</strong>
                <p><span class="badge badge-info">${schedule.time}</span></p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-book"></i> Cours:</strong>
                <p>${schedule.courseName}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-chalkboard-teacher"></i> Professeur:</strong>
                <p>${schedule.teacherName}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-door-open"></i> Salle:</strong>
                <p>${schedule.roomName}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-building"></i> Département:</strong>
                <p>${schedule.department}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-graduation-cap"></i> Semestre:</strong>
                <p>Semestre ${schedule.semester}</p>
            </div>
        </div>
        
        <div class="modal-actions">
            <button class="btn btn-info" onclick="exportToPDF('schedule', ${JSON.stringify(schedule).replace(/"/g, '&quot;')})">
                <i class="fas fa-file-pdf"></i> Export PDF
            </button>
            <button class="btn btn-warning" onclick="closeModal(); editSchedule(${schedule.id})">
                <i class="fas fa-edit"></i> Modifier
            </button>
            <button class="btn btn-secondary" onclick="closeModal()">
                <i class="fas fa-times"></i> Fermer
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

function deleteSchedule(id) {
    confirmDelete('schedule', id, async () => {
        currentData.schedule = currentData.schedule.filter(s => s.id !== id);
        await apiService.deleteItem('schedule', id);
        renderScheduleTable(currentData.schedule);
        updateDashboardStats();
        createCharts();
        showAlert('Séance supprimée avec succès!', 'success');
    });
}

// ========== ROOMS CRUD ==========

function addRoom() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-door-open"></i> Ajouter une Salle</h2>
        <form id="roomForm" class="form">
            <div class="form-row">
                <div class="form-group">
                    <label for="roomName">Nom *</label>
                    <input type="text" id="roomName" placeholder="Salle 101" required>
                </div>
                <div class="form-group">
                    <label for="roomCode">Code *</label>
                    <input type="text" id="roomCode" placeholder="R101" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="roomType">Type *</label>
                    <select id="roomType" required>
                        <option value="">Sélectionner...</option>
                        <option value="Cours">Cours</option>
                        <option value="TP">TP</option>
                        <option value="Amphithéâtre">Amphithéâtre</option>
                        <option value="Laboratoire">Laboratoire</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="roomCapacity">Capacité *</label>
                    <input type="number" id="roomCapacity" min="10" max="300" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="roomBuilding">Bâtiment *</label>
                    <select id="roomBuilding" required>
                        <option value="">Sélectionner...</option>
                        <option value="Bâtiment A">Bâtiment A</option>
                        <option value="Bâtiment B">Bâtiment B</option>
                        <option value="Bâtiment C">Bâtiment C</option>
                        <option value="Bâtiment D">Bâtiment D</option>
                        <option value="Bâtiment E">Bâtiment E</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="roomFloor">Étage *</label>
                    <select id="roomFloor" required>
                        <option value="">Sélectionner...</option>
                        <option value="0">Rez-de-chaussée</option>
                        <option value="1">1er étage</option>
                        <option value="2">2ème étage</option>
                        <option value="3">3ème étage</option>
                        <option value="4">4ème étage</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group">
                <label for="roomStatus">Statut *</label>
                <select id="roomStatus" required>
                    <option value="available">Disponible</option>
                    <option value="occupied">Occupée</option>
                </select>
            </div>
            
            <div class="modal-actions">
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> Enregistrer
                </button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">
                    <i class="fas fa-times"></i> Annuler
                </button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('roomForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const equipmentOptions = ['Projecteur', 'Tableau Interactif', 'Ordinateurs', 'Climatisation', 'Sono'];
        const randomEquipment = Array.from({length: Math.floor(Math.random() * 3) + 2}, () => 
            equipmentOptions[Math.floor(Math.random() * equipmentOptions.length)]
        ).filter((v, i, a) => a.indexOf(v) === i);
        
        const newRoom = {
            id: Date.now(),
            name: document.getElementById('roomName').value,
            code: document.getElementById('roomCode').value,
            type: document.getElementById('roomType').value,
            capacity: parseInt(document.getElementById('roomCapacity').value),
            building: document.getElementById('roomBuilding').value,
            floor: parseInt(document.getElementById('roomFloor').value),
            status: document.getElementById('roomStatus').value,
            equipment: randomEquipment,
            thumbnail: `https://picsum.photos/150/100?random=${Math.floor(Math.random() * 100)}`
        };
        
        currentData.rooms.push(newRoom);
        await apiService.createItem('rooms', newRoom);
        
        closeModal();
        showAlert('Salle ajoutée avec succès!', 'success');
        renderRoomsTable(currentData.rooms);
        updateDashboardStats();
        createCharts();
    });
}

function editRoom(id) {
    const room = currentData.rooms.find(r => r.id === id);
    if (!room) {
        showAlert('Salle non trouvée!', 'danger');
        return;
    }
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-edit"></i> Modifier la Salle</h2>
        <form id="editRoomForm" class="form">
            <div class="form-row">
                <div class="form-group">
                    <label for="editRoomName">Nom *</label>
                    <input type="text" id="editRoomName" value="${room.name}" required>
                </div>
                <div class="form-group">
                    <label for="editRoomCode">Code *</label>
                    <input type="text" id="editRoomCode" value="${room.code}" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="editRoomType">Type *</label>
                    <select id="editRoomType" required>
                        <option value="Cours" ${room.type === 'Cours' ? 'selected' : ''}>Cours</option>
                        <option value="TP" ${room.type === 'TP' ? 'selected' : ''}>TP</option>
                        <option value="Amphithéâtre" ${room.type === 'Amphithéâtre' ? 'selected' : ''}>Amphithéâtre</option>
                        <option value="Laboratoire" ${room.type === 'Laboratoire' ? 'selected' : ''}>Laboratoire</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="editRoomCapacity">Capacité *</label>
                    <input type="number" id="editRoomCapacity" value="${room.capacity}" min="10" max="300" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="editRoomBuilding">Bâtiment *</label>
                    <select id="editRoomBuilding" required>
                        <option value="Bâtiment A" ${room.building === 'Bâtiment A' ? 'selected' : ''}>Bâtiment A</option>
                        <option value="Bâtiment B" ${room.building === 'Bâtiment B' ? 'selected' : ''}>Bâtiment B</option>
                        <option value="Bâtiment C" ${room.building === 'Bâtiment C' ? 'selected' : ''}>Bâtiment C</option>
                        <option value="Bâtiment D" ${room.building === 'Bâtiment D' ? 'selected' : ''}>Bâtiment D</option>
                        <option value="Bâtiment E" ${room.building === 'Bâtiment E' ? 'selected' : ''}>Bâtiment E</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="editRoomFloor">Étage *</label>
                    <select id="editRoomFloor" required>
                        <option value="0" ${room.floor === 0 ? 'selected' : ''}>Rez-de-chaussée</option>
                        <option value="1" ${room.floor === 1 ? 'selected' : ''}>1er étage</option>
                        <option value="2" ${room.floor === 2 ? 'selected' : ''}>2ème étage</option>
                        <option value="3" ${room.floor === 3 ? 'selected' : ''}>3ème étage</option>
                        <option value="4" ${room.floor === 4 ? 'selected' : ''}>4ème étage</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group">
                <label for="editRoomStatus">Statut *</label>
                <select id="editRoomStatus" required>
                    <option value="available" ${room.status === 'available' ? 'selected' : ''}>Disponible</option>
                    <option value="occupied" ${room.status === 'occupied' ? 'selected' : ''}>Occupée</option>
                </select>
            </div>
            
            <div class="modal-actions">
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> Enregistrer
                </button>
                <button type="button" class="btn btn-secondary" onclick="closeModal()">
                    <i class="fas fa-times"></i> Annuler
                </button>
            </div>
        </form>
    `;
    
    modal.classList.add('active');
    
    document.getElementById('editRoomForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        room.name = document.getElementById('editRoomName').value;
        room.code = document.getElementById('editRoomCode').value;
        room.type = document.getElementById('editRoomType').value;
        room.capacity = parseInt(document.getElementById('editRoomCapacity').value);
        room.building = document.getElementById('editRoomBuilding').value;
        room.floor = parseInt(document.getElementById('editRoomFloor').value);
        room.status = document.getElementById('editRoomStatus').value;
        
        await apiService.updateItem('rooms', id, room);
        
        closeModal();
        showAlert('Salle modifiée avec succès!', 'success');
        renderRoomsTable(currentData.rooms);
    });
}

function viewRoom(id) {
    const room = currentData.rooms.find(r => r.id === id);
    if (!room) {
        showAlert('Salle non trouvée!', 'danger');
        return;
    }
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2><i class="fas fa-door-open"></i> Détails de la Salle</h2>
        
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="${room.thumbnail}" alt="${room.name}" 
                 style="width: 200px; height: 150px; border-radius: 8px; object-fit: cover;">
        </div>
        
        <div class="detail-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
            <div class="detail-item">
                <strong><i class="fas fa-door-open"></i> Nom:</strong>
                <p>${room.name}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-barcode"></i> Code:</strong>
                <p>${room.code}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-tag"></i> Type:</strong>
                <p><span class="badge badge-info">${room.type}</span></p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-users"></i> Capacité:</strong>
                <p>${room.capacity} places</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-building"></i> Bâtiment:</strong>
                <p>${room.building}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-layer-group"></i> Étage:</strong>
                <p>Étage ${room.floor}</p>
            </div>
            <div class="detail-item">
                <strong><i class="fas fa-circle"></i> Statut:</strong>
                <p><span class="badge badge-${room.status === 'available' ? 'success' : 'danger'}">
                    ${room.status === 'available' ? 'Disponible' : 'Occupée'}
                </span></p>
            </div>
        </div>
        
        <div class="form-group" style="margin-top: 20px;">
            <strong><i class="fas fa-cogs"></i> Équipement:</strong>
            <div style="margin-top: 10px;">
                ${room.equipment ? room.equipment.map(item => 
                    `<span class="badge badge-warning" style="margin-right: 5px; margin-bottom: 5px;">${item}</span>`
                ).join('') : 'Aucun équipement'}
            </div>
        </div>
        
        <div class="modal-actions">
            <button class="btn btn-info" onclick="exportToPDF('room', ${JSON.stringify(room).replace(/"/g, '&quot;')})">
                <i class="fas fa-file-pdf"></i> Export PDF
            </button>
            <button class="btn btn-warning" onclick="closeModal(); editRoom(${room.id})">
                <i class="fas fa-edit"></i> Modifier
            </button>
            <button class="btn btn-secondary" onclick="closeModal()">
                <i class="fas fa-times"></i> Fermer
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

function deleteRoom(id) {
    confirmDelete('room', id, async () => {
        currentData.rooms = currentData.rooms.filter(r => r.id !== id);
        await apiService.deleteItem('rooms', id);
        renderRoomsTable(currentData.rooms);
        updateDashboardStats();
        createCharts();
        showAlert('Salle supprimée avec succès!', 'success');
    });
}

// ========== UTILITY FUNCTIONS ==========

function confirmDelete(entity, id, callback) {
    const confirmModal = document.getElementById('confirmModal');
    const confirmMessage = document.getElementById('confirmMessage');
    
    confirmMessage.textContent = 'Êtes-vous sûr de vouloir supprimer cet élément ?';
    confirmModal.classList.add('active');
    
    // Remove previous event listeners
    const confirmYes = document.getElementById('confirmYes');
    const confirmNo = document.getElementById('confirmNo');
    
    // Clone buttons to remove old listeners
    const newConfirmYes = confirmYes.cloneNode(true);
    const newConfirmNo = confirmNo.cloneNode(true);
    
    confirmYes.parentNode.replaceChild(newConfirmYes, confirmYes);
    confirmNo.parentNode.replaceChild(newConfirmNo, confirmNo);
    
    // Add new event listeners
    document.getElementById('confirmYes').onclick = function() {
        confirmModal.classList.remove('active');
        if (callback) callback();
    };
    
    document.getElementById('confirmNo').onclick = function() {
        confirmModal.classList.remove('active');
    };
}

function exportToPDF(type, data) {
    showAlert(`Export PDF pour ${type} - Fonctionnalité à implémenter`, 'info');
}

// Helper functions from api.js (copied here for convenience)
function generatePhone() {
    return `+212 ${Math.floor(Math.random() * 9 + 1)}${Math.random().toString().slice(2, 10)}`;
}

function generateAddress() {
    const streets = ['Rue Mohamed V', 'Avenue Hassan II', 'Boulevard Zerktouni',
                    'Rue Allal Ben Abdellah', 'Avenue des FAR'];
    const cities = ['Casablanca', 'Rabat', 'Fès', 'Marrakech', 'Tanger'];
    return `${streets[Math.floor(Math.random() * streets.length)]}, ${
            cities[Math.floor(Math.random() * cities.length)]}`;
}

// Utility function to show alerts
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

// Utility function to close modal
function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.classList.remove('active');
}

// Make sure closeModal is available globally
window.closeModal = closeModal;

console.log('fonction.js loaded successfully - All CRUD functions are available');