import React, {FC, useEffect, useState} from 'react';
import {DataGrid, GridColDef, GridRowsProp} from "@material-ui/data-grid";
import {useDispatch, useSelector} from "react-redux";
import {deleteAdmitProduct, getAdminProducts} from "../../../redux/admin-reduser";
import {FILTER_TYPES} from "../../../constants/constants";
import {RootState} from "../../../redux/store";
import Button from "@material-ui/core/Button";
import {NavLink, useHistory} from "react-router-dom";
import {PropsTypeAdminProducts} from "./product-container";

interface PropsType {
    setMode: (mode: string) => void
    setProductId: (id: string) => void
}

const ProductList:FC<PropsType & PropsTypeAdminProducts> = ({setMode,setProductId, setTitle}) => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.admin.products);
    const {pageSize} = useSelector((state: RootState) => state.admin);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getAdminProducts(1, FILTER_TYPES.SELECT_TYPE.ALL, FILTER_TYPES.SORT_TYPE.MAX, [], [], 1000))
        setTitle('Products');
    }, []);

    const handleDeleteClick = (id: string) => {
        dispatch(deleteAdmitProduct(id))
    };

    const handleEdit = (id: string) => {
        setMode('edit');
        setProductId(id);
    };

    const columns: GridColDef[] = [
        {field: 'title',  headerName: 'Title', flex: 0.4},
        {field: 'price',filterable: false, headerName: 'Price', flex: 0.2},
        {field: 'salePrice', filterable: false, sortable: false, headerName: 'Sale Price',  flex: 0.2},
        {field: 'id', filterable: false, sortable: false, headerName: 'ID', width: 150, flex: 0.2},
        {
            field: "edit",
            headerName: "Edit",
            sortable: false,
            filterable: false,
            width: 80,
            renderCell: (params) => {
                return (
                    <Button variant="contained" color="primary" onClick={() => handleEdit(params.id +'')}>
                        Edit
                    </Button>
                );
            }
        },
        {
            field: "delete",
            headerName: "Delete",
            sortable: false,
            filterable: false,
            width: 100,
            renderCell: (params) => {
                return (
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(params.id + '')}>
                        Delete
                    </Button>
                );
            }
        },

    ];
    return <>
        {products.length ?
            <div>
                <Button variant="contained" color="primary" onClick={() => setMode('create')} >
                    Create
                </Button>
                <div style={{width: '100%', marginTop: 20}}>
                    <DataGrid pageSize={pageSize}
                              autoHeight
                              rows={products}
                              pagination
                              columns={columns}
                              paginationMode="client"
                              rowCount={products.length}

                    />
                </div>
            </div> :
            <div>Loading...</div>
        }
    </>
}

export default ProductList;