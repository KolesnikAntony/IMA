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
    setMode: (mode: string) => void
    setOrderId: (mode: string) => void
}

const OrderList: FC<PropsType & PropsTypeAdminProducts> = ({setTitle, setMode, setOrderId}) => {
    const dispatch = useDispatch();
    const orders = useSelector((state: RootState) => state.admin.orderList);
    const isFetching = useSelector((state: RootState) => state.admin.isFetching);
    useEffect(() => {
        dispatch(getOrderList());
        setTitle("Orders");
    }, []);


    const handleOrderAccept = (id: string) => {
        const date = '2021-07-19T20:17:11.889Z';
        alert(date.slice(0, 10));
        alert(date.slice(11, 16));

       // alert(id);
    };

    const handleOrderDetail = (id: string) => {
        setMode('show');
        setOrderId(id);
    };


    const columns: GridColDef[] = [
        {field: 'email', headerName: 'Email', flex: 0.4},
        {field: 'phone', headerName: 'Phone', flex: 0.4},
        {field: 'price', headerName: 'Sum', flex: 0.2},
        {field: 'createdAt',
            headerName: 'Date',
            flex: 0.2,
            renderCell: (params) => {
                console.log(params);
                const date = typeof params.value === 'string' ? params.value.slice(0, 10) : '';
                const time = typeof params.value === 'string' ? params.value.slice(11, 16): '';
                const fullD = `${date} : ${time}`;
                return (
                    <span>{fullD}</span>
                );
            },
        },
        {
            field: "more",
            headerName: "More info",
            sortable: false,
            filterable: false,
            width: 100,
            renderCell: (params) => {
                return (
                    <Button variant="contained" color="secondary" onClick={() => handleOrderDetail(params.id + '')}>
                        Info
                    </Button>
                );
            }
        },
        {
            field: "accept",
            headerName: "Accept",
            sortable: false,
            filterable: false,
            width: 100,
            renderCell: (params) => {
                return (
                    <Button variant="contained" color="secondary" onClick={() => handleOrderAccept(params.id + '')}>
                        Accept
                    </Button>
                );
            }
        },
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