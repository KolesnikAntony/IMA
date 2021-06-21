import React, {useState} from 'react';
import {
    Create,
    Edit,
    FormTab,
    SimpleForm,
    TextInput,
    required,
    ReferenceInput,
    SelectInput,
    ImageInput,
    ImageField,
    FileInput,
    BooleanInput
} from 'react-admin';
import './products-list.scss';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles({
    widthFull: {width: '100%'},
    widthPart: {width: '50%'},
    width40: {width: '40%'},
    width20: {width: '20%'},
    displayGrid: {display: 'grid'},
    gridColumn: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: '1em'
    },
    gridColumn3: {
        display: 'grid',
        gridTemplateColumns: '4fr 1fr 4fr 3fr',
        gridGap: '1em',
        alignItems: 'center'
    },
    flexRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    marginLA: {
        marginLeft: '50px'
    },
    justC: {
        justifyContent: 'center'
    }

});


const FlexWrap = ({children}) => {
    const classes = useStyles();
    return <div className={classes.flexRow}>
        {children}
    </div>
};

const MyTextInput = ({children}) => {
    const classes = useStyles();
    return <div className={classes.gridColumn}>
        {children}
    </div>
};

const Column3 = ({children}) => {
    const classes = useStyles();
    return <div className={classes.gridColumn3}>
        {children}
    </div>
};

const ProductEdit = (props) => {

    const classes = useStyles();

    const [sale, setSale] = useState(false);
    return <Edit title='Edit a product' {...props}>
        <SimpleForm encType="multipart/form-data" >

            <MyTextInput>
                <TextInput source='title' className={classes.widthFull}/>
                <TextInput source='shortDescr' className={classes.widthFull}/>
            </MyTextInput>
            <TextInput multiline source='description' className={classes.widthFull}/>
            <TextInput multiline source='subText' className={classes.widthFull}/>
            <Column3>
                <TextInput source='price' className={classes.widthFull}/>
                <BooleanInput label="Sale" source="sale" onChange={(e) => setSale(e)}/>
                <TextInput source='salePrice' className={classes.widthFull} disabled={!sale}/>
                <FlexWrap>
                    <BooleanInput label="New" source="itsNew"/>
                    <BooleanInput label="Top" source="top"/>
                </FlexWrap>
            </Column3>
            <MyTextInput>
                <TextInput source='color' className={classes.widthFull}/>
                <ReferenceInput label="Category" source="category" reference="category">
                    <SelectInput optionText="name" optionValue="id"  className={classes.widthFull}/>
                </ReferenceInput>
            </MyTextInput>
            <FileInput source="imageSrc" label="Related pictures" accept=".jpg,.png" >
                <PreviewImage/>
            </FileInput>
        </SimpleForm>
    </Edit>
}

const PreviewImage = ({ record, source }) => {

    console.log(record)
    if (typeof (record) == "string") {
        record = {
            [source]: record
        };
        return <ImageField record={record} source={source} />
    }
    return <ImageField source={source}/>
}


export default ProductEdit;