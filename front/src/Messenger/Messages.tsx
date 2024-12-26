import React, {useEffect, useState} from "react";
import {AutoAvatar} from "../uset-comp/avatar";
import clsx from "clsx";
import useGetUserName from "../services/nameuser";

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
    useEffect(() => {
        // При смене чата очищаем сообщения
        setMessages([]);
    }, [chatName]);
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

    // useEffect(() => {
    //     if (ws) {
    //         ws.close()
    //     }
    //     const ws2 = new WebSocket(`ws://localhost:8000/ws/chat/${chatName}/?token=${token.access}`)
    //     setWs(ws2)
    // }, [chatName])

    useEffect(() => {
        if (ws) {
            ws.close();
        }

        const ws2 = new WebSocket(`ws://51.250.79.250:8000/ws/chat/${chatName}/?token=${token.access}`);
        setWs(ws2);

        const handleMessages = (e: MessageEvent) => {
            // console.log(e.data)
            const data = JSON.parse(e.data);
            // console.log(data.messages)
            if (data.type === 'message_history' && Array.isArray(data.messages)) {
                const formattedMessages = data.messages;
                setMessages(formattedMessages);
                // Обработка истории сообщений

            } else {
                // Если пришло новое сообщение
                setMessages((prevMessages) => [...prevMessages, data]);
            }
        };

        ws2.addEventListener('message', handleMessages);

        return () => {
            ws2.close(); // Закрываем WebSocket при размонтировании
            ws2.removeEventListener('message', handleMessages);
        };
    }, [chatName]);
    // useEffect(() => {
    //     const getMes = (e: MessageEvent) => {
    //         let newMess = JSON.parse(e.data)
    //         setMessages((pedMess) => [...pedMess, newMess])//получение сообщения
    //         console.log(newMess);
    //     }
    //     ws && ws.addEventListener('message', getMes)
    //     return () => ws?.removeEventListener('message', getMes)
    // }, [ws])
    //
    // useEffect(() => {
    //     const getMes = (e: MessageEvent) => {
    //         const data = JSON.parse(e.data);
    //
    //         if (Array.isArray(data)) {
    //             // Если пришла история сообщений
    //             const formattedMessages = data.map((msg: any) => ({
    //                 id: msg.id,
    //                 user: msg.username,
    //                 content: msg.text,
    //                 timestamp: msg.created_at,
    //             }));
    //             setMessages(formattedMessages); // Заменяем текущие сообщения историей
    //         } else {
    //             // Если пришло новое сообщение
    //             setMessages((prevMessages) => [...prevMessages, data]);
    //         }
    //
    //         console.log(data);
    //     };
    //
    //     ws?.addEventListener('message', getMes);
    //     return () => ws?.removeEventListener('message', getMes);
    // }, [ws]);
    const [message, setMessage] = useState('')

    const sendMassege = () => {
        if (!message || !ws) {
            return
        }
        const newMessage = {
            message: message,
        };
        ws.send(JSON.stringify(newMessage)); // Отправляем сообщение как JSON
        setMessage('');

    }

    return (
        <div className={'communication'}>
            {/*<hr/>*/}
            <div className={'mass'}>
                {massages.slice().reverse().map((m) => <Message key={m.id} message={m}/>)}
            </div>
            <hr/>
            {!ws && <span className={'loader'}/>}
            <div className={'send_masse'}>
                <div className={'chat_text_cont'}>
                    <textarea placeholder={'Введите сообщение..'} className={'chat_text'} onChange={(e) => setMessage(e.currentTarget.value)}
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
    const { user } = useGetUserName()
    const isOwn = user === message.user
    return (
        <div className={clsx('message-container', isOwn && 'message-own')}>
            <div className={'message-header'}>
                <AutoAvatar userId={message.user} size={20}/> <b>{message.user}</b>
            </div>
            <div className={'message-content'}>{message.content}</div>
            <span className={'message-time'}>{new Date(message.timestamp).toLocaleString()}</span>
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
