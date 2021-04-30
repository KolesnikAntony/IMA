import React, {FC} from 'react';
import  {InjectedFormProps, reduxForm, Field} from "redux-form";


interface PropsType {
    formName: string
}

const products = [
    {
        color: 'red',
        categories: 'gel'
    },
    {
        color: 'grin',
        categories: 'lac'
    },
    {
        color: 'grey',
        categories: 'base'
    },
    {
        color: 'grey',
        categories: 'gel'
    },
];


const Filter = () => {
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
    console.log(nameForCategories);
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
const FormFilterHOC = (component: FC<InjectedFormProps<formTypeData, formFilterData>  & formFilterData>, name: string,) => {
    return reduxForm<formTypeData, formFilterData>({form: name})(component);
};

const Categories = FormFilterHOC(FilterForm, 'categories');
const Colors = FormFilterHOC(FilterForm, 'colors');

type formTypeData = object;
type formFilterData = {
    nameForCategories: Array<string>
}


export default Filter;