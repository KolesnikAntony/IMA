import React, {FC, useState} from "react";
import avatar from "../../../../assets/img/avatar.svg";
import {ProfileFormValueType, ProfilePropsType} from "../../../../types/types";

type PropsType = {
    toggleList: () => void
    photo: string
    changePhoto: (e: React.ChangeEvent<HTMLInputElement>) => void
    setNewImage: () => void
}

const UserInfo: FC<ProfilePropsType<PropsType>> = ({toggleList, email, phone, kod, build, city, street, flat, name, photo, changePhoto, setNewImage }) => {
    const [startChange, setStartChange] = useState(false);

    const uploadImage = () => {
        setNewImage();
        setStartChange(false);
    };


    return (
       <>
           <div className="user__self">
               {startChange ?  <button className=" user__change user__change--done" onClick={uploadImage}/>
               :        <button className="user__change" onClick={() => setStartChange(!startChange)}/>
               }
               <div className="user__img">
                   <img src={photo ? photo : avatar} alt="" className="user__img--content"/>
                   {startChange && <label htmlFor="change-photo">
                       Zmień zdjęcie
                       <input className="user__change-photo" id="change-photo" type="file" onChange={changePhoto}/>
                   </label>}
               </div>
               <h4 className="user__name user__name-state">
                   {name ? name: 'Name'}
               </h4>
           </div>
           <ul className="user__info">
               <button className="user__change--info user__change" onClick={toggleList}/>
               <li className="user__info-item">
                   <span className="user__info-caption">Email: </span>
                   <span className="user__info-data">{email}</span>
               </li>
               <li className="user__info-item">
                   <span className="user__info-caption">Telefon: </span>
                   <span className="user__info-data">{phone}</span>
               </li>
               <li className="user__info-item">
                   <span className="user__info-caption">Miasto: </span>
                   <span className="user__info-data">{city}</span>
               </li>
               <li className="user__info-item">
                   <span className="user__info-caption">Adres: </span>
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