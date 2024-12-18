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
export const Messages: React.FC<MessagesProps> = ({ chatName }) => {
    const [massages, setMessages] = useState<ChatMessageType[]>([])
    const ws = new WebSocket(`ws://localhost:8000/ws/chat/${chatName}/`);
    useEffect(() =>{
        ws.addEventListener('message',(e) =>{
            let newMess = JSON.parse(e.data)
            setMessages((pedMess) =>[...pedMess, ...newMess])//получение сообщения
        })
    }, [])
    const [message, setMessage]= useState('')
    const sendMassege =()=>{
        if(!message){
            return
        }
        ws.send(message)
        setMessage('')
    }
    return (
        <div>
            <hr/>
            <div style={{height: '500px', overflowY: 'auto'}}>
                {massages.map((m) => <Message message={m}/>)}
            </div>
            <hr/>
            <>
                <div>
                    <textarea onChange={(e)=>setMessage(e.currentTarget.value)} value={message}> </textarea>
                </div>
                <div>
                    <button onClick={sendMassege}>Отправить</button>
                </div>
            </>
        </div>

    )
}
//сообщение конкретное

export const Message: React.FC<{message:ChatMessageType}> = ({message}) => {
    return(
        <div>
            <div>
                <AutoAvatar userId={message.id} size={20} /> <b>{message.user}</b>
            </div>
            <br/>
            <>{message.content}</>
            <>{message.timestamp}</>
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
