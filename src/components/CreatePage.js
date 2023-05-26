import React, {useContext, useState} from 'react';
import SelectWithSearch from './SelectWithSearch';
import {AuthContext} from "../AuthContext";
import {Navigate} from "react-router-dom";

function CreatePage() {

    const { isAuthenticated } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        service_id: '',
        identifierOrder: '',
        paySumOrder: '',
        file: '',
        // Добавьте другие поля, если необходимо
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Обработка отправки формы
        console.log(formData);

        // Получение authToken из localStorage
        const authToken = localStorage.getItem('authToken');

        // Отправка данных с authToken
        try {
            const response = await fetch('http://193.176.239.21:3000/api/abonent-service/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`, // Добавление заголовка с authToken
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Обработка успешного ответа
                console.log('Данные успешно отправлены');
            } else {
                // Обработка ошибки
                console.log('Произошла ошибка при отправке данных');
            }
        } catch (error) {
            // Обработка ошибки
            console.log('Произошла ошибка при отправке запроса:', error);
        }
    };
    //
    // if (!isAuthenticated) {
    //     return <Navigate to="/login" replace />;
    // }

    return (
        <div className="container">
            <h1>Страница создания</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="service_id">Сервис</label>
                    <SelectWithSearch apiUrl="http://193.176.239.21:3000/api/listServices" required name="service_id" />
                </div>
                <div className="form-group">
                    <label htmlFor="identifierOrder">Идентификатор*</label>
                    <input
                        type="number"
                        id="identifierOrder"
                        name="identifierOrder"
                        value={formData.identifierOrder}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="paySumOrder">Оплачиваемая сумма</label>
                    <input
                        type="number"
                        id="paySumOrder"
                        name="paySumOrder"
                        value={formData.paySumOrder}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {/*<div className="form-group">*/}
                {/*    <label htmlFor="service_id">Метод парсинга*</label>*/}
                {/*    <SelectWithSearch apiUrl="https://example.com/api/options1" required />*/}
                {/*</div>*/}
                <div className="form-group">
                    <label htmlFor="file">Выбрать файл</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        value={formData.file}
                        accept=".xls,.xlsx,.dbf,.txt,.csv"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {/* Добавьте другие поля формы, если необходимо */}
                <button type="submit">Сохранить</button>
            </form>

            <style jsx='true'>{`
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
                margin-bottom: 2rem;
              }

              label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: bold;
              }

              input[type="number"],
              input[type="file"] {
                width: 100%;
                padding: 0.5rem;
                border: 1px solid #ccc;
                border-radius: 4px;
              }

              button[type="submit"] {
                background-color: #007bff;
                color: #fff;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                cursor: pointer;
                width: 100%;
              }

              button[type="submit"]:hover {
                background-color: #0069d9;
              }
            `}</style>
        </div>
    );
}

export default CreatePage;
