import * as React from 'react';
import { createElement } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { MenuItemLink, getResources } from 'react-admin';
import { withRouter } from 'react-router-dom';
import LabelIcon from '@material-ui/icons/Label';
import ContactsIcon from '@material-ui/icons/ImportContacts';
import {makeStyles} from "@material-ui/styles";

const Menu = ({ onMenuClick, logout }) => {
    const useStyles = makeStyles({
        root: {
            padding: '40px 20px',
        },
    });

    const resources = useSelector(getResources);

    return (
        <div className={useStyles().root}>
        {resources.map(resource => (
            <MenuItemLink
                key={resource.name}
                to={`/${resource.name}`}
                primaryText={resource.name}
                leftIcon={<LabelIcon />}
                onClick={onMenuClick}
            />
        ))}
        <MenuItemLink
            to="/contacts"
            primaryText="Contacts"
            leftIcon={<ContactsIcon />}
            onClick={onMenuClick}
        />
       </div>

    );
}

export default withRouter(Menu);