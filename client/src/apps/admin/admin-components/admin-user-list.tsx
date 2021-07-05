import React, {FC, useEffect} from 'react';
import Button from "@material-ui/core/Button";
import {DataGrid, GridColDef} from "@material-ui/data-grid";
import {deleteCategory, getAdminCategories, getAllUsers} from "../../../redux/admin-reduser";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {LinearProgress} from "@material-ui/core";

interface PropsType {
    setTitle: (title: string) => void
}

const UserList: FC<PropsType> = ({setTitle}) => {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.admin.users);
    const isFetching = useSelector((state: RootState) => state.admin.isFetching);

    useEffect(() => {
        dispatch(getAllUsers());
        setTitle('Users');
    }, []);



    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Name', flex: 0.4},
        {field: 'phone', headerName: 'Phone', flex: 0.4, sortable: false, filterable:false},
        {field: 'email', headerName: 'Email', flex: 0.4, sortable: false, filterable:false},

    ];


    return <>
        {!isFetching ?
            <div>
                <div style={{width: '100%', marginTop: 20}}>
                    <DataGrid
                        // pageSize={pageSize}
                        autoHeight
                        rows={users}
                        pagination
                        columns={columns}
                        rowCount={users.length}

                    />
                </div>
            </div>
            :
            <LinearProgress />
        }
    </>
}



export default UserList;