import React, {FC, useEffect} from 'react';
import {DataGrid, GridCellParams, GridColDef, GridRowParams} from "@material-ui/data-grid";
import {useDispatch, useSelector} from "react-redux";
import {deleteAdmitProduct, getAdminProducts} from "../../../redux/admin-reduser";
import {FILTER_TYPES} from "../../../constants/constants";
import {RootState} from "../../../redux/store";
import Button from "@material-ui/core/Button";
import {PropsTypeAdminProducts} from "./product-container";
import {IconButton, LinearProgress, makeStyles} from "@material-ui/core";
import cap from './../../../assets/img/nail-polish.png'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

interface PropsType {
    setMode: (mode: string) => void
    setProductId: (id: string) => void
}

const useStyles = makeStyles(() => ({

    imageWrap: {
        width: 60,
        height: 60,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: 6
    },
    image: {
        width: '100%',
    }
}));


const ProductList: FC<PropsType & PropsTypeAdminProducts> = ({setMode, setProductId, setTitle}) => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.admin.products);
    const isFetching = useSelector((state: RootState) => state.admin.isFetching);
    const {pageSize} = useSelector((state: RootState) => state.admin);
    const classes = useStyles();

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

    const isMobile = useMediaQuery('(max-width: 798px)');
    const isTablet = useMediaQuery('(max-width: 1124px)');

    const columns: GridColDef[] = [
        {
            field: 'imageSrc', filterable: false, sortable: false, headerName: 'Image', width: 100, hide: isMobile,
            renderCell: (params) => {
                return (
                    <div className={classes.imageWrap}><img className={classes.image}
                                                            src={params.value as string || cap} alt="text"/></div>
                );
            }
        },
        {field: 'title', headerName: 'Title', flex: isMobile ? 0.8 : 0.4 },
        {field: 'price', filterable: false, headerName: 'Price', flex: 0.2, hide: isMobile || isTablet},
        {field: 'id', filterable: false, sortable: true, headerName: 'ID', flex: 0.2, hide: isMobile || isTablet},
        {
            field: 'category', filterable: false, sortable: false, headerName: 'Category', flex: 0.2, hide: isMobile || isTablet,
            renderCell: (params: GridCellParams) => {
                //@ts-ignore
                const value = params.getValue(params.id, params.field).name;
                return (
                    <span>{value}</span>
                );
            }
        },
        {
            field: "edit",
            headerName: isMobile ? '✏' : "Edit",
            sortable: false,
            filterable: false,
            width: isMobile ? undefined : 80,
            flex: isMobile ? 0.2 : undefined,
            renderCell: (params) => {
                return (
                    isMobile ? <IconButton onClick={() => handleEdit(params.id + '')}>
                            <EditIcon />
                    </IconButton>
                        : <Button variant="contained" color="primary" onClick={() => handleEdit(params.id + '')}>
                    Edit
                </Button>
                );
            }
        },
        {
            field: "delete",
            headerName: isMobile ? '❌' : "Delete",
            sortable: false,
            filterable: false,
            width: isMobile ? undefined : 100,
            flex: isMobile ? 0.2 : undefined,
            renderCell: (params) => {
                return (
                    isMobile ? <IconButton onClick={() => handleDeleteClick(params.id + '')}>
                            <CloseIcon />
                        </IconButton>
                        :<Button variant="contained" color="secondary" onClick={() => handleDeleteClick(params.id + '')}>
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
                <div style={{width: '100%', marginTop: 20, transition: '0.3s'}}>
                    <DataGrid pageSize={pageSize}
                              autoHeight
                              rows={products}
                              pagination
                              columns={columns}
                              paginationMode="client"
                              rowCount={products.length}
                              isRowSelectable={(params: GridRowParams) => false}

                    />
                </div>
            </div> :
            <LinearProgress/>
        }
    </>
}

export default ProductList;