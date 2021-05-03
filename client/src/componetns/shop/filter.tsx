import React, {FC} from 'react';
import {Field, InjectedFormProps} from "redux-form";
import { FormFilterHOC } from '../../hocs/hocs';
import {formFilterData, formTypeData, ProductType} from "../../types/types";


const Filter: FC<{products:Array<ProductType>}> = ({products}) => {
    const setColors = (data: object) => {
        console.log(data)
    };
    const setCategories = (data: object) => {
        console.log(data)
    };

    const getUniqueNameOfCategories = (array:Array<string>) => {
        return array.filter((e, i, a) => a.indexOf(e) === i);
    };

    const colors = getUniqueNameOfCategories(products.map(el => el.color));
    const categories = getUniqueNameOfCategories(products.map(el => el.categories));

    return (
        <div>
            <Categories onSubmit={setCategories} nameForCategories={categories}/>
            <Colors onSubmit={setColors} nameForCategories={colors}/>
        </div>
    );
};

const FilterForm: FC<InjectedFormProps<formTypeData, formFilterData> & formFilterData> = ({handleSubmit, nameForCategories}) => {
    return (
        <form className="shop__form" onSubmit={handleSubmit}>
            {nameForCategories.map(el =>  <div className="show__categories">
                <div className="show__categories--item">
                    <label htmlFor="" className="show__categories--label">{el}</label>
                   <Field type='checkbox' name={el} component='input'/>
                </div>
            </div> )}
            <button className="shop__form-submit">Choose</button>
        </form>
    )
};

const Categories = FormFilterHOC(FilterForm, 'categories');
const Colors = FormFilterHOC(FilterForm, 'colors');

export default Filter;