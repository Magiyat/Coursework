import {createContext, useEffect, useState} from "react";

// Определяем тип контекста
type AuthContextType = {
    token: string | null;
    setToken: (token: string) => void; // Установка токена
    clearToken: () => void; // Очистка токена
    isAuthenticated: boolean; // флаг, показывающий, аутентифицирован ли пользователь
    isAuthLoading:boolean;
    // setAuth: (auth: boolean) => void; // функция для изменения значения isAuthenticated
};

// Создаем контекст с типом AuthContextType и начальными значениями по умолчанию
const AuthContext = createContext<AuthContextType>({
    token: null,
    setToken: () => {},
    clearToken: () => {},
    isAuthenticated: false,
    isAuthLoading: true,
});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    // Используем хук useState для создания переменной isAuthenticated и функции setAuth для ее изменения
    // const [isAuthenticated, setAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setTokenState] = useState<string | null>(null);
    const setToken = (newToken: string) => {
        setTokenState(newToken);
    };
    const clearToken = () => {
        localStorage.removeItem("token");
        setTokenState(null);
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

