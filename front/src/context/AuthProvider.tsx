import {createContext, useEffect, useState} from "react";

// Определяем тип контекста
type AuthContextType = {
    userData: any;
    token: string | null;
    setToken: (token: string) => void; // Установка токена
    setUserData: (user: any) => void; // Установка токена
    clearToken: () => void; // Очистка токена
    isAuthenticated: boolean; // флаг, показывающий, аутентифицирован ли пользователь
    isAuthLoading:boolean;
    // setAuth: (auth: boolean) => void; // функция для изменения значения isAuthenticated
};

// Создаем контекст с типом AuthContextType и начальными значениями по умолчанию
const AuthContext = createContext<AuthContextType>({
    token: null,
    userData: null,
    setToken: () => {},
    setUserData: () => {},
    clearToken: () => {},
    isAuthenticated: false,
    isAuthLoading: true,
});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    // Используем хук useState для создания переменной isAuthenticated и функции setAuth для ее изменения
    // const [isAuthenticated, setAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setTokenState] = useState<string | null>(null);
    const [userData, setUserState] = useState<any | null>(null);
    const setToken = (newToken: string) => {
        setTokenState(newToken);
    };
    const setUserData = (user: string) => {
        setUserState(user);
    };
    const clearToken = () => {
        localStorage.removeItem("token");
        setTokenState(null);
        setUserState(null);
    };
    // Синхронизация с localStorage при загрузке компонента
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setTokenState(storedToken);
        }
        setLoading(false)
    }, []);
    // Возвращаем контекст провайдера, передавая значения isAuthenticated и setAuth в качестве значения контекста
    return (
        <AuthContext.Provider value={{
            userData,
            setUserData,
            token,
            setToken,
            clearToken,
            isAuthenticated: !!token,
            isAuthLoading: loading, }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

