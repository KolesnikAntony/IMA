import React from 'react';
import {Create, FormTab, SimpleForm, TextInput} from 'react-admin';
import './products-list.scss';
import {makeStyles} from '@material-ui/core/styles';



const CategoryCreate = (props) => {

    return <Create title='Create a category' {...props}>
        <SimpleForm>
            <TextInput source='name'/>
        </SimpleForm>
    </Create>
}

export default CategoryCreate;