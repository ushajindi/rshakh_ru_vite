import {action, computed, makeObservable, observable} from "mobx";
import SignApi from "../../ApiService/SignApi.ts";
import rootStore from "../rootStore/instanse.ts";
import {message} from "antd";
import {loginType} from "../UserStore/UserStore.ts";
import {act} from "react-dom/test-utils";
import signIn from "../../pages/Login/SignIn.tsx";

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
type SignType={
    user:{
        email:string,
        username:string,
        password:string
    }|null,
    isEmailError:boolean,
}
type PrivateFields="_Auth"|"_Sign"
export class AuthStore{
    constructor() {
        makeObservable<AuthStore,PrivateFields>(this,{
            _Auth:observable,
            _Sign:observable,
            setAuth:action,
            Auth:computed,
            token:computed,
            Login:action,
            autoRun:action,
            signOut:action,
            addSign:action,
            findEmail:action,
            Sign:computed,

        })
    }
    private _Sign:SignType={
        user:null,
        isEmailError:false
    }
    private _Auth:AuthType={
        Auth:false,
        token:localStorage.getItem("token")?localStorage.getItem("token"):"",
        user:null,
        notAuthMessage:undefined,
        loading:false

    }
    get Sign():SignType{
        return this._Sign }
    async addSign(values:any){
        const user=await SignApi.signIn(values)
        if(user.status==201){
            this.setAuth(true)
            rootStore.UserStore.setUser(user.data.user)
            message.success({content: `С возвращением ${user.data.user.username}`, duration: 2})
            localStorage.setItem("token", user.data.token)
            rootStore.ChatStore.connectChats()
        }else{
            message.error("Ошибка попрубуйте позже")
        }
    }
   async findEmail(event:any){
        const re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
        if(re.test(event.target.value)){
            const email= await SignApi.findEmail(event.target.value)
            this._Sign.isEmailError = !email.data;
        }

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
            localStorage.removeItem("token")
            this._Auth.notAuthMessage = undefined
            this.setAuth(true)
            rootStore.UserStore.setUser(user.data.user)
            message.success({content: `С возвращением ${user.data.user.username}`, duration: 2})
            localStorage.setItem("token", user.data.token)
            rootStore.ChatStore.connectChats()
        }


    }

    signOut=()=>{
        this._Auth={
            Auth:false,
            token:null,
            user:null,
            notAuthMessage:undefined,
            loading:false
        }
        localStorage.removeItem("token")
        rootStore.ChatStore.socketIns?.close()
    }
    async autoRun() {
        const token=localStorage.getItem("token")
        if(token){
            message.loading({content: 'Выполняется автовход в систему', key: 'loading'});
            const user = await SignApi.autoRun();
            action(()=>{

                if (user?.status === 200) {
                    rootStore.UserStore.setUser(user.data);
                    this._Auth.Auth=true
                    message.destroy("loading")
                    message.success({content: `С возвращением ${rootStore.UserStore.user.username}  `, duration: 2});
                    rootStore.ChatStore.socket()
                    rootStore.ChatStore.connectChats()
                }
                if (!user) {
                    message.destroy("loading")
                    message.error({content: "Ошибка в сети , попробуйте отключить vpn и попробойте еще раз"}, 4)
                }
            })()
        }


    }
}