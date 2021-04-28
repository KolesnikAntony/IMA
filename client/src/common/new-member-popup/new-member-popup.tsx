import React, {FC, useCallback, useState} from 'react'
import './new-member-popup.scss'
import { useHistory } from "react-router-dom";
import BackAside from "../back-aside/back-aside";
import {useDisableBodyScroll} from "../../hooks/hooks";

interface PropsType {

}

const NewMemberPopup:FC<PropsType> = () => {
    const history = useHistory();
    const [showBackAside, setShowBackAside] = useState(true);

    useDisableBodyScroll(showBackAside);

    const closeNewMemberPopup = useCallback(() => {
        history.push('/');
        setShowBackAside(false);
    }, [showBackAside]);


    return <>
        <div className="new-member">
            <button onClick={closeNewMemberPopup} className="new-member__close"/>
            <h2 className="new-member__title">Congratulation!</h2>
            <p className='new-member__text'>Me are happy that you are together with us now!</p>
        </div>
        <BackAside open={showBackAside} onClose={closeNewMemberPopup}/>
    </>
};

export default NewMemberPopup;