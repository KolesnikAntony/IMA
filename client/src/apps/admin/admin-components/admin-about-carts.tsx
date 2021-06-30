import React, {useEffect} from 'react';
import {LinearProgress, makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getAboutUsList} from "../../../redux/admin-reduser";
import {RootState} from "../../../redux/store";
import AboutCard from "./admin-list-card";


const useStyles = makeStyles(() => ({

}));

const AdminAboutCarts = () => {
    const dispatch = useDispatch();
    const aboutList = useSelector((state:RootState) => state.admin.aboutList);
    console.log(aboutList);
    useEffect(() => {
        dispatch(getAboutUsList())
    }, []);

    const handleSubmitText = (newText: string) => {

    };

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        let text = e.target.value;

    };

    const handleClickToTextChange = () => {

    };

    return <div className='admin-about__list'>
        {aboutList.length ? aboutList.map(el => <AboutCard image={el.image} caption={el.caption} id={el.id} key={el.id}/>) : <LinearProgress />}
    </div>

};

export default AdminAboutCarts;