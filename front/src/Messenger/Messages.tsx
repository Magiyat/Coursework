import React, {useEffect, useState} from "react";
import {AutoAvatar} from "../uset-comp/avatar";

// const user1_user2:string = 'admin_user1'
// const ws = new WebSocket(`ws://localhost:8000/messenger/ws/chat/${user1_user2}/`);
export type ChatMessageType = {
    "id": number,
    "user": string,
    "content": string,
    "timestamp": string
}
type MessagesProps = {
    chatName: string; // получаем название чата
};
//набор сообщений
export const Messages: React.FC<MessagesProps> = ({chatName}) => {
    const [massages, setMessages] = useState<ChatMessageType[]>([])
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
    const [ws, setWs] = useState<WebSocket>()
    useEffect(() => {
        if (ws) {
            ws.close()
        }
        const ws2 = new WebSocket(`ws://localhost:8000/ws/chat/${chatName}/?token=${token.access}`)
        setWs(ws2)
    }, [chatName])
    useEffect(() => {
        const getMes = (e: MessageEvent) => {
            let newMess = JSON.parse(e.data)
            setMessages((pedMess) => [...pedMess, newMess])//получение сообщения
        }
        ws && ws.addEventListener('message', getMes)
        return () => ws?.removeEventListener('message', getMes)
    }, [ws])

    const [message, setMessage] = useState('')
    // console.log(UserName)
    const sendMassege = () => {
        if (!message || !ws) {
            return
        }
        const newMessage = {
            // id: Date.now(), // временный ID
            // user: UserName, // замените на реальное имя пользователя
            // content: message,
            message: message,
            // timestamp: new Date().toISOString(),
        };
        ws.send(JSON.stringify(newMessage)); // Отправляем сообщение как JSON
        setMessage('');

    }
    return (
        <div className={'communication'}>
            {/*<hr/>*/}
            <div className={'mass'}>
                {massages.map((m) => <Message key={m.id} message={m}/>)}
            </div>
            <hr/>
            {!ws && <span className={'loader'}/>}
            <div className={'send_masse'}>
                <div>
                    <textarea className={'chat_text'} onChange={(e) => setMessage(e.currentTarget.value)}
                              value={message}> </textarea>
                </div>
                <div>
                    <button className={'chat_button'} onClick={sendMassege}>Отправить</button>
                </div>
            </div>
        </div>
    )
}
//сообщение конкретное

export const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div>
            <div>
                <AutoAvatar userId={message.user} size={20}/> <b>{message.user}</b>
            </div>
            <br/>
            <>{message.content}</>
            <h6>{message.timestamp}</h6>
            <hr/>

        </div>
    )
}
// export const AddMessageForm: React.FC = () => {
//     const [message, setMessage]= useState('')
//     const sendMassege =()=>{
//         if(!message){
//             return
//         }
//         ws.send(message)
//         setMessage('')
//     }
//     return(
//         <div>
//             <div>
//                 <textarea onChange={(e)=>setMessage(e.currentTarget.value)} value={message}> </textarea>
//             </div>
//             <div>
//                 <button onClick={sendMassege}>Отправить</button>
//             </div>
//
//         </div>
//     )
// }
