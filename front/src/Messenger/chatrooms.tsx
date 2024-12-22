import React, {useEffect, useState} from "react";
import api from "../services/http-common";
import { CreateChatList } from "./CreateChatList";


export type ChatRoom = {
    id: number;
    name: string;
    members: number[];
    display_name: string;
};
export type ChatListProps = {
    onSelectChat: (chatName: string) => void; // передача имени чата
};
export const ChatList: React.FC<ChatListProps> = ({ onSelectChat }) => {
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
                console.log(response.data)
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
            <CreateChatList/>
            <div className={'ChatRoomsGroup'}>
                {chatRooms.filter((el) => el.members.length !== 1).map((chatRoom) => (
                    <div key={chatRoom.id}>
                        <button className={'ChatRoomsName'} onClick={() => onSelectChat(chatRoom.name)}>{chatRoom.display_name}</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
