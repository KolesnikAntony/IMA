import React, {useCallback, useState} from 'react';
import CategoryList from "./category-list";
import CategoryCreate from "./category-create";


const  CategoryContainer = () => {

    const [mode, setMode] = useState('list' );

    const handleCategoryEvent = useCallback((type: string) => {
        if (type === 'list') {
            return <CategoryList setMode={setMode} />
        } else if (type === 'create') {
            return <CategoryCreate setMode={setMode}/>
        }
    }, [mode]);


    return <>
        {handleCategoryEvent(mode)}
    </>;
};

export default CategoryContainer;