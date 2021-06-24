import React, {useEffect} from 'react';
import {DataGrid, GridColDef, GridRowsProp} from "@material-ui/data-grid";
import {useDispatch, useSelector} from "react-redux";
import {getAdminProducts} from "../../../redux/admin-reduser";
import {FILTER_TYPES} from "../../../constants/constants";
import {RootState} from "../../../redux/store";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";



const ProductList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAdminProducts(1, FILTER_TYPES.SELECT_TYPE.ALL, FILTER_TYPES.SORT_TYPE.MAX, [], []))
    }, []);

    const products = useSelector((state: RootState) => state.admin.products);
    console.log(products);
    const rows: GridRowsProp = [
        { id: 1, col1: 'Hello', col2: 'World' },
        { id: 2, col1: 'XGrid', col2: 'is Awesome' },
        { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
    ];

    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Title', width: 150 },
        { field: 'price', headerName: 'Price', width: 150 },
        { field: 'salePrice', headerName: 'Sale Price', width: 150 },
        { field: 'id', headerName: 'ID', width: 150 },
        {
            field: "edit",
            headerName: "Edit",
            sortable: false,
            width: 130,
            renderCell: (params) => {
                console.log(params);
                return (
                    <Button variant="contained" color="primary" component={NavLink} to={`/admin/product/${params.id}`}>
                        Edit
                    </Button>
                );
            }
        }
    ];
    return <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={products} columns={columns}  />
    </div>
}

export default ProductList;