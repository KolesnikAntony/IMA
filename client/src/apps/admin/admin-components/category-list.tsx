import React, {useEffect} from 'react';
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton } from 'react-admin'
import Button from "@material-ui/core/Button";
import {DataGrid, GridColDef} from "@material-ui/data-grid";
import {deleteAdmitProduct, deleteCategory, getAdminCategories, getAdminProducts} from "../../../redux/admin-reduser";
import {FILTER_TYPES} from "../../../constants/constants";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";



const CategoryList = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.admin.categories);

    useEffect(() => {
        dispatch(getAdminCategories())
    }, []);

    const handleDeleteClick = (id: string) => {
       dispatch(deleteCategory(id))
    };

    const columns: GridColDef[] = [
        {field: 'name',  headerName: 'Category', flex: 0.4},
        {   field: "delete",
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
        <Button variant="contained" color="primary"  >
            Create
        </Button>
        <div style={{width: '100%', marginTop: 20}}>
            <DataGrid
                // pageSize={pageSize}
                      autoHeight
                      rows={categories}
                      pagination
                      columns={columns}
                      // paginationMode="client"
                      rowCount={categories.length}
                      // onPageChange={(params) => {
                      //     setPage(params.page);
                      // }
                      //}
            />
        </div>
    </>

}

export default CategoryList;