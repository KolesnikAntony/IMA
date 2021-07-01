import React, {useEffect} from 'react';
import {Grid, LinearProgress, makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getAboutUsList} from "../../../redux/admin-reduser";
import {RootState} from "../../../redux/store";
import AboutCard from "./admin-list-card";
import plus from './../../../assets/img/plus.png'


const useStyles = makeStyles(() => ({

}));

const AdminAboutCarts = () => {
    const dispatch = useDispatch();
    const aboutList = useSelector((state:RootState) => state.admin.aboutList);
    useEffect(() => {
        dispatch(getAboutUsList())
    }, []);

    return <div className='admin-about__list'>
        <Grid container spacing={2}>
            <Grid item md={3}><AboutCard image={plus} caption={'New item'} id={''} createMode={true}/></Grid>
            {aboutList.length ? aboutList
                .map(el => <Grid item md={3} key={el.id}><AboutCard image={el.image} caption={el.caption} id={el.id} /></Grid>)
                : <LinearProgress />}
        </Grid>
    </div>

};

export default AdminAboutCarts;