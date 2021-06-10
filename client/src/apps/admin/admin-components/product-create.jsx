import React from 'react';
import {Create, FormTab, SimpleForm, TextInput} from 'react-admin';
import './products-list.scss';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles({
    widthFull: {width: '100%'},
    widthPart: {width: '50%'},
    displayGrid: {display: 'grid'},
    gridColumn: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: '1em'
    }
});


const MyTextInput = ({children}) => {
    const classes = useStyles();
    return <div className={classes.gridColumn}>
        {children}
    </div>
}

const ProductCreate = (props) => {

    const classes = useStyles();

    return <Create title='Create a product' {...props}>
        <SimpleForm encType="multipart/form-data">
            <MyTextInput>
                <TextInput source='title' className={classes.widthFull}/>
                <TextInput source='shortDescr' className={classes.widthFull}/>
            </MyTextInput>
            <TextInput multiline source='description' className={classes.widthFull}/>
            <TextInput multiline source='subText' className={classes.widthFull}/>
            <MyTextInput>
                <TextInput source='price' className={classes.widthFull}/>
                <TextInput source='salePrice' className={classes.widthFull}/>
            </MyTextInput>
            <MyTextInput>
                <TextInput source='color' className={classes.widthFull}/>
                <TextInput source='category' className={classes.widthFull}/>
            </MyTextInput>
        </SimpleForm>
    </Create>
}

export default ProductCreate;