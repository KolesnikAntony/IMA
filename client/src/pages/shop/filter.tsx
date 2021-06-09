import React, {FC, useEffect} from 'react';
import './shop.scss';
import {Field, FormSection, InjectedFormProps} from "redux-form";
import {FormFilterHOC} from '../../hocs/hocs';
import {FilterType, FormFilterDataType, FormFilterPropsType} from "../../types/types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {getFilter} from '../../redux/products-reducer';


interface PropsType {
    setFilter: (data: FormFilterDataType) => void
}

const Filter: FC<PropsType> = ({setFilter}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFilter());
    }, []);

    const {colors, category} = useSelector<RootState, FilterType>((state) => state.products.filter);

    return <FilterFormWrap colors={colors} categories={category} onSubmit={setFilter} />;
};

const FilterForm: FC<InjectedFormProps<FormFilterDataType, FormFilterPropsType> & FormFilterPropsType> = ({handleSubmit, colors, categories}) => {
    return (
        <form className="shop__form" onSubmit={handleSubmit}>
            <FormSection name="categories">
                <div className="shop__form--wrap"><h4 className="shop__form--title">Kategory</h4>
                    <div className="shop__categories">
                        {categories.map(el =>
                            <div className="shop__categories--item" key={el._id}>
                                <label htmlFor={"check--" + el._id} className="shop__categories--label">{el.name}</label>
                                <Field type='checkbox' name={el._id} component='input' id={"check--" + el._id}/>
                                <span className="shop__categories--item-checkmark"/>
                            </div>
                        )}
                    </div>
                </div>
            </FormSection>
            <FormSection name="colors">
                <div className="shop__form--wrap">
                    <h4 className="shop__form--title">Kolory</h4>
                    <div className="shop__categories">
                        {colors.map(el =>
                            <div className="shop__categories--item" key={el}>
                                <label htmlFor={"check--" + el} className="shop__categories--label">{el}</label>
                                <Field type='checkbox' name={el} component='input' id={"check--" + el}/>
                                <span className="shop__categories--item-checkmark"/>
                            </div>
                        )}
                    </div>
                </div>
            </FormSection>
            <button className="shop__form--submit">sprawdzić</button>
        </form>
    )
}

const FilterFormWrap = FormFilterHOC(FilterForm, 'filter');

export default Filter;
