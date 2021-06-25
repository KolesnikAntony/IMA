import React, {useEffect, useState} from 'react';
import './products-list.scss';
import {useDispatch, useSelector} from "react-redux";
import {Button, FormControlLabel, Grid, MenuItem, Switch, TextField} from "@material-ui/core";
import {RootState} from "../../../redux/store";
import {CreateProductType, FilterType, ProductType} from "../../../types/types";
import {actionsAdmin, createAdminProduct, getAdminCategories} from "../../../redux/admin-reduser";
import { useHistory } from 'react-router-dom';



const ProductCreate = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const categories = useSelector((state: RootState) => state.admin.categories);
    const isCreated = useSelector((state: RootState) => state.admin.isCreated);
    const [categoryDefault, setCategoryDefault] = useState('');
    const [inputsData, setInputsData] = useState({
        top: false,
        itsNew: false,
        sale: false,
        salePrice: null,
        price: 0,
        description: '',
        category: {name: '', _id: '', id: ''},
        color: '',
        imageSrc: '',
        img: null,
        subText: '',
        title: '',
    } as CreateProductType);

    useEffect(() => {
        dispatch(getAdminCategories())
    }, []);

    useEffect(() => {
        if (isCreated){
            dispatch(actionsAdmin.setIsCreated(false));
            history.push('/admin/products');
        }
    },[isCreated]);

    const handleChangeFile = (e: any) => {
        setInputsData((prevState: CreateProductType) => ({
            ...prevState,
            imageSrc: URL.createObjectURL(e.target.files[0]),
            img: e.target.files[0]
        }))
    };

    const handleChangeText = (type: string, value: string) => {
        if (type === 'title') {
            setInputsData((prevState: CreateProductType) => ({...prevState, title: value}))
        }
        if (type === 'short') {
            setInputsData((prevState: CreateProductType) => ({...prevState, shortDescr: value}))
        }
        if (type === 'description') {
            setInputsData((prevState: CreateProductType) => ({...prevState, description: value}))
        }
        if (type === 'sub') {
            setInputsData((prevState: CreateProductType) => ({...prevState, subText: value}))
        }
        if (type === 'price') {
            setInputsData((prevState: CreateProductType) => ({...prevState, price: +value}));
        }
        if (type === 'sale') {
            setInputsData((prevState: CreateProductType) => ({...prevState, salePrice: +value}));
        }
        if (type === 'color') {
            setInputsData((prevState: CreateProductType) => ({...prevState, color: value}));
        }
    };

    const handleSwitch = (type: string, value: boolean) => {
        if (type === 'sale') {
            setInputsData((prevState: CreateProductType) => ({...prevState, sale: value}));
            !value && setInputsData((prevState: CreateProductType) => ({...prevState, salePrice: null}));
        }
        if (type === 'top') {
            setInputsData((prevState: CreateProductType) => ({...prevState, top: value}));
        }
        if (type === 'new') {
            setInputsData((prevState: CreateProductType) => ({...prevState, itsNew: value}));
        }
    };

    const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryDefault(e.target.value);
        setInputsData((prevState: CreateProductType) => ({
            ...prevState,
            category: {...prevState.category, _id: e.target.value}
        }));
    };

    const handleSubmit = (e: React.SyntheticEvent, product: CreateProductType) => {
        e.preventDefault();
        dispatch(createAdminProduct(product));
    };

    return <form className='admin-product__edit' onSubmit={(e: React.SyntheticEvent) => handleSubmit(e, inputsData)}>
        <Grid container spacing={4}>
            <Grid item xs={6}>
                <TextField id="Title" placeholder="Title" value={inputsData.title}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeText('title', e.target.value)}
                           fullWidth={true} required={true} variant='outlined'/>
            </Grid>
            <Grid item xs={6}>
                <TextField id="Short-Description" placeholder="Short Description" defaultValue={inputsData.shortDescr}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeText('short', e.target.value)}
                           fullWidth={true} variant='outlined'/>
            </Grid>
            <Grid item xs={12}>
                <TextField id="Description" placeholder="Description" value={inputsData.description}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeText('description', e.target.value)}
                           fullWidth={true} multiline={true}
                           variant='outlined'/>
            </Grid>
            <Grid item xs={12}>
                <TextField id="Sub-Text" placeholder="Sub-Text" value={inputsData.subText}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeText('sub', e.target.value)}
                           fullWidth={true} multiline={true} variant='outlined'/>
            </Grid>
            <Grid item xs={2}>
                <TextField id="Price" placeholder="Price" value={inputsData.price} type='number'
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeText('price', e.target.value)}
                           variant='outlined'
                           required={true}/>
            </Grid>
            <Grid item xs={2}>
                <FormControlLabel
                    control={<Switch size="small" checked={inputsData.sale}
                                     onChange={() => handleSwitch('sale', !inputsData.sale)}/>}
                    label="Sale Price"
                    labelPlacement="bottom"
                />
            </Grid>
            <Grid item xs={2}>
                <TextField id="Sale Price" placeholder="Sale Price"
                           type='number'
                           value={inputsData.sale && inputsData.salePrice !== null ? inputsData.salePrice : ''}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeText('sale', e.target.value)}
                           variant='outlined' disabled={!inputsData.sale}
                           required={inputsData.sale}/>
            </Grid>
            <Grid item xs={3}>
                <TextField id="Color" placeholder="Color"
                           required={true}
                           value={inputsData.color}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeText('color', e.target.value)}
                           variant='outlined'/>
            </Grid>
            <Grid item xs={3}>
                <TextField id="Category" label="Category" value={categoryDefault} onChange={handleCategory} select
                           variant='outlined' fullWidth={true} required={true}>
                    {categories.map(el => <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>)}
                </TextField>
            </Grid>
            <Grid item xs={2}>
                <FormControlLabel
                    control={<Switch size="small" checked={inputsData.top}/>}
                    label="Top product"
                    labelPlacement="bottom"
                    onChange={() => handleSwitch('top', !inputsData.top)}
                />
            </Grid>
            <Grid item xs={2}>
                <FormControlLabel
                    control={<Switch size="small" checked={inputsData.itsNew}/>}
                    onChange={() => handleSwitch('new', !inputsData.itsNew)}
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
                    Change Photo
                    <input

                        type="file"
                        hidden
                        onChange={handleChangeFile}
                    />
                </Button>
            </Grid>
            <Grid item xs={2}>
                {inputsData.imageSrc && <img src={inputsData.imageSrc} alt="Photo" className="admin-product__image"/>}
            </Grid>
            <Grid item xs={3}>
                <Button
                    fullWidth={true}
                    color='primary'
                    variant="outlined"
                    component="label"
                >
                    Create
                    <input
                        type="submit"
                        hidden
                    />
                </Button>
            </Grid>
        </Grid>
    </form>
};

export default ProductCreate;