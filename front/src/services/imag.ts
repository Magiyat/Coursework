import api from "./http-common";
import React, { useState, useEffect } from 'react';

async function UserId(): Promise<any> {
    const [userId, setUserId] = useState<number | null>(null);
    try {
        // Выполнение POST-запроса
        api.get('accounts/api/users').then((response) => {
            const id = Number(response.data.userId); // Преобразуем userId в число
            setUserId(id);
        });
    } catch (error) {
        console.error('Ошибка', error);
    }
}

async function GetUsName() {
    const [userName, setUserName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log(token)

                // Получение токена
                if (!token) throw new Error('Токен не найден');

                // Выполнение GET-запроса с токеном
                const response = await api.get('accounts/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Передача токена в заголовке
                    },
                });

                const name = response.data.username; // Извлечение имени из ответа
                setUserName(name);
                console.log('hhhh')
                console.log(name)
            } catch (err: any) {
                setError(err.message || 'Ошибка при получении данных');
            }
        };
    })
};
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

const FileUploadService = {
    UserId,
    GetUsName,
};

export default FileUploadService;
