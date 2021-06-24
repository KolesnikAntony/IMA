import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import './products-list.scss';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, FormControlLabel, FormGroup, Grid, MenuItem, Switch, TextField} from "@material-ui/core";
import {getAdminProduct} from "../../../redux/admin-reduser";
import {RootState} from "../../../redux/store";
import {ProductType} from "../../../types/types";

type PathParamsType = {
    id: string
}
type PropsType = RouteComponentProps<PathParamsType>

const ProductEdit: FC<PropsType> = ({match}) => {
        const dispatch = useDispatch();
        const product = useSelector((state: RootState) => state.admin.product);
        const categories = useSelector((state: RootState) => state.admin.categories);
        const isFetching = useSelector((state: RootState) => state.admin.isFetching);
        const [sale, setSale] = useState(false);
        const [top, setTop] = useState(false);
        const [newProduct, setNewProduct] = useState(false);
        const [inputsData, setInputsData] = useState({} as ProductType);
        const [categoryDefault, setCategoryDefault] = useState('');

        console.log(product)
        console.log(inputsData)

        useEffect(() => {
            dispatch(getAdminProduct(match.params.id))
        }, []);


    useEffect(
            () => {
                isFetching && setInputsData(product);
                isFetching && setCategoryDefault(product.category._id)
            },
            [isFetching],
        );


        const handleChangeFile = (e: any) => {
            setInputsData((prevState: ProductType) => ({...prevState, imageSrc: URL.createObjectURL(e.target.files[0])}))
        };

        const handleChangeText = (type: string, value: string) => {
            if (type === 'title') {
                setInputsData((prevState: ProductType) => ({...prevState, title: value}))
            }
            if (type === 'short') {
                setInputsData((prevState: ProductType) => ({...prevState, shortDescr: value}))
            }
            if (type === 'description') {
                setInputsData((prevState: ProductType) => ({...prevState, description: value}))
            }
            if (type === 'sub') {
                setInputsData((prevState: ProductType) => ({...prevState, subText: value}))
            }
            if (type === 'price') {
                setInputsData((prevState: ProductType) => ({...prevState, price: +value}));
            }
            if (type === 'sale') {
                setInputsData((prevState: ProductType) => ({...prevState, salePrice: +value}));
            }
            if (type === 'color') {
                setInputsData((prevState: ProductType) => ({...prevState, color: value}));
            }
        };

        const handleSwitch = (type: string) => {
            if (type === 'sale') {
                setSale(!sale)
            }
            if (type === 'top') {
                setTop(!top)
            }
            if (type === 'new') {
                setNewProduct(!newProduct)
            }
        };


        const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
            setCategoryDefault(e.target.value);
            setInputsData((prevState: ProductType) => ({
                ...prevState,
                category: {...prevState.category, id: e.target.value}
            }));
        };

        const handleSubmit = (e: React.SyntheticEvent, product: ProductType) => {
            e.preventDefault();
            console.log(product)
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
                               variant='outlined'/>
                </Grid>
                <Grid item xs={2}>
                    <FormControlLabel
                        control={<Switch size="small" checked={!sale} onChange={() => handleSwitch('sale')}/>}
                        label="Sale Price"
                        labelPlacement="bottom"
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField id="Sale Price" placeholder="Sale Price"
                               type='number'
                               value={sale && inputsData.salePrice !== null ? inputsData.salePrice : ''}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeText('sale', e.target.value)}
                               variant='outlined' disabled={sale}/>
                </Grid>
                <Grid item xs={3}>
                    <TextField id="Color" placeholder="Color"
                               value={inputsData.color}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeText('color', e.target.value)}
                               variant='outlined'/>
                </Grid>
                <Grid item xs={3}>
                    <TextField id="Category" label="Category" value={categoryDefault} onChange={handleCategory} select
                               variant='outlined' fullWidth={true}>
                        {categories.map(el => <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>)}
                    </TextField>
                </Grid>
                <Grid item xs={2}>
                    <FormControlLabel
                        control={<Switch size="small" checked={top}/>}
                        label="Top product"
                        labelPlacement="bottom"
                        onChange={() => handleSwitch('top')}
                    />
                </Grid>
                <Grid item xs={2}>
                    <FormControlLabel
                        control={<Switch size="small" checked={newProduct}/>}
                        onChange={() => handleSwitch('new')}
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
                    <img src={inputsData.imageSrc} alt="Photo" className="admin-product__image"/>
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
    }
;


export default withRouter(ProductEdit);