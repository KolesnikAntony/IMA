import React from 'react';
import {Create, SimpleForm, TextInput} from 'react-admin';

const ProductCreate = (props: any) => {
    return <Create title='Create a product' {...props}>
        <SimpleForm>
            <TextInput source='title'/>
            <TextInput multiline source='description'/>
            <TextInput source='price'/>
        </SimpleForm>
    </Create>
}

export default ProductCreate;