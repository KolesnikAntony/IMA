import React from 'react'
import './new-member-popup.scss'
import {Link} from "react-router-dom";

const NewMemberPopup = () => {
    return <div className="new-member">
        <Link to={'/'} className="new-member__close"/>
        <h2 className="new-member__title">Congratulation!</h2>
        <p className='new-member__text'>Me are happy that you are together with us now!</p>
    </div>
};

export default NewMemberPopup;