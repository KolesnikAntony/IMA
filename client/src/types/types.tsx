import React from "react";

export type ProductType = {
    id: number,
    title: string,
    price: number,
    color: string,
    categories: string,
    description?: string,
    shortDescr?: string,
    image: string,
    salePrice?: number | null,
    sale: boolean,
    top: boolean,
    isNew: boolean
}

//PROFILE_TYPES

export type ProfileAPIDataType = {
    user: ProfileDataType
}
export type ProfileDataType = {
    address: {
        kod: string
        street: string
        build: string
        flat: string
        city: string
    },
    email: string
    phone: string
    name: string
    photo?: string
}

export type ProfileFormValueType = {email: string
    phone: string
    city: string
    street: string
    flat: string
    build: string
    kod: string
    name: string
};

export type ProfilePropsType<P> = ProfileFormValueType & P;

//PRODUCTS_TYPES
export type formTypeData = object;
export type formFilterData = {
    nameForCategories: Array<string>
}
