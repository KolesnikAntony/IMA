import React from 'react';
import {Grid, LinearProgress} from "@material-ui/core";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import AboutCard from "./admin-list-card";
import plus from './../../../assets/img/plus.png'

const AdminAboutCarts = () => {
    const aboutList = useSelector((state:RootState) => state.admin.aboutList);

    return <div className='admin-about__list'>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}><AboutCard image={plus} caption={'New item'} id={''} createMode={true}/></Grid>
            {aboutList.length ? aboutList
                .map(el => <Grid item xs={12} sm={6} md={4} lg={3} key={el.id}><AboutCard image={el.image} caption={el.caption} id={el.id} /></Grid>)
                : <LinearProgress />}
        </Grid>
    </div>

};

export default AdminAboutCarts;