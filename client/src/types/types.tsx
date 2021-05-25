import React from "react";

export type ProductType = {
    category: {name: string, _id: string}
    color: string
    createdAt: string
    description: string
    id: number
    imageSrc:string
    itsNew: boolean
    price: number
    sale: boolean
    salePrice: number |null
    shortDescr: string
    title: string
    top: boolean
    totalCount?: 15
    updatedAt: string
    __v?: number
    _id?: string
}

export type ProductsAPIType =  {
    products: Array<ProductType>
}

export type CartType = {
    id: number
    imageSrc: string
    price: number
    title: string
    qty: number
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
export type FormFilterDataType = {
    colors: {}
    categories: {}
};
export type FormFilterPropsType = {
    colors: Array<string>
    categories: Array<string>
}
