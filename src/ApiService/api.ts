import axios, {AxiosResponse} from "axios";
import {message} from "antd";


const api = axios.create({
    baseURL: "https://rshakh.ru:3003/api",
})

api.interceptors.response.use((res:AxiosResponse<any, any>)=>{
    if (res.status===403){
        message.error({content:"Нет доступа"})
        return res
    }
    if (res.status===401){
        message.error({content:"Вы не авторизованы"})
        return res
    }
    return res
},error => {
    return error.response
})

export default api