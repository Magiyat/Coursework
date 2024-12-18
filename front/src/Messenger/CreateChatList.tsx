import React, {useState} from "react";
import api from "../services/http-common";


export type ChatRoomsType = {
    "id": number,
    "nameRoom": string,
    "members": Array<number>,
    "display_name": string,
}



export const CreateChatList: React.FC = () =>{
    const [userName, setUserName] = useState('')
    const [roomDate, setRoomDate] = useState<ChatRoomsType | null>()
    console.log(roomDate)
    const Find =()=>{
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
        api.post('/messenger/api/chatrooms/',
            {
                recipient: userName // Передача данных в теле запроса
            },
            {
                headers: {
                    Authorization: `Bearer ${token.access}` // Передача токена в заголовке
                }
            }
        ).then((response) => {
            const room: ChatRoomsType = response.data;
            console.log(room)
            setRoomDate(room);
            window.location.reload();
            // перенаправляет пользователя на страницу
        }).catch((e) => {
            console.error('Ошибка при выполнении запроса:', e); // Логируем ошибку для отладки
            alert('Такого пользователя нет.'); // Показываем пользователю сообщение об ошибке
        })
    }

    return(
        <>
            <textarea onChange={(e)=>setUserName(e.currentTarget.value)} value={userName}> </textarea>
            <button onClick={Find}>Найти</button>
        </>

)
}