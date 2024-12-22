import React, {useEffect, useState} from "react";
import api from "./http-common";

const GetUsName: React.FC = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                // Получение токена из localStorage
                const storedToken = localStorage.getItem('token');
                if (!storedToken) {
                    throw new Error('Токен не найден');
                }
                const token = JSON.parse(storedToken);
                if (!token.access) {
                    throw new Error('Access-токен отсутствует');
                }
                if (!token) {
                    throw new Error('Токен не найден');
                }

                // Выполнение GET-запроса с токеном
                const response = await api.get('profiles/api/profile/', {
                    headers: {
                        Authorization: "Bearer " + token.access, // Передача токена в заголовке
                    },
                });

                // Извлечение имени из ответа
                const name = response.data.username;
                localStorage.setItem('username', name);
                setUserName(name);
                console.log('Имя пользователя:', name);
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Ошибка при получении данных');
            }
        };

        fetchUserName();
    }, []); // Пустой массив зависимостей: эффект вызывается только при монтировании

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (!userName) {
        return <div>Загрузка...</div>;
    }

    return <div>{userName}</div>;
};
export default GetUsName;