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
    email: string | null
    address: string | null
    country: string | null
    numberOfHouse: string | null
    numberOfFlat: string | null
    phone: string | null
    kod: string | null
}

export interface UserSelfPropsType {
    name: string | null
    photo: string | null
    changePhoto: (e: React.ChangeEvent<HTMLInputElement>) => void
}