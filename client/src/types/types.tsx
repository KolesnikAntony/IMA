import React from "react";

export type ProductType = {
    id: number,
    name: string,
    price: number,
    color: string,
    catigories: string,
    description: string,
    shortDescr: string,
    image: string,
    salePrice: number | null,
    sale: boolean,
    top: boolean,
    wish: boolean,
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

export type ProfilePropsType<P> = {
    photo?: string
    changePhoto?: (e: React.ChangeEvent<HTMLInputElement>)=> void
} & P;
