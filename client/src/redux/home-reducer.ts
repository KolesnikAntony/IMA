import {ProductType} from "../types/types";

const initialState = {
    products: [
        {
            id: 1,
            name: 'laker',
            price: 30,
            color: 'red',
            catigories: 'lakery',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            wish: false,
        },
        {
            id: 2,
            name: 'laker',
            price: 30,
            color: 'red',
            catigories: 'lakery',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            wish: false,
        },
        {
            id: 3,
            name: 'laker',
            price: 30,
            color: 'red',
            catigories: 'lakery',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            wish: false,
        },
        {
            id: 4,
            name: 'laker',
            price: 30,
            color: 'red',
            catigories: 'lakery',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            wish: false,
        },
        {
            id: 5,
            name: 'laker',
            price: 30,
            color: 'red',
            catigories: 'lakery',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            wish: false,
        },
        {
            id: 6,
            name: 'laker',
            price: 30,
            color: 'red',
            catigories: 'lakery',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            wish: false,
        },
        {
            id: 7,
            name: 'laker',
            price: 30,
            color: 'red',
            catigories: 'lakery',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            wish: false,
        },
        {
            id: 8,
            name: 'laker',
            price: 30,
            color: 'red',
            catigories: 'lakery',
            description: "ldld",
            shortDescr: 'dldldl',
            image: "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://ima-professional.pl/wp-content/uploads/2021/01/Agate07-300x300.jpg",
            salePrice: null,
            sale: false,
            top: false,
            wish: false,
        }
    ] as Array<ProductType>
};

 const homeReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

type InitialStateType = typeof  initialState;

export default homeReducer;

