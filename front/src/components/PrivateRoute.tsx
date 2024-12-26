// Импортируем необходимые модули из библиотеки react-router-dom и пользовательский хук useAuth
// import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useGetUserName from "../services/nameuser";
import {Navigate, Outlet, useLocation} from "react-router-dom";

// Определяем функциональный компонент PrivateRoute

export const PrivateRoute = () => {

    // Получаем значение isAuthenticated из пользовательского хука useAuth
    const { isAuthenticated, isAuthLoading } = useAuth()
    useGetUserName()
    // Получаем текущий маршрут из хука useLocation
    const location = useLocation()

    if (isAuthLoading) return null
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    // Если пользователь авторизован, то рендерим дочерние элементы текущего маршрута, используя компонент Outlet
    return <Outlet />
};