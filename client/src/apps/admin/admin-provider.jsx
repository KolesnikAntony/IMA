import {fetchUtils} from 'react-admin';
import {stringify} from "querystring";
import {instance} from "../../api/api";
import {Form} from "redux-form";


const apiUrl = 'http://localhost:3000/api';
const httpClient = fetchUtils.fetchJson;

export default {
    getList: (resource, params) => {
        const {page, perPage} = params.pagination;
        return instance.get(`/api/${resource}?page=${page}&limit=${perPage}`, {}).then(res => {
            let data;
            if (res.data.products) {
                console.log(res.data.count);
                data = res.data.products;
            } else if (res.data.categories) {
                console.log(res);
                data = res.data.categories;
            }
            return {
                data,
                total: res.data.count
            }
        })
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({json}) => ({
            data: json,
        })),

    getMany: async (resource, params) => {
        // const query = {
        //     filter: JSON.stringify({id: params.ids}),
        // };
        // const url = `${apiUrl}/${resource}?${stringify(query)}`;
        // return httpClient(url).then(({json}) => ({data: json}));
        let res = await instance.get(`/api/${resource}/${params.ids}`);
        console.log(res.data.category)
        return {data: [res.data.category]}
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

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            credentials: 'include',
        }).then(({json}) => ({data: json})),

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

        let photo = {...params.data, imageSrc: {...params.data.imageSrc.rawFile}}
        let formData  = new FormData();
        formData.append('imageSrc', photo);

        console.log(formData);
        let res = await instance.post(`/api/${resource}`, formData);
        console.log(res);
        let data;
        if (res.config.url === "/api/category") {
            let name = res.data.newCategory.name;
            let id = res.data.newCategory.id;
            data = {
                name,
                id
            }
        }else if (res.config.url === "/api/products"){
        }
        return {...params.data, data };

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