import React, {useState} from "react";
import {Messages} from "../Messenger/Messages";
import {ChatList} from "../Messenger/chatrooms";
import '../trash/chat.css'


const Chat = () => {
    const [selectedChatName, setSelectedChatName] = useState<string | null>(null);
    return (
        <div className={'ChatPage'}>
            <ChatList onSelectChat={setSelectedChatName}/>
            {selectedChatName ? (
                <Messages chatName={selectedChatName}/>
            ) : (
                <div className={'communication'}>Выберите чат</div>
            )}
            {/*<ChatList/>*/}
            {/*<hr/>*/}
            {/*<Messages/>*/}

            {/*<AddMessageForm/>*/}
        </div>
    )
}


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
