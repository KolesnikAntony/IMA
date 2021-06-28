import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, Grid, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";

import {RootState} from "../../../redux/store";
import {getContacts} from "../../../redux/admin-reduser";
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
        region: 0,
    } as ContactsType);

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
        console.log(formData)
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
            setInputsData(prevState => ({...prevState, region: +value}));
        }
        else if (type === 'address') {
            setInputsData(prevState => ({...prevState, address: value}));
        }
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
                                   fullWidth={true} required={true} variant='outlined'
                        type='number'/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label='NIP' placeholder="NIP" value={inputsData.nip}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeText('nip', e.target.value)}
                                   fullWidth={true} required={true} variant='outlined'/>
                    </Grid>
                </Grid>
            </form> :
            <div>Loading...</div>
        }
    </>
};

export default AdminContacts;