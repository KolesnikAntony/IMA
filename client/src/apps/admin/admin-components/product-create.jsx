import React, {useState} from 'react';
import {
    Create,
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
import ProductList from "./products-list";
import {logout} from "../../../redux/auth-reducer";


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

import React, {FC, useEffect, useState} from 'react';
import './products-list.scss';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, FormControlLabel, FormGroup, Grid, Switch, TextField} from "@material-ui/core";
import {getAdminProduct} from "../../../redux/admin-reduser";
import {RootState} from "../../../redux/store";


const ProductCreate = ({match}) => {
    const dispatch = useDispatch();
    const [photo, setPhoto] = useState('');
    const product = useSelector((state) =>state.admin.product);
    useEffect(() => {
        dispatch(getAdminProduct(match.params.id))
    }, []);



    const handleChangeFile = (e) => {
        setPhoto(URL.createObjectURL(e.target.files[0]));
    };

    return <form className='admin-product__edit'>
        <Grid container spacing={4}>
            <Grid item xs={6}>
                <TextField id="Title" label="Title" fullWidth={true} required={true} variant='outlined'/>
            </Grid>
            <Grid item xs={6}>
                <TextField id="Short-Description" label="Short Description" fullWidth={true} variant='outlined'/>
            </Grid>
            <Grid item xs={12}>
                <TextField id="Description" label="Description" fullWidth={true} multiline={true} variant='outlined'/>
            </Grid>
            <Grid item xs={12}>
                <TextField id="Sub-Text" label="Sub-Text" fullWidth={true} multiline={true} variant='outlined'/>
            </Grid>
            <Grid item xs={3}>
                <TextField id="Price" label="Price" variant='outlined'/>
            </Grid>
            <Grid item xs={2}>
                <FormControlLabel
                    control={<Switch size="small" checked={false}/>}
                    label="Sale Price"
                    labelPlacement="bottom"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField id="Sale Price" label="Sale Price" variant='outlined' disabled={true}/>
            </Grid>
            <Grid item xs={2}>
                <FormControlLabel
                    control={<Switch size="small" checked={false}/>}
                    label="Top product"
                    labelPlacement="bottom"
                />
            </Grid>
            <Grid item xs={2}>
                <FormControlLabel
                    control={<Switch size="small" checked={false}/>}
                    label="New product"
                    labelPlacement="bottom"
                />
            </Grid>
            <Grid item xs={3}>
                <Button
                    variant="contained"
                    component="label"
                    fullWidth={true}
                >
                    Add Photo
                    <input
                        type="file"
                        hidden
                        onChange={handleChangeFile}
                    />
                </Button>
            </Grid>
            <Grid item xs={6}>
                <img src={photo} alt="" className="admin-product__image"/>
            </Grid>
            <Grid item xs={3}>
                <Button
                    fullWidth={true}
                    color='primary'
                    variant="outlined"
                    component="label"
                >
                    Edit
                    <input
                        type="submit"
                        hidden
                    />
                </Button>
            </Grid>
        </Grid>
    </form>
};


export default withRouter(ProductCreate);