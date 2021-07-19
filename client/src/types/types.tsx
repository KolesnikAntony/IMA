import React from "react";

export type ProductType = {
    category: {name: string, _id: string, id?: string}
    color: string
    createdAt: string
    description: string
    id: number
    img?: File
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
    filter: FilterType
}

export type CreateProductType = {
    category: {name: string, _id: string, id?: string}
    color: string
    description: string
    img?: File | null
    imageSrc:string
    itsNew: boolean
    price: number
    sale: boolean
    salePrice: number |null
    shortDescr: string
    subText: string
    title: string
    top: boolean
}


export type ProductsAPIType =  {
    products: Array<ProductType>
    page: number
    pages: number
    count: number
    limit?: number
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
    category: Array<{name: string
    _id: string}>
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
    avatar: string
}

export type ProfileFormValueType = {email: string
    phone: string
    city: string
    street: string
    flat: string
    build: string
    kod: string
    name: string
    surname?: string
    company?: string
    country?: string
    post_box?: string
};

export type ProfilePropsType<P> = ProfileFormValueType & P;

//PRODUCTS_TYPES
export type FormFilterDataType = {
    colors: {}
    categories: {}
};
export type FormFilterPropsType = {

    colors: Array<string>
    categories: Array<{name: string
        _id: string}>
}

export type ContactsType = {
    address: string
    email: string
    id: string
    inst: string
    nip: string
    phone: string
    region: string
}

export type AboutImage = {
    image: string,
    id: string,
    caption: string,
    img?: File | null,
    createMode?: boolean
};

export type AboutTextType = {
    id: string,
    content: string
}

export type AboutList = Array<AboutImage>;

export type ErrorType = {
    errorText: string
    toggle: boolean
}

export type CheckoutType = {
    name: string,
    surnname: string
    city: string
    build: string
    company?: string
    country: string
    delivery: string
    email: string
    kod: string
    phone: string
    policy?: true
    post_box?: string
    street: string
}

export type CustomerType = {
    build: string
    city: string
    company: string
    country: string
    delivery: string
    email: string
    flat?: string
    kod: string
    name: string
    payId: string
    phone: string
    policy?: string
    post_box: string
    products: Array<{title: string, price: number, qty: number}>
    street: string
    surname: string
}