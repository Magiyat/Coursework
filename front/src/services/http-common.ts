import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
        responseType: "json"
    }
});
api.interceptors.request.use(
    async (config) => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            return config
        }
        const token = JSON.parse(storedToken);
        if (token.access && config.headers) {
            config.headers['authorization'] = `Bearer ${token.access}`;
        }
        return config;
    }
);
export default api