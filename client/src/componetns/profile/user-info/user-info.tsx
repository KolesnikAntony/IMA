import React from "react";
import './user-info.scss'
import avatar from './../../../assets/img/avatar.svg'

const UserInfo = ()=> {
    return <div className='user'>
        <div className="user__self">
            <div className="user__img">
                <img src={avatar} alt="" className="user__img--content"/>
            </div>
            <h4 className="user__name">
                <span className="user__name-first">Alina</span> <span className="user__name-second">Malina</span>
            </h4>
        </div>
        <div className="user__info">
            <ul className="user__info-list">
                <li className="user__info-item">
                    <span className="user__info-caption">Email: </span>
                    <span className="user__info-data">kolesiaaa@gmail.com</span>
                </li>
                <li className="user__info-item">
                    <span className="user__info-caption">Phone: </span>
                    <span className="user__info-data">+380935384862</span>
                </li>
                <li className="user__info-item">
                    <span className="user__info-caption">Country: </span>
                    <span className="user__info-data">Warsaw</span>
                </li>
                <li className="user__info-item">
                    <span className="user__info-caption">Address: </span>
                    <span className="user__info-data"><span>Kabacki dukt</span> <span>6/</span><span>67</span></span>
                </li>
                <li className="user__info-item">
                    <span className="user__info-caption">Kod pocztowy: </span>
                    <span className="user__info-data">27-354</span>
                </li>
            </ul>
        </div>
        <div className="user__buttons">
            <button className="user__button reset">Change password</button>
            <button className="user__button logout">Log out</button>
        </div>
    </div>
};

export default UserInfo;