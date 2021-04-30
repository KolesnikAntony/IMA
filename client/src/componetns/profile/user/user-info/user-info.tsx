import React, {FC} from "react";
import avatar from "../../../../assets/img/avatar.svg";


interface PropsType {
    toggleList: () => void
    email: string
    phone: string
    city: string
    street: string
    flat: string
    build: string
    kod: string
    name: string
    photo:string
}

const UserInfo: FC<PropsType> = ({toggleList, email, phone, kod, build, city, street, flat, name, photo }) => {
    return (
       <>
           <div className="user__self">
               <button className="user__change--self user__change" onClick={toggleList}/>
               <div className="user__img">
                   <img src={photo !== null ? photo : avatar} alt="" className="user__img--content"/>
               </div>
               <h4 className="user__name user__name-state">
                   {name}
               </h4>
           </div>
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
                   <span className="user__info-data">{city}</span>
               </li>
               <li className="user__info-item">
                   <span className="user__info-caption">Address: </span>
                   <span className="user__info-data"><span>{street}</span> <span>{build}</span>{flat ? '/' : undefined}<span>{flat}</span></span>
               </li>
               <li className="user__info-item">
                   <span className="user__info-caption">Kod: </span>
                   <span className="user__info-data">{kod}</span>
               </li>
           </ul>
       </>
    )
};

export default UserInfo;