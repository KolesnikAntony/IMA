import React, {FC, useEffect} from 'react';
import './admin.scss'
import {RouteComponentProps} from "react-router-dom";
import AdminPanel from "./admin-components/admin-sidebar";
import SignIn from "./admin-components/admin-login";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {getIsAuth} from "../../redux/auth-reducer";
import {LinearProgress} from "@material-ui/core";

type PathParamsType = {
    path: string
}
type PropsType = RouteComponentProps<PathParamsType>

export const AdminApp: FC<PropsType> = ({match}) => {
    const isAuth = useSelector<RootState>(state => state.auth.isAuth);
    const isFetching = useSelector<RootState>(state => state.auth.isFetching);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getIsAuth());
    }, []);


    return <div className='admin'>
        {isFetching ? <LinearProgress/> : <>{isAuth ? <AdminPanel/> : <SignIn/>}</>}
    </div>
};

export default AdminApp;
