import React from "react";
import {AutoAvatar} from "../uset-comp/avatar";

export const Messages: React.FC = () => {
    const massages = [1, 2, 3
        // {url: '/messenger/api/user/chatrooms/'},
        // {
        //     "id": 1,
        //     "name": "user1_user2",
        //     "members": [1, 2],
        //     "display_name": "user2"
        // }
    ];
    return (
        <div style={{height: '200px', overflowY: 'auto'}}>
            {massages.map((n: any) => <Message/>)}
        </div>
    )
}
export const Message: React.FC = () => {
    const message = {
        url: '/messenger/api/chatrooms/<room_name/messages/',
        name_us: 'Kata',
        text: 'Hi'
    }
    return(
        <div>
            <div>
                <AutoAvatar userId={2342} size={20} /> <b>{message.name_us}</b>
            </div>
            <br/>
            <>{message.text}</>
            <hr/>
        </div>
    )
}
export const AddMessageForm: React.FC = () => {
    return(
        <div>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>Send</button>
            </div>

        </div>
    )
}
