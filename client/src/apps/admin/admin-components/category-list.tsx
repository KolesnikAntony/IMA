import React, {FC, useEffect} from 'react';
import Button from "@material-ui/core/Button";
import {DataGrid, GridColDef, GridRowParams} from "@material-ui/data-grid";
import {deleteCategory, getAdminCategories} from "../../../redux/admin-reduser";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {LinearProgress} from "@material-ui/core";
import {PropsTypeAdminProducts} from "./product-container";

interface PropsType {
    setMode: (mode: string) => void
}

const CategoryList: FC<PropsType & PropsTypeAdminProducts> = ({setMode, setTitle}) => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.admin.categories);
    const isFetching = useSelector((state: RootState) => state.admin.isFetching);

    useEffect(() => {
        dispatch(getAdminCategories());
        setTitle("Categories");
    }, []);

    const handleDeleteClick = (id: string) => {
        dispatch(deleteCategory(id))
    };

    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Category', flex: 0.4},
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
        {!isFetching ?
            <div>
                <Button variant="contained" color="primary" onClick={() => setMode('create')}>
                    Create
                </Button>
                <div style={{width: '100%', marginTop: 20}}>
                    <DataGrid
                        // pageSize={pageSize}
                        autoHeight
                        rows={categories}
                        pagination
                        columns={columns}
                        rowCount={categories.length}
                        isRowSelectable={(params: GridRowParams) => false}
                    />
                </div>
            </div>
            :
            <LinearProgress />
        }
    </>
}



export default CategoryList;