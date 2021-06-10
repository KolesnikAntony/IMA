import {fetchUtils} from 'react-admin';
import {stringify} from "querystring";
import {instance} from "../../api/api";


const apiUrl = 'http://localhost:3000/api';
const httpClient = fetchUtils.fetchJson;

export default {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;

        return instance.get(`/api/${resource}?page=${page}&limit=${perPage}`, {}).then(res => {
            return {
                data: res.data.products,
                total: res.data.count
            }
        })
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            // sort: JSON.stringify([field, order]),
            // range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            // filter: JSON.stringify({
            //     ...params.filter,
            //     [params.target]: params.id,
            // }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            //@ts-ignore
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            credentials: 'include',
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),

        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) => instance.post(`/api/${resource}`).then(res=> {
        console.log(res);
        return { ...params.data, id: res.data.id };
    }),

    delete: (resource, params) => instance.delete(`/api/${resource}/${params.id}`).then(res=> {
        console.log(res);
        return { data: res.data }
  }),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    }
};