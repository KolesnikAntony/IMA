import React, {FC} from 'react';
import './menu-buttons.scss';
import {VIEW_TYPES} from "../../constants/constants";

interface PropsType {
    onOpen: ({}) => void
}

const MenuButtons:FC<PropsType> =({onOpen}) => {
    return (
        <ul className='menu'>
            <li className="menu-item">
                <button className="menu-btn--cart menu-btn"
                        onClick={() => onOpen(VIEW_TYPES.CART)}/>
            </li>
            <li className="menu-item">
                <button className="menu-btn--wish menu-btn"
                        onClick={() => onOpen(VIEW_TYPES.WISH)}/>
            </li>
            <li className="menu-item">
                <button className="menu-btn--profile menu-btn"
                        onClick={() => onOpen(VIEW_TYPES.PROFILE)}/>
            </li>
            <li className="menu-item">
                <button className="menu-btn--burger menu-btn"
                        onClick={() => onOpen(VIEW_TYPES.BURGER)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </li>
        </ul>
    )
};

export default MenuButtons;