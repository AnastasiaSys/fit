// Основной JavaScript для административной панели

// Объект для хранения данных приложения
const adminApp = {
    currentUser: {
        name: "Администратор",
        role: "admin",
        avatar: "https://i.pravatar.cc/100?img=32",
        status: "online"
    },
    
    // Данные для демонстрации
    demoData: {
        clients: [
            { 
                id: 1, 
                name: "Иван Иванов", 
                email: "ivan@example.com", 
                phone: "+7 (999) 123-45-67", 
                membership: "Премиум", 
                status: "active", 
                lastVisit: "2023-11-14",
                joinDate: "2023-01-15",
                visits: 24,
                spent: "48,000 ₽"
            },
            { 
                id: 2, 
                name: "Мария Петрова", 
                email: "maria@example.com", 
                phone: "+7 (999) 234-56-78", 
                membership: "Стандарт", 
                status: "active", 
                lastVisit: "2023-11-13",
                joinDate: "2023-02-20",
                visits: 18,
                spent: "32,400 ₽"
            },
            { 
                id: 3, 
                name: "Алексей Смирнов", 
                email: "alex@example.com", 
                phone: "+7 (999) 345-67-89", 
                membership: "Базовый", 
                status: "active", 
                lastVisit: "2023-11-12",
                joinDate: "2023-03-10",
                visits: 12,
                spent: "21,600 ₽"
            },
            { 
                id: 4, 
                name: "Елена Козлова", 
                email: "elena@example.com", 
                phone: "+7 (999) 456-78-90", 
                membership: "Премиум", 
                status: "inactive", 
                lastVisit: "2023-11-10",
                joinDate: "2023-04-05",
                visits: 8,
                spent: "19,200 ₽"
            }
        ],
        
        trainers: [
            { 
                id: 1, 
                name: "Анна Сидорова", 
                specialization: ["Йога", "Фитнес"], 
                rating: 4.9, 
                experience: "5 лет", 
                status: "active",
                email: "anna@fitness.com",
                phone: "+7 (999) 111-22-33",
                clients: 45,
                schedule: "Пн-Пт 10:00-18:00"
            },
            { 
                id: 2, 
                name: "Дмитрий Волков", 
                specialization: ["Силовые", "Кардио"], 
                rating: 4.8, 
                experience: "7 лет", 
                status: "active",
                email: "dmitry@fitness.com",
                phone: "+7 (999) 222-33-44",
                clients: 52,
                schedule: "Вт-Сб 12:00-20:00"
            },
            { 
                id: 3, 
                name: "Ольга Морозова", 
                specialization: ["Йога", "Стретчинг"], 
                rating: 4.9, 
                experience: "4 года", 
                status: "active",
                email: "olga@fitness.com",
                phone: "+7 (999) 333-44-55",
                clients: 38,
                schedule: "Пн-Ср-Пт 9:00-17:00"
            }
        ],
        
        bookings: [
            { 
                id: 1, 
                client: "Иван Иванов", 
                clientId: 1,
                workout: "Йога утренняя", 
                workoutId: 1,
                trainer: "Анна Сидорова", 
                trainerId: 1,
                date: "2023-11-15 10:00", 
                status: "confirmed", 
                price: "1500 ₽",
                duration: "60 мин",
                notes: ""
            },
            { 
                id: 2, 
                client: "Мария Петрова", 
                clientId: 2,
                workout: "Фитнес", 
                workoutId: 2,
                trainer: "Дмитрий Волков", 
                trainerId: 2,
                date: "2023-11-15 11:00", 
                status: "confirmed", 
                price: "1200 ₽",
                duration: "45 мин",
                notes: "Первое занятие"
            },
            { 
                id: 3, 
                client: "Алексей Смирнов", 
                clientId: 3,
                workout: "Персональная тренировка", 
                workoutId: 3,
                trainer: "Дмитрий Волков", 
                trainerId: 2,
                date: "2023-11-15 14:00", 
                status: "pending", 
                price: "2500 ₽",
                duration: "60 мин",
                notes: ""
            },
            { 
                id: 4, 
                client: "Елена Козлова", 
                clientId: 4,
                workout: "Йога вечерняя", 
                workoutId: 5,
                trainer: "Ольга Морозова", 
                trainerId: 3,
                date: "2023-11-15 18:00", 
                status: "cancelled", 
                price: "1500 ₽",
                duration: "60 мин",
                notes: "Отмена по болезни"
            }
        ],
        
        workouts: [
            { 
                id: 1, 
                name: "Йога утренняя", 
                type: "group", 
                category: "yoga", 
                trainer: "Анна Сидорова", 
                trainerId: 1,
                time: "10:00", 
                duration: "60 мин", 
                capacity: 20, 
                booked: 15,
                price: "1500 ₽",
                room: "Зал 1",
                description: "Утренняя йога для пробуждения тела и духа"
            },
            { 
                id: 2, 
                name: "Фитнес", 
                type: "group", 
                category: "fitness", 
                trainer: "Дмитрий Волков", 
                trainerId: 2,
                time: "11:00", 
                duration: "45 мин", 
                capacity: 25, 
                booked: 22,
                price: "1200 ₽",
                room: "Зал 2",
                description: "Динамичная тренировка для всех уровней"
            },
            { 
                id: 3, 
                name: "Персональная тренировка", 
                type: "personal", 
                category: "strength", 
                trainer: "Дмитрий Волков", 
                trainerId: 2,
                time: "14:00", 
                duration: "60 мин", 
                capacity: 1, 
                booked: 1,
                price: "2500 ₽",
                room: "Зал 3",
                description: "Индивидуальный подход к тренировкам"
            },
            { 
                id: 4, 
                name: "Кардио", 
                type: "group", 
                category: "cardio", 
                trainer: "Анна Сидорова", 
                trainerId: 1,
                time: "16:00", 
                duration: "45 мин", 
                capacity: 30, 
                booked: 25,
                price: "1000 ₽",
                room: "Зал 2",
                description: "Интенсивная кардио тренировка"
            },
            { 
                id: 5, 
                name: "Йога вечерняя", 
                type: "group", 
                category: "yoga", 
                trainer: "Ольга Морозова", 
                trainerId: 3,
                time: "18:00", 
                duration: "60 мин", 
                capacity: 20, 
                booked: 18,
                price: "1500 ₽",
                room: "Зал 1",
                description: "Вечерняя йога для расслабления"
            }
        ],
        
        notifications: [
            { 
                id: 1, 
                type: "warning", 
                title: "Низкая заполненность занятия", 
                message: "Занятие 'Утренняя йога' заполнено только на 40%", 
                time: "2 часа назад",
                read: false
            },
            { 
                id: 2, 
                type: "info", 
                title: "Новый клиент", 
                message: "Зарегистрировался новый клиент: Алексей Смирнов", 
                time: "5 часов назад",
                read: false
            },
            { 
                id: 3, 
                type: "error", 
                title: "Проблема с платежом", 
                message: "Не удалось обработать платеж от клиента Мария Петрова", 
                time: "1 день назад",
                read: true
            },
            { 
                id: 4, 
                type: "info", 
                title: "Обновление системы", 
                message: "Запланировано обновление системы 20 ноября с 02:00 до 04:00", 
                time: "2 дня назад",
                read: true
            }
        ]
    },
    
    // Инициализация приложения
    init: function() {
        this.setCurrentDate();
        this.setupEventListeners();
        this.loadDashboardData();
        this.setupNavigation();
        this.setupModals();
        this.setupSearch();
        this.updateNotificationCount();
    },
    
    // Установка текущей даты
    setCurrentDate: function() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        
        // Обновляем дату на главной странице
        const dateElement = document.getElementById('currentDate');
        if (dateElement) {
            dateElement.textContent = now.toLocaleDateString('ru-RU', options);
        }
        
        // Установка даты по умолчанию в календарь
        const dateInput = document.getElementById('scheduleDate');
        if (dateInput) {
            dateInput.value = now.toISOString().split('T')[0];
        }
        
        // Установка дат в финансовом отчете
        const startDate = document.getElementById('startDate');
        const endDate = document.getElementById('endDate');
        
        if (startDate && endDate) {
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            
            startDate.value = firstDay.toISOString().split('T')[0];
            endDate.value = lastDay.toISOString().split('T')[0];
        }
    },
    
    // Настройка обработчиков событий
    setupEventListeners: function() {
        // Навигация
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateTo(link.dataset.page);
            });
        });
        
        // Быстрые действия
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.handleQuickAction(action);
            });
        });
        
        // Кнопки добавления
        const addClientBtn = document.getElementById('addClientBtn');
        if (addClientBtn) {
            addClientBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showAddClientModal();
            });
        }
        
        const addTrainerBtn = document.getElementById('addTrainerBtn');
        if (addTrainerBtn) {
            addTrainerBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showAddTrainerModal();
            });
        }
        
        const createWorkoutBtn = document.getElementById('createWorkoutBtn');
        if (createWorkoutBtn) {
            createWorkoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showCreateWorkoutModal();
            });
        }
        
        const createBookingBtn = document.getElementById('createBookingBtn');
        if (createBookingBtn) {
            createBookingBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showCreateBookingModal();
            });
        }
        
        // Уведомления
        const notificationBtn = document.querySelector('.notification-btn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showNotifications();
            });
        }
        
        // Поиск
        const globalSearch = document.getElementById('globalSearch');
        if (globalSearch) {
            globalSearch.addEventListener('input', (e) => {
                this.handleGlobalSearch(e.target.value);
            });
        }
        
        // Выход
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }
        
        // Сохранение настроек
        const saveSettingsBtn = document.getElementById('saveSettingsBtn');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.saveSettings();
            });
        }
        
        // Вкладки настроек
        document.querySelectorAll('.settings-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                this.switchSettingsTab(tabId);
            });
        });
        
        // Закрытие клика вне dropdown
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.notifications-dropdown')) {
                const dropdown = document.querySelector('.notifications-dropdown .dropdown-menu');
                if (dropdown) {
                    dropdown.classList.remove('active');
                }
            }
        });
    },
    
    // Настройка навигации
    setupNavigation: function() {
        // Обработка кликов по ссылкам навигации
        document.querySelectorAll('[data-page]').forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = element.dataset.page;
                this.navigateTo(pageId);
            });
        });
        
        // Добавляем обработчик для view-all ссылок
        document.querySelectorAll('.view-all').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.dataset.page;
                if (pageId) {
                    this.navigateTo(pageId);
                }
            });
        });
    },
    
    // Навигация между страницами
    navigateTo: function(pageId) {
        // Обновление активной ссылки в навигации
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Скрытие всех страниц
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Показ выбранной страницы
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.updatePageTitle(pageId);
            this.updateBreadcrumbs(pageId);
            this.loadPageData(pageId);
        }
        
        // Закрытие мобильного меню если открыто
        this.closeMobileMenu();
    },
    
    // Обновление заголовка страницы
    updatePageTitle: function(pageId) {
        const titles = {
            dashboard: 'Дашборд',
            clients: 'Управление клиентами',
            trainers: 'Управление тренерами',
            schedule: 'Управление расписанием',
            workouts: 'Управление занятиями',
            bookings: 'Управление записями',
            finances: 'Финансовый отчет',
            reports: 'Отчеты и аналитика',
            settings: 'Настройки системы'
        };
        
        const title = titles[pageId] || 'Административная панель';
        const pageTitleElement = document.getElementById('pageTitle');
        if (pageTitleElement) {
            pageTitleElement.textContent = title;
        }
    },
    
    // Обновление навигационной цепочки
    updateBreadcrumbs: function(pageId) {
        const breadcrumbs = {
            dashboard: ['Дашборд'],
            clients: ['Дашборд', 'Клиенты'],
            trainers: ['Дашборд', 'Тренеры'],
            schedule: ['Дашборд', 'Расписание'],
            workouts: ['Дашборд', 'Занятия'],
            bookings: ['Дашборд', 'Записи'],
            finances: ['Дашборд', 'Финансы'],
            reports: ['Дашборд', 'Отчеты'],
            settings: ['Дашборд', 'Настройки']
        };
        
        const items = breadcrumbs[pageId] || ['Дашборд'];
        const breadcrumbsContainer = document.getElementById('breadcrumbs');
        if (!breadcrumbsContainer) return;
        
        breadcrumbsContainer.innerHTML = '';
        
        items.forEach((item, index) => {
            const span = document.createElement('span');
            span.className = `breadcrumb-item ${index === items.length - 1 ? 'active' : ''}`;
            span.textContent = item;
            
            if (index < items.length - 1) {
                span.style.cursor = 'pointer';
                span.addEventListener('click', () => {
                    const targetPage = Object.keys(breadcrumbs).find(key => 
                        JSON.stringify(breadcrumbs[key]) === JSON.stringify(items.slice(0, index + 1))
                    );
                    if (targetPage) {
                        this.navigateTo(targetPage);
                    }
                });
            }
            
            breadcrumbsContainer.appendChild(span);
        });
    },
    
    // Загрузка данных для дашборда
    loadDashboardData: function() {
        // Обновление статистики
        this.updateDashboardStats();
        
        // Загрузка последних записей
        this.loadRecentBookings();
        
        // Загрузка занятий на сегодня
        this.loadTodayWorkouts();
        
        // Загрузка системных уведомлений
        this.loadSystemAlerts();
        
        // Обновление приветствия
        const welcomeName = document.getElementById('adminWelcomeName');
        if (welcomeName) {
            welcomeName.textContent = this.currentUser.name;
        }
        
        // Обновление счетчика сегодняшних записей
        const todayBookings = document.getElementById('todayBookings');
        if (todayBookings) {
            const today = new Date().toISOString().split('T')[0];
            const todayCount = this.demoData.bookings.filter(b => 
                b.date.startsWith(today) && b.status === 'confirmed'
            ).length;
            todayBookings.textContent = todayCount;
        }
    },
    
    // Обновление статистики дашборда
    updateDashboardStats: function() {
        const totalClients = this.demoData.clients.length;
        const activeClients = this.demoData.clients.filter(c => c.status === 'active').length;
        const activeBookings = this.demoData.bookings.filter(b => b.status === 'confirmed').length;
        
        // Рассчитываем месячный доход (пример)
        const monthlyRevenue = this.demoData.bookings
            .filter(b => b.status === 'confirmed')
            .reduce((sum, booking) => {
                const price = parseInt(booking.price.replace(/[^\d]/g, ''));
                return sum + (isNaN(price) ? 0 : price);
            }, 0);
        
        // Форматируем числа
        document.getElementById('totalClients').textContent = totalClients;
        document.getElementById('activeBookings').textContent = activeBookings;
        document.getElementById('monthlyRevenue').textContent = this.formatCurrency(monthlyRevenue);
    },
    
    // Форматирование валюты
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('ru-RU').format(amount) + ' ₽';
    },
    
    // Загрузка данных для конкретной страницы
    loadPageData: function(pageId) {
        switch(pageId) {
            case 'clients':
                this.loadClientsData();
                break;
            case 'trainers':
                this.loadTrainersData();
                break;
            case 'workouts':
                this.loadWorkoutsData();
                break;
            case 'bookings':
                this.loadBookingsData();
                break;
            case 'finances':
                this.loadFinancesData();
                break;
            case 'reports':
                this.loadReportsData();
                break;
        }
    },
    
    // Загрузка последних записей
    loadRecentBookings: function() {
        const container = document.getElementById('recentBookings');
        if (!container) return;
        
        // Берем последние 3 подтвержденные записи
        const recentBookings = this.demoData.bookings
            .filter(b => b.status === 'confirmed')
            .slice(0, 3);
        
        container.innerHTML = '';
        
        recentBookings.forEach(booking => {
            const date = new Date(booking.date);
            const time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
            
            const bookingHTML = `
                <div class="booking-item" onclick="adminApp.viewBookingDetails(${booking.id})">
                    <div class="booking-time">${time}</div>
                    <div class="booking-details">
                        <h4>${booking.workout}</h4>
                        <p>${booking.client} • ${date.toLocaleDateString('ru-RU')}</p>
                    </div>
                    <span class="workout-status ${booking.booked >= booking.capacity ? 'full' : 'available'}">
                        ${this.getStatusText(booking.status)}
                    </span>
                </div>
            `;
            
            container.innerHTML += bookingHTML;
        });
    },
    
    // Загрузка занятий на сегодня
    loadTodayWorkouts: function() {
        const container = document.getElementById('todayWorkouts');
        if (!container) return;
        
        const today = new Date().toISOString().split('T')[0];
        const todayWorkouts = this.demoData.workouts;
        
        container.innerHTML = '';
        
        todayWorkouts.forEach(workout => {
            const percentage = (workout.booked / workout.capacity) * 100;
            const status = percentage >= 90 ? 'full' : 'available';
            
            const workoutHTML = `
                <div class="workout-item" onclick="adminApp.viewWorkoutDetails(${workout.id})">
                    <div class="workout-info">
                        <h4>${workout.name}</h4>
                        <p>${workout.trainer} • ${workout.time}</p>
                    </div>
                    <span class="workout-status ${status}">
                        ${workout.booked}/${workout.capacity}
                    </span>
                </div>
            `;
            
            container.innerHTML += workoutHTML;
        });
    },
    
    // Загрузка системных уведомлений
    loadSystemAlerts: function() {
        const container = document.getElementById('systemAlerts');
        if (!container) return;
        
        const alerts = this.demoData.notifications.slice(0, 3);
        
        container.innerHTML = '';
        
        alerts.forEach(notification => {
            const icon = notification.type === 'warning' ? 'fa-exclamation-triangle' : 
                        notification.type === 'error' ? 'fa-times-circle' : 'fa-info-circle';
            
            const alertHTML = `
                <div class="alert-item ${notification.type}">
                    <div class="alert-icon">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div class="alert-content">
                        <h4>${notification.title}</h4>
                        <p>${notification.message}</p>
                        <div class="alert-time">${notification.time}</div>
                    </div>
                </div>
            `;
            
            container.innerHTML += alertHTML;
        });
    },
    
    // Загрузка данных клиентов
    loadClientsData: function() {
        const container = document.getElementById('clientsList');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.demoData.clients.forEach(client => {
            const statusClass = client.status === 'active' ? 'text-success' : 'text-danger';
            const statusText = client.status === 'active' ? 'Активен' : 'Неактивен';
            
            const clientHTML = `
                <tr>
                    <td>#${client.id}</td>
                    <td><strong>${client.name}</strong></td>
                    <td>${client.email}</td>
                    <td>${client.phone}</td>
                    <td><span class="badge" style="background: ${this.getMembershipColor(client.membership)}">${client.membership}</span></td>
                    <td><span class="${statusClass}">${statusText}</span></td>
                    <td>${client.lastVisit}</td>
                    <td>
                        <div class="d-flex gap-1">
                            <button class="btn btn-sm btn-secondary" onclick="adminApp.editClient(${client.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="adminApp.deleteClient(${client.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            
            container.innerHTML += clientHTML;
        });
        
        // Обновляем статистику клиентов
        this.updateClientsStats();
    },
    
    // Обновление статистики клиентов
    updateClientsStats: function() {
        const totalClients = this.demoData.clients.length;
        const activeClients = this.demoData.clients.filter(c => c.status === 'active').length;
        const activePercentage = Math.round((activeClients / totalClients) * 100);
        
        // Находим новых клиентов в этом месяце
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const newThisMonth = this.demoData.clients.filter(client => {
            const joinDate = new Date(client.joinDate);
            return joinDate.getMonth() === currentMonth && joinDate.getFullYear() === currentYear;
        }).length;
        
        const statsContent = document.querySelector('.stats-content');
        if (statsContent) {
            statsContent.innerHTML = `
                <div class="stat-item">
                    <span class="stat-label">Всего клиентов</span>
                    <span class="stat-number">${totalClients}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Активные</span>
                    <span class="stat-number">${activePercentage}%</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Новых в этом месяце</span>
                    <span class="stat-number">${newThisMonth}</span>
                </div>
            `;
        }
    },
    
    // Получение цвета для типа абонемента
    getMembershipColor: function(membership) {
        const colors = {
            'Базовый': '#3498db',
            'Стандарт': '#2ecc71',
            'Премиум': '#9b59b6'
        };
        return colors[membership] || '#95a5a6';
    },
    
    // Загрузка данных тренеров
    loadTrainersData: function() {
        const container = document.getElementById('trainersGrid');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.demoData.trainers.forEach(trainer => {
            const specializations = trainer.specialization.map(spec => 
                `<span class="tag" style="background: #e8f4fd; color: var(--primary-color); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">${spec}</span>`
            ).join(' ');
            
            const trainerHTML = `
                <div class="trainer-card">
                    <div class="trainer-header">
                        <div class="trainer-avatar">
                            <img src="https://i.pravatar.cc/80?img=${trainer.id + 10}" alt="${trainer.name}">
                        </div>
                        <div class="trainer-info">
                            <h3>${trainer.name}</h3>
                            <div class="trainer-specialization">${trainer.specialization.join(', ')}</div>
                            <div class="trainer-rating">
                                <i class="fas fa-star"></i>
                                <span>${trainer.rating}</span>
                                <span class="trainer-experience">• ${trainer.experience}</span>
                            </div>
                        </div>
                    </div>
                    <div class="trainer-stats">
                        <div>
                            <div class="stat-label">Клиентов</div>
                            <div class="stat-value">${trainer.clients}</div>
                        </div>
                        <div>
                            <div class="stat-label">График</div>
                            <div class="stat-value">${trainer.schedule}</div>
                        </div>
                    </div>
                    <div class="trainer-actions">
                        <button class="btn btn-primary btn-sm" onclick="adminApp.viewTrainerSchedule(${trainer.id})">
                            <i class="fas fa-calendar"></i> Расписание
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="adminApp.editTrainer(${trainer.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </div>
            `;
            
            container.innerHTML += trainerHTML;
        });
    },
    
    // Загрузка данных занятий
    loadWorkoutsData: function() {
        const container = document.getElementById('workoutsList');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.demoData.workouts.forEach(workout => {
            const percentage = (workout.booked / workout.capacity) * 100;
            
            const workoutHTML = `
                <div class="workout-card" onclick="adminApp.showWorkoutDetails(${workout.id})">
                    <div class="workout-header">
                        <h4>${workout.name}</h4>
                        <span class="workout-type ${workout.type}">${workout.type === 'group' ? 'Групповое' : 'Персональное'}</span>
                    </div>
                    <div class="workout-details">
                        <div class="detail-item">
                            <i class="fas fa-user-tie"></i>
                            <span>${workout.trainer}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>${workout.time} (${workout.duration})</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <span>${workout.booked}/${workout.capacity}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-ruble-sign"></i>
                            <span>${workout.price}</span>
                        </div>
                    </div>
                    <div class="workout-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percentage}%"></div>
                        </div>
                        <span class="progress-text">${Math.round(percentage)}%</span>
                    </div>
                    <div class="workout-actions">
                        <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); adminApp.editWorkout(${workout.id})">
                            <i class="fas fa-edit"></i> Редактировать
                        </button>
                    </div>
                </div>
            `;
            
            container.innerHTML += workoutHTML;
        });
    },
    
    // Загрузка данных записей
    loadBookingsData: function() {
        const container = document.getElementById('bookingsList');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.demoData.bookings.forEach(booking => {
            const date = new Date(booking.date);
            const dateStr = date.toLocaleDateString('ru-RU');
            const timeStr = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
            
            const statusClass = {
                confirmed: 'text-success',
                pending: 'text-warning',
                cancelled: 'text-danger'
            }[booking.status];
            
            const statusText = {
                confirmed: 'Подтверждена',
                pending: 'Ожидает',
                cancelled: 'Отменена'
            }[booking.status];
            
            const bookingHTML = `
                <tr>
                    <td>#${booking.id}</td>
                    <td><strong>${booking.client}</strong></td>
                    <td>${booking.workout}</td>
                    <td>${booking.trainer}</td>
                    <td>${dateStr} ${timeStr}</td>
                    <td><span class="${statusClass}">${statusText}</span></td>
                    <td>${booking.price}</td>
                    <td>
                        <div class="d-flex gap-1">
                            <button class="btn btn-sm btn-secondary" onclick="adminApp.editBooking(${booking.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="adminApp.cancelBooking(${booking.id})">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            
            container.innerHTML += bookingHTML;
        });
        
        // Обновляем сводку записей
        this.updateBookingsSummary();
    },
    
    // Обновление сводки записей
    updateBookingsSummary: function() {
        const today = new Date().toISOString().split('T')[0];
        const todayBookings = this.demoData.bookings.filter(b => b.date.startsWith(today));
        
        const total = todayBookings.length;
        const confirmed = todayBookings.filter(b => b.status === 'confirmed').length;
        const pending = todayBookings.filter(b => b.status === 'pending').length;
        
        // Рассчитываем ожидаемый доход
        const expectedRevenue = todayBookings
            .filter(b => b.status === 'confirmed')
            .reduce((sum, booking) => {
                const price = parseInt(booking.price.replace(/[^\d]/g, ''));
                return sum + (isNaN(price) ? 0 : price);
            }, 0);
        
        const summaryContent = document.querySelector('.summary-content');
        if (summaryContent) {
            summaryContent.innerHTML = `
                <div class="summary-item">
                    <span class="summary-label">Всего записей:</span>
                    <span class="summary-value">${total}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Подтверждено:</span>
                    <span class="summary-value">${confirmed}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Ожидают:</span>
                    <span class="summary-value">${pending}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Ожидаемый доход:</span>
                    <span class="summary-value">${this.formatCurrency(expectedRevenue)}</span>
                </div>
            `;
        }
    },
    
    // Загрузка финансовых данных
    loadFinancesData: function() {
        const transactionsList = document.getElementById('transactionsList');
        if (!transactionsList) return;
        
        // Демо данные транзакций
        const transactions = [
            { date: '2023-11-15', client: 'Иван Иванов', type: 'Оплата абонемента', amount: '12,000 ₽', status: 'Успешно' },
            { date: '2023-11-14', client: 'Мария Петрова', type: 'Оплата занятия', amount: '1,500 ₽', status: 'Успешно' },
            { date: '2023-11-13', client: 'Алексей Смирнов', type: 'Оплата абонемента', amount: '6,500 ₽', status: 'Успешно' },
            { date: '2023-11-12', client: 'Елена Козлова', type: 'Возврат средств', amount: '-1,500 ₽', status: 'Возврат' },
            { date: '2023-11-11', client: 'Дмитрий Соколов', type: 'Оплата занятия', amount: '2,000 ₽', status: 'Успешно' },
            { date: '2023-11-10', client: 'Анна Кузнецова', type: 'Оплата абонемента', amount: '12,000 ₽', status: 'Ожидает' }
        ];
        
        transactionsList.innerHTML = '';
        
        transactions.forEach(transaction => {
            const statusClass = transaction.status === 'Успешно' ? 'text-success' : 
                              transaction.status === 'Возврат' ? 'text-danger' : 'text-warning';
            
            const transactionHTML = `
                <tr>
                    <td>${transaction.date}</td>
                    <td>${transaction.client}</td>
                    <td>${transaction.type}</td>
                    <td><strong>${transaction.amount}</strong></td>
                    <td><span class="${statusClass}">${transaction.status}</span></td>
                </tr>
            `;
            
            transactionsList.innerHTML += transactionHTML;
        });
    },
    
    // Загрузка данных отчетов
    loadReportsData: function() {
        // Здесь будет загрузка данных для отчетов
        console.log('Загрузка данных отчетов...');
    },
    
    // Настройка модальных окон
    setupModals: function() {
        // Закрытие модальных окон
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeAllModals();
            });
        });
        
        // Закрытие по клику вне модального окна
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeAllModals();
            }
        });
        
        // Закрытие по Esc
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    },
    
    // Настройка поиска
    setupSearch: function() {
        const clientSearch = document.getElementById('clientSearch');
        if (clientSearch) {
            clientSearch.addEventListener('input', (e) => {
                this.searchClients(e.target.value);
            });
        }
        
        const trainerSearch = document.getElementById('trainerSearch');
        if (trainerSearch) {
            trainerSearch.addEventListener('input', (e) => {
                this.searchTrainers(e.target.value);
            });
        }
    },
    
    // Глобальный поиск
    handleGlobalSearch: function(query) {
        if (query.length < 2) {
            // Сбрасываем результаты поиска
            this.resetSearchResults();
            return;
        }
        
        query = query.toLowerCase();
        
        // Ищем во всех данных
        const results = {
            clients: this.demoData.clients.filter(client => 
                client.name.toLowerCase().includes(query) ||
                client.email.toLowerCase().includes(query) ||
                client.phone.includes(query)
            ),
            trainers: this.demoData.trainers.filter(trainer => 
                trainer.name.toLowerCase().includes(query)
            ),
            workouts: this.demoData.workouts.filter(workout => 
                workout.name.toLowerCase().includes(query) ||
                workout.trainer.toLowerCase().includes(query)
            )
        };
        
        this.showSearchResults(results);
    },
    
    // Сброс результатов поиска
    resetSearchResults: function() {
        // Здесь будет логика сброса результатов поиска
    },
    
    // Показать результаты поиска
    showSearchResults: function(results) {
        // Здесь будет логика отображения результатов поиска
        console.log('Результаты поиска:', results);
    },
    
    // Быстрые действия
    handleQuickAction: function(action) {
        switch(action) {
            case 'add-client':
                this.showAddClientModal();
                break;
            case 'add-trainer':
                this.showAddTrainerModal();
                break;
            case 'create-workout':
                this.showCreateWorkoutModal();
                break;
            case 'generate-report':
                this.generateQuickReport();
                break;
        }
    },
    
    // Показать модальное окно добавления клиента
    showAddClientModal: function() {
        const modal = document.getElementById('addClientModal');
        const form = document.getElementById('addClientForm');
        
        if (!modal || !form) return;
        
        form.innerHTML = `
            <div class="form-group">
                <label for="clientName">ФИО:</label>
                <input type="text" id="clientName" class="form-control" required placeholder="Иванов Иван Иванович">
            </div>
            <div class="form-group">
                <label for="clientEmail">Email:</label>
                <input type="email" id="clientEmail" class="form-control" required placeholder="ivan@example.com">
            </div>
            <div class="form-group">
                <label for="clientPhone">Телефон:</label>
                <input type="tel" id="clientPhone" class="form-control" required placeholder="+7 (999) 123-45-67">
            </div>
            <div class="form-group">
                <label for="clientBirthDate">Дата рождения:</label>
                <input type="date" id="clientBirthDate" class="form-control">
            </div>
            <div class="form-group">
                <label for="clientMembership">Абонемент:</label>
                <select id="clientMembership" class="form-control">
                    <option value="basic">Базовый</option>
                    <option value="standard">Стандарт</option>
                    <option value="premium">Премиум</option>
                </select>
            </div>
            <div class="form-group">
                <label for="clientNotes">Примечания:</label>
                <textarea id="clientNotes" class="form-control" rows="3" placeholder="Дополнительная информация..."></textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Добавить клиента</button>
                <button type="button" class="btn btn-secondary" onclick="adminApp.closeAllModals()">Отмена</button>
            </div>
        `;
        
        form.onsubmit = (e) => {
            e.preventDefault();
            this.addNewClient();
        };
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    // Показать модальное окно добавления тренера
    showAddTrainerModal: function() {
        const modal = document.getElementById('addTrainerModal');
        const form = document.getElementById('addTrainerForm');
        
        if (!modal || !form) return;
        
        form.innerHTML = `
            <div class="form-group">
                <label for="trainerName">ФИО:</label>
                <input type="text" id="trainerName" class="form-control" required placeholder="Сидорова Анна Петровна">
            </div>
            <div class="form-group">
                <label for="trainerSpecialization">Специализация:</label>
                <select id="trainerSpecialization" class="form-control" multiple style="height: 120px;">
                    <option value="yoga">Йога</option>
                    <option value="fitness">Фитнес</option>
                    <option value="cardio">Кардио</option>
                    <option value="strength">Силовые</option>
                    <option value="stretching">Стретчинг</option>
                    <option value="pilates">Пилатес</option>
                    <option value="dance">Танцы</option>
                </select>
                <small class="text-muted">Удерживайте Ctrl для выбора нескольких вариантов</small>
            </div>
            <div class="form-group">
                <label for="trainerExperience">Опыт работы (лет):</label>
                <input type="number" id="trainerExperience" class="form-control" min="0" required>
            </div>
            <div class="form-group">
                <label for="trainerEmail">Email:</label>
                <input type="email" id="trainerEmail" class="form-control" required placeholder="anna@fitness.com">
            </div>
            <div class="form-group">
                <label for="trainerPhone">Телефон:</label>
                <input type="tel" id="trainerPhone" class="form-control" required placeholder="+7 (999) 111-22-33">
            </div>
            <div class="form-group">
                <label for="trainerSchedule">График работы:</label>
                <input type="text" id="trainerSchedule" class="form-control" placeholder="Пн-Пт 10:00-18:00">
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Добавить тренера</button>
                <button type="button" class="btn btn-secondary" onclick="adminApp.closeAllModals()">Отмена</button>
            </div>
        `;
        
        form.onsubmit = (e) => {
            e.preventDefault();
            this.addNewTrainer();
        };
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    // Показать уведомления
    showNotifications: function() {
        // Создаем dropdown для уведомлений
        let dropdown = document.querySelector('.notifications-dropdown .dropdown-menu');
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.className = 'dropdown-menu';
            document.querySelector('.notifications-dropdown').appendChild(dropdown);
        }
        
        const unreadCount = this.demoData.notifications.filter(n => !n.read).length;
        
        dropdown.innerHTML = `
            <div class="dropdown-header">
                <h4>Уведомления</h4>
                <span class="badge">${unreadCount} новых</span>
            </div>
            <div class="dropdown-content">
                ${this.demoData.notifications.map(notification => `
                    <div class="notification-item ${notification.read ? 'read' : 'unread'}">
                        <div class="notification-icon">
                            <i class="fas ${notification.type === 'warning' ? 'fa-exclamation-triangle' : 
                                         notification.type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}"></i>
                        </div>
                        <div class="notification-content">
                            <h5>${notification.title}</h5>
                            <p>${notification.message}</p>
                            <span class="notification-time">${notification.time}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="dropdown-footer">
                <a href="#" class="view-all">Показать все уведомления</a>
            </div>
        `;
        
        dropdown.classList.toggle('active');
        
        // Помечаем уведомления как прочитанные
        this.demoData.notifications.forEach(n => n.read = true);
        this.updateNotificationCount();
    },
    
    // Обновление счетчика уведомлений
    updateNotificationCount: function() {
        const unreadCount = this.demoData.notifications.filter(n => !n.read).length;
        const notificationCount = document.querySelector('.notification-count');
        
        if (notificationCount) {
            if (unreadCount > 0) {
                notificationCount.textContent = unreadCount;
                notificationCount.style.display = 'flex';
            } else {
                notificationCount.style.display = 'none';
            }
        }
    },
    
    // Закрыть все модальные окна
    closeAllModals: function() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    },
    
    // Добавить нового клиента
    addNewClient: function() {
        // Здесь будет логика добавления клиента
        this.closeAllModals();
        this.showNotification('Клиент успешно добавлен', 'success');
        
        // Обновляем данные если находимся на странице клиентов
        if (document.getElementById('clients-page')?.classList.contains('active')) {
            this.loadClientsData();
        }
    },
    
    // Добавить нового тренера
    addNewTrainer: function() {
        // Здесь будет логика добавления тренера
        this.closeAllModals();
        this.showNotification('Тренер успешно добавлен', 'success');
        
        // Обновляем данные если находимся на странице тренеров
        if (document.getElementById('trainers-page')?.classList.contains('active')) {
            this.loadTrainersData();
        }
    },
    
    // Показать уведомление (тост)
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                         type === 'error' ? 'fa-times-circle' : 
                         type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Автоматическое скрытие
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },
    
    // Выход из системы
    logout: function() {
        if (confirm('Вы уверены, что хотите выйти?')) {
            window.location.href = '../index.html';
        }
    },
    
    // Переключение вкладок настроек
    switchSettingsTab: function(tabId) {
        // Обновляем активную вкладку
        document.querySelectorAll('.settings-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        const activeTab = document.querySelector(`.settings-tab[data-tab="${tabId}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // Показываем соответствующую секцию
        document.querySelectorAll('.settings-section').forEach(section => {
            section.classList.remove('active');
        });
        
        const activeSection = document.getElementById(`${tabId}-settings`);
        if (activeSection) {
            activeSection.classList.add('active');
        }
    },
    
    // Сохранение настроек
    saveSettings: function() {
        // Здесь будет логика сохранения настроек
        this.showNotification('Настройки успешно сохранены', 'success');
    },
    
    // Вспомогательные функции
    getStatusText: function(status) {
        const statusMap = {
            confirmed: 'Подтверждена',
            pending: 'Ожидает',
            cancelled: 'Отменена'
        };
        return statusMap[status] || status;
    },
    
    // Закрытие мобильного меню
    closeMobileMenu: function() {
        const sidebar = document.querySelector('.admin-sidebar');
        if (window.innerWidth < 992 && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    },
    
    // Методы для работы с клиентами
    editClient: function(clientId) {
        console.log('Редактирование клиента:', clientId);
        this.showNotification('Редактирование клиента', 'info');
    },
    
    deleteClient: function(clientId) {
        if (confirm('Вы уверены, что хотите удалить клиента?')) {
            console.log('Удаление клиента:', clientId);
            this.showNotification('Клиент удален', 'success');
        }
    },
    
    // Методы для работы с тренерами
    viewTrainerSchedule: function(trainerId) {
        console.log('Просмотр расписания тренера:', trainerId);
        this.showNotification('Загрузка расписания тренера', 'info');
    },
    
    editTrainer: function(trainerId) {
        console.log('Редактирование тренера:', trainerId);
        this.showNotification('Редактирование тренера', 'info');
    },
    
    // Методы для работы с занятиями
    showWorkoutDetails: function(workoutId) {
        console.log('Просмотр деталей занятия:', workoutId);
        
        const workout = this.demoData.workouts.find(w => w.id === workoutId);
        if (!workout) return;
        
        const detailsPanel = document.getElementById('workoutDetailsPanel');
        if (!detailsPanel) return;
        
        const percentage = Math.round((workout.booked / workout.capacity) * 100);
        
        detailsPanel.innerHTML = `
            <div class="workout-details-panel">
                <h3>${workout.name}</h3>
                <div class="detail-section mt-20">
                    <div class="detail-item">
                        <strong>Тренер:</strong>
                        <span>${workout.trainer}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Время:</strong>
                        <span>${workout.time} (${workout.duration})</span>
                    </div>
                    <div class="detail-item">
                        <strong>Зал:</strong>
                        <span>${workout.room}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Тип:</strong>
                        <span>${workout.type === 'group' ? 'Групповое' : 'Персональное'}</span>
                    </div>
                    <div class="detail-item">
                        <strong>Стоимость:</strong>
                        <span>${workout.price}</span>
                    </div>
                </div>
                
                <div class="detail-section mt-20">
                    <h4>Заполненность</h4>
                    <div class="workout-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percentage}%"></div>
                        </div>
                        <span class="progress-text">${workout.booked}/${workout.capacity} (${percentage}%)</span>
                    </div>
                </div>
                
                <div class="detail-section mt-20">
                    <h4>Описание</h4>
                    <p>${workout.description}</p>
                </div>
                
                <div class="workout-actions mt-20">
                    <button class="btn btn-primary" onclick="adminApp.editWorkout(${workout.id})">
                        <i class="fas fa-edit"></i> Редактировать
                    </button>
                    <button class="btn btn-secondary" onclick="adminApp.viewWorkoutParticipants(${workout.id})">
                        <i class="fas fa-users"></i> Участники
                    </button>
                </div>
            </div>
        `;
    },
    
    editWorkout: function(workoutId) {
        console.log('Редактирование занятия:', workoutId);
        this.showNotification('Редактирование занятия', 'info');
    },
    
    viewWorkoutParticipants: function(workoutId) {
        console.log('Просмотр участников занятия:', workoutId);
        this.showNotification('Загрузка списка участников', 'info');
    },
    
    // Методы для работы с записями
    viewBookingDetails: function(bookingId) {
        console.log('Просмотр деталей записи:', bookingId);
        this.showNotification('Загрузка деталей записи', 'info');
    },
    
    editBooking: function(bookingId) {
        console.log('Редактирование записи:', bookingId);
        this.showNotification('Редактирование записи', 'info');
    },
    
    cancelBooking: function(bookingId) {
        if (confirm('Вы уверены, что хотите отменить запись?')) {
            console.log('Отмена записи:', bookingId);
            this.showNotification('Запись отменена', 'success');
        }
    },
    
    // Поиск клиентов
    searchClients: function(query) {
        if (query.length < 2) {
            this.loadClientsData(); // Сбрасываем к исходным данным
            return;
        }
        
        query = query.toLowerCase();
        const filteredClients = this.demoData.clients.filter(client => 
            client.name.toLowerCase().includes(query) ||
            client.email.toLowerCase().includes(query) ||
            client.phone.includes(query)
        );
        
        this.updateClientsTable(filteredClients);
    },
    
    updateClientsTable: function(clients) {
        const container = document.getElementById('clientsList');
        if (!container) return;
        
        container.innerHTML = '';
        
        clients.forEach(client => {
            const statusClass = client.status === 'active' ? 'text-success' : 'text-danger';
            const statusText = client.status === 'active' ? 'Активен' : 'Неактивен';
            
            const clientHTML = `
                <tr>
                    <td>#${client.id}</td>
                    <td><strong>${client.name}</strong></td>
                    <td>${client.email}</td>
                    <td>${client.phone}</td>
                    <td><span class="badge" style="background: ${this.getMembershipColor(client.membership)}">${client.membership}</span></td>
                    <td><span class="${statusClass}">${statusText}</span></td>
                    <td>${client.lastVisit}</td>
                    <td>
                        <div class="d-flex gap-1">
                            <button class="btn btn-sm btn-secondary" onclick="adminApp.editClient(${client.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="adminApp.deleteClient(${client.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            
            container.innerHTML += clientHTML;
        });
    },
    
    // Поиск тренеров
    searchTrainers: function(query) {
        console.log('Поиск тренеров:', query);
        // Реализация поиска тренеров
    },
    
    // Дополнительные методы
    showCreateWorkoutModal: function() {
        this.showNotification('Создание нового занятия', 'info');
    },
    
    showCreateBookingModal: function() {
        this.showNotification('Создание новой записи', 'info');
    },
    
    generateQuickReport: function() {
        this.showNotification('Отчет сгенерирован', 'success');
    }
};

// Инициализация приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    adminApp.init();
});

// Добавляем CSS для dropdown уведомлений
const dropdownStyles = document.createElement('style');
dropdownStyles.textContent = `
    .dropdown-menu {
        position: absolute;
        top: 100%;
        right: 0;
        width: 320px;
        background: white;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        display: none;
        z-index: 1000;
        margin-top: 10px;
    }
    
    .dropdown-menu.active {
        display: block;
        animation: slideDown 0.3s ease;
    }
    
    .dropdown-header {
        padding: 1rem 1.25rem;
        border-bottom: 1px solid var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .dropdown-header h4 {
        margin: 0;
        font-size: 1rem;
        color: var(--secondary-color);
    }
    
    .dropdown-content {
        max-height: 300px;
        overflow-y: auto;
    }
    
    .notification-item {
        padding: 1rem 1.25rem;
        border-bottom: 1px solid var(--border-color);
        display: flex;
        gap: 12px;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .notification-item:hover {
        background: var(--light-bg);
    }
    
    .notification-item.unread {
        background: rgba(52, 152, 219, 0.05);
    }
    
    .notification-icon {
        flex-shrink: 0;
    }
    
    .notification-icon i {
        font-size: 1.25rem;
        color: var(--primary-color);
    }
    
    .notification-content {
        flex: 1;
    }
    
    .notification-content h5 {
        margin: 0 0 5px 0;
        font-size: 0.9rem;
        color: var(--secondary-color);
    }
    
    .notification-content p {
        margin: 0;
        font-size: 0.85rem;
        color: var(--text-light);
        line-height: 1.4;
    }
    
    .notification-time {
        display: block;
        font-size: 0.75rem;
        color: var(--text-light);
        margin-top: 5px;
    }
    
    .dropdown-footer {
        padding: 1rem 1.25rem;
        text-align: center;
        border-top: 1px solid var(--border-color);
    }
    
    .dropdown-footer .view-all {
        color: var(--primary-color);
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 600;
    }
    
    .dropdown-footer .view-all:hover {
        text-decoration: underline;
    }
`;

document.head.appendChild(dropdownStyles);