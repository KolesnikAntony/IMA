import {fetchUtils} from 'react-admin';
import {stringify} from "querystring";
import {instance} from "../../api/api";
import {Form} from "redux-form";
import {ProductType} from "../../types/types";


const apiUrl = 'http://localhost:3000/api';
const httpClient = fetchUtils.fetchJson;

export default {
    getList: (resource, params) => {
        const {page, perPage} = params.pagination;
        return instance.get(`/api/${resource}?page=${page}&limit=${perPage}`, {}).then(res => {
            let data;
            if (res.data.products) {
                data = res.data.products;
            } else if (res.data.categories) {
                data = res.data.categories;
            }
            return {
                data,
                total: res.data.count
            }
        })
    },

    getOne: async (resource, params) => {
        if (resource === 'products') {
            let res = await instance.get(`/api/products/${params.id}`);
            console.log(res, '=====get one')
            let path = res.data.product;
            return {
                data: {
                    id: path.id,
                    description: path.description,
                    imageSrc: path.imageSrc,
                    price: path.price,
                    salePrice: path.salePrice,
                    shortDescr: path.shortDescr,
                    subText: path.subText,
                    title: path.title,
                    category: path.category,
                    color: path.color
                }
            }
        }
    },

    getMany: async (resource, params) => {
        if (resource === 'category') {
            let res = await instance.get(`/api/${resource}/${params.ids}`);
            return {data: [res.data.category]}
        }
    },

    getManyReference: (resource, params) => {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;
        const query = {
            // sort: JSON.stringify([field, order]),
            // range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            // filter: JSON.stringify({
            //     ...params.filter,
            //     [params.target]: params.id,
            // }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({headers, json}) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: async (resource, params) => {
        // console.log(params.data.imageSrc, '----updata data');
        // let path = params.data.imageSrc.split('/').slice(3).join('');
        // let name = params.data.imageSrc.split('/').slice(5).join('');
        // console.log(path,'=====path');
        // let alo = createFile(window.location.host +'//' , path);
        // console.log(alo, '----after');



        let formData;
        let data;
        let res;
        if (resource === 'products') {
            errorHandlers(params.data);
            formData = getFormData(params.data);

            res = await instance.post(`/api/${resource}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            data = res.data.product

        }
        return {...params.data, data};
    },

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),

        }).then(({json}) => ({data: json}));
    },

    create: async (resource, params) => {

        let formData;
        let data;
        let res;
        if (resource === 'products') {
            errorHandlers(params.data);
            formData = getFormData(params.data);

            res = await instance.post(`/api/${resource}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            data = res.data.product

        } else if (resource === 'category') {
            formData = {
                name: params.data.name,
            };
            try {
                res = await instance.post(`/api/${resource}`, formData);
                let name = res.data.newCategory.name;
                let id = res.data.newCategory.id;
                data = {
                    name,
                    id
                };
            } catch (err) {
                if (err.response.data.message === "Категория Test занята, попробуйте другое имя") {
                    throw new Error('This category already exists')
                }
            }
        }

        return {...params.data, data};

    },

    delete: (resource, params) => instance.delete(`/api/${resource}/${params.id}`).then(res => {
        console.log(res);
        return {data: res.data}
    }),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({json}) => ({data: json}));
    }
};


const getFormData = (data) => {
    let formData = new FormData();
    console.log( data.imageSrc);
    data.imageSrc !== undefined && formData.append('imageSrc', data.imageSrc.rawFile);
    formData.append('category', data.category);
    formData.append('color', data.color);
    formData.append('description', data.description);
    formData.append('itsNew', data.itsNew === undefined ? false : data.itsNew);
    formData.append('price', data.price);
    formData.append('sale', data.sale === undefined ? false : data.sale);
    formData.append('salePrice', data.salePrice === undefined ? '' : data.salePrice);
    formData.append('shortDescr', data.shortDescr);
    formData.append('subText', data.subText);
    formData.append('title', data.title);
    formData.append('top', data.top === undefined ? false : data.top);

    return formData
};

const errorHandlers = (data) => {
    if (data.imageSrc === undefined) {
        throw new Error('Image is required!')
    } else if (data.price === undefined) {
        throw new Error('Price is required!')
    } else if (data.category === undefined) {
        throw new Error('Category is required!')
    }
};

// async function createFile(url, name, path){
//     let response = await instance.get(url, path);
//     let data = await response.blob();
//     console.log(data)
//     let metadata = {
//         type: 'image/jpeg'
//     };
//     return new File([data], name, metadata);
//     // ... do something with the file or return it
// }


