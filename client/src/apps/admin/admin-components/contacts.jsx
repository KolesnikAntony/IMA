import React, {useEffect, useState} from "react";

import {instance} from "../../../api/api";
import './contacts.scss'
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import {useDispatch} from "react-redux";
import {getContacts} from "../admin-redusers/contact-reduser";


const useStyles = makeStyles({
    edit: {
        margin: '30px 0'
    },
});

const EditButton = ({basePath = '', label = 'Edit info', record = {}, ...rest }) => {
    console.log(rest, '----edit')
    let classes = useStyles();
    return <Button
        className={classes.edit}
        color="primary"
        variant="outlined"
        component={Link}
        to={basePath + 'contacts/' +'edit'}
        label={label}
        {...rest}
    >Edit</Button>
};

const Contacts = (props) => {

    const [contacts, setContacts] = useState({});
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getContacts());
        // instance.get(`/api/contacts`).then(res => {
        //     let data = res.data.contacts[0];
        //     setContacts(data);
        // })
    }, []);


    const newContacts = Object.keys(contacts).filter(el => el === 'address' || el === 'email' || el === 'inst' || el === 'nip' || el === 'phone' || el === 'region')
        .map(function (key, index) {
            return <li className='contacts-admin__item'>
                <span className='contacts-admin__title'>{key}:</span><span>{contacts[key]}</span>
            </li>
        });

    return <>
        <EditButton/>
        <ul className='contacts-admin'>
            {/*{newContacts}*/}
        </ul>
    </>
}


export default Contacts;