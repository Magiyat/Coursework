import React, {Fragment, useEffect, useState} from 'react';
import api from "../services/http-common";
import '../trash/friends.css'
import {AutoAvatar} from "../uset-comp/avatar";
import useGetUserName from "../services/nameuser";

// const FState = () =>{
//  users: [
//      {id: 1, FullName: 'Alex', status: 'I not i', follow: true},
//      {id: 2, FullName: 'Mark', status: 'I not i', follow: true},
//      {id: 3, FullName: 'Artem', status: 'I not i', follow: false},
//      {id: 4, FullName: 'Kata', status: 'I not i', follow: false},
//  ]
// }
const FriendElement = ({
                           username, id, email
                       }: { id: number, username: string, email: string }) => {
    const { profile} = useGetUserName()
    const [isFriend, setIsFriend] = useState(profile?.friends?.includes(id));
    // const isFriend = profile?.friends?.includes(id)
    const addFriend = () => {
        try {
            api.post(`/profiles/api/add-friend/`, { username });
            setIsFriend(true); // Обновляем состояние
        } catch (error) {
            console.error('Ошибка при добавлении в друзья:', error);
        }
        // api.post(`/profiles/api/add-friend/`, {username})
    }
    const removeFriend = () => {
        try {
            api.post(`/profiles/api/remove-friend/`, { username });
            setIsFriend(false); // Обновляем состояние
        } catch (error) {
            console.error('Ошибка при удалении из друзей:', error);
        }
        // api.post(`/profiles/api/remove-friend/`, {username})
    }
    return <div className={'friend-element-container'}>
        <div>
            <div className={'Friend-header'}>
                <AutoAvatar userId={id} size={20}/> <b>{username}</b>
            </div>
            <div className={'Friend-content'}>{email}</div>
        </div>
        {!isFriend ? (
            <button
                className={'friends_button'}
                onClick={addFriend}
                type={'button'}
            >
                Добавить в друзья
            </button>
        ) : (
            <button
                className={'friends_button'}
                onClick={removeFriend}
                type={'button'}
            >
                Удалить из друзей
            </button>
        )}
        {/*{!isFriend ?*/}
        {/*    <button className={'friends_button'} onClick={addFriend} type={'button'}>Добавить в друзья</button>*/}
        {/*    :*/}
        {/*    <button className={'friends_button'} onClick={removeFriend} type={'button'}>Удалить из друзей</button>*/}
        {/*}*/}
    </div>
}

const Friends = () => {
    const [userFriends, setUserFriends] = useState<{ id: number; username: string; email: string }[]>([])
    const [search, setSearch] = useState('')
    const { user } = useGetUserName()
    const [finedUser, setFinedUser] = useState<null | { id: number; username: string; email: string ; posts: [] }>(null)
    useEffect(() => {
        api.get<{ id: number; username: string; email: string }[]>(`/accounts/api/users/`).then((r) => setUserFriends(r.data))
    }, [])
    const find = () => {
        if (!search) return
        api.get(`/profiles/api/search-user/?username=${search}`).then((r) => setFinedUser(r.data)).catch((e) => {
            console.log(e)
        })
    }
    return (
        <div className={'friends_container'}>
            <div className={'friends_search'}>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={'Поиск человека по ID'}/>
                <button className={'friends_button'} onClick={find}>Найти</button>
            </div>
            {finedUser && <div className={'fined-container'}>
                <FriendElement {...finedUser} />
                <div  className={'fined-info'}>
                    <div>Почта: <a href={'mailto:' + finedUser.email}>{finedUser.email}</a></div>
                    <div>Всего постов: {finedUser.posts.length}</div>
                </div>
            </div>}
            <div className={'friends_list'}>
                {userFriends.filter((el) => el.username !== user).map((user) => (
                        <Fragment key={user.id}>
                            <FriendElement {...user} />
                        </Fragment>
                    )
                )}
            </div>
        </div>
    )
}
export default Friends