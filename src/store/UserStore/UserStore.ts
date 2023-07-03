import {action, makeObservable, observable, toJS} from "mobx";
import SignApi from "../../ApiService/SignApi.ts";
import {message} from "antd";
import rootStore from "../rootStore/instanse.ts";


type userType = {
    _id: string | null
    email: string | null
    username: string | null
    avaimg: string | null
    online: boolean | null

}
export type loginType = {
    email: string
    password: string
}

type UserStoreType = {
    user: userType
}

type privateField = "_UserStore"

export default class UserStore {
    private _UserStore: UserStoreType = {
        user: {
            _id: null,
            email: null,
            username: null,
            avaimg: null,
            online: null
        },
    }

    constructor() {
        makeObservable<UserStore, privateField>(this, {
            _UserStore: observable,
            setUser: action,
            updateAvatarStore: action
        })
    }

    async updateUserAvatar(file: any) {
        message.loading({content: "Обновляем ававтар", key: "loading"},)
        try {
            const user = await SignApi.updateAvatar(file)
            if (user?.status === 200) {
                message.destroy("loading")
                message.success({content: "Фото профилья обновлён"}, 1)
                this.updateAvatarStore(user.data.avaimg)
            }

        } catch (error) {
            message.error({content: "Неизвестная ошибка"})
        }

    }

    updateAvatarStore(avaimg: string) {
        this._UserStore.user.avaimg = avaimg
    }

    get user() {
        return this._UserStore.user
    }

    setUser(user:userType) {
        this._UserStore.user = user
    }


}