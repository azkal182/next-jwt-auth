import axios from "axios";

const Axios = axios.create({
    baseURL:"https://express-jwt-auth-starter-typescript.vercel.app/api",
    withCredentials:true
});

export { Axios}
