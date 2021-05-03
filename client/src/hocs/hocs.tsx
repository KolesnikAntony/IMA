import {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {formFilterData, formTypeData} from "../types/types";

export const FormFilterHOC = (component: FC<InjectedFormProps<formTypeData, formFilterData>  & formFilterData>, name: string,) => {
    return reduxForm<formTypeData, formFilterData>({form: name})(component);
};
