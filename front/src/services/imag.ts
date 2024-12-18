import api from "./http-common";


// function UserId() {
//     const [userId, setUserId] = useState<number | null>(null); // Состояние для хранения userId
//     const [error, setError] = useState<string | null>(null);   // Состояние для ошибок
//
//     useEffect(() => {
//         const fetchUserId = async () => {
//             try {
//                 // Выполнение GET-запроса
//                 const response = await api.get('accounts/api/users/');
//                 const id = Number(response.data.userId); // Преобразование userId в число
//                 console.log('User ID:', id);
//                 setUserId(id);
//             } catch (err) {
//                 console.error('Ошибка при получении данных:', err);
//                 setError('Не удалось загрузить userId');
//             }
//         };
//
//         fetchUserId();
//     }, []);
// }
//
// const FileUploadService = {
//     UserId,
// };
const FileUploadService = {
    async getUserId(): Promise<number | null> {
        try {
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
            const response = await api.get('profiles/api/profile/', {
                headers: {
                    Authorization: "Bearer " + token.access, // Передача токена в заголовке
                },
            });
            const id = Number(response.data.id);
            return id;
        } catch (err) {
            console.error('Ошибка при получении userId:', err);
            return null;
        }
    },
};

export default FileUploadService;


    // try {
    //     const token = localStorage.getItem('token'); // Получение токена
    //     if (!token) throw new Error('Токен не найден');
    //     // Выполнение POST-запроса
    //     api.get('accounts/api/users').then((response) => {
    //         const name = String(response.data.username); // Преобразуем userId в число
    //         setUserName(name);
    //     });
    // } catch (error) {
    //     console.error('Ошибка', error);
    // }




// async function getImg(file: File, onUploadProgress: any): Promise<any> {
//     try {
//         let formData = new FormData();//FormDataдля хранения пар ключ-значение
//         formData.append("file", file);
//         // Выполнение POST-запроса
//         const response = await api.post("/upload", formData, {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             },
//             onUploadProgress,
//         });
//     } catch (error) {
//         console.error('Ошибка', error);
//     }
// }
//
// const getFiles = () : Promise<any> => {
//     return api.get("/files");
// };
// Вызов функции

