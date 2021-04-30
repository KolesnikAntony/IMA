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

//USER_TYPES

export interface UserInfoPropsType {
    email: string
    phone: string
    city: string
    street: string
    flat: string
    build: string
    kod: string
}

export interface UserSelfPropsType {
    name: string | null
    photo: string | null
    changePhoto: (e: React.ChangeEvent<HTMLInputElement>) => void
}