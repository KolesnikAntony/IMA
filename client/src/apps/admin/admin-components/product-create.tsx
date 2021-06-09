import React from 'react';
import {Create, SimpleForm, TextInput, ImageInput} from 'react-admin';

const ProductCreate = (props: any) => {
    return <Create title='Create a product' {...props}>
        <SimpleForm enctype="multipart/form-data">
            <TextInput source='title'/>
            <TextInput multiline source='description'/>
            <TextInput source='price'/>
            <ImageInput source='imageSrc'/>
        </SimpleForm>
    </Create>
}

export default ProductCreate;