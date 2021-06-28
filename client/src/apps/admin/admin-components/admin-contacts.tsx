import React, {useEffect, useState} from 'react';
import {Button, Grid, TextField} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {getContacts} from "../admin-redusers/contact-reduser";

const AdminContacts = () => {
    const dispatch = useDispatch();
    const [inputsData, setInputsData] = useState({
        phone: '',
        email: '',
        inst: '',
        address: '',
        nip: '',
        region: null,
        id: ''
    });

    useEffect(() => {
        dispatch(getContacts())
    }, []);

    const handleSubmit= (formData: any) => {
        console.log(formData)
    };
    const handleChangeText = (type: string, value: string) => {

    };

    return <>
        <form className='admin-product__edit'
              onSubmit={(e: React.SyntheticEvent) => handleSubmit(e, inputsData)}>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <TextField id="Title" placeholder="Title" value={inputsData.phone}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeText('title', e.target.value)}
                               fullWidth={true} required={true} variant='outlined'/>
                </Grid>
            </Grid>
        </form>
};

export default AdminContacts;