import React, {FC, useEffect} from 'react';
import {DataGrid, GridColDef, GridRowParams} from "@material-ui/data-grid";
import {getAllUsers} from "../../../redux/admin-reduser";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {LinearProgress} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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

    const isMobile = useMediaQuery('(max-width: 550px)');
    const isTablet = useMediaQuery('(max-width: 1014px)');



    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Name', flex: isTablet ?  0.3 : 0.4 , hide:isMobile},
        {field: 'phone', headerName: 'Phone', flex: isMobile ?  0.5 : (isTablet ? 0.3 : 0.4), sortable: false, filterable:false},
        {field: 'email', headerName: 'Email', flex: isMobile ?  0.7 : (isTablet ? 0.6 : 0.4), sortable: false, filterable:false},

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
                        isRowSelectable={(params: GridRowParams) => false}
                    />
                </div>
            </div>
            :
            <LinearProgress />
        }
    </>
}



export default UserList;