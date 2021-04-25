import React, {FC} from 'react';
import './home.scss';
import Intro from "./intro/intro";
import Catalog from "./catalog/catalog";
import NewMemberPopup from '../../common/new-member-popup/new-member-popup';

interface PropsType {
    isNewMember?: boolean
}

const Home:FC<PropsType> = ({isNewMember}) => {
    return <>
        {isNewMember && <NewMemberPopup/>}
        <Intro/>
        <Catalog/>
    </>

};

export default Home;