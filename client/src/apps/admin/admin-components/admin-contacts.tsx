import React, {useEffect, useState} from 'react';
import {Button, Grid, LinearProgress, Snackbar, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";

import {RootState} from "../../../redux/store";
import {changeContacts, getContacts} from "../../../redux/admin-reduser";
import {ContactsType} from "../../../types/types";

const AdminContacts = () => {
    const dispatch = useDispatch();
    const [inputsData, setInputsData] = useState({
        address: "",
        email: "",
        id: "",
        inst: "",
        nip: "",
        phone: "",
        region: "",
    } as ContactsType);

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        dispatch(getContacts())
    }, []);

    const contacts = useSelector((state: RootState) => state.admin.contacts);

    useEffect(() => {
        let isFetch = Object.keys(contacts).length;
        if (!!isFetch) {
            setInputsData(contacts as ContactsType);
        }
    }, [contacts]);


    const handleSubmit = (e: React.SyntheticEvent, formData: any) => {
        e.preventDefault();
        dispatch(changeContacts(formData));
        setShowAlert(true);
    };

    const handleChangeText = (type: string, value: string) => {
        if (type === 'phone') {
            setInputsData(prevState => ({...prevState, phone: value}));
        } else if (type === 'email') {
            setInputsData(prevState => ({...prevState, email: value}));
        }else if (type === 'inst') {
            setInputsData(prevState => ({...prevState, inst: value}));
        }
        else if (type === 'nip') {
            setInputsData(prevState => ({...prevState, nip: value}));
        }
        else if (type === 'region') {
            setInputsData(prevState => ({...prevState, region: value}));
        }
        else if (type === 'address') {
            setInputsData(prevState => ({...prevState, address: value}));
        }
    };

    const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowAlert(false);
    };

    return <>
        {Object.keys(contacts).length
            ? <form className='admin-product__edit'
                    onSubmit={(e: React.SyntheticEvent) => handleSubmit(e, inputsData)}>
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <TextField label='Phone' placeholder="Phone" value={inputsData.phone}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeText('phone', e.target.value)}
                                   fullWidth={true} required={true} variant='outlined'/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label='Email' placeholder="Email" value={inputsData.email}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeText('email', e.target.value)}
                                   fullWidth={true} required={true} variant='outlined'/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label='Address' placeholder="Address" value={inputsData.address}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeText('address', e.target.value)}
                                   fullWidth={true} required={true} variant='outlined'/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label='Instagram' placeholder="Instagram" value={inputsData.inst}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeText('inst', e.target.value)}
                                   fullWidth={true} required={true} variant='outlined'/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label='Region' placeholder="Region" value={inputsData.region}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeText('region', e.target.value)}
                                   fullWidth={true} required={true} variant='outlined'/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label='NIP' placeholder="NIP" value={inputsData.nip}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeText('nip', e.target.value)}
                                   fullWidth={true} required={true} variant='outlined'/>
                    </Grid>
                    <Grid item xs={3}>
                        <Button type='submit' variant="contained" color="primary">Edit</Button>
                    </Grid>
                </Grid>
            </form> :
            <LinearProgress />
        }
        <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
           <p>Contacts was edited.</p>
        </Snackbar>
    </>
};

export default AdminContacts;