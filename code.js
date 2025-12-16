
        // Данные приложения
        const appData = {
            currentRole: 'client',
            currentUser: {
                name: 'Иван Иванов',
                avatar: 'ИИ'
            },
            workouts: [
                { id: 1, name: 'Йога для начинающих', trainer: 'Анна Смирнова', date: '2023-10-20', time: '09:00', duration: 60, maxParticipants: 15, currentParticipants: 8, description: 'Основные асаны йоги для новичков. Не требуется опыт.' },
                { id: 2, name: 'Силовая тренировка', trainer: 'Дмитрий Петров', date: '2023-10-20', time: '11:00', duration: 45, maxParticipants: 10, currentParticipants: 6, description: 'Интенсивная тренировка с использованием свободных весов.' },
                { id: 3, name: 'Кардио-бокс', trainer: 'Сергей Козлов', date: '2023-10-20', time: '17:00', duration: 50, maxParticipants: 12, currentParticipants: 10, description: 'Динамичная тренировка, сочетающая кардио и элементы бокса.' },
                { id: 4, name: 'Пилатес', trainer: 'Елена Волкова', date: '2023-10-21', time: '10:00', duration: 55, maxParticipants: 8, currentParticipants: 5, description: 'Укрепление мышц кора, улучшение осанки и гибкости.' },
                { id: 5, name: 'Функциональный тренинг', trainer: 'Алексей Соколов', date: '2023-10-21', time: '18:00', duration: 60, maxParticipants: 12, currentParticipants: 12, description: 'Тренировка, направленная на развитие силы, выносливости и координации.' },
                { id: 6, name: 'Стретчинг', trainer: 'Мария Новикова', date: '2023-10-22', time: '19:00', duration: 45, maxParticipants: 15, currentParticipants: 7, description: 'Упражнения на растяжку и повышение гибкости тела.' }
            ],
            trainers: [
                { id: 1, name: 'Анна Смирнова', specialization: 'Йога, Пилатес', experience: '8 лет', rating: 4.9, description: 'Сертифицированный инструктор по йоге и пилатесу. Проводит индивидуальные и групповые занятия.', avatar: 'АС' },
                { id: 2, name: 'Дмитрий Петров', specialization: 'Силовые тренировки, Фитнес', experience: '12 лет', rating: 4.8, description: 'Мастер спорта по тяжелой атлетике. Специализируется на силовых тренировках и коррекции фигуры.', avatar: 'ДП' },
                { id: 3, name: 'Сергей Козлов', specialization: 'Бокс, Кардио-тренировки', experience: '6 лет', rating: 4.7, description: 'Профессиональный боксер. Разработал собственную систему кардио-тренировок.', avatar: 'СК' },
                { id: 4, name: 'Елена Волкова', specialization: 'Пилатес, Стретчинг', experience: '10 лет', rating: 5.0, description: 'Сертифицированный тренер по пилатесу. Помогла более 200 клиентам улучшить осанку и избавиться от болей в спине.', avatar: 'ЕВ' },
                { id: 5, name: 'Алексей Соколов', specialization: 'Функциональный тренинг, Кроссфит', experience: '7 лет', rating: 4.8, description: 'Сертифицированный тренер по функциональному тренингу. Участник соревнований по кроссфиту.', avatar: 'АС' },
                { id: 6, name: 'Мария Новикова', specialization: 'Стретчинг, Гибкость', experience: '5 лет', rating: 4.9, description: 'Специалист по стретчингу и развитию гибкости. Работала с профессиональными танцорами.', avatar: 'МН' }
            ],
            bookings: [
                { id: 1, clientName: 'Иван Иванов', clientPhone: '+7 (912) 345-67-89', workoutId: 1, date: '2023-10-20', time: '09:00', status: 'активна' },
                { id: 2, clientName: 'Петр Сидоров', clientPhone: '+7 (923) 456-78-90', workoutId: 3, date: '2023-10-20', time: '17:00', status: 'активна' },
                { id: 3, clientName: 'Мария Кузнецова', clientPhone: '+7 (934) 567-89-01', workoutId: 4, date: '2023-10-21', time: '10:00', status: 'активна' }
            ]
        };

        // Инициализация приложения
        document.addEventListener('DOMContentLoaded', function() {
            // Инициализация данных
            initApp();
            
            // Установка обработчиков событий
            setupEventListeners();
            
            // Загрузка начальной страницы
            showPage('schedule');
        });

        // Инициализация приложения
        function initApp() {
            // Сохранение данных в localStorage для имитации работы с бэкендом
            localStorage.setItem('fitnessCRM_data', JSON.stringify(appData));
            
            // Установка аватара пользователя
            document.getElementById('userAvatar').textContent = appData.currentUser.avatar;
            
            // Загрузка расписания
            loadSchedule();
            
            // Загрузка тренеров
            loadTrainers();
            
            // Загрузка записей пользователя
            loadUserBookings();
            
            // Загрузка всех записей (для администратора)
            loadAllBookings();
        }

        // Настройка обработчиков событий
        function setupEventListeners() {
            // Навигация
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const page = this.getAttribute('data-page');
                    showPage(page);
                    
                    // Обновление активной ссылки
                    document.querySelectorAll('.nav-link').forEach(item => {
                        item.classList.remove('active');
                    });
                    this.classList.add('active');
                });
            });
            
            // Выбор роли
            document.querySelectorAll('.role-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const role = this.getAttribute('data-role');
                    changeRole(role);
                    
                    // Обновление активной кнопки
                    document.querySelectorAll('.role-btn').forEach(item => {
                        item.classList.remove('active');
                    });
                    this.classList.add('active');
                });
            });
            
            // Выход из системы
            document.getElementById('logoutBtn').addEventListener('click', function() {
                alert('Вы вышли из системы');
                // В реальном приложении здесь был бы редирект на страницу входа
            });
            
            // Закрытие модальных окон
            document.querySelectorAll('.close-modal').forEach(closeBtn => {
                closeBtn.addEventListener('click', function() {
                    this.closest('.modal').style.display = 'none';
                });
            });
            
            // Закрытие модальных окон при клике вне окна
            window.addEventListener('click', function(e) {
                if (e.target.classList.contains('modal')) {
                    e.target.style.display = 'none';
                }
            });
            
            // Отправка формы записи
            document.getElementById('bookingForm').addEventListener('submit', function(e) {
                e.preventDefault();
                bookWorkout();
            });
            
            // Кнопки администрирования
            document.getElementById('manageUsersBtn').addEventListener('click', function() {
                alert('Функционал управления пользователями в разработке');
            });
            
            document.getElementById('manageScheduleBtn').addEventListener('click', function() {
                alert('Функционал управления расписанием в разработке');
            });
            
            document.getElementById('viewStatsBtn').addEventListener('click', function() {
                alert('Функционал просмотра статистики в разработке');
            });
        }

        // Изменение роли пользователя
        function changeRole(role) {
            appData.currentRole = role;
            document.getElementById('currentRole').textContent = 
                role === 'client' ? 'Клиент' : 
                role === 'trainer' ? 'Тренер' : 'Администратор';
            
            // Показ/скрытие элементов для администратора
            const adminElements = document.querySelectorAll('.admin-only');
            if (role === 'admin') {
                adminElements.forEach(el => el.classList.remove('hidden'));
            } else {
                adminElements.forEach(el => el.classList.add('hidden'));
            }
            
            // Обновление отображаемых данных в зависимости от роли
            loadSchedule();
            loadUserBookings();
            loadAllBookings();
        }

        // Показать страницу
        function showPage(pageId) {
            // Скрыть все страницы
            document.querySelectorAll('.page').forEach(page => {
                page.classList.add('hidden');
            });
            
            // Показать выбранную страницу
            document.getElementById(`${pageId}Page`).classList.remove('hidden');
        }

        // Загрузка расписания
        function loadSchedule() {
            const container = document.getElementById('scheduleContainer');
            container.innerHTML = '';
            
            appData.workouts.forEach(workout => {
                const isFull = workout.currentParticipants >= workout.maxParticipants;
                const isBooked = appData.bookings.some(booking => 
                    booking.workoutId === workout.id && 
                    booking.clientName === appData.currentUser.name);
                
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-header">
                        <i class="fas fa-calendar-check"></i>
                        <h3>${workout.name}</h3>
                    </div>
                    <div class="card-body">
                        <p><strong>Тренер:</strong> ${workout.trainer}</p>
                        <p><strong>Дата:</strong> ${formatDate(workout.date)}</p>
                        <p><strong>Время:</strong> ${workout.time} (${workout.duration} мин.)</p>
                        <p><strong>Участники:</strong> ${workout.currentParticipants}/${workout.maxParticipants}</p>
                        <p>${workout.description}</p>
                        <div class="mt-3">
                            ${isFull ? 
                                `<button class="btn btn-danger" disabled><i class="fas fa-ban"></i> Мест нет</button>` : 
                                isBooked ? 
                                `<button class="btn btn-success" disabled><i class="fas fa-check"></i> Вы записаны</button>` :
                                appData.currentRole === 'client' ? 
                                `<button class="btn btn-primary book-btn" data-id="${workout.id}"><i class="fas fa-plus"></i> Записаться</button>` :
                                `<button class="btn btn-primary" disabled><i class="fas fa-info"></i> Только для клиентов</button>`
                            }
                            ${appData.currentRole === 'admin' ? 
                                `<button class="btn btn-danger mt-2 delete-workout-btn" data-id="${workout.id}"><i class="fas fa-trash"></i> Удалить занятие</button>` : ''
                            }
                        </div>
                    </div>
                `;
                
                container.appendChild(card);
            });
            
            // Добавление обработчиков для кнопок записи
            document.querySelectorAll('.book-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const workoutId = parseInt(this.getAttribute('data-id'));
                    openBookingModal(workoutId);
                });
            });
            
            // Добавление обработчиков для кнопок удаления занятий (админ)
            document.querySelectorAll('.delete-workout-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const workoutId = parseInt(this.getAttribute('data-id'));
                    if (confirm('Вы уверены, что хотите удалить это занятие?')) {
                        deleteWorkout(workoutId);
                    }
                });
            });
        }

        // Загрузка тренеров
        function loadTrainers() {
            const container = document.getElementById('trainersContainer');
            container.innerHTML = '';
            
            appData.trainers.forEach(trainer => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-header">
                        <i class="fas fa-user-tie"></i>
                        <h3>${trainer.name}</h3>
                    </div>
                    <div class="card-body">
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                            <div class="user-avatar" style="width: 60px; height: 60px; font-size: 1.2rem;">${trainer.avatar}</div>
                            <div>
                                <p><strong>Специализация:</strong> ${trainer.specialization}</p>
                                <p><strong>Опыт:</strong> ${trainer.experience}</p>
                                <p><strong>Рейтинг:</strong> ${trainer.rating} <i class="fas fa-star" style="color: #f1c40f;"></i></p>
                            </div>
                        </div>
                        <p>${trainer.description}</p>
                        <button class="btn btn-primary mt-3 view-trainer-btn" data-id="${trainer.id}"><i class="fas fa-info-circle"></i> Подробнее</button>
                    </div>
                `;
                
                container.appendChild(card);
            });
            
            // Добавление обработчиков для кнопок подробнее о тренере
            document.querySelectorAll('.view-trainer-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const trainerId = parseInt(this.getAttribute('data-id'));
                    openTrainerModal(trainerId);
                });
            });
        }

        // Загрузка записей пользователя
        function loadUserBookings() {
            const tableBody = document.getElementById('bookingsTable');
            const emptyState = document.getElementById('emptyBookings');
            
            // Очистка таблицы
            tableBody.innerHTML = '';
            
            // Фильтрация записей текущего пользователя
            const userBookings = appData.bookings.filter(booking => 
                booking.clientName === appData.currentUser.name ||
                appData.currentRole === 'admin' // Админ видит все записи на странице админки
            );
            
            if (userBookings.length === 0) {
                emptyState.classList.remove('hidden');
                return;
            }
            
            emptyState.classList.add('hidden');
            
            // Добавление записей в таблицу
            userBookings.forEach(booking => {
                const workout = appData.workouts.find(w => w.id === booking.workoutId);
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${workout ? workout.name : 'Занятие удалено'}</td>
                    <td>${workout ? workout.trainer : 'Не указан'}</td>
                    <td>${formatDate(booking.date)} ${booking.time}</td>
                    <td><span class="role-badge" style="background-color: ${booking.status === 'активна' ? '#2ecc71' : '#e74c3c'}">${booking.status}</span></td>
                    <td>
                        <button class="btn btn-danger cancel-booking-btn" data-id="${booking.id}"><i class="fas fa-trash"></i> Отменить</button>
                    </td>
                `;
                
                tableBody.appendChild(row);
            });
            
            // Добавление обработчиков для кнопок отмены записи
            document.querySelectorAll('.cancel-booking-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const bookingId = parseInt(this.getAttribute('data-id'));
                    if (confirm('Вы уверены, что хотите отменить запись?')) {
                        cancelBooking(bookingId);
                    }
                });
            });
        }

        // Загрузка всех записей (для администратора)
        function loadAllBookings() {
            const tableBody = document.getElementById('allBookingsTable');
            
            // Очистка таблицы
            tableBody.innerHTML = '';
            
            // Добавление всех записей в таблицу
            appData.bookings.forEach(booking => {
                const workout = appData.workouts.find(w => w.id === booking.workoutId);
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${booking.clientName}<br><small>${booking.clientPhone}</small></td>
                    <td>${workout ? workout.name : 'Занятие удалено'}</td>
                    <td>${workout ? workout.trainer : 'Не указан'}</td>
                    <td>${formatDate(booking.date)} ${booking.time}</td>
                    <td><span class="role-badge" style="background-color: ${booking.status === 'активна' ? '#2ecc71' : '#e74c3c'}">${booking.status}</span></td>
                    <td>
                        <button class="btn btn-danger cancel-admin-booking-btn" data-id="${booking.id}"><i class="fas fa-ban"></i> Отменить</button>
                    </td>
                `;
                
                tableBody.appendChild(row);
            });
            
            // Добавление обработчиков для кнопок отмены записи (админ)
            document.querySelectorAll('.cancel-admin-booking-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const bookingId = parseInt(this.getAttribute('data-id'));
                    if (confirm('Вы уверены, что хотите отменить эту запись?')) {
                        cancelBooking(bookingId);
                    }
                });
            });
        }

        // Открытие модального окна записи
        function openBookingModal(workoutId) {
            const workout = appData.workouts.find(w => w.id === workoutId);
            
            if (!workout) return;
            
            document.getElementById('workoutName').value = workout.name;
            document.getElementById('workoutTrainer').value = workout.trainer;
            document.getElementById('workoutDateTime').value = `${formatDate(workout.date)} ${workout.time}`;
            document.getElementById('clientName').value = appData.currentUser.name;
            document.getElementById('clientPhone').value = '+7 (9';
            
            document.getElementById('bookingModal').style.display = 'flex';
        }

        // Открытие модального окна информации о тренере
        function openTrainerModal(trainerId) {
            const trainer = appData.trainers.find(t => t.id === trainerId);
            
            if (!trainer) return;
            
            document.getElementById('trainerModalTitle').textContent = `Тренер: ${trainer.name}`;
            
            const content = document.getElementById('trainerModalContent');
            content.innerHTML = `
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                    <div class="user-avatar" style="width: 80px; height: 80px; font-size: 1.5rem;">${trainer.avatar}</div>
                    <div>
                        <p><strong>Специализация:</strong> ${trainer.specialization}</p>
                        <p><strong>Опыт работы:</strong> ${trainer.experience}</p>
                        <p><strong>Рейтинг:</strong> ${trainer.rating} <i class="fas fa-star" style="color: #f1c40f;"></i></p>
                    </div>
                </div>
                <p><strong>О тренере:</strong> ${trainer.description}</p>
                <h3 style="margin-top: 20px;">Ближайшие занятия:</h3>
                <ul>
                    ${appData.workouts
                        .filter(w => w.trainer === trainer.name)
                        .slice(0, 3)
                        .map(w => `<li>${w.name} - ${formatDate(w.date)} ${w.time}</li>`)
                        .join('')}
                </ul>
            `;
            
            document.getElementById('trainerModal').style.display = 'flex';
        }

        // Запись на занятие
        function bookWorkout() {
            const clientName = document.getElementById('clientName').value;
            const clientPhone = document.getElementById('clientPhone').value;
            
            // Находим workout по данным формы
            const workoutName = document.getElementById('workoutName').value;
            const workout = appData.workouts.find(w => w.name === workoutName);
            
            if (!workout) {
                alert('Ошибка: занятие не найдено');
                return;
            }
            
            // Проверяем, есть ли уже запись
            const existingBooking = appData.bookings.find(booking => 
                booking.workoutId === workout.id && 
                booking.clientName === clientName);
            
            if (existingBooking) {
                alert('Вы уже записаны на это занятие!');
                return;
            }
            
            // Проверяем, есть ли свободные места
            if (workout.currentParticipants >= workout.maxParticipants) {
                alert('К сожалению, на это занятие больше нет свободных мест');
                return;
            }
            
            // Создаем новую запись
            const newBooking = {
                id: appData.bookings.length + 1,
                clientName,
                clientPhone,
                workoutId: workout.id,
                date: workout.date,
                time: workout.time,
                status: 'активна'
            };
            
            // Добавляем запись
            appData.bookings.push(newBooking);
            
            // Увеличиваем количество участников
            workout.currentParticipants++;
            
            // Сохраняем данные
            updateLocalStorage();
            
            // Закрываем модальное окно
            document.getElementById('bookingModal').style.display = 'none';
            
            // Обновляем интерфейс
            loadSchedule();
            loadUserBookings();
            loadAllBookings();
            
            alert('Вы успешно записались на занятие!');
        }

        // Отмена записи
        function cancelBooking(bookingId) {
            const bookingIndex = appData.bookings.findIndex(b => b.id === bookingId);
            
            if (bookingIndex === -1) return;
            
            const booking = appData.bookings[bookingIndex];
            const workout = appData.workouts.find(w => w.id === booking.workoutId);
            
            // Удаляем запись
            appData.bookings.splice(bookingIndex, 1);
            
            // Уменьшаем количество участников
            if (workout) {
                workout.currentParticipants--;
            }
            
            // Сохраняем данные
            updateLocalStorage();
            
            // Обновляем интерфейс
            loadSchedule();
            loadUserBookings();
            loadAllBookings();
            
            alert('Запись отменена');
        }

        // Удаление занятия (админ)
        function deleteWorkout(workoutId) {
            const workoutIndex = appData.workouts.findIndex(w => w.id === workoutId);
            
            if (workoutIndex === -1) return;
            
            // Удаляем все записи на это занятие
            appData.bookings = appData.bookings.filter(b => b.workoutId !== workoutId);
            
            // Удаляем занятие
            appData.workouts.splice(workoutIndex, 1);
            
            // Сохраняем данные
            updateLocalStorage();
            
            // Обновляем интерфейс
            loadSchedule();
            loadUserBookings();
            loadAllBookings();
            
            alert('Занятие удалено');
        }

        // Форматирование даты
        function formatDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        }

        // Обновление данных в localStorage
        function updateLocalStorage() {
            localStorage.setItem('fitnessCRM_data', JSON.stringify(appData));
        }