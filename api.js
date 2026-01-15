// api.js - API Management with External APIs

class APIService {
    constructor() {
        this.endpoints = {
            students: 'https://reqres.in/api/users',
            teachers: 'https://reqres.in/api/users',
            courses: 'https://jsonplaceholder.typicode.com/posts',
            departments: 'https://jsonplaceholder.typicode.com/albums',
            absences: 'https://jsonplaceholder.typicode.com/todos',
            schedule: 'https://jsonplaceholder.typicode.com/comments',
            rooms: 'https://jsonplaceholder.typicode.com/photos'
        };
    }
    
    // Generic fetch method with error handling
    async fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            // Return mock data if API fails
            return this.getMockData(url);
        }
    }
    
    // Mock data for offline testing
    getMockData(url) {
        console.log('Using mock data for:', url);
        
        if (url.includes('reqres.in/api/users')) {
            return {
                data: Array.from({length: 12}, (_, i) => ({
                    id: i + 1,
                    first_name: ['Ahmed', 'Fatima', 'Mohammed', 'Amina', 'Youssef', 'Khadija'][i % 6],
                    last_name: ['El Amrani', 'Bennani', 'Alaoui', 'Idrissi', 'El Fassi', 'Tazi'][i % 6],
                    email: `user${i + 1}@emsi.ma`,
                    avatar: `https://i.pravatar.cc/150?img=${i + 1}`
                })),
                total: 12,
                page: 1,
                total_pages: 1
            };
        }
        
        if (url.includes('jsonplaceholder.typicode.com/posts')) {
            return Array.from({length: 50}, (_, i) => ({
                id: i + 1,
                title: `Cours ${i + 1}`,
                body: `Description du cours ${i + 1}`
            }));
        }
        
        if (url.includes('jsonplaceholder.typicode.com/albums')) {
            return Array.from({length: 8}, (_, i) => ({
                id: i + 1,
                title: `Département ${i + 1}`
            }));
        }
        
        if (url.includes('jsonplaceholder.typicode.com/todos')) {
            return Array.from({length: 100}, (_, i) => ({
                id: i + 1,
                title: `Absence ${i + 1}`,
                completed: Math.random() > 0.5
            }));
        }
        
        if (url.includes('jsonplaceholder.typicode.com/comments')) {
            return Array.from({length: 80}, (_, i) => ({
                id: i + 1,
                postId: Math.floor(i / 4) + 1,
                name: `Professeur ${i + 1}`
            }));
        }
        
        if (url.includes('jsonplaceholder.typicode.com/photos')) {
            return Array.from({length: 50}, (_, i) => ({
                id: i + 1,
                thumbnailUrl: `https://picsum.photos/150/100?random=${i}`
            }));
        }
        
        return [];
    }
    
    // Students API (reqres.in)
    async getStudents(page = 1) {
        const data = await this.fetchData(`${this.endpoints.students}?page=${page}&per_page=12`);
        return {
            data: data.data.map(user => ({
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                avatar: user.avatar,
                department: this.getRandomDepartment(),
                status: Math.random() > 0.2 ? 'active' : 'inactive',
                enrollmentDate: this.getRandomDate(2020, 2024)
            })),
            total: data.total,
            page: data.page,
            totalPages: data.total_pages
        };
    }
    
    async getStudent(id) {
        const data = await this.fetchData(`${this.endpoints.students}/${id}`);
        return {
            id: data.data.id,
            firstName: data.data.first_name,
            lastName: data.data.last_name,
            email: data.data.email,
            avatar: data.data.avatar,
            department: this.getRandomDepartment(),
            status: 'active',
            enrollmentDate: this.getRandomDate(2020, 2024),
            phone: this.generatePhone(),
            address: this.generateAddress(),
            gpa: (Math.random() * 2 + 2).toFixed(2)
        };
    }
    
    // Teachers API (reqres.in - page 2)
    async getTeachers(page = 2) {
        const data = await this.fetchData(`${this.endpoints.teachers}?page=${page}&per_page=12`);
        return {
            data: data.data.map(user => ({
                id: user.id + 100,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                avatar: user.avatar,
                subject: this.getRandomSubject(),
                department: this.getRandomDepartment(),
                yearsExperience: Math.floor(Math.random() * 20) + 1
            })),
            total: data.total,
            page: data.page,
            totalPages: data.total_pages
        };
    }
    
    // Courses API (jsonplaceholder)
    async getCourses() {
        const data = await this.fetchData(`${this.endpoints.courses}?_limit=50`);
        return data.map(post => ({
            id: post.id,
            code: `CS${post.id.toString().padStart(3, '0')}`,
            name: post.title,
            description: post.body,
            credits: Math.floor(Math.random() * 4) + 2,
            department: this.getRandomDepartment(),
            semester: Math.floor(Math.random() * 2) + 1,
            teacherId: Math.floor(Math.random() * 12) + 101
        }));
    }
    
    // Departments API (jsonplaceholder)
    async getDepartments() {
        const data = await this.fetchData(`${this.endpoints.departments}?_limit=20`);
        const deptNames = ['Informatique', 'Génie Civil', 'Électrique', 'Mécanique', 
                          'Architecture', 'Gestion', 'Commerce', 'Finance'];
        return data.slice(0, 8).map((album, index) => ({
            id: album.id,
            code: `DEPT${album.id.toString().padStart(3, '0')}`,
            name: deptNames[index] || album.title.substring(0, 20),
            description: album.title,
            headOfDepartment: `Prof. ${this.getRandomName()}`,
            studentsCount: Math.floor(Math.random() * 200) + 50,
            teachersCount: Math.floor(Math.random() * 20) + 5
        }));
    }
    
    // Absences API (jsonplaceholder todos)
    async getAbsences() {
        const data = await this.fetchData(`${this.endpoints.absences}?_limit=100`);
        return data.map(todo => ({
            id: todo.id,
            studentId: Math.floor(Math.random() * 12) + 1,
            studentName: this.getRandomName(),
            courseId: Math.floor(Math.random() * 50) + 1,
            courseName: `Cours ${Math.floor(Math.random() * 50) + 1}`,
            date: this.getRandomDate(2024, 2024),
            reason: todo.title,
            justified: todo.completed,
            status: todo.completed ? 'justified' : 'unjustified'
        }));
    }
    
    // Schedule API (jsonplaceholder comments)
    async getSchedule() {
        const data = await this.fetchData(`${this.endpoints.schedule}?_limit=80`);
        const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
        const times = ['08:00-10:00', '10:00-12:00', '14:00-16:00', '16:00-18:00'];
        
        return data.map(comment => ({
            id: comment.id,
            courseId: comment.postId,
            courseName: `Cours ${comment.postId}`,
            teacherId: Math.floor(Math.random() * 12) + 101,
            teacherName: comment.name.substring(0, 20),
            roomId: Math.floor(Math.random() * 30) + 1,
            roomName: `Salle ${Math.floor(Math.random() * 30) + 1}`,
            day: days[Math.floor(Math.random() * days.length)],
            time: times[Math.floor(Math.random() * times.length)],
            department: this.getRandomDepartment(),
            semester: Math.floor(Math.random() * 2) + 1
        }));
    }
    
    // Rooms API (jsonplaceholder photos)
    async getRooms() {
        const data = await this.fetchData(`${this.endpoints.rooms}?_limit=50`);
        return data.map(photo => ({
            id: photo.id,
            name: `Salle ${photo.id}`,
            code: `R${photo.id.toString().padStart(3, '0')}`,
            capacity: [30, 50, 80, 100, 150][Math.floor(Math.random() * 5)],
            type: ['Cours', 'TP', 'Amphithéâtre', 'Laboratoire'][Math.floor(Math.random() * 4)],
            status: Math.random() > 0.3 ? 'available' : 'occupied',
            building: `Bâtiment ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`,
            floor: Math.floor(Math.random() * 5) + 1,
            equipment: this.getRandomEquipment(),
            thumbnail: photo.thumbnailUrl
        }));
    }
    
    // Helper methods
    getRandomDepartment() {
        const departments = ['Informatique', 'Génie Civil', 'Électrique', 'Mécanique', 
                           'Architecture', 'Gestion', 'Commerce', 'Finance'];
        return departments[Math.floor(Math.random() * departments.length)];
    }
    
    getRandomSubject() {
        const subjects = ['Programmation', 'Base de données', 'Réseaux', 'Mathématiques',
                         'Physique', 'Chimie', 'Management', 'Marketing', 'Finance',
                         'Architecture', 'Électronique', 'Mécanique'];
        return subjects[Math.floor(Math.random() * subjects.length)];
    }
    
    getRandomName() {
        const firstNames = ['Ahmed', 'Fatima', 'Mohammed', 'Amina', 'Youssef', 'Khadija',
                          'Hassan', 'Nour', 'Omar', 'Salma'];
        const lastNames = ['El Amrani', 'Bennani', 'Alaoui', 'Idrissi', 'El Fassi',
                         'Tazi', 'Berrada', 'Chraibi', 'Benjelloun', 'Lahlou'];
        return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
                lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    }
    
    getRandomDate(startYear, endYear) {
        const start = new Date(startYear, 0, 1);
        const end = new Date(endYear, 11, 31);
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date.toISOString().split('T')[0];
    }
    
    generatePhone() {
        return `+212 ${Math.floor(Math.random() * 9 + 1)}${Math.random().toString().slice(2, 10)}`;
    }
    
    generateAddress() {
        const streets = ['Rue Mohamed V', 'Avenue Hassan II', 'Boulevard Zerktouni',
                        'Rue Allal Ben Abdellah', 'Avenue des FAR'];
        const cities = ['Casablanca', 'Rabat', 'Fès', 'Marrakech', 'Tanger'];
        return `${streets[Math.floor(Math.random() * streets.length)]}, ${
                cities[Math.floor(Math.random() * cities.length)]}`;
    }
    
    getRandomEquipment() {
        const equipment = ['Projecteur', 'Tableau Interactif', 'Ordinateurs', 
                          'Climatisation', 'Sono'];
        const count = Math.floor(Math.random() * 3) + 2;
        return Array.from({length: count}, () => 
            equipment[Math.floor(Math.random() * equipment.length)]
        ).filter((v, i, a) => a.indexOf(v) === i);
    }
    
    // CRUD operations (simulated)
    async createItem(entity, data) {
        console.log(`Creating ${entity}:`, data);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true, id: Date.now(), ...data };
    }
    
    async updateItem(entity, id, data) {
        console.log(`Updating ${entity} ${id}:`, data);
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true, id, ...data };
    }
    
    async deleteItem(entity, id) {
        console.log(`Deleting ${entity} ${id}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true, id };
    }
}

// Initialize API service
const apiService = new APIService();