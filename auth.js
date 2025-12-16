// auth.js - Логика авторизации и регистрации

// Данные пользователей (в реальном приложении хранились бы на сервере)
const users = {
    clients: [
        { id: 1, email: 'client@example.com', password: 'client123', name: 'Иван Иванов', phone: '+7 (999) 123-45-67', role: 'client' },
        { id: 2, email: 'user@example.com', password: 'user123', name: 'Петр Сидоров', phone: '+7 (999) 234-56-78', role: 'client' }
    ],
    trainers: [
        { id: 1, email: 'trainer@example.com', password: 'trainer123', name: 'Анна Смирнова', phone: '+7 (999) 345-67-89', role: 'trainer', specialization: 'Йога, Пилатес' },
        { id: 2, email: 'coach@example.com', password: 'coach123', name: 'Дмитрий Петров', phone: '+7 (999) 456-78-90', role: 'trainer', specialization: 'Силовые тренировки' }
    ],
    admins: [
        { id: 1, email: 'admin@example.com', password: 'admin123', name: 'Администратор Системы', phone: '+7 (999) 567-89-01', role: 'admin' }
    ]
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, на какой странице находимся
    if (document.querySelector('.auth-tabs')) {
        initAuthPage();
    }
    
    if (document.querySelector('.role-cards')) {
        initRoleSelectionPage();
    }
    
    // Восстановление сессии, если пользователь уже авторизован
    checkExistingSession();
});

// Инициализация страницы авторизации
function initAuthPage() {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Проверка параметров URL для определения активной вкладки
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    
    if (type === 'register') {
        switchToRegisterTab();
    } else {
        switchToLoginTab();
    }
    
    // Обработчики переключения вкладок
    if (loginTab) {
        loginTab.addEventListener('click', switchToLoginTab);
    }
    
    if (registerTab) {
        registerTab.addEventListener('click', switchToRegisterTab);
    }
    
    // Обработчики отправки форм
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
    
    // Инициализация маски для телефона
    initPhoneMask();
}

// Переключение на вкладку входа
function switchToLoginTab() {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginTab && registerTab && loginForm && registerForm) {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    }
}

// Переключение на вкладку регистрации
function switchToRegisterTab() {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginTab && registerTab && loginForm && registerForm) {
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
    }
}

// Инициализация маски для телефона
function initPhoneMask() {
    const phoneInput = document.getElementById('registerPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
                value = value.trim();
            }
            
            this.value = value.substring(0, 18);
        });
    }
}

// Обработка отправки формы входа
function handleLoginSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe') ? document.getElementById('rememberMe').checked : false;
    
    // Валидация
    if (!validateEmail(email)) {
        showAuthError('loginForm', 'Пожалуйста, введите корректный email');
        return;
    }
    
    if (!password) {
        showAuthError('loginForm', 'Пожалуйста, введите пароль');
        return;
    }
    
    // Поиск пользователя
    const user = findUserByEmail(email);
    
    if (!user) {
        showAuthError('loginForm', 'Пользователь с таким email не найден');
        return;
    }
    
    // Проверка пароля (в реальном приложении было бы хеширование)
    if (user.password !== password) {
        showAuthError('loginForm', 'Неверный пароль');
        return;
    }
    
    // Авторизация успешна
    handleSuccessfulAuth(user, rememberMe);
}

// Обработка отправки формы регистрации
function handleRegisterSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const phone = document.getElementById('registerPhone').value.trim();
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
    const acceptTerms = document.getElementById('acceptTerms') ? document.getElementById('acceptTerms').checked : false;
    
    // Валидация
    if (!name) {
        showAuthError('registerForm', 'Пожалуйста, введите ваше имя');
        return;
    }
    
    if (!validateEmail(email)) {
        showAuthError('registerForm', 'Пожалуйста, введите корректный email');
        return;
    }
    
    if (!validatePhone(phone)) {
        showAuthError('registerForm', 'Пожалуйста, введите корректный номер телефона');
        return;
    }
    
    if (password.length < 6) {
        showAuthError('registerForm', 'Пароль должен содержать не менее 6 символов');
        return;
    }
    
    if (password !== passwordConfirm) {
        showAuthError('registerForm', 'Пароли не совпадают');
        return;
    }
    
    if (!acceptTerms) {
        showAuthError('registerForm', 'Необходимо принять условия использования');
        return;
    }
    
    // Проверка существования пользователя
    if (findUserByEmail(email)) {
        showAuthError('registerForm', 'Пользователь с таким email уже зарегистрирован');
        return;
    }
    
    // Регистрация успешна
    const newUser = {
        id: generateUserId(),
        email: email,
        password: password, // В реальном приложении пароль должен быть хеширован
        name: name,
        phone: phone,
        role: null, // Роль будет выбрана позже
        createdAt: new Date().toISOString()
    };
    
    // Сохраняем данные пользователя (в реальном приложении отправляем на сервер)
    saveUserData(newUser);
    
    // Авторизуем пользователя
    handleSuccessfulAuth(newUser, true);
}

// Поиск пользователя по email
function findUserByEmail(email) {
    // Ищем во всех категориях пользователей
    const allUsers = [...users.clients, ...users.trainers, ...users.admins];
    return allUsers.find(user => user.email === email);
}

// Генерация ID пользователя
function generateUserId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

// Сохранение данных пользователя
function saveUserData(userData) {
    // В реальном приложении здесь был бы запрос к API
    // Для демо сохраняем в localStorage
    localStorage.setItem('fitnessCRM_newUser', JSON.stringify(userData));
}

// Обработка успешной авторизации
function handleSuccessfulAuth(user, rememberMe) {
    // Сохраняем данные сессии
    const sessionData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        isAuthenticated: true,
        authTime: new Date().toISOString()
    };
    
    if (rememberMe) {
        // Сохраняем на долгое время
        localStorage.setItem('fitnessCRM_session', JSON.stringify(sessionData));
    } else {
        // Сохраняем только на сессию
        sessionStorage.setItem('fitnessCRM_session', JSON.stringify(sessionData));
    }
    
    // Если у пользователя уже есть роль, перенаправляем на соответствующую панель
    if (user.role) {
        redirectToDashboard(user.role);
    } else {
        // Если роли нет, перенаправляем на выбор роли
        window.location.href = 'role-select.html?action=register';
    }
}

// Проверка существующей сессии
function checkExistingSession() {
    // Проверяем localStorage (запомненные сессии)
    let sessionData = localStorage.getItem('fitnessCRM_session');
    
    // Если нет в localStorage, проверяем sessionStorage
    if (!sessionData) {
        sessionData = sessionStorage.getItem('fitnessCRM_session');
    }
    
    if (sessionData) {
        const user = JSON.parse(sessionData);
        
        // Проверяем, не истекла ли сессия (24 часа)
        const authTime = new Date(user.authTime);
        const now = new Date();
        const hoursDiff = (now - authTime) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
            // Если пользователь на главной странице и уже авторизован, 
            // перенаправляем на соответствующую панель
            if (window.location.pathname.includes('index.html') && user.role) {
                redirectToDashboard(user.role);
            }
            
            // Если пользователь на странице авторизации и уже авторизован,
            // перенаправляем на выбор роли или панель
            if (window.location.pathname.includes('auth.html')) {
                if (user.role) {
                    redirectToDashboard(user.role);
                } else {
                    window.location.href = 'role-select.html?action=login';
                }
            }
        } else {
            // Сессия истекла, удаляем данные
            localStorage.removeItem('fitnessCRM_session');
            sessionStorage.removeItem('fitnessCRM_session');
        }
    }
}

// Перенаправление на панель в зависимости от роли
function redirectToDashboard(role) {
    let redirectUrl;
    
    switch(role) {
        case 'client':
            redirectUrl = 'client.html';
            break;
        case 'trainer':
            redirectUrl = 'trainer.html';
            break;
        case 'admin':
            redirectUrl = 'admin.html';
            break;
        default:
            redirectUrl = 'role-select.html';
    }
    
    // Только если мы еще не на нужной странице
    if (!window.location.pathname.includes(redirectUrl)) {
        window.location.href = redirectUrl;
    }
}

// Инициализация страницы выбора роли
function initRoleSelectionPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action') || 'login';
    
    // Обновляем заголовок и описание
    updateRolePageTitle(action);
    
    // Обработчики для кнопок выбора роли
    document.querySelectorAll('.select-role-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const role = this.getAttribute('data-role');
            handleRoleSelection(role, action);
        });
    });
    
    // Получаем данные пользователя
    const userData = getUserData();
    
    // Если пользователь не найден, возвращаем на страницу авторизации
    if (!userData) {
        window.location.href = 'auth.html';
        return;
    }
    
    // Если пользователь уже имеет роль и пытается выбрать другую,
    // показываем предупреждение
    if (userData.role && action === 'register') {
        if (confirm('У вас уже есть роль. Вы уверены, что хотите изменить её?')) {
            // Разрешаем выбрать новую роль
        } else {
            window.location.href = `${userData.role}.html`;
        }
    }
}

// Обновление заголовка страницы выбора роли
function updateRolePageTitle(action) {
    const title = document.getElementById('roleTitle');
    const description = document.getElementById('roleDescription');
    
    if (title && description) {
        if (action === 'login') {
            title.textContent = 'Вход в систему';
            description.textContent = 'Выберите тип учетной записи для входа';
        } else {
            title.textContent = 'Регистрация';
            description.textContent = 'Выберите тип учетной записи для регистрации';
        }
    }
}

// Обработка выбора роли
function handleRoleSelection(role, action) {
    // Получаем данные пользователя
    let userData = getUserData();
    
    if (!userData) {
        // Если данных нет, создаем временного пользователя
        userData = {
            id: generateUserId(),
            email: 'guest@example.com',
            name: 'Гость',
            role: role,
            authTime: new Date().toISOString(),
            isAuthenticated: true
        };
    } else {
        // Обновляем роль пользователя
        userData.role = role;
    }
    
    // Сохраняем обновленные данные
    localStorage.setItem('fitnessCRM_session', JSON.stringify(userData));
    
    // Показываем сообщение
    const roleNames = {
        'client': 'Клиент',
        'trainer': 'Тренер',
        'admin': 'Администратор'
    };
    
    if (action === 'login') {
        alert(`Добро пожаловать как ${roleNames[role]}!`);
    } else {
        alert(`Вы успешно зарегистрированы как ${roleNames[role]}!`);
    }
    
    // Перенаправляем на соответствующую панель
    redirectToDashboard(role);
}

// Получение данных пользователя
function getUserData() {
    let sessionData = localStorage.getItem('fitnessCRM_session');
    
    if (!sessionData) {
        sessionData = sessionStorage.getItem('fitnessCRM_session');
    }
    
    if (!sessionData) {
        // Проверяем, есть ли данные нового пользователя
        sessionData = localStorage.getItem('fitnessCRM_newUser');
    }
    
    return sessionData ? JSON.parse(sessionData) : null;
}

// Валидация email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Валидация телефона
function validatePhone(phone) {
    // Простая проверка для российских номеров
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 11;
}

// Показать ошибку авторизации
function showAuthError(formId, message) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    // Удаляем старую ошибку, если есть
    const oldError = form.querySelector('.auth-error');
    if (oldError) {
        oldError.remove();
    }
    
    // Создаем элемент ошибки
    const errorDiv = document.createElement('div');
    errorDiv.className = 'auth-error';
    errorDiv.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Добавляем стили
    errorDiv.style.cssText = `
        background-color: #f8d7da;
        color: #721c24;
        padding: 12px;
        border-radius: 4px;
        margin-bottom: 20px;
        border: 1px solid #f5c6cb;
    `;
    
    // Вставляем ошибку в форму
    const firstFormGroup = form.querySelector('.form-group');
    if (firstFormGroup) {
        form.insertBefore(errorDiv, firstFormGroup);
    } else {
        form.prepend(errorDiv);
    }
    
    // Автоматическое скрытие через 5 секунд
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Выход из системы
function logout() {
    // Удаляем данные сессии
    localStorage.removeItem('fitnessCRM_session');
    sessionStorage.removeItem('fitnessCRM_session');
    
    // Перенаправляем на главную страницу
    window.location.href = 'index.html';
}

// Проверка авторизации (для защищенных страниц)
function checkAuth(requiredRole = null) {
    const userData = getUserData();
    
    if (!userData || !userData.isAuthenticated) {
        // Если пользователь не авторизован, перенаправляем на страницу входа
        window.location.href = 'auth.html';
        return false;
    }
    
    if (requiredRole && userData.role !== requiredRole) {
        // Если у пользователя нет нужной роли, перенаправляем на его панель
        if (userData.role) {
            window.location.href = `${userData.role}.html`;
        } else {
            window.location.href = 'role-select.html';
        }
        return false;
    }
    
    return userData;
}

// Проверка прав доступа на странице
function checkPageAccess() {
    const currentPage = window.location.pathname.split('/').pop();
    const protectedPages = ['client.html', 'trainer.html', 'admin.html'];
    
    if (protectedPages.includes(currentPage)) {
        const requiredRole = currentPage.replace('.html', '');
        return checkAuth(requiredRole);
    }
    
    return null;
}

// Экспорт функций для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkAuth,
        logout,
        getUserData
    };
}