import React, {FC} from "react";
import avatar from "../../../../assets/img/avatar.svg";

interface PropsType {
    toggleList: () => void
    name: string | null
    photo: string | null
}

const UserSelf:FC<PropsType> = ({toggleList, name, photo}) => {
    return (
        <div className="user__self">
            <button className="user__change--self user__change" onClick={toggleList}/>
            <div className="user__img">
                <img src={photo !== null ? photo : avatar} alt="" className="user__img--content"/>
            </div>
            <h4 className="user__name user__name-state">
                {name}
            </h4>
        </div>
    )
};

export default UserSelf;