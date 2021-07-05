import {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {FormFilterPropsType, FormFilterDataType} from "../types/types";
import {useMediaQuery} from "react-responsive";
import {useViewSize} from "../hooks/hooks";

export const FormFilterHOC = (component: FC<InjectedFormProps<FormFilterDataType, FormFilterPropsType>  & FormFilterPropsType>, name: string) => {

    return reduxForm<FormFilterDataType, FormFilterPropsType>({form: name, destroyOnUnmount: false})(component);
};
