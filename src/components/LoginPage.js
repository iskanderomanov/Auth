import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const setAuthToken = (token, expiresInMinutes) => {
        const expirationTime = Date.now() + expiresInMinutes * 60 * 1000;
        const tokenData = {
            value: token,
            expiration: expirationTime,
        };
        localStorage.setItem('authToken', JSON.stringify(tokenData));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            setError('Введите имя пользователя и пароль');
            return;
        }

        setError('');

        // Отправка запроса к API для проверки учетных данных
        try {
            const response = await fetch('http://193.176.239.21:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Получите токен из ответа сервера
                const { token } = await response.json();

                // Сохраните токен в локальном хранилище
                setAuthToken(token, 60);

                localStorage.setItem('isAuthenticated', 'true');

                setIsAuthenticated(true);
                // Перенаправьте пользователя на защищенную страницу
                navigate('/create');

                console.log('Аутентификация прошла успешно');
            } else {
                const errorData = await response.json();
                console.log(errorData.error);
                setError(errorData.error);
                setModalOpen(true);
            }
        } catch (error) {
            console.log('Произошла ошибка при отправке запроса:', error);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="container">
            <h1>Страница авторизации</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Имя пользователя</label>
                    <input type="text" id="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit">Войти</button>
            </form>

            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <p className="error">{error}</p>
                    </div>
                </div>
            )}

            <style jsx="true">{`
              .container {
                max-width: 500px;
                margin: 0 auto;
                padding: 2rem;
                border: 1px solid #ccc;
                border-radius: 5px;
              }

              h1 {
                text-align: center;
                margin-bottom: 2rem;
              }

              .form-group {
                margin-bottom: 1rem;
              }

              label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: bold;
              }

              input {
                width: 100%;
                padding: 0.5rem;
                border: 1px solid #ccc;
                border-radius: 4px;
              }

              button {
                background-color: #007bff;
                color: #fff;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                cursor: pointer;
              }

              button:hover {
                background-color: #0069d9;
              }

              .error {
                color: #f44336;
                margin-bottom: 0.5rem;
              }

              .modal {
                position: fixed;
                z-index: 1;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: rgba(0, 0, 0, 0.5);
              }

              .modal-content {
                background-color: #fefefe;
                padding: 2rem;
                border-radius: 5px;
                max-width: 400px;
                text-align: center;
                position: relative;
              }

              .close {
                color: #aaa;
                font-size: 20px;
                font-weight: bold;
                position: absolute;
                top: 10px;
                right: 10px;
                cursor: pointer;
              }

              .close:hover,
              .close:focus {
                color: black;
                text-decoration: none;
                cursor: pointer;
              }
            `}</style>
        </div>
    );
}

export default LoginPage;
