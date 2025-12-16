// Основной объект приложения
const TrainerApp = {
    // Текущий тренер
    currentTrainer: {
        id: 1,
        name: "Анна Смирнова",
        shortName: "Анна",
        email: "anna@fitnessclub.ru",
        phone: "+7 (999) 111-22-33",
        specialization: ["Йога", "Пилатес", "Стретчинг"],
        rating: 4.9,
        experience: 8,
        clientsCount: 24,
        status: "available",
        avatar: "https://i.pravatar.cc/100?img=1"
    },

    // Данные приложения
    data: {
        clients: [],
        workouts: [],
        schedule: [],
        messages: [],
        notifications: [],
        statistics: {}
    },

    // Текущее состояние
    state: {
        currentPage: "home",
        currentWeek: new Date(),
        currentFilter: "all",
        selectedClient: null,
        selectedWorkout: null,
        selectedConversation: null
    },

    // Инициализация приложения
    init: function() {
        this.loadMockData();
        this.setupEventListeners();
        this.updateDateTime();
        this.renderCurrentPage();
        this.setupCharts();
        
        // Обновляем время каждую минуту
        setInterval(() => this.updateDateTime(), 60000);
        
        console.log("Тренерская панель инициализирована");
    },

    // Загрузка тестовых данных
    loadMockData: function() {
        // Клиенты
        this.data.clients = [
            {
                id: 1,
                name: "Иван Петров",
                email: "ivan@example.com",
                phone: "+7 (912) 345-67-89",
                joinDate: "2023-10-15",
                status: "active",
                avatar: "https://i.pravatar.cc/100?img=2",
                visitsPerWeek: 3,
                lastVisit: "2023-11-14",
                totalVisits: 24,
                notes: "Регулярно посещает йогу"
            },
            {
                id: 2,
                name: "Мария Сидорова",
                email: "maria@example.com",
                phone: "+7 (912) 345-67-90",
                joinDate: "2023-11-01",
                status: "new",
                avatar: "https://i.pravatar.cc/100?img=3",
                visitsPerWeek: 2,
                lastVisit: "2023-11-15",
                totalVisits: 8,
                notes: "Начинающая, нуждается в особом внимании"
            },
            {
                id: 3,
                name: "Алексей Козлов",
                email: "alexey@example.com",
                phone: "+7 (912) 345-67-91",
                joinDate: "2023-09-10",
                status: "active",
                avatar: "https://i.pravatar.cc/100?img=4",
                visitsPerWeek: 4,
                lastVisit: "2023-11-15",
                totalVisits: 36,
                notes: "Профессионал, готовится к соревнованиям"
            },
            {
                id: 4,
                name: "Елена Васнецова",
                email: "elena@example.com",
                phone: "+7 (912) 345-67-92",
                joinDate: "2023-10-20",
                status: "active",
                avatar: "https://i.pravatar.cc/100?img=5",
                visitsPerWeek: 2,
                lastVisit: "2023-11-14",
                totalVisits: 12,
                notes: "Восстановление после травмы"
            }
        ];

        // Тренировки на сегодня
        this.data.workouts = [
            {
                id: 1,
                title: "Утренняя йога",
                type: "group",
                time: "09:00",
                duration: 60,
                clients: 8,
                maxClients: 12,
                location: "Зал A",
                status: "scheduled",
                date: this.getTodayDate()
            },
            {
                id: 2,
                title: "Персональная тренировка",
                type: "personal",
                time: "14:00",
                duration: 60,
                clientId: 1,
                clientName: "Иван Петров",
                location: "Зал B",
                status: "scheduled",
                date: this.getTodayDate()
            },
            {
                id: 3,
                title: "Вечерний пилатес",
                type: "group",
                time: "19:00",
                duration: 75,
                clients: 10,
                maxClients: 15,
                location: "Зал A",
                status: "scheduled",
                date: this.getTodayDate()
            }
        ];

        // Расписание на неделю
        this.generateWeeklySchedule();

        // Уведомления
        this.data.notifications = [
            {
                id: 1,
                type: "booking",
                message: "Новая запись на занятие 'Утренняя йога'",
                time: "2 часа назад",
                read: false
            },
            {
                id: 2,
                type: "client",
                message: "Мария Сидорова отменила занятие",
                time: "4 часа назад",
                read: false
            },
            {
                id: 3,
                type: "system",
                message: "Обновлено расписание на следующую неделю",
                time: "Вчера, 18:30",
                read: true
            },
            {
                id: 4,
                type: "rating",
                message: "Новый отзыв от Ивана Петрова",
                time: "Вчера, 14:15",
                read: true
            },
            {
                id: 5,
                type: "message",
                message: "Новое сообщение от Алексея Козлова",
                time: "Сегодня, 09:45",
                read: false
            }
        ];

        // Сообщения
        this.data.messages = [
            {
                id: 1,
                clientId: 1,
                clientName: "Иван Петров",
                clientAvatar: "https://i.pravatar.cc/100?img=2",
                lastMessage: "Добрый день! Можно перенести завтрашнее занятие на час позже?",
                time: "10:30",
                unread: true
            },
            {
                id: 2,
                clientId: 2,
                clientName: "Мария Сидорова",
                clientAvatar: "https://i.pravatar.cc/100?img=3",
                lastMessage: "Спасибо за сегодняшнюю тренировку!",
                time: "Вчера, 18:45",
                unread: false
            },
            {
                id: 3,
                clientId: 3,
                clientName: "Алексей Козлов",
                clientAvatar: "https://i.pravatar.cc/100?img=4",
                lastMessage: "Отправил вам новый план тренировок",
                time: "Вчера, 14:20",
                unread: false
            }
        ];

        // Статистика
        this.data.statistics = {
            attendance: [85, 88, 90, 87, 92, 89, 86],
            income: [25000, 32000, 28000, 35000, 40000, 38000, 42000],
            topClients: [1, 3, 4]
        };
    },

    // Генерация расписания на неделю
    generateWeeklySchedule: function() {
        const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        const timeSlots = ['09:00', '11:00', '14:00', '16:00', '18:00', '20:00'];
        
        this.data.schedule = [];
        
        days.forEach((day, dayIndex) => {
            timeSlots.forEach((time, timeIndex) => {
                // 30% chance of having a workout at this slot
                if (Math.random() < 0.3) {
                    const workoutTypes = ['group', 'personal', 'online'];
                    const type = workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
                    
                    this.data.schedule.push({
                        id: `${dayIndex}-${timeIndex}`,
                        day: day,
                        time: time,
                        type: type,
                        title: type === 'group' ? 'Групповая тренировка' : 
                               type === 'personal' ? 'Персональная тренировка' : 'Онлайн-занятие',
                        duration: 60,
                        clients: type === 'group' ? Math.floor(Math.random() * 12) + 1 : 1,
                        maxClients: type === 'group' ? 15 : 1,
                        location: type === 'online' ? 'Онлайн' : `Зал ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`
                    });
                }
            });
        });
    },

    // Настройка обработчиков событий
    setupEventListeners: function() {
        // Навигация
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateTo(page);
            });
        });

        // Кнопки быстрых действий
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                this.handleQuickAction(action);
            });
        });

        // Переключение статуса
        document.getElementById('statusToggle').addEventListener('change', (e) => {
            this.currentTrainer.status = e.target.checked ? 'available' : 'busy';
            this.updateStatusIndicator();
        });

        // Кнопки верхней панели
        document.getElementById('addWorkoutBtn').addEventListener('click', () => {
            this.showAddWorkoutModal();
        });

        document.getElementById('quickClientBtn').addEventListener('click', () => {
            this.showAddClientModal();
        });

        // Навигация по неделям
        document.getElementById('prevWeekBtn').addEventListener('click', () => {
            this.changeWeek(-1);
        });

        document.getElementById('nextWeekBtn').addEventListener('click', () => {
            this.changeWeek(1);
        });

        // Фильтры клиентов
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.state.currentFilter = btn.getAttribute('data-filter');
                this.renderClientsPage();
            });
        });

        // Поиск клиентов
        document.getElementById('clientSearch').addEventListener('input', (e) => {
            this.filterClients(e.target.value);
        });

        // Вкладки тренировок
        document.querySelectorAll('.workout-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.workout-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.filterWorkouts(tab.getAttribute('data-tab'));
            });
        });

        // Период статистики
        document.getElementById('statsPeriod').addEventListener('change', (e) => {
            this.updateStatistics(e.target.value);
        });

        // Фильтры сообщений
        document.querySelectorAll('.message-filter .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.message-filter .filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterMessages(btn.getAttribute('data-filter'));
            });
        });

        // Новое сообщение
        document.getElementById('newMessageBtn').addEventListener('click', () => {
            this.showNewMessageModal();
        });

        // Редактирование профиля
        document.getElementById('editProfileBtn').addEventListener('click', () => {
            this.showEditProfileModal();
        });

        // Закрытие модальных окон
        document.querySelectorAll('.close-modal').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                this.hideAllModals();
            });
        });

        // Клик вне модального окна
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideAllModals();
            }
        });

        // Форма добавления тренировки
        const addWorkoutForm = document.getElementById('addWorkoutForm');
        if (addWorkoutForm) {
            addWorkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAddWorkout();
            });
        }

        // Форма добавления клиента
        const addClientForm = document.getElementById('addClientForm');
        if (addClientForm) {
            addClientForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAddClient();
            });
        }
    },

    // Навигация между страницами
    navigateTo: function(page) {
        // Обновляем активные элементы навигации
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });

        // Скрываем все страницы
        document.querySelectorAll('.page').forEach(pageElement => {
            pageElement.classList.remove('active');
        });

        // Показываем выбранную страницу
        const targetPage = document.getElementById(`${page}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.state.currentPage = page;
            
            // Обновляем заголовок страницы
            this.updatePageTitle(page);
            
            // Обновляем хлебные крошки
            this.updateBreadcrumbs(page);
            
            // Рендерим контент страницы
            this.renderPageContent(page);
        }
    },

    // Обновление заголовка страницы
    updatePageTitle: function(page) {
        const titles = {
            'home': 'Главная панель тренера',
            'schedule': 'Моё расписание',
            'clients': 'Мои клиенты',
            'workouts': 'Мои тренировки',
            'statistics': 'Статистика',
            'messages': 'Сообщения',
            'profile': 'Мой профиль'
        };

        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle && titles[page]) {
            pageTitle.textContent = titles[page];
        }
    },

    // Обновление хлебных крошек
    updateBreadcrumbs: function(page) {
        const breadcrumbs = {
            'home': ['Главная'],
            'schedule': ['Главная', 'Расписание'],
            'clients': ['Главная', 'Клиенты'],
            'workouts': ['Главная', 'Тренировки'],
            'statistics': ['Главная', 'Статистика'],
            'messages': ['Главная', 'Сообщения'],
            'profile': ['Главная', 'Профиль']
        };

        const breadcrumbsContainer = document.getElementById('breadcrumbs');
        if (breadcrumbsContainer && breadcrumbs[page]) {
            breadcrumbsContainer.innerHTML = breadcrumbs[page].map((item, index) => {
                const isActive = index === breadcrumbs[page].length - 1;
                return `<span class="breadcrumb-item ${isActive ? 'active' : ''}">${item}</span>`;
            }).join('');
        }
    },

    // Рендер контента страницы
    renderPageContent: function(page) {
        switch(page) {
            case 'home':
                this.renderHomePage();
                break;
            case 'schedule':
                this.renderSchedulePage();
                break;
            case 'clients':
                this.renderClientsPage();
                break;
            case 'workouts':
                this.renderWorkoutsPage();
                break;
            case 'statistics':
                this.renderStatisticsPage();
                break;
            case 'messages':
                this.renderMessagesPage();
                break;
            case 'profile':
                this.renderProfilePage();
                break;
        }
    },

    // Главная страница
    renderHomePage: function() {
        // Приветствие
        const welcomeName = document.getElementById('welcomeName');
        if (welcomeName) {
            welcomeName.textContent = this.currentTrainer.shortName;
        }

        // Сегодняшние занятия
        this.renderTodayWorkouts();
        
        // Новые клиенты
        this.renderNewClients();
        
        // Уведомления
        this.renderNotifications();
        
        // Статистика
        this.renderHomeStats();
    },

    // Сегодняшние занятия
    renderTodayWorkouts: function() {
        const container = document.getElementById('todayWorkouts');
        if (!container) return;

        const todayWorkouts = this.data.workouts.filter(w => w.date === this.getTodayDate());
        
        if (todayWorkouts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <h3>Нет занятий на сегодня</h3>
                    <p>Вы можете создать новое занятие или отдохнуть</p>
                </div>
            `;
            return;
        }

        container.innerHTML = todayWorkouts.map(workout => `
            <div class="workout-item" data-workout-id="${workout.id}">
                <div class="workout-time">
                    <i class="fas fa-clock"></i> ${workout.time} (${workout.duration} мин)
                </div>
                <div class="workout-title">${workout.title}</div>
                <div class="workout-clients">
                    <i class="fas fa-users"></i>
                    ${workout.type === 'personal' ? workout.clientName : `${workout.clients}/${workout.maxClients} участников`}
                </div>
                <div class="workout-location">
                    <i class="fas fa-map-marker-alt"></i> ${workout.location}
                </div>
            </div>
        `).join('');

        // Добавляем обработчики кликов
        container.querySelectorAll('.workout-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const workoutId = parseInt(item.getAttribute('data-workout-id'));
                this.showWorkoutDetails(workoutId);
            });
        });
    },

    // Новые клиенты
    renderNewClients: function() {
        const container = document.getElementById('newClients');
        if (!container) return;

        const newClients = this.data.clients.filter(c => c.status === 'new').slice(0, 4);
        
        if (newClients.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-user-plus"></i>
                    <h3>Нет новых клиентов</h3>
                    <p>Новые клиенты появятся здесь</p>
                </div>
            `;
            return;
        }

        container.innerHTML = newClients.map(client => `
            <div class="client-avatar" data-client-id="${client.id}">
                <img src="${client.avatar}" alt="${client.name}">
                <span class="client-name">${client.name.split(' ')[0]}</span>
                <span class="client-join-date">с ${this.formatDate(client.joinDate)}</span>
            </div>
        `).join('');

        // Добавляем обработчики кликов
        container.querySelectorAll('.client-avatar').forEach(avatar => {
            avatar.addEventListener('click', () => {
                const clientId = parseInt(avatar.getAttribute('data-client-id'));
                this.showClientDetails(clientId);
            });
        });
    },

    // Уведомления
    renderNotifications: function() {
        const container = document.getElementById('notificationsList');
        if (!container) return;

        const unreadCount = this.data.notifications.filter(n => !n.read).length;
        const badge = document.querySelector('.notifications-card .badge');
        if (badge) {
            badge.textContent = unreadCount;
        }

        container.innerHTML = this.data.notifications.slice(0, 5).map(notification => `
            <div class="notification-item ${notification.read ? '' : 'unread'}" data-notification-id="${notification.id}">
                <div class="notification-time">
                    <i class="fas fa-clock"></i> ${notification.time}
                </div>
                <div class="notification-text">${notification.message}</div>
            </div>
        `).join('');

        // Добавляем обработчики кликов
        container.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', () => {
                const notificationId = parseInt(item.getAttribute('data-notification-id'));
                this.markNotificationAsRead(notificationId);
            });
        });
    },

    // Статистика на главной
    renderHomeStats: function() {
        // Обновляем значения статистики
        const totalWorkouts = this.data.workouts.length;
        const totalClients = this.data.clients.length;
        const expectedIncome = totalWorkouts * 1500; // Пример расчета
        
        document.querySelectorAll('.stat-value').forEach((element, index) => {
            if (index === 0) element.textContent = totalWorkouts * 4; // занятий в месяце
            if (index === 1) element.textContent = this.currentTrainer.rating;
            if (index === 2) element.textContent = expectedIncome.toLocaleString('ru-RU') + ' ₽';
        });
    },

    // Страница расписания
    renderSchedulePage: function() {
        this.renderSchedule();
        this.updateScheduleStats();
    },

    // Рендер расписания
    renderSchedule: function() {
        const container = document.getElementById('scheduleView');
        if (!container) return;

        const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        const timeSlots = ['09:00', '11:00', '14:00', '16:00', '18:00', '20:00'];
        
        let html = '<div class="schedule-time-slot"></div>';
        
        // Заголовки дней
        days.forEach(day => {
            html += `<div class="schedule-day">${day}</div>`;
        });

        // Временные слоты и занятия
        timeSlots.forEach((time, timeIndex) => {
            html += `<div class="schedule-time-slot">${time}</div>`;
            
            days.forEach((day, dayIndex) => {
                const cellId = `${dayIndex}-${timeIndex}`;
                const workouts = this.data.schedule.filter(s => 
                    s.day === day && s.time === time
                );
                
                html += `<div class="schedule-cell" id="cell-${cellId}">`;
                
                workouts.forEach(workout => {
                    const height = workout.duration / 60 * 60; // Высота в пикселях
                    html += `
                        <div class="schedule-event" 
                             data-workout-id="${workout.id}"
                             style="height: ${height}px; background: ${this.getWorkoutColor(workout.type)};">
                            <div class="event-title">${workout.title}</div>
                            <div class="event-details">${workout.clients} чел.</div>
                        </div>
                    `;
                });
                
                html += '</div>';
            });
        });

        container.innerHTML = html;

        // Добавляем обработчики кликов на занятия
        container.querySelectorAll('.schedule-event').forEach(event => {
            event.addEventListener('click', (e) => {
                e.stopPropagation();
                const workoutId = event.getAttribute('data-workout-id');
                this.showWorkoutDetails(workoutId);
            });
        });

        // Добавляем обработчики кликов на ячейки для создания занятий
        container.querySelectorAll('.schedule-cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
                if (!e.target.classList.contains('schedule-event')) {
                    const cellId = cell.id.replace('cell-', '');
                    this.showAddWorkoutToSchedule(cellId);
                }
            });
        });
    },

    // Обновление статистики расписания
    updateScheduleStats: function() {
        const totalWorkouts = this.data.schedule.length;
        const totalParticipants = this.data.schedule.reduce((sum, w) => sum + w.clients, 0);
        const workloadPercent = Math.round((totalWorkouts / 42) * 100); // 42 слота в неделю
        const expectedIncome = totalParticipants * 500; // Пример расчета

        document.getElementById('totalWorkoutsWeek').textContent = totalWorkouts;
        document.getElementById('totalParticipants').textContent = totalParticipants;
        document.getElementById('workloadPercent').textContent = `${workloadPercent}%`;
        document.getElementById('expectedIncome').textContent = expectedIncome.toLocaleString('ru-RU') + ' ₽';
    },

    // Страница клиентов
    renderClientsPage: function() {
        this.renderClientsList();
        this.renderClientActivity();
    },

    // Рендер списка клиентов
    renderClientsList: function() {
        const container = document.getElementById('clientsList');
        if (!container) return;

        let filteredClients = this.data.clients;
        
        // Применяем фильтр
        if (this.state.currentFilter !== 'all') {
            filteredClients = filteredClients.filter(c => c.status === this.state.currentFilter);
        }

        // Применяем поиск
        const searchQuery = document.getElementById('clientSearch').value.toLowerCase();
        if (searchQuery) {
            filteredClients = filteredClients.filter(c => 
                c.name.toLowerCase().includes(searchQuery) ||
                c.email.toLowerCase().includes(searchQuery) ||
                c.phone.includes(searchQuery)
            );
        }

        if (filteredClients.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users-slash"></i>
                    <h3>Клиенты не найдены</h3>
                    <p>Попробуйте изменить параметры поиска</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredClients.map(client => `
            <div class="client-card" data-client-id="${client.id}">
                <img src="${client.avatar}" alt="${client.name}">
                <div class="client-info">
                    <div class="client-name">${client.name}</div>
                    <div class="client-details">
                        <div>${client.phone}</div>
                        <div>${client.email}</div>
                        <div>Посещений: ${client.visitsPerWeek}/нед</div>
                    </div>
                </div>
                <div class="client-status status-${client.status}">
                    ${this.getStatusText(client.status)}
                </div>
                <div class="client-actions">
                    <button class="btn btn-sm btn-secondary" onclick="TrainerApp.showClientDetails(${client.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-primary" onclick="TrainerApp.sendMessageToClient(${client.id})">
                        <i class="fas fa-comment"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Обновляем статистику клиентов
        this.updateClientsStats();
    },

    // Активность клиентов
    renderClientActivity: function() {
        const container = document.getElementById('clientActivity');
        if (!container) return;

        const activities = [
            { client: "Иван Петров", action: "записался на занятие", time: "2 часа назад" },
            { client: "Мария Сидорова", action: "оставила отзыв", time: "4 часа назад" },
            { client: "Алексей Козлов", action: "обновил программу тренировок", time: "Вчера" },
            { client: "Елена Васнецова", action: "оплатила абонемент", time: "2 дня назад" }
        ];

        container.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-time">
                    <i class="fas fa-clock"></i> ${activity.time}
                </div>
                <div class="activity-text">
                    <strong>${activity.client}</strong> ${activity.action}
                </div>
            </div>
        `).join('');
    },

    // Обновление статистики клиентов
    updateClientsStats: function() {
        const totalClients = this.data.clients.length;
        const activeClients = this.data.clients.filter(c => c.status === 'active').length;
        const avgVisits = this.data.clients.reduce((sum, c) => sum + c.visitsPerWeek, 0) / totalClients;

        document.querySelectorAll('.stats-content .stat-number').forEach((element, index) => {
            if (index === 0) element.textContent = totalClients;
            if (index === 1) element.textContent = activeClients;
            if (index === 2) element.textContent = avgVisits.toFixed(1);
            if (index === 3) element.textContent = "96%";
        });
    },

    // Фильтрация клиентов
    filterClients: function(query) {
        this.renderClientsList();
    },

    // Страница тренировок
    renderWorkoutsPage: function() {
        this.renderWorkoutsGrid();
        this.renderWorkoutTemplates();
    },

    // Рендер сетки тренировок
    renderWorkoutsGrid: function() {
        const container = document.getElementById('workoutsGrid');
        if (!container) return;

        const activeTab = document.querySelector('.workout-tab.active');
        const filter = activeTab ? activeTab.getAttribute('data-tab') : 'all';

        let filteredWorkouts = this.data.workouts;
        if (filter !== 'all') {
            filteredWorkouts = filteredWorkouts.filter(w => w.type === filter);
        }

        if (filteredWorkouts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-dumbbell"></i>
                    <h3>Тренировки не найдены</h3>
                    <p>Создайте свою первую тренировку</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredWorkouts.map(workout => `
            <div class="workout-card" data-workout-id="${workout.id}">
                <div class="workout-header">
                    <h4>${workout.title}</h4>
                    <span class="workout-type type-${workout.type}">
                        ${this.getWorkoutTypeText(workout.type)}
                    </span>
                </div>
                <div class="workout-details">
                    <div class="detail-item">
                        <span class="detail-label">Время</span>
                        <span>${workout.time}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Длительность</span>
                        <span>${workout.duration} мин</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Участники</span>
                        <span>${workout.type === 'personal' ? '1' : `${workout.clients}/${workout.maxClients}`}</span>
                    </div>
                </div>
                <div class="workout-actions mt-20">
                    <button class="btn btn-sm btn-secondary" onclick="TrainerApp.showWorkoutDetails(${workout.id})">
                        <i class="fas fa-info-circle"></i> Подробнее
                    </button>
                </div>
            </div>
        `).join('');
    },

    // Шаблоны тренировок
    renderWorkoutTemplates: function() {
        const container = document.getElementById('templatesGrid');
        if (!container) return;

        const templates = [
            { id: 1, name: "Йога для начинающих", duration: 60, type: "group" },
            { id: 2, name: "Силовая тренировка", duration: 75, type: "group" },
            { id: 3, name: "Персональная консультация", duration: 45, type: "personal" },
            { id: 4, name: "Онлайн-йога", duration: 60, type: "online" }
        ];

        container.innerHTML = templates.map(template => `
            <div class="template-card" data-template-id="${template.id}">
                <div class="template-name">${template.name}</div>
                <div class="template-details">
                    <span class="template-duration">${template.duration} мин</span>
                    <span class="template-type">${this.getWorkoutTypeText(template.type)}</span>
                </div>
            </div>
        `).join('');

        // Добавляем обработчики кликов
        container.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', () => {
                const templateId = parseInt(card.getAttribute('data-template-id'));
                this.useTemplate(templateId);
            });
        });
    },

    // Фильтрация тренировок
    filterWorkouts: function(type) {
        this.renderWorkoutsGrid();
    },

    // Страница статистики
    renderStatisticsPage: function() {
        this.updateCharts();
        this.renderTopClients();
    },

    // Настройка графиков
    setupCharts: function() {
        // График посещаемости
        const attendanceCtx = document.getElementById('attendanceChart');
        if (attendanceCtx) {
            this.attendanceChart = new Chart(attendanceCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                    datasets: [{
                        label: 'Посещаемость %',
                        data: this.data.statistics.attendance,
                        borderColor: '#17a2b8',
                        backgroundColor: 'rgba(23, 162, 184, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 80,
                            max: 100
                        }
                    }
                }
            });
        }

        // График дохода
        const incomeCtx = document.getElementById('incomeChart');
        if (incomeCtx) {
            this.incomeChart = new Chart(incomeCtx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Неделя 1', 'Неделя 2', 'Неделя 3', 'Неделя 4'],
                    datasets: [{
                        label: 'Доход (руб.)',
                        data: this.data.statistics.income,
                        backgroundColor: '#2c3e50',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    },

    // Обновление графиков
    updateCharts: function() {
        if (this.attendanceChart) {
            // Обновляем данные посещаемости
            const period = document.getElementById('statsPeriod').value;
            let newData = [];
            
            switch(period) {
                case 'week':
                    newData = [85, 88, 90, 87, 92, 89, 86];
                    break;
                case 'month':
                    newData = [85, 87, 89, 90, 88, 92, 91, 89, 87, 90, 92, 94, 91, 89, 88, 90, 92, 91, 89, 88, 90, 92, 94, 91, 89, 88, 90, 92];
                    break;
                case 'quarter':
                    newData = [85, 87, 89, 90, 92, 94, 93, 91, 90];
                    break;
                case 'year':
                    newData = [80, 82, 85, 87, 89, 91, 92, 93, 92, 91, 90, 89];
                    break;
            }
            
            this.attendanceChart.data.datasets[0].data = newData;
            this.attendanceChart.update();
        }

        if (this.incomeChart) {
            // Обновляем данные дохода
            const period = document.getElementById('statsPeriod').value;
            let newData = [];
            let labels = [];
            
            switch(period) {
                case 'week':
                    labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
                    newData = [8500, 9200, 8800, 9500, 10200, 9800, 8900];
                    break;
                case 'month':
                    labels = ['Неделя 1', 'Неделя 2', 'Неделя 3', 'Неделя 4'];
                    newData = [35000, 42000, 38000, 45000];
                    break;
                case 'quarter':
                    labels = ['Янв', 'Фев', 'Мар'];
                    newData = [120000, 135000, 142000];
                    break;
                case 'year':
                    labels = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
                    newData = [120000, 135000, 142000, 138000, 145000, 152000, 148000, 155000, 162000, 158000, 165000, 172000];
                    break;
            }
            
            this.incomeChart.data.labels = labels;
            this.incomeChart.data.datasets[0].data = newData;
            this.incomeChart.update();
        }
    },

    // Топ клиентов
    renderTopClients: function() {
        const container = document.getElementById('topClients');
        if (!container) return;

        const topClients = this.data.statistics.topClients.map(id => 
            this.data.clients.find(c => c.id === id)
        ).filter(c => c);

        container.innerHTML = topClients.map((client, index) => `
            <div class="top-client-item">
                <div class="top-client-rank">${index + 1}</div>
                <img src="${client.avatar}" alt="${client.name}" width="40" height="40" style="border-radius: 50%; margin-right: 15px;">
                <div style="flex: 1;">
                    <div class="client-name">${client.name}</div>
                    <div class="client-details">${client.visitsPerWeek} посещений/нед</div>
                </div>
                <div class="client-rating">
                    <i class="fas fa-star" style="color: #ffc107;"></i>
                    <span>4.8</span>
                </div>
            </div>
        `).join('');
    },

    // Обновление статистики
    updateStatistics: function(period) {
        this.updateCharts();
    },

    // Страница сообщений
    renderMessagesPage: function() {
        this.renderConversationsList();
        this.setupChat();
    },

    // Список диалогов
    renderConversationsList: function() {
        const container = document.getElementById('conversationsList');
        if (!container) return;

        container.innerHTML = this.data.messages.map(msg => `
            <div class="conversation-item ${this.state.selectedConversation === msg.clientId ? 'active' : ''}" 
                 data-client-id="${msg.clientId}">
                <div class="conversation-avatar">
                    <img src="${msg.clientAvatar}" alt="${msg.clientName}">
                    ${msg.unread ? '<span class="badge new">!</span>' : ''}
                </div>
                <div class="conversation-info">
                    <div class="conversation-name">${msg.clientName}</div>
                    <div class="conversation-last-message">${msg.lastMessage}</div>
                </div>
                <div class="conversation-time">${msg.time}</div>
            </div>
        `).join('');

        // Добавляем обработчики кликов
        container.querySelectorAll('.conversation-item').forEach(item => {
            item.addEventListener('click', () => {
                const clientId = parseInt(item.getAttribute('data-client-id'));
                this.selectConversation(clientId);
            });
        });
    },

    // Настройка чата
    setupChat: function() {
        const chatArea = document.getElementById('chatArea');
        if (!chatArea) return;

        if (!this.state.selectedConversation) {
            chatArea.innerHTML = `
                <div class="chat-placeholder">
                    <i class="fas fa-comments"></i>
                    <h3>Выберите диалог</h3>
                    <p>Выберите клиента из списка слева для начала общения</p>
                </div>
            `;
            return;
        }

        const client = this.data.clients.find(c => c.id === this.state.selectedConversation);
        if (!client) return;

        // Здесь можно загрузить историю сообщений из базы данных
        const messages = [
            { id: 1, sender: 'client', text: 'Добрый день! Можно перенести завтрашнее занятие на час позже?', time: '10:30' },
            { id: 2, sender: 'trainer', text: 'Конечно, переносим на 15:00. Вас устроит?', time: '10:35' },
            { id: 3, sender: 'client', text: 'Да, отлично! Спасибо!', time: '10:40' }
        ];

        chatArea.innerHTML = `
            <div class="chat-header">
                <img src="${client.avatar}" alt="${client.name}" width="40" height="40" style="border-radius: 50%;">
                <div style="flex: 1;">
                    <h3>${client.name}</h3>
                    <div class="client-status status-${client.status}">
                        ${this.getStatusText(client.status)}
                    </div>
                </div>
                <div class="chat-actions">
                    <button class="btn btn-sm btn-secondary">
                        <i class="fas fa-phone"></i>
                    </button>
                    <button class="btn btn-sm btn-secondary">
                        <i class="fas fa-video"></i>
                    </button>
                </div>
            </div>
            <div class="chat-messages">
                ${messages.map(msg => `
                    <div class="message ${msg.sender}">
                        <div class="message-text">${msg.text}</div>
                        <div class="message-time">${msg.time}</div>
                    </div>
                `).join('')}
            </div>
            <div class="chat-input">
                <textarea placeholder="Введите сообщение..." id="messageInput"></textarea>
                <button class="btn btn-primary" onclick="TrainerApp.sendMessage()">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        `;
    },

    // Выбор диалога
    selectConversation: function(clientId) {
        this.state.selectedConversation = clientId;
        this.renderMessagesPage();
        
        // Помечаем сообщения как прочитанные
        this.data.messages.forEach(msg => {
            if (msg.clientId === clientId) {
                msg.unread = false;
            }
        });
        
        this.renderConversationsList();
    },

    // Фильтрация сообщений
    filterMessages: function(filter) {
        // Здесь можно реализовать фильтрацию сообщений
        console.log('Фильтр сообщений:', filter);
    },

    // Страница профиля
    renderProfilePage: function() {
        this.renderProfileDetails();
        this.renderWorkSchedule();
        this.renderSpecializationTags();
        this.renderAchievements();
    },

    // Детали профиля
    renderProfileDetails: function() {
        // Обновляем имя тренера в профиле
        document.querySelectorAll('#trainerName, .profile-info h3').forEach(el => {
            el.textContent = this.currentTrainer.name;
        });
    },

    // Расписание работы
    renderWorkSchedule: function() {
        const container = document.getElementById('workSchedule');
        if (!container) return;

        const schedule = [
            { day: 'Понедельник', hours: '9:00 - 21:00' },
            { day: 'Вторник', hours: '9:00 - 21:00' },
            { day: 'Среда', hours: '9:00 - 21:00' },
            { day: 'Четверг', hours: '9:00 - 21:00' },
            { day: 'Пятница', hours: '9:00 - 21:00' },
            { day: 'Суббота', hours: '10:00 - 18:00' },
            { day: 'Воскресенье', hours: 'Выходной' }
        ];

        container.innerHTML = schedule.map(item => `
            <div class="schedule-day-item">
                <span>${item.day}</span>
                <span>${item.hours}</span>
            </div>
        `).join('');
    },

    // Теги специализации
    renderSpecializationTags: function() {
        const container = document.getElementById('specializationTags');
        if (!container) return;

        container.innerHTML = this.currentTrainer.specialization.map(spec => `
            <span class="specialization-tag">${spec}</span>
        `).join('');
    },

    // Достижения
    renderAchievements: function() {
        const container = document.getElementById('achievementsList');
        if (!container) return;

        const achievements = [
            { title: 'Сертификат Yoga Alliance 500 часов', date: '2020' },
            { title: 'Мастер спорта по фитнесу', date: '2018' },
            { title: 'Курс "Реабилитация после травм"', date: '2021' },
            { title: 'Тренер года 2022', date: '2022' }
        ];

        container.innerHTML = achievements.map(achievement => `
            <div class="achievement-item">
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-date">${achievement.date}</div>
            </div>
        `).join('');
    },

    // Обработка быстрых действий
    handleQuickAction: function(action) {
        switch(action) {
            case 'add-workout':
                this.showAddWorkoutModal();
                break;
            case 'add-client':
                this.showAddClientModal();
                break;
            case 'view-schedule':
                this.navigateTo('schedule');
                break;
            case 'view-statistics':
                this.navigateTo('statistics');
                break;
        }
    },

    // Показать модальное окно добавления тренировки
    showAddWorkoutModal: function() {
        const modal = document.getElementById('addWorkoutModal');
        if (!modal) return;

        const form = document.getElementById('addWorkoutForm');
        if (form) {
            form.innerHTML = `
                <div class="form-group">
                    <label for="workoutTitle">Название занятия</label>
                    <input type="text" id="workoutTitle" class="form-control" placeholder="Например: Утренняя йога" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="workoutType">Тип занятия</label>
                        <select id="workoutType" class="form-control" required>
                            <option value="group">Групповое</option>
                            <option value="personal">Персональное</option>
                            <option value="online">Онлайн</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="workoutDate">Дата</label>
                        <input type="date" id="workoutDate" class="form-control" value="${this.getTodayDate()}" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="workoutTime">Время</label>
                        <input type="time" id="workoutTime" class="form-control" value="09:00" required>
                    </div>
                    <div class="form-group">
                        <label for="workoutDuration">Длительность (минут)</label>
                        <input type="number" id="workoutDuration" class="form-control" value="60" min="15" max="180" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="workoutLocation">Место проведения</label>
                    <input type="text" id="workoutLocation" class="form-control" placeholder="Зал A">
                </div>
                <div class="form-group">
                    <label for="workoutMaxClients">Макс. участников (для групповых)</label>
                    <input type="number" id="workoutMaxClients" class="form-control" value="12" min="1" max="50">
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="TrainerApp.hideAllModals()">Отмена</button>
                    <button type="submit" class="btn btn-primary">Создать занятие</button>
                </div>
            `;
        }

        modal.classList.add('active');
    },

    // Показать модальное окно добавления клиента
    showAddClientModal: function() {
        const modal = document.getElementById('addClientModal');
        if (!modal) return;

        const form = document.getElementById('addClientForm');
        if (form) {
            form.innerHTML = `
                <div class="form-row">
                    <div class="form-group">
                        <label for="clientFirstName">Имя</label>
                        <input type="text" id="clientFirstName" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="clientLastName">Фамилия</label>
                        <input type="text" id="clientLastName" class="form-control" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="clientEmail">Email</label>
                        <input type="email" id="clientEmail" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="clientPhone">Телефон</label>
                        <input type="tel" id="clientPhone" class="form-control" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="clientNotes">Примечания</label>
                    <textarea id="clientNotes" class="form-control" rows="3"></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="TrainerApp.hideAllModals()">Отмена</button>
                    <button type="submit" class="btn btn-primary">Добавить клиента</button>
                </div>
            `;
        }

        modal.classList.add('active');
    },

    // Показать детали тренировки
    showWorkoutDetails: function(workoutId) {
        const workout = this.data.workouts.find(w => w.id == workoutId);
        if (!workout) return;

        const modal = document.getElementById('workoutDetailsModal');
        if (!modal) return;

        const content = document.getElementById('workoutDetailsContent');
        if (content) {
            content.innerHTML = `
                <h2>${workout.title}</h2>
                <div class="workout-details-grid mt-20">
                    <div class="detail-item">
                        <span class="detail-label">Тип:</span>
                        <span>${this.getWorkoutTypeText(workout.type)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Дата:</span>
                        <span>${this.formatDate(workout.date)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Время:</span>
                        <span>${workout.time}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Длительность:</span>
                        <span>${workout.duration} минут</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Место:</span>
                        <span>${workout.location}</span>
                    </div>
                    ${workout.type === 'personal' ? `
                        <div class="detail-item">
                            <span class="detail-label">Клиент:</span>
                            <span>${workout.clientName}</span>
                        </div>
                    ` : `
                        <div class="detail-item">
                            <span class="detail-label">Участники:</span>
                            <span>${workout.clients}/${workout.maxClients}</span>
                        </div>
                    `}
                </div>
                <div class="workout-actions mt-20">
                    <button class="btn btn-primary" onclick="TrainerApp.editWorkout(${workoutId})">
                        <i class="fas fa-edit"></i> Редактировать
                    </button>
                    <button class="btn btn-secondary" onclick="TrainerApp.cancelWorkout(${workoutId})">
                        <i class="fas fa-times"></i> Отменить занятие
                    </button>
                </div>
            `;
        }

        modal.classList.add('active');
    },

    // Показать детали клиента
    showClientDetails: function(clientId) {
        const client = this.data.clients.find(c => c.id == clientId);
        if (!client) return;

        const modal = document.getElementById('clientDetailsModal');
        if (!modal) return;

        const content = document.getElementById('clientDetailsContent');
        if (content) {
            content.innerHTML = `
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 30px;">
                    <img src="${client.avatar}" alt="${client.name}" width="80" height="80" style="border-radius: 50%;">
                    <div>
                        <h2>${client.name}</h2>
                        <div class="client-status status-${client.status}">
                            ${this.getStatusText(client.status)}
                        </div>
                    </div>
                </div>
                
                <div class="client-details-grid">
                    <div class="detail-item">
                        <span class="detail-label">Email:</span>
                        <span>${client.email}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Телефон:</span>
                        <span>${client.phone}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Дата регистрации:</span>
                        <span>${this.formatDate(client.joinDate)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Последнее посещение:</span>
                        <span>${this.formatDate(client.lastVisit)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Посещений в неделю:</span>
                        <span>${client.visitsPerWeek}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Всего посещений:</span>
                        <span>${client.totalVisits}</span>
                    </div>
                </div>
                
                ${client.notes ? `
                    <div class="client-notes mt-20">
                        <h3>Примечания</h3>
                        <p>${client.notes}</p>
                    </div>
                ` : ''}
                
                <div class="client-actions mt-20">
                    <button class="btn btn-primary" onclick="TrainerApp.sendMessageToClient(${clientId})">
                        <i class="fas fa-comment"></i> Написать сообщение
                    </button>
                    <button class="btn btn-secondary" onclick="TrainerApp.scheduleWorkoutForClient(${clientId})">
                        <i class="fas fa-calendar-plus"></i> Записать на занятие
                    </button>
                </div>
            `;
        }

        modal.classList.add('active');
    },

    // Добавление тренировки
    handleAddWorkout: function() {
        const title = document.getElementById('workoutTitle').value;
        const type = document.getElementById('workoutType').value;
        const date = document.getElementById('workoutDate').value;
        const time = document.getElementById('workoutTime').value;
        const duration = parseInt(document.getElementById('workoutDuration').value);
        const location = document.getElementById('workoutLocation').value;
        const maxClients = parseInt(document.getElementById('workoutMaxClients').value) || 1;

        const newWorkout = {
            id: this.data.workouts.length + 1,
            title: title,
            type: type,
            date: date,
            time: time,
            duration: duration,
            location: location || 'Не указано',
            clients: 0,
            maxClients: type === 'group' ? maxClients : 1,
            status: 'scheduled'
        };

        if (type === 'personal') {
            newWorkout.clientId = 1;
            newWorkout.clientName = 'Новый клиент';
        }

        this.data.workouts.push(newWorkout);
        
        // Обновляем отображение
        if (this.state.currentPage === 'home') {
            this.renderTodayWorkouts();
        } else if (this.state.currentPage === 'workouts') {
            this.renderWorkoutsGrid();
        }

        this.hideAllModals();
        this.showNotification('Занятие успешно создано!', 'success');
    },

    // Добавление клиента
    handleAddClient: function() {
        const firstName = document.getElementById('clientFirstName').value;
        const lastName = document.getElementById('clientLastName').value;
        const email = document.getElementById('clientEmail').value;
        const phone = document.getElementById('clientPhone').value;
        const notes = document.getElementById('clientNotes').value;

        const newClient = {
            id: this.data.clients.length + 1,
            name: `${firstName} ${lastName}`,
            email: email,
            phone: phone,
            joinDate: this.getTodayDate(),
            status: 'new',
            avatar: `https://i.pravatar.cc/100?img=${this.data.clients.length + 6}`,
            visitsPerWeek: 1,
            lastVisit: this.getTodayDate(),
            totalVisits: 0,
            notes: notes
        };

        this.data.clients.push(newClient);
        
        // Обновляем отображение
        if (this.state.currentPage === 'home') {
            this.renderNewClients();
        } else if (this.state.currentPage === 'clients') {
            this.renderClientsList();
        }

        this.hideAllModals();
        this.showNotification('Клиент успешно добавлен!', 'success');
    },

    // Отправка сообщения
    sendMessage: function() {
        const input = document.getElementById('messageInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Здесь можно отправить сообщение на сервер
        console.log('Отправка сообщения:', message);
        
        // Очищаем поле ввода
        input.value = '';
        
        // Показываем уведомление
        this.showNotification('Сообщение отправлено', 'success');
    },

    // Отправка сообщения клиенту
    sendMessageToClient: function(clientId) {
        this.hideAllModals();
        this.navigateTo('messages');
        this.selectConversation(clientId);
    },

    // Изменение недели
    changeWeek: function(delta) {
        const newDate = new Date(this.state.currentWeek);
        newDate.setDate(newDate.getDate() + delta * 7);
        this.state.currentWeek = newDate;
        
        this.updateWeekRange();
        this.renderSchedulePage();
    },

    // Обновление диапазона недели
    updateWeekRange: function() {
        const monday = this.getMonday(this.state.currentWeek);
        const sunday = new Date(monday);
        sunday.setDate(sunday.getDate() + 6);
        
        const rangeElement = document.getElementById('currentWeekRange');
        if (rangeElement) {
            const options = { day: 'numeric', month: 'long' };
            const mondayStr = monday.toLocaleDateString('ru-RU', options);
            const sundayStr = sunday.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
            rangeElement.textContent = `${mondayStr} - ${sundayStr}`;
        }
    },

    // Получить понедельник недели
    getMonday: function(date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(d.setDate(diff));
    },

    // Обновление даты и времени
    updateDateTime: function() {
        const now = new Date();
        const options = { 
            day: 'numeric', 
            month: 'long', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        
        const dateTimeElement = document.getElementById('currentDateTime');
        if (dateTimeElement) {
            dateTimeElement.textContent = now.toLocaleDateString('ru-RU', options);
        }
    },

    // Скрыть все модальные окна
    hideAllModals: function() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    },

    // Показать уведомление
    showNotification: function(message, type = 'info') {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Добавляем стили
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#17a2b8'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;
        
        // Добавляем в документ
        document.body.appendChild(notification);
        
        // Удаляем через 3 секунды
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    // Обновление индикатора статуса
    updateStatusIndicator: function() {
        const statusElement = document.querySelector('.toggle-label.active');
        if (statusElement) {
            statusElement.textContent = this.currentTrainer.status === 'available' ? 'Доступен' : 'Занят';
            statusElement.style.color = this.currentTrainer.status === 'available' ? '#28a745' : '#e74c3c';
        }
    },

    // Получить цвет для типа тренировки
    getWorkoutColor: function(type) {
        const colors = {
            'group': '#17a2b8',
            'personal': '#28a745',
            'online': '#6f42c1'
        };
        return colors[type] || '#17a2b8';
    },

    // Получить текст для типа тренировки
    getWorkoutTypeText: function(type) {
        const texts = {
            'group': 'Групповое',
            'personal': 'Персональное',
            'online': 'Онлайн'
        };
        return texts[type] || 'Групповое';
    },

    // Получить текст статуса
    getStatusText: function(status) {
        const texts = {
            'active': 'Активный',
            'new': 'Новый',
            'inactive': 'Неактивный'
        };
        return texts[status] || 'Активный';
    },

    // Получить сегодняшнюю дату в формате YYYY-MM-DD
    getTodayDate: function() {
        const today = new Date();
        return today.toISOString().split('T')[0];
    },

    // Форматирование даты
    formatDate: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    },

    // Использование шаблона тренировки
    useTemplate: function(templateId) {
        this.showAddWorkoutModal();
        this.showNotification('Шаблон загружен. Заполните остальные поля.', 'info');
    },

    // Отметить уведомление как прочитанное
    markNotificationAsRead: function(notificationId) {
        const notification = this.data.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.renderNotifications();
            this.showNotification('Уведомление отмечено как прочитанное', 'info');
        }
    }
};

// Инициализация приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    TrainerApp.init();
});

// Глобальные функции для обработчиков событий в HTML
window.TrainerApp = TrainerApp;