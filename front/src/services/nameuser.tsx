import React, {useEffect, useState} from "react";
import api from "./http-common";
import useAuth from "../hooks/useAuth";

const useGetUserName = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { userData, setUserData, isAuthLoading,  } = useAuth()
    const user = userData?.username ?? null
    const profile = userData?.profile ?? {}
    useEffect(() => {
        if (isAuthLoading) return
        if (user) setLoading(true)
        const fetchUserName = async () => {
            setLoading(true)
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
                setUserData(response.data);
                // console.log('Имя пользователя:', name);
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Ошибка при получении данных');
            } finally {
                setLoading(false)
            }
        };

        fetchUserName();
    }, [isAuthLoading]); // Пустой массив зависимостей: эффект вызывается только при монтировании

    return {user, profile, error, loading}
};
export default useGetUserName;