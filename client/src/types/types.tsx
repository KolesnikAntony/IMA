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
    subText: string
    title: string
    top: boolean
    totalCount?: 15
    updatedAt: string
    __v?: number
    _id: string
    isCart?: boolean
}

export type ProductsAPIType =  {
    products: Array<ProductType>
    page: number
    pages: number
}

export type CartType = {
    _id: string
    imageSrc: string
    price: number
    salePrice: number
    title: string
    qty: number
}

export type FilterType = {
    categories: Array<string>
    colors: Array<string>
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
