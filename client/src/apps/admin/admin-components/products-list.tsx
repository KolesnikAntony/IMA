import React, {useEffect} from 'react';
import {DataGrid, GridColDef, GridRowsProp} from "@material-ui/data-grid";
import {useDispatch, useSelector} from "react-redux";
import {deleteAdmitProduct, getAdminProducts} from "../../../redux/admin-reduser";
import {FILTER_TYPES} from "../../../constants/constants";
import {RootState} from "../../../redux/store";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";



const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.admin.products);
    useEffect(() => {
        dispatch(getAdminProducts(1, FILTER_TYPES.SELECT_TYPE.ALL, FILTER_TYPES.SORT_TYPE.MAX, [], []))
    }, []);

    const handleDeleteClick = (id: string) => {
        dispatch(deleteAdmitProduct(id))
    };


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
                return (
                    <Button variant="contained" color="primary" component={NavLink} to={`/admin/product/${params.id}`}>
                        Edit
                    </Button>
                );
            }
        },
        {
            field: "delete",
            headerName: "Delete",
            sortable: false,
            width: 130,
            renderCell: (params) => {
                console.log("render")
                return (
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(params.id+'')} >
                        Delete
                    </Button>
                );
            }
        },

    ];
    return <div>
        <Button variant="contained" color="primary" component={NavLink} to={`/admin/product/create`}>
            Create
        </Button>
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid rows={products} columns={columns}  />
        </div>
    </div>
}

export default ProductList;