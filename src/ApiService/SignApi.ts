import api from "./api.ts";

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

    static autoRun() {
        if (token) {
            return  api.get("/users/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        }

    }
}