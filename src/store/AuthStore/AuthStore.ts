import {action, makeObservable, observable} from "mobx";
import SignApi from "../../ApiService/SignApi.ts";
import rootStore from "../rootStore/instanse.ts";
import {message} from "antd";
import {loginType} from "../UserStore/UserStore.ts";

type AuthType={
    Auth:boolean,
    token:string |null,
    user:{
        email:string
        password:string
    }|null
    notAuthMessage:"error"|undefined,
    loading:boolean
}
type PrivateFields="_Auth"
export class AuthStore{
    constructor() {
        makeObservable<AuthStore,PrivateFields>(this,{
            _Auth:observable,
            setAuth:action,
            Login:action,
            autoRun:action,
        })
    }
    private _Auth:AuthType={
        Auth:false,
        token:localStorage.getItem("token")?localStorage.getItem("token"):"",
        user:null,
        notAuthMessage:undefined,
        loading:false

    }

    get Auth(){
        return this._Auth
    }
    get token(){
        return this._Auth.token
    }
    setAuth(Auth:boolean){
        this._Auth.Auth=Auth
    }
    async Login(values: loginType) {
        const user = await SignApi.login(values.email, values.password)
        if (user.status === 401) {
            this._Auth.notAuthMessage = "error"
        }
        if (user.status === 201) {
            this._Auth.notAuthMessage = undefined
            this._Auth.Auth=true
            rootStore.UserStore.setUser(user.data.user)
            message.success({content: `С возвращением ${user.data.user.username}`, duration: 2})
            localStorage.setItem("token", user.data.token)
            rootStore.ChatStore.connectChats()
        }


    }
    async autoRun() {
        message.loading({content: 'Выполняется автовход в систему', key: 'loading'});
        const user = await SignApi.autoRun();
        action(()=>{

            if (user?.status === 200) {
                rootStore.UserStore.setUser(user.data);
                this._Auth.Auth=true
                message.destroy("loading")
                message.success({content: `С возвращением ${rootStore.UserStore.user.username}  `, duration: 2});
                rootStore.ChatStore.connectChats()
            }
            if (!user) {
                message.destroy("loading")
                message.error({content: "Ошибка в сети , попробуйте отключить vpn и попробойте еще раз"}, 4)
            }
        })()

    }
}