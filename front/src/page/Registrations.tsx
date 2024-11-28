import useAuth from '../hooks/useAuth';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from "../services/http-common";
// import {UserInfo} from "os";

const RegistrationForm = () => {
    const { setToken } = useAuth()
    const navigate = useNavigate()
    // const [auth, setAuth] = useState(false);????
    const [state, setState] = useState<{
        username: string,
        email: string,
        password: string
    }>({
        username: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Останавливаем перезагрузку страницы
        const { username, email, password } = state;
        // Простая проверка заполненности полей
        if (!username || !email || !password) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        try {
            // Отправка данных для регистрации
            const response = await api.post('accounts/api/users/', { username, email, password });
            // Получение токена
            const { token } = response.data; // Извлекаем токен из ответа
            console.log(token);
            // Сохранение токена в localStorage
            localStorage.setItem('token', token)

            // Установка токена в состояние и переход
            setToken(token);
            navigate('/user', { replace: true });

        } catch (error) {
            if (error == 400 ){
                alert('Такой пользователь существует.');
            }
            else {
                console.error('Ошибка при выполнении запроса:', error);
                alert('Не удалось выполнить запрос. Попробуйте еще раз.');
            }

        }
    };

    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault(); // Останавливаем перезагрузку страницы
    //     const {username, email, password} = state
    //     // Простая проверка заполненности полей
    //     if (username && email && password) {
    //         axios.post('api/reg', { username, email, password }).then(() => {
    //             axios.post('api/token/',{username}).then((response) => {
    //                 const {token, refresh_token} = response.data;
    //                 localStorage.setItem('token', token);
    //                 localStorage.setItem('refresh_token', refresh_token);
    //                 setToken(token);
    //                 navigate('/user', {replace: true});
    //             })
    //         }).catch((e) => {
    //             console.error('Ошибка при выполнении запроса:', e); // Логируем ошибку для отладки
    //             alert('Не удалось выполнить запрос.'); // Показываем пользователю сообщение об ошибке
    //         })
    //     } else {
    //         alert('Пожалуйста, заполните все поля');
    //     }
    // };

    return (
        <div className={'login'}>
            <form className="authorization" onSubmit={handleSubmit}>
                <p className="title">Registration</p>
                <input className={'input-container'} type="text" name="username" value={state.username}
                       onChange={(e) => setState((p) => ({...p, username: e.target.value}))} maxLength={10} placeholder="Username"/>
                <input className={'input-container'} type="email" name="email" value={state.email}
                       onChange={(e) => setState((p) => ({...p, email: e.target.value}))} placeholder="Email"/>
                <input className={'input-container'} type="password" name="password" value={state.password}
                       onChange={(e) => setState((p) => ({...p, password: e.target.value}))} maxLength={10} placeholder="Password"/>
                <input className={'l_but'}
                    type="submit"
                    style={{backgroundColor: "#a1eafb"}}
                    value="Register"
                />
            </form>
        </div>
    );
};

export default RegistrationForm;
