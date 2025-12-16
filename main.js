// Общие функции для всех страниц

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    // Проверка параметров URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // Если на главной странице, инициализируем навигацию
    if (document.querySelector('.main-nav')) {
        initNavigation();
    }
    
    // Если на странице авторизации
    if (document.querySelector('.auth-tabs')) {
        initAuthTabs();
    }
    
    // Если на странице выбора роли
    if (document.querySelector('.role-cards')) {
        initRoleSelection();
    }
});

// Инициализация навигации
function initNavigation() {
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Активный пункт меню
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.main-nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Инициализация вкладок авторизации
function initAuthTabs() {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Проверка параметров URL для автоматического выбора вкладки
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    
    if (type === 'register') {
        switchTab(registerTab, registerForm);
    }
    
    // Обработчики переключения вкладок
    loginTab.addEventListener('click', () => switchTab(loginTab, loginForm));
    registerTab.addEventListener('click', () => switchTab(registerTab, registerForm));
    
    // Валидация форм
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

// Переключение вкладок
function switchTab(activeTab, activeForm) {
    // Сброс активных состояний
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    
    // Установка новых активных состояний
    activeTab.classList.add('active');
    activeForm.classList.add('active');
}

// Обработка входа
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // В реальном приложении здесь был бы запрос к API
    if (email && password) {
        // Сохраняем данные пользователя
        localStorage.setItem('fitnessCRM_user', JSON.stringify({
            email,
            name: email.split('@')[0]
        }));
        
        // Перенаправляем на выбор роли
        window.location.href = 'role-select.html?action=login';
    }
}

// Обработка регистрации
function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
    
    // Проверка паролей
    if (password !== passwordConfirm) {
        alert('Пароли не совпадают!');
        return;
    }
    
    // В реальном приложении здесь был бы запрос к API
    if (name && email && phone && password) {
        // Сохраняем данные пользователя
        localStorage.setItem('fitnessCRM_user', JSON.stringify({
            name,
            email,
            phone
        }));
        
        alert('Регистрация успешна! Теперь выберите вашу роль.');
        
        // Перенаправляем на выбор роли
        window.location.href = 'role-select.html?action=register';
    }
}

// Инициализация выбора роли
function initRoleSelection() {
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action') || 'login';
    
    // Обновляем заголовок и описание
    const title = document.getElementById('roleTitle');
    const description = document.getElementById('roleDescription');
    
    if (action === 'login') {
        title.textContent = 'Вход в систему';
        description.textContent = 'Выберите тип учетной записи для входа';
    } else {
        title.textContent = 'Регистрация';
        description.textContent = 'Выберите тип учетной записи для регистрации';
    }
    
    // Обработчики для кнопок выбора роли
    document.querySelectorAll('.select-role-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const role = this.getAttribute('data-role');
            selectRole(role, action);
        });
    });
}

// Выбор роли пользователя
function selectRole(role, action) {
    // Сохраняем выбранную роль
    const userData = JSON.parse(localStorage.getItem('fitnessCRM_user') || '{}');
    userData.role = role;
    userData.lastLogin = new Date().toISOString();
    localStorage.setItem('fitnessCRM_user', JSON.stringify(userData));
    
    // В зависимости от действия перенаправляем на соответствующую страницу
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
            redirectUrl = 'index.html';
    }
    
    // Показываем сообщение о успешной авторизации
    if (action === 'login') {
        alert(`Добро пожаловать в систему как ${getRoleName(role)}!`);
    } else {
        alert(`Регистрация завершена! Вы зарегистрированы как ${getRoleName(role)}.`);
    }
    
    // Перенаправляем
    window.location.href = redirectUrl;
}

// Получение имени роли
function getRoleName(role) {
    const roles = {
        'client': 'Клиент',
        'trainer': 'Тренер',
        'admin': 'Администратор'
    };
    return roles[role] || 'Пользователь';
}

// Проверка авторизации (для страниц панелей)
function checkAuth() {
    const userData = JSON.parse(localStorage.getItem('fitnessCRM_user'));
    
    if (!userData || !userData.role) {
        // Если пользователь не авторизован, перенаправляем на главную
        if (!window.location.pathname.includes('index.html') && 
            !window.location.pathname.includes('auth.html')) {
            window.location.href = 'index.html';
        }
        return null;
    }
    
    return userData;
}

// Выход из системы
function logout() {
    localStorage.removeItem('fitnessCRM_user');
    window.location.href = 'index.html';
}

// Форматирование даты
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Форматирование времени
function formatTime(timeString) {
    return timeString;
}

// main.js - скрипты для главной страницы

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация табов решений
    initSolutionTabs();
    
    // Инициализация навигации
    initNavigation();
    
    // Плавная прокрутка
    initSmoothScroll();
    
    // Анимация при скролле
    initScrollAnimations();
});

// Инициализация табов решений
function initSolutionTabs() {
    const tabs = document.querySelectorAll('.solution-tab');
    const panels = document.querySelectorAll('.solution-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.target;
            
            // Обновляем активный таб
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Показываем соответствующую панель
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `${target}-solution`) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

// Инициализация навигации
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Адаптивное меню
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.style.display = 'flex';
            } else {
                navMenu.style.display = 'none';
            }
        });
    }
    
    // Активная навигация при скролле
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Анимация при скролле
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Анимируем карточки возможностей
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Анимируем статистику
    document.querySelectorAll('.stat-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Подсветка навигации при скролле
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}