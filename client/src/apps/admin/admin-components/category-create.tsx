import React, {FC, useEffect, useState} from 'react';
import './products-list.scss';
import {Button, Grid, makeStyles, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {actionsAdmin, createCategory} from "../../../redux/admin-reduser";
import {RootState} from "../../../redux/store";

interface PropsType {
    setMode: (mode: string) => void
}

const useStyles = makeStyles((theme) => ({
    buttonPadding: {
        padding: 14.5,
    },
}));

const CategoryCreate: FC<PropsType> = ({setMode}) => {
    const dispatch = useDispatch();
    const [inputsData, setInputsData] = useState('');
    const classes= useStyles();
    const isCreated = useSelector((state: RootState) => state.admin.isCreated);

    useEffect(() => {
        if (isCreated){
            dispatch(actionsAdmin.setIsCreated(false));
            setMode('list')
        }
    },[isCreated]);

    const handleSubmit = (e: React.SyntheticEvent, name: string) => {
        e.preventDefault();
        dispatch(createCategory(name))
    };

    return <>
        <form onSubmit={(e: React.SyntheticEvent) => handleSubmit(e, inputsData)} className='admin-product__edit'>
            <Grid container spacing={4}>
                <Grid item xs={9}>
                    <TextField placeholder="Category name" value={inputsData}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputsData(e.target.value)}
                               fullWidth={true} required={true} variant='outlined'/>
                </Grid>
                <Grid item xs={3}>
                    <Button
                        className={classes.buttonPadding}
                        fullWidth={true}
                        color='primary'
                        variant="outlined"
                        component="label">
                        Create
                        <input
                            type="submit"
                            hidden/>
                    </Button>
                </Grid>
            </Grid>
        </form>
        <Button variant="contained" color="primary" onClick={() => setMode('list')} >
            Back to product list
        </Button></>
}

export default CategoryCreate;