import React, {createRef, useEffect, useState} from "react";
import {AutoAvatar} from "../uset-comp/avatar";
import '../trash/users.css'
import FileUploadService from "../services/imag";
import GetUsName from "../services/nameuser";

const User_info: React.FC = () => {
    const fileRef = createRef<HTMLInputElement>();
    const [id, setId] = useState<number | null>(null); // Состояние для хранения userId

    // Загружаем userId при монтировании компонента
    useEffect(() => {
        const fetchUserId = async () => {
            const fetchedId = await FileUploadService.getUserId();
            console.log('Полученный User ID:', fetchedId);
            setId(fetchedId); // Сохраняем userId в состоянии
        };

        fetchUserId();
    }, []);

    const onFileInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log(e.target?.files?.[0]);
    }
    return(
        <div className={'user_info'}>
            <div className={'avatar'}>
                <AutoAvatar userId={id} size={300} />
                <input
                    type="file"
                    style={{display: 'none'}}
                    ref={fileRef}
                    onChange={onFileInputChange}
                    accept="image/png,image/jpeg,image/gif"
                />
            </div>

            <div className={'user_Name'}>
                <GetUsName/>
            </div>
        </div>
    )
}
function User() {
    return(
        <div className={'user_profile'}>
            <User_info/>
        </div>
    )
}

export default User