import React from 'react';
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton } from 'react-admin'



const ProductList = (props: any) => {
    return <List  {...props}>
        <Datagrid>
            <TextField source='title'/>
            <TextField source='price'/>
            <EditButton basePath='/products'/>
            <DeleteButton basePath='/products'/>
        </Datagrid>
    </List>
}

export default ProductList;