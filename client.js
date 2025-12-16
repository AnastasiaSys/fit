// Данные клиента
const clientData = {
    user: {
        name: "Анастасия Сыс",
        email: "asys@sfedu.ru",
        phone: "+7 (999) 123-45-67",
        membership: "Премиум",
        joinDate: "2025-01-15"
    },
    upcomingWorkouts: [
        {
            id: 1,
            name: "Йога для начинающих",
            trainer: "Анна Смирнова",
            date: "2025-11-15",
            time: "10:00",
            duration: 60,
            hall: "Зал йоги"
        },
        {
            id: 2,
            name: "Силовая тренировка",
            trainer: "Дмитрий Петров",
            date: "2025-11-16",
            time: "18:00",
            duration: 45,
            hall: "Основной зал"
        }
    ],
    myTrainers: [
        {
            id: 1,
            name: "Анна Смирнова",
            specialization: "Йога, Пилатес",
            rating: 4.9,
            avatar: "https://i.pravatar.cc/150?img=1"
        },
        {
            id: 2,
            name: "Дмитрий Петров",
            specialization: "Силовые тренировки",
            rating: 4.8,
            avatar: "https://i.pravatar.cc/150?img=2"
        }
    ],
    workouts: [
        {
            id: 1,
            name: "Йога для начинающих",
            trainer: "Анна Смирнова",
            type: "yoga",
            date: "2023-11-15",
            time: "10:00",
            duration: 60,
            hall: "Зал йоги",
            participants: 8,
            maxParticipants: 15,
            description: "Основные асаны йоги для новичков. Не требуется опыт.",
            booked: true
        },
        {
            id: 2,
            name: "Силовая тренировка",
            trainer: "Дмитрий Петров",
            type: "strength",
            date: "2025-11-15",
            time: "11:00",
            duration: 45,
            hall: "Основной зал",
            participants: 6,
            maxParticipants: 10,
            description: "Интенсивная тренировка с использованием свободных весов.",
            booked: false
        },
        {
            id: 3,
            name: "Кардио-бокс",
            trainer: "Сергей Козлов",
            type: "cardio",
            date: "2025-11-15",
            time: "17:00",
            duration: 50,
            hall: "Кардио-зона",
            participants: 10,
            maxParticipants: 12,
            description: "Динамичная тренировка, сочетающая кардио и элементы бокса.",
            booked: false
        }
    ],
    trainers: [
        {
            id: 1,
            name: "Анна Смирнова",
            specialization: "Йога, Пилатес",
            experience: "8 лет",
            rating: 4.9,
            description: "Сертифицированный инструктор по йоге и пилатесу. Провожу групповые и индивидуальные занятия.",
            avatar: "https://i.pravatar.cc/150?img=1",
            recommended: true
        },
        {
            id: 2,
            name: "Дмитрий Петров",
            specialization: "Силовые тренировки",
            experience: "12 лет",
            rating: 4.8,
            description: "Мастер спорта по тяжелой атлетике. Специализируюсь на силовых тренировках.",
            avatar: "https://i.pravatar.cc/150?img=2",
            recommended: false
        },
        {
            id: 3,
            name: "Сергей Козлов",
            specialization: "Бокс, Кардио",
            experience: "6 лет",
            rating: 4.7,
            description: "Профессиональный боксер. Разработал собственную систему кардио-тренировок.",
            avatar: "https://i.pravatar.cc/150?img=3",
            recommended: true
        }
    ],
    bookings: [
        {
            id: 1,
            workoutId: 1,
            date: "2025-11-15",
            time: "10:00",
            status: "upcoming",
            workoutName: "Йога для начинающих",
            trainer: "Анна Смирнова"
        },
        {
            id: 2,
            workoutId: 2,
            date: "2025-11-16",
            time: "18:00",
            status: "upcoming",
            workoutName: "Силовая тренировка",
            trainer: "Дмитрий Петров"
        },
        {
            id: 3,
            workoutId: 3,
            date: "2025-11-10",
            time: "17:00",
            status: "completed",
            workoutName: "Кардио-бокс",
            trainer: "Сергей Козлов",
            rating: 5
        }
    ],
    workoutPlan: {
        name: "Смешанная программа",
        progress: 65,
        schedule: [
            { day: "Пн", workout: "Йога", time: "10:00", completed: true },
            { day: "Вт", workout: "Силовая", time: "18:00", completed: true },
            { day: "Ср", workout: "Отдых", time: "-", completed: true },
            { day: "Чт", workout: "Кардио", time: "17:00", completed: false },
            { day: "Пт", workout: "Пилатес", time: "10:00", completed: false },
            { day: "Сб", workout: "Йога", time: "10:00", completed: false },
            { day: "Вс", workout: "Отдых", time: "-", completed: false }
        ]
    }
};

// Текущая активная страница
let currentPage = "home";
let navigationHistory = ["home"];

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", function() {
    initNavigation();
    loadUserData();
    loadHomePage();
    setupEventListeners();
    setupModalHandlers();
});

// Инициализация навигации
function initNavigation() {
    // Обработчики для ссылок в боковой панели
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const page = this.getAttribute("data-page");
            navigateTo(page);
        });
    });
    
    // Обработчики для быстрых ссылок
    document.querySelectorAll(".view-all").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const page = this.getAttribute("data-page");
            navigateTo(page);
        });
    });
    
    // Обработчики для кнопок быстрых действий
    document.querySelectorAll(".action-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const page = this.getAttribute("data-page");
            navigateTo(page);
        });
    });
}

// Навигация между страницами
function navigateTo(page) {
    // Скрыть текущую страницу
    document.getElementById(currentPage + "-page").classList.remove("active");
    document.querySelector(`.nav-link[data-page="${currentPage}"]`).classList.remove("active");
    
    // Показать новую страницу
    currentPage = page;
    document.getElementById(page + "-page").classList.add("active");
    document.querySelector(`.nav-link[data-page="${page}"]`).classList.add("active");
    
    // Обновить заголовок
    updatePageTitle(page);
    
    // Обновить хлебные крошки
    updateBreadcrumbs(page);
    
    // Загрузить данные для страницы
    loadPageData(page);
    
    // Добавить в историю навигации
    navigationHistory.push(page);
}

// Обновить заголовок страницы
function updatePageTitle(page) {
    const titles = {
        home: "Главная панель",
        schedule: "Расписание занятий",
        trainers: "Наши тренеры",
        "my-workouts": "Мои тренировки",
        bookings: "Мои записи",
        membership: "Мой абонемент",
        profile: "Мой профиль"
    };
    
    document.getElementById("pageTitle").textContent = titles[page] || "Панель клиента";
}

// Обновить хлебные крошки
function updateBreadcrumbs(page) {
    const breadcrumbs = {
        home: [{ name: "Главная", page: "home" }],
        schedule: [
            { name: "Главная", page: "home" },
            { name: "Расписание", page: "schedule" }
        ],
        trainers: [
            { name: "Главная", page: "home" },
            { name: "Тренеры", page: "trainers" }
        ],
        "my-workouts": [
            { name: "Главная", page: "home" },
            { name: "Мои тренировки", page: "my-workouts" }
        ],
        bookings: [
            { name: "Главная", page: "home" },
            { name: "Мои записи", page: "bookings" }
        ],
        membership: [
            { name: "Главная", page: "home" },
            { name: "Абонемент", page: "membership" }
        ],
        profile: [
            { name: "Главная", page: "home" },
            { name: "Профиль", page: "profile" }
        ]
    };
    
    const container = document.getElementById("breadcrumbs");
    const currentCrumbs = breadcrumbs[page] || breadcrumbs.home;
    
    let html = "";
    currentCrumbs.forEach((crumb, index) => {
        const isLast = index === currentCrumbs.length - 1;
        html += `
            <span class="breadcrumb-item ${isLast ? "active" : ""}" 
                  onclick="${!isLast ? `navigateTo('${crumb.page}')` : ''}">
                ${crumb.name}
            </span>
            ${!isLast ? '<span class="breadcrumb-separator">›</span>' : ''}
        `;
    });
    
    container.innerHTML = html;
}

// Загрузка данных пользователя
function loadUserData() {
    document.getElementById("userName").textContent = clientData.user.name;
    document.getElementById("welcomeName").textContent = clientData.user.name.split(" ")[0];
}

// Загрузка данных для страницы
function loadPageData(page) {
    switch(page) {
        case "home":
            loadHomePage();
            break;
        case "schedule":
            loadSchedulePage();
            break;
        case "trainers":
            loadTrainersPage();
            break;
        case "my-workouts":
            loadMyWorkoutsPage();
            break;
        case "bookings":
            loadBookingsPage();
            break;
        case "membership":
            loadMembershipPage();
            break;
        case "profile":
            loadProfilePage();
            break;
    }
}

// Загрузка главной страницы
function loadHomePage() {
    // Ближайшие занятия
    const upcomingContainer = document.getElementById("upcomingWorkouts");
    let html = "";
    
    clientData.upcomingWorkouts.forEach(workout => {
        html += `
            <div class="workout-item" onclick="showWorkoutDetails(${workout.id})">
                <div class="workout-time">${workout.time}</div>
                <div class="workout-info">
                    <h4>${workout.name}</h4>
                    <p>${workout.trainer} • ${workout.hall}</p>
                </div>
            </div>
        `;
    });
    
    upcomingContainer.innerHTML = html || "<p>Нет предстоящих занятий</p>";
    
    // Мои тренеры
    const trainersContainer = document.getElementById("myTrainers");
    html = "";
    
    clientData.myTrainers.forEach(trainer => {
        html += `
            <div class="trainer-item" onclick="showTrainerDetails(${trainer.id})">
                <div class="trainer-avatar-small">
                    <img src="${trainer.avatar}" alt="${trainer.name}">
                </div>
                <div class="trainer-info">
                    <h4>${trainer.name}</h4>
                    <p>${trainer.specialization}</p>
                    <div class="trainer-rating">
                        <i class="fas fa-star"></i> ${trainer.rating}
                    </div>
                </div>
            </div>
        `;
    });
    
    trainersContainer.innerHTML = html || "<p>Нет любимых тренеров</p>";
}

// Загрузка страницы расписания
function loadSchedulePage() {
    const container = document.getElementById("scheduleView");
    const selectedDate = document.getElementById("scheduleDate").value;
    
    // Фильтруем занятия по дате
    const dayWorkouts = clientData.workouts.filter(w => w.date === selectedDate);
    
    let html = "";
    
    if (dayWorkouts.length > 0) {
        dayWorkouts.forEach(workout => {
            const isBooked = workout.booked;
            const isFull = workout.participants >= workout.maxParticipants;
            
            html += `
                <div class="workout-card">
                    <div class="workout-header">
                        <h3>${workout.name}</h3>
                        <span class="workout-time">${workout.time}</span>
                    </div>
                    <div class="workout-details">
                        <p><i class="fas fa-user-tie"></i> ${workout.trainer}</p>
                        <p><i class="fas fa-clock"></i> ${workout.duration} мин.</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${workout.hall}</p>
                        <p><i class="fas fa-users"></i> ${workout.participants}/${workout.maxParticipants}</p>
                    </div>
                    <div class="workout-actions">
                        ${isBooked ? 
                            `<button class="btn btn-success" disabled>
                                <i class="fas fa-check"></i> Вы записаны
                            </button>` :
                            isFull ?
                            `<button class="btn btn-danger" disabled>
                                <i class="fas fa-ban"></i> Мест нет
                            </button>` :
                            `<button class="btn btn-primary" onclick="bookWorkout(${workout.id})">
                                <i class="fas fa-calendar-plus"></i> Записаться
                            </button>`
                        }
                        <button class="btn btn-secondary" onclick="showWorkoutDetails(${workout.id})">
                            <i class="fas fa-info-circle"></i> Подробнее
                        </button>
                    </div>
                </div>
            `;
        });
    } else {
        html = `
            <div class="empty-state">
                <i class="fas fa-calendar-times"></i>
                <h3>На выбранную дату занятий нет</h3>
                <p>Попробуйте выбрать другую дату</p>
            </div>
        `;
    }
    
    container.innerHTML = html;
    
    // Обновляем статистику
    updateScheduleStats(dayWorkouts);
}

// Обновление статистики расписания
function updateScheduleStats(workouts) {
    document.getElementById("totalWorkouts").textContent = workouts.length;
    
    const availableSlots = workouts.reduce((total, w) => {
        return total + (w.maxParticipants - w.participants);
    }, 0);
    document.getElementById("availableSlots").textContent = availableSlots;
    
    // Самое популярное занятие
    if (workouts.length > 0) {
        const typeCount = {};
        workouts.forEach(w => {
            typeCount[w.type] = (typeCount[w.type] || 0) + 1;
        });
        
        let popularType = "";
        let maxCount = 0;
        for (const [type, count] of Object.entries(typeCount)) {
            if (count > maxCount) {
                maxCount = count;
                popularType = getWorkoutTypeName(type);
            }
        }
        
        document.getElementById("popularWorkout").textContent = popularType || "-";
    }
}

// Загрузка страницы тренеров
function loadTrainersPage() {
    const container = document.getElementById("trainersGrid");
    let html = "";
    
    clientData.trainers.forEach(trainer => {
        html += `
            <div class="trainer-card">
                <div class="trainer-header">
                    <div class="trainer-avatar">
                        <img src="${trainer.avatar}" alt="${trainer.name}">
                    </div>
                    <div class="trainer-info">
                        <h3>${trainer.name}</h3>
                        <p class="trainer-specialization">${trainer.specialization}</p>
                        <div class="trainer-rating">
                            <i class="fas fa-star"></i> ${trainer.rating}
                            <span>(${trainer.experience} опыта)</span>
                        </div>
                    </div>
                </div>
                <div class="trainer-description">
                    <p>${trainer.description}</p>
                </div>
                <div class="trainer-actions">
                    <button class="btn btn-primary" onclick="bookWithTrainer(${trainer.id})">
                        <i class="fas fa-calendar"></i> Записаться
                    </button>
                    <button class="btn btn-secondary" onclick="showTrainerDetails(${trainer.id})">
                        <i class="fas fa-eye"></i> Профиль
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Загружаем рекомендации
    loadRecommendations();
}

// Загрузка рекомендаций
function loadRecommendations() {
    const container = document.getElementById("recommendationList");
    
    // На основе активности пользователя
    const recommendations = [
        "Попробуйте йогу с Анной Смирновой - идеально для начинающих",
        "Кардио-тренировки помогут улучшить выносливость",
        "Занимайтесь минимум 3 раза в неделю для лучших результатов"
    ];
    
    let html = "";
    recommendations.forEach(rec => {
        html += `
            <div class="recommendation-item">
                <i class="fas fa-check-circle"></i>
                <span>${rec}</span>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Загрузка страницы моих тренировок
function loadMyWorkoutsPage() {
    // Расписание плана тренировок
    const container = document.getElementById("planSchedule");
    let html = "";
    
    clientData.workoutPlan.schedule.forEach(day => {
        const completedClass = day.completed ? "completed" : "";
        const restClass = day.workout === "Отдых" ? "rest-day" : "";
        
        html += `
            <div class="plan-day ${completedClass} ${restClass}">
                <div class="day-name">${day.day}</div>
                <div class="day-workout">${day.workout}</div>
                <div class="day-time">${day.time}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // История тренировок
    const historyContainer = document.getElementById("workoutHistory");
    const completedBookings = clientData.bookings.filter(b => b.status === "completed");
    
    html = "";
    completedBookings.forEach(booking => {
        const date = formatDate(booking.date);
        
        html += `
            <tr>
                <td>${date}</td>
                <td>${booking.workoutName}</td>
                <td>${booking.trainer}</td>
                <td>60 мин.</td>
                <td>
                    <div class="rating">
                        ${getRatingStars(booking.rating || 0)}
                    </div>
                </td>
            </tr>
        `;
    });
    
    historyContainer.innerHTML = html || `
        <tr>
            <td colspan="5" class="text-center">История тренировок пуста</td>
        </tr>
    `;
}

// Загрузка страницы моих записей
function loadBookingsPage() {
    const container = document.getElementById("bookingsList");
    const activeTab = document.querySelector(".booking-tab.active").getAttribute("data-status");
    
    // Фильтруем записи по статусу
    const filteredBookings = clientData.bookings.filter(b => {
        if (activeTab === "all") return true;
        return b.status === activeTab;
    });
    
    let html = "";
    filteredBookings.forEach(booking => {
        const date = formatDate(booking.date);
        const statusClass = `status-${booking.status}`;
        const statusText = getStatusText(booking.status);
        
        html += `
            <div class="booking-card ${statusClass}">
                <div class="booking-info">
                    <h4>${booking.workoutName}</h4>
                    <p><i class="fas fa-user-tie"></i> ${booking.trainer}</p>
                    <p><i class="fas fa-calendar"></i> ${date} ${booking.time}</p>
                </div>
                <div class="booking-actions">
                    <span class="status-badge">${statusText}</span>
                    ${booking.status === "upcoming" ? 
                        `<button class="btn btn-danger btn-sm" onclick="cancelBooking(${booking.id})">
                            <i class="fas fa-times"></i> Отменить
                        </button>` : 
                        ""
                    }
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html || "<p class='text-center'>Записей нет</p>";
}

// Загрузка страницы абонемента
function loadMembershipPage() {
    // Ничего дополнительного не требуется, данные статичны
}

// Загрузка страницы профиля
function loadProfilePage() {
    const container = document.getElementById("preferenceTags");
    
    const preferences = ["Йога", "Утренние тренировки", "Групповые занятия", "Персональный тренер"];
    
    let html = "";
    preferences.forEach(pref => {
        html += `<span class="preference-tag">${pref}</span>`;
    });
    
    container.innerHTML = html;
    
    // Загружаем достижения
    loadAchievements();
}

// Загрузка достижений
function loadAchievements() {
    const container = document.querySelector(".achievements-grid");
    
    const achievements = [
        { name: "Первое посещение", icon: "fas fa-star" },
        { name: "10 тренировок", icon: "fas fa-trophy" },
        { name: "Йога-мастер", icon: "fas fa-heart" },
        { name: "25 тренировок", icon: "fas fa-award" },
        { name: "Кардио-чемпион", icon: "fas fa-bolt" },
        { name: "50 тренировок", icon: "fas fa-crown" }
    ];
    
    let html = "";
    achievements.forEach(achievement => {
        html += `
            <div class="achievement">
                <i class="${achievement.icon}"></i>
                <p>${achievement.name}</p>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Фильтрация расписания по дате
    document.getElementById("scheduleDate").addEventListener("change", function() {
        if (currentPage === "schedule") {
            loadSchedulePage();
        }
    });
    
    // Фильтрация по типу тренировки
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            // В реальном приложении здесь была бы фильтрация
        });
    });
    
    // Фильтрация тренеров
    document.querySelectorAll(".tag-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            document.querySelectorAll(".tag-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            // В реальном приложении здесь была бы фильтрация
        });
    });
    
    // Вкладки тренировок
    document.querySelectorAll(".workout-tab").forEach(tab => {
        tab.addEventListener("click", function() {
            document.querySelectorAll(".workout-tab").forEach(t => t.classList.remove("active"));
            this.classList.add("active");
            // В реальном приложении здесь была бы фильтрация
        });
    });
    
    // Вкладки записей
    document.querySelectorAll(".booking-tab").forEach(tab => {
        tab.addEventListener("click", function() {
            document.querySelectorAll(".booking-tab").forEach(t => t.classList.remove("active"));
            this.classList.add("active");
            if (currentPage === "bookings") {
                loadBookingsPage();
            }
        });
    });
    
    // Поиск тренеров
    document.getElementById("trainerSearch").addEventListener("input", function() {
        // В реальном приложении здесь был бы поиск
    });
    
    // Кнопка быстрой записи
    document.getElementById("quickBookBtn").addEventListener("click", function() {
        openBookingModal();
    });
    
    // Кнопка новой записи
    document.getElementById("newBookingBtn").addEventListener("click", function() {
        navigateTo("schedule");
    });
    
    // Кнопка создания плана тренировок
    document.getElementById("createWorkoutPlan").addEventListener("click", function() {
        alert("Создание плана тренировок. В реальном приложении здесь была бы форма.");
    });
    
    // Кнопки абонемента
    document.getElementById("renewMembership").addEventListener("click", function() {
        alert("Продление абонемента. В реальном приложении здесь была бы оплата.");
    });
    
    document.getElementById("upgradeMembership").addEventListener("click", function() {
        alert("Улучшение тарифа. В реальном приложении здесь был бы выбор тарифа.");
    });
    
    // Кнопка редактирования профиля
    document.getElementById("editProfile").addEventListener("click", function() {
        alert("Редактирование профиля. В реальном приложении здесь была бы форма.");
    });
}

// Настройка модальных окон
function setupModalHandlers() {
    // Закрытие модальных окон
    document.querySelectorAll(".close-modal").forEach(btn => {
        btn.addEventListener("click", function() {
            this.closest(".modal").style.display = "none";
        });
    });
    
    // Закрытие при клике вне окна
    window.addEventListener("click", function(e) {
        if (e.target.classList.contains("modal")) {
            e.target.style.display = "none";
        }
    });
}

// Функции действий
function showWorkoutDetails(workoutId) {
    const workout = clientData.workouts.find(w => w.id === workoutId);
    if (!workout) return;
    
    const modal = document.getElementById("workoutDetailsModal");
    const content = document.getElementById("workoutDetailsContent");
    
    content.innerHTML = `
        <h2>${workout.name}</h2>
        <div class="workout-details-modal">
            <div class="detail-item">
                <i class="fas fa-user-tie"></i>
                <div>
                    <div class="detail-label">Тренер</div>
                    <div class="detail-value">${workout.trainer}</div>
                </div>
            </div>
            <div class="detail-item">
                <i class="fas fa-calendar"></i>
                <div>
                    <div class="detail-label">Дата и время</div>
                    <div class="detail-value">${formatDate(workout.date)} ${workout.time}</div>
                </div>
            </div>
            <div class="detail-item">
                <i class="fas fa-clock"></i>
                <div>
                    <div class="detail-label">Длительность</div>
                    <div class="detail-value">${workout.duration} минут</div>
                </div>
            </div>
            <div class="detail-item">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                    <div class="detail-label">Зал</div>
                    <div class="detail-value">${workout.hall}</div>
                </div>
            </div>
            <div class="detail-item">
                <i class="fas fa-users"></i>
                <div>
                    <div class="detail-label">Участники</div>
                    <div class="detail-value">${workout.participants}/${workout.maxParticipants}</div>
                </div>
            </div>
            <div class="workout-description">
                <h3>Описание</h3>
                <p>${workout.description}</p>
            </div>
            <div class="modal-actions">
                ${!workout.booked && workout.participants < workout.maxParticipants ?
                    `<button class="btn btn-primary" onclick="bookWorkout(${workoutId})">
                        <i class="fas fa-calendar-plus"></i> Записаться
                    </button>` :
                    workout.booked ?
                    `<button class="btn btn-success" disabled>
                        <i class="fas fa-check"></i> Вы уже записаны
                    </button>` :
                    `<button class="btn btn-danger" disabled>
                        <i class="fas fa-ban"></i> Мест нет
                    </button>`
                }
            </div>
        </div>
    `;
    
    modal.style.display = "flex";
}

function showTrainerDetails(trainerId) {
    const trainer = clientData.trainers.find(t => t.id === trainerId);
    if (!trainer) return;
    
    const modal = document.getElementById("workoutDetailsModal");
    const content = document.getElementById("workoutDetailsContent");
    
    content.innerHTML = `
        <h2>${trainer.name}</h2>
        <div class="trainer-details-modal">
            <div class="trainer-header">
                <div class="trainer-avatar-large">
                    <img src="${trainer.avatar}" alt="${trainer.name}">
                </div>
                <div class="trainer-info">
                    <h3>${trainer.name}</h3>
                    <p class="specialization">${trainer.specialization}</p>
                    <div class="trainer-stats">
                        <div class="stat">
                            <i class="fas fa-star"></i>
                            <span>${trainer.rating} рейтинг</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-history"></i>
                            <span>${trainer.experience}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="trainer-description">
                <h3>О тренере</h3>
                <p>${trainer.description}</p>
            </div>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="bookWithTrainer(${trainerId})">
                    <i class="fas fa-calendar"></i> Записаться к тренеру
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = "flex";
}

function bookWorkout(workoutId) {
    const workout = clientData.workouts.find(w => w.id === workoutId);
    
    if (!workout) {
        alert("Ошибка: занятие не найдено");
        return;
    }
    
    if (workout.participants >= workout.maxParticipants) {
        alert("К сожалению, на это занятие больше нет свободных мест");
        return;
    }
    
    // В реальном приложении здесь была бы отправка на сервер
    workout.participants++;
    workout.booked = true;
    
    // Создаем новую запись
    const newBooking = {
        id: clientData.bookings.length + 1,
        workoutId: workoutId,
        date: workout.date,
        time: workout.time,
        status: "upcoming",
        workoutName: workout.name,
        trainer: workout.trainer
    };
    
    clientData.bookings.push(newBooking);
    
    // Обновляем данные на главной
    clientData.upcomingWorkouts.push({
        id: workoutId,
        name: workout.name,
        trainer: workout.trainer,
        date: workout.date,
        time: workout.time,
        duration: workout.duration,
        hall: workout.hall
    });
    
    // Закрываем модальное окно
    document.getElementById("workoutDetailsModal").style.display = "none";
    
    // Обновляем страницу
    if (currentPage === "schedule") {
        loadSchedulePage();
    } else if (currentPage === "home") {
        loadHomePage();
    }
    
    alert("Вы успешно записались на занятие!");
}

function bookWithTrainer(trainerId) {
    const trainer = clientData.trainers.find(t => t.id === trainerId);
    if (trainer) {
        navigateTo("schedule");
        alert(`Выберите удобное занятие у тренера ${trainer.name}`);
    }
}

function cancelBooking(bookingId) {
    if (!confirm("Вы уверены, что хотите отменить запись?")) {
        return;
    }
    
    const bookingIndex = clientData.bookings.findIndex(b => b.id === bookingId);
    
    if (bookingIndex === -1) return;
    
    const booking = clientData.bookings[bookingIndex];
    const workout = clientData.workouts.find(w => w.id === booking.workoutId);
    
    // Меняем статус записи
    booking.status = "cancelled";
    
    // Освобождаем место
    if (workout) {
        workout.participants--;
        workout.booked = false;
    }
    
    // Обновляем интерфейс
    if (currentPage === "bookings") {
        loadBookingsPage();
    } else if (currentPage === "home") {
        loadHomePage();
    }
    
    alert("Запись отменена");
}

function openBookingModal() {
    const modal = document.getElementById("bookingModal");
    const form = document.getElementById("bookingForm");
    
    // В реальном приложении здесь была бы форма с выбором занятия
    form.innerHTML = `
        <div class="form-group">
            <label>Выберите занятие:</label>
            <select class="form-control">
                <option value="">-- Выберите занятие --</option>
                ${clientData.workouts
                    .filter(w => !w.booked && w.participants < w.maxParticipants)
                    .map(w => `<option value="${w.id}">${w.name} - ${w.date} ${w.time}</option>`)
                    .join("")}
            </select>
        </div>
        <div class="form-group">
            <label>Примечания:</label>
            <textarea class="form-control" rows="3" placeholder="Укажите особенности..."></textarea>
        </div>
        <div class="form-group">
            <label class="checkbox">
                <input type="checkbox" checked>
                <span>Напомнить за 1 час до занятия</span>
            </label>
        </div>
        <div class="modal-actions">
            <button type="button" class="btn btn-secondary" onclick="document.getElementById('bookingModal').style.display='none'">
                Отмена
            </button>
            <button type="submit" class="btn btn-primary">
                Записаться
            </button>
        </div>
    `;
    
    form.onsubmit = function(e) {
        e.preventDefault();
        const select = form.querySelector("select");
        if (select.value) {
            bookWorkout(parseInt(select.value));
            modal.style.display = "none";
        } else {
            alert("Пожалуйста, выберите занятие");
        }
    };
    
    modal.style.display = "flex";
}

// Вспомогательные функции
function getWorkoutTypeName(type) {
    const types = {
        yoga: "Йога",
        fitness: "Фитнес",
        cardio: "Кардио",
        strength: "Силовые"
    };
    return types[type] || type;
}

function getStatusText(status) {
    const statuses = {
        upcoming: "Предстоящее",
        completed: "Завершено",
        cancelled: "Отменено"
    };
    return statuses[status] || status;
}

function getRatingStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}