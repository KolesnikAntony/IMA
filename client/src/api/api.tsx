import axios from "axios";

export const instance = axios.create(
    {
        withCredentials: true,
        proxy: {
            host: "localhost",
            port: 5000
        },
        headers: {
            'Content-Type': 'application/json',
        },

    }
);