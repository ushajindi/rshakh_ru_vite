import api from "./api.ts";
import {userType} from "../store/UserStore/UserStore.ts";

const token = localStorage.getItem("token")

export default class SignApi {
    static async login(email: string, password: string) {
        return api.post("/auth/login", {
            email,
            password
        },)
    }

    static updateAvatar(file: any) {
        if (token) {
            const formData = new FormData()
            formData.append("image", file)
            return api.put("users/update-image", formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        ContentType: 'multipart/form-data',
                    }
                })
        }

    }

    static signIn(user:any){
        return  api.post("/auth/registration",user)
    }

    static autoRun() {
        if (token) {
            return  api.get("/users/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        }

    }
    static createChat(users:userType[]){
        return api.post("/chat/create",users,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    }

    static findEmail(email:string){
        return api.get(`users/user/findemail/${email}`)
    }
}