import React, {FC, useEffect} from 'react';
import Button from "@material-ui/core/Button";
import {DataGrid, GridColDef, GridRowParams} from "@material-ui/data-grid";
import {deleteCategory, getAdminCategories, getOrderList} from "../../../redux/admin-reduser";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {LinearProgress} from "@material-ui/core";
import {PropsTypeAdminProducts} from "./product-container";

interface PropsType {
    setTitle: (mode: string) => void
}

const OrderList: FC<PropsType & PropsTypeAdminProducts> = ({setTitle}) => {
    const dispatch = useDispatch();
    const orders = useSelector((state: RootState) => state.admin.orderList);
    const isFetching = useSelector((state: RootState) => state.admin.isFetching);
    useEffect(() => {
        dispatch(getOrderList());
        setTitle("Orders");
    }, []);


    const columns: GridColDef[] = [
        {field: 'email', headerName: 'Email', flex: 0.4},
        {field: 'phone', headerName: 'Phone', flex: 0.4},
        {field: 'id', headerName: 'Order ID', flex: 0.4},
        {field: 'id', headerName: 'Order ID', flex: 0.4},
        {field: 'price', headerName: 'Sum', flex: 0.4},

    ];


    return <>
        {!isFetching ?
            <div>
                <div style={{width: '100%', marginTop: 20}}>
                    <DataGrid
                        pageSize={12}
                        autoHeight
                        rows={orders}
                        pagination
                        columns={columns}
                        rowCount={orders.length}
                        isRowSelectable={(params: GridRowParams) => false}
                    />
                </div>
            </div>
            :
            <LinearProgress />
        }
    </>
};



export default OrderList;