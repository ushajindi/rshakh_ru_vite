import io from "socket.io-client"
import {makeObservable, observable} from "mobx";
import rootStore from "../rootStore/instanse.ts";
import {message} from "antd";

type PrivateFields="_Chats"
export class ChatStore{
    constructor() {
        makeObservable<ChatStore,PrivateFields>(this,{
            _Chats:observable,
        })
    }
    private _Chats={}

    socket(){
        if (rootStore.AuthStore.Auth && rootStore.AuthStore.token){
            return io(`ws://rshakh.ru:3004?token=${"Bearer "+rootStore.AuthStore.token}`)
        }
        message.error("Ошибка при закрузки чата")
        return io().disconnect()

    }
    get Chats(){
        return this._Chats
    }

    connectChats(){
        try {
            this.socket().connect()
            this.socket().on("users",(data:any)=>{
                console.log(data)
            })
        } catch (error){
            this.socket().close()
            console.log(error)
        }

    }


}