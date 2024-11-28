import React, {createRef} from "react";
import {AutoAvatar} from "../uset-comp/avatar";
import '../trash/users.css'
import FileUploadService from "../services/imag";
function User() {
    const fileRef = createRef<HTMLInputElement>();
    const id = FileUploadService.UserId
    const userName = String(FileUploadService.GetUsName())
    const onFileInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log(e.target?.files?.[0]);
    }
    console.log(userName);
    return(
        <>
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

            <div className={'usName'}>
                {userName ? <p>Имя: {userName}</p> : <p>Имя не указано</p>}
            </div>
        </>
    )
}

export default User