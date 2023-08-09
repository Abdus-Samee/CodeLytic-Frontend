import axios from "axios"

export const myAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

//add access-control-allow-origin header to axios
// myAxios.interceptors.request.use(
//     (config) => {
//         config.headers['Access-Control-Allow-Origin'] = '*';
//         return config;
//     }
// )