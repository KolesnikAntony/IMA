import React from 'react';
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton } from 'react-admin'



const CategoryList = (props) => {
    return <List  {...props}>
        <Datagrid>
            <TextField source='name'/>
            <TextField source='_id'/>
            <EditButton basePath={'/category'}/>
            <DeleteButton basePath={'/category'}/>
        </Datagrid>
    </List>
}

export default CategoryList;