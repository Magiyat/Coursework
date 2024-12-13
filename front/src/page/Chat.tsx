import React, {useEffect, useState} from "react";
import api from "../services/http-common";
// import '../trash/chat.css'
import {AutoAvatar} from "../uset-comp/avatar";
import {AddMessageForm, Messages} from "../Messenger/Messages";
const ws = new WebSocket('ws://localhost:8000/messenger/ws/ws/chat/')

const Chat = () => {
    useEffect(() =>{
        ws.addEventListener('message',(e) =>{
            console.log(e)
        })
    })
    return(
        <div>
            <ChatList/>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

type ChatRoom = {
    id: number;
    name: string;
    members: number[];
    display_name: string;
};

const ChatList: React.FC = () => {
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
        throw new Error('Токен не найден');
    }

    const token = JSON.parse(storedToken);
    if (!token.access) {
        throw new Error('Access-токен отсутствует');
    }
    if (!storedToken) throw new Error('Токен не найден');
    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                setLoading(true);
                const response = await api.get<ChatRoom[]>('/messenger/api/user/chatrooms/',
                    {
                        headers: {
                            Authorization: "Bearer " + token.access,
                        },
                    });
                console.log(response)
                setChatRooms(response.data);
            } catch (err: any) {
                setError(err.response?.data?.detail || 'Error fetching chat rooms');
            } finally {
                setLoading(false);
            }
        };

        fetchChatRooms();
    }, []);

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Chat Rooms</h1>
            <ul>
                {chatRooms.map((chatRoom) => (
                    <li key={chatRoom.id}>
                        <h2>{chatRoom.display_name}</h2>
                        <p>Chat Name: {chatRoom.name}</p>
                        <p>Members: {chatRoom.members.join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};



export default Chat
// return(
//     <div className={'massager'}>
//         <div className={'nameChat'}>
//             <div>
//                 <div className={'UserChat'}>User1</div>
//                 <div className={'UserChat'}>User2</div>
//                 <div className={'UserChat'}>User3</div>
//                 <div className={'UserChat'}>User4</div>
//             </div>
//         </div>
//         <div className={'chat'}>
//             <div className="massages">
//                 <div className="massage">
//                     Hi
//                 </div>
//                 <div className="massage">
//                     massages 2
//                 </div>
//                 <div className="massage">
//                     massages 3
//                 </div>
//
//             </div>
//         </div>
//
//     </div>
// )
