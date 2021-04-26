import React, {FC, useEffect} from 'react';
import './home.scss';
import Intro from "./intro/intro";
import Catalog from "./catalog/catalog";
import NewMemberPopup from '../../common/new-member-popup/new-member-popup';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {useDispatch} from "react-redux";
import {activateUser} from "../../redux/auth-reducer";



const Home:FC<PropsType> = ({isNewMember, match}) => {
    const dispatch = useDispatch();
    let key = match.params.key;

    useEffect(()=> {
        isNewMember && dispatch(activateUser(key))
    });


    return <>
        {isNewMember && <NewMemberPopup/>}
        <Intro/>
        <Catalog/>
    </>

};

export default withRouter(Home);

type PathParamsType = {
    key: string
}
// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & {
    isNewMember?: boolean
}