import {AppStateType} from "./store";
import {ProductType} from "../types/types";

export const getProducts = (state: AppStateType) => state.home.products;

export const ProductInitialState = {
    products: [
        {
            id: 1,
            name: 'laker',
            price: 30,
            color: 'red',
            categories: 'lakery',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            isNew: true,
        },
        {
            id: 2,
            name: 'laker',
            price: 30,
            color: 'green',
            categories: 'lakery',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            isNew: true,

        },
        {
            id: 3,
            name: 'laker',
            price: 30,
            color: 'blue',
            categories: 'lakery',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            isNew: true,

        },
        {
            id: 4,
            name: 'laker',
            price: 30,
            color: 'green',
            categories: 'lakery',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            isNew: true,

        },
        {
            id: 5,
            name: 'base',
            price: 30,
            color: 'red',
            categories: 'base',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            isNew: true,

        },
        {
            id: 6,
            name: 'gel',
            price: 30,
            color: 'red',
            categories: 'base',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            isNew: true,

        },
        {
            id: 7,
            name: 'base',
            price: 30,
            color: 'red',
            categories: 'gel',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            isNew: true,

        },
        {
            id: 8,
            name: 'gel',
            price: 30,
            color: 'red',
            categories: 'gel',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            isNew: true,
        }
    ] as Array<ProductType>
};