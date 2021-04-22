import React, {FC} from "react";


interface PropsType {
    toggleList: () => void
    email: string | null
    address: string | null
    country: string | null
    numberOfHouse: string | null
    numberOfFlat: string | null
    phone: string | null
    kod: string | null
}

const UserInfo: FC<PropsType> = ({toggleList, email, address, country, numberOfHouse, numberOfFlat, phone, kod}) => {
    return (
        <ul className="user__info">
            <button className="user__change--info user__change" onClick={toggleList}/>
            <li className="user__info-item">
                <span className="user__info-caption">Email: </span>
                <span className="user__info-data">{email}</span>
            </li>
            <li className="user__info-item">
                <span className="user__info-caption">Phone: </span>
                <span className="user__info-data">{phone}</span>
            </li>
            <li className="user__info-item">
                <span className="user__info-caption">City: </span>
                <span className="user__info-data">{country}</span>
            </li>
            <li className="user__info-item">
                <span className="user__info-caption">Address: </span>
                <span className="user__info-data"><span>{address}</span> <span>{numberOfHouse}</span>{numberOfFlat ? '/' : undefined}<span>{numberOfFlat}</span></span>
            </li>
            <li className="user__info-item">
                <span className="user__info-caption">Kod: </span>
                <span className="user__info-data">{kod}</span>
            </li>
        </ul>
    )
};

export default UserInfo;