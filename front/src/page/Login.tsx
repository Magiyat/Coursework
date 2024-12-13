import useAuth from '../hooks/useAuth';
import {Link, useNavigate} from 'react-router-dom';
import React, {useState} from "react";
import api from "../services/http-common";
import '../trash/but_log.css'

const Login = () => {
    const { setToken } = useAuth()
    const navigate = useNavigate()
    const s = 'ssssssss';

    const [state, setState] = useState<{
        username: string,
        password: string
    }>({
        username: '',
        password: ''
    })
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Останавливаем перезагрузку страницы
        const {username, password} = state
        // Простая проверка заполненности полей
        if (username && password) {
            api.post('accounts/api/token/', { username, password }).then((response) => {
                const token = response.data;
                localStorage.setItem('token', JSON.stringify(token));
                setToken(token); // указывает, что пользователь теперь авторизован.
                navigate('/user', {replace: true}); // перенаправляет пользователя на страницу
            }).catch((e) => {
                console.error('Ошибка при выполнении запроса:', e); // Логируем ошибку для отладки
                alert('Не удалось выполнить запрос.'); // Показываем пользователю сообщение об ошибке
            })
        } else {
            alert('Пожалуйста, заполните все поля');
        }
    };

    return (
        <>
            <div className={'login'}>
                <form className="authorization" onSubmit={handleSubmit}>
                    <p className="title">log in</p>
                    <input className={'input-container'} type="text" name="username" value={state.username}
                           onChange={(e) => setState((p) => ({...p, username: e.target.value}))} maxLength={40} placeholder="Username"/>
                    <input className={'input-container'} type="password" name="password" value={state.password}
                           onChange={(e) => setState((p) => ({...p, password: e.target.value}))} maxLength={20} placeholder="Password"/>
                    <button className={'l_but'}>log in</button>
                    {/*<input*/}
                    {/*    type="submit"*/}
                    {/*    style={{backgroundColor: "#a1eafb"}}*/}
                    {/*    value="Register"*/}
                    {/*/>*/}
                    <Link className={'reg_b'} to="/registrations">
                        registrations
                    </Link>

                </form>
            </div>

                <button type={'button'} onClick={() => {
                    setToken(s)
                    navigate('/user', { replace: true });
                }}>Login</button>

        </>

    )
}

export default Login
