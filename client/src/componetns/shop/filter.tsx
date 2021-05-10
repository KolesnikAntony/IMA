import React, {FC} from 'react';
import './shop.scss';
import {Field, FormSection, InjectedFormProps} from "redux-form";
import {FormFilterHOC} from '../../hocs/hocs';
import {FormFilterDataType, FormFilterPropsType, ProductType} from "../../types/types";


interface PropsType {
    products: Array<ProductType>,
    setFilter: (data: FormFilterDataType) => void
}

const Filter: FC<PropsType> = ({products, setFilter}) => {

    //todo make those functionality on backend
    const getUniqueNameOfCategories = (array: Array<string>) => {
        return array.filter((e, i, a) => a.indexOf(e) === i);
    };

    const colors = getUniqueNameOfCategories(products.map(el => el.color));
    const categories = getUniqueNameOfCategories(products.map(el => el.categories));

    return <FilterFormWrap colors={colors} categories={categories} onSubmit={setFilter}/>;
};

const FilterForm:FC<InjectedFormProps<FormFilterDataType, FormFilterPropsType> & FormFilterPropsType> = ({handleSubmit, colors, categories}) => {
    return (
        <form className="shop__form" onSubmit={handleSubmit}>
            <FormSection name="categories">
            <div className="shop__form--wrap"><h4 className="shop__form--title">Categories</h4>
                <div className="shop__categories">
                    {categories.map(el =>
                        <div className="shop__categories--item">
                            <label htmlFor={"check--" + el} className="shop__categories--label">{el}</label>
                            <Field type='checkbox' name={el} component='input' id={"check--" + el}/>
                            <span className="shop__categories--item-checkmark"/>
                        </div>
                    )}
                </div>
            </div>
            </FormSection>
            <FormSection name="color">
            <div className="shop__form--wrap">
                <h4 className="shop__form--title">Colors</h4>
                <div className="shop__categories">
                    {colors.map(el =>
                        <div className="shop__categories--item">
                            <label htmlFor={"check--"+ el} className="shop__categories--label">{el}</label>
                            <Field type='checkbox' name={el} component='input' id={"check--"+ el}/>
                            <span className="shop__categories--item-checkmark"/>
                        </div>
                    )}
                </div>
            </div>
            </FormSection>
            <button className="shop__form--submit">show</button>
        </form>
    )
}

const FilterFormWrap = FormFilterHOC(FilterForm, 'filter');

export default Filter;


// const FilterForm2: FC<InjectedFormProps<formTypeData, formFilterData> & formFilterData> = ({handleSubmit, nameForCategories,title}) => {
//     return (
//         <form className="shop__form" onSubmit={handleSubmit}>
//             <h4 className="shop__form--title">{title}</h4>
//             <div className="shop__categories">
//                 {nameForCategories.map(el =>
//                     <div className="shop__categories--item">
//                         <label htmlFor={"check--"+ el} className="shop__categories--label">{el}</label>
//                         <Field type='checkbox' name={el} component='input' id={"check--"+ el}/>
//                         <span className="shop__categories--item-checkmark"/>
//                     </div>
//                 )}
//             </div>
//             <button className="shop__form--submit">show</button>
//         </form>
//     )
// };
// const Categories = FormFilterHOC(FilterForm, 'categories');
// const Colors = FormFilterHOC(FilterForm, 'colors');

{/*<Categories onSubmit={setCategories} nameForCategories={categories} title={"categories"}/>*/}
{/*<Colors onSubmit={setColors} nameForCategories={colors} title={"colors"}/>*/}