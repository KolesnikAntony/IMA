import React, {FC, useCallback, useState} from 'react';
import CategoryList from "./category-list";
import CategoryCreate from "./category-create";
import {PropsTypeAdminProducts} from "./product-container";


const  CategoryContainer:FC<PropsTypeAdminProducts> = ({setTitle}) => {

    const [mode, setMode] = useState('list' );

    const handleCategoryEvent = useCallback((type: string) => {
        if (type === 'list') {
            return <CategoryList setMode={setMode} setTitle={setTitle}/>
        } else if (type === 'create') {
            return <CategoryCreate setMode={setMode} setTitle={setTitle}/>
        }
    }, [mode]);


    return <>
        {handleCategoryEvent(mode)}
    </>;
};

export default CategoryContainer;