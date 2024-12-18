// Импортируем необходимые модули из библиотеки react-router-dom и пользовательский хук useAuth
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Определяем функциональный компонент PrivateRoute

export const PrivateRoute = () => {

    // Получаем значение isAuthenticated из пользовательского хука useAuth
    const { isAuthenticated, isAuthLoading } = useAuth()

    // Получаем текущий маршрут из хука useLocation
    const location = useLocation()

    if (isAuthLoading) {
        return <div>Загрузка...</div>
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    // Если пользователь авторизован, то рендерим дочерние элементы текущего маршрута, используя компонент Outlet
    return <Outlet />
};