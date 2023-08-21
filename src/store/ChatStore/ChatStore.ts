import { io, Socket ,} from "socket.io-client";
import {action, computed, makeObservable, observable, toJS} from "mobx";
import rootStore from "../rootStore/instanse.ts";
import {message} from "antd";
import {userType} from "../UserStore/UserStore.ts";
import SignApi from "../../ApiService/SignApi.ts";
import dayjs from 'dayjs';
export type chatsType={
    _id:string,
    users:userType
}

export type ChatStoreType= {
    chats:chatsType[],
    users:userType[]
    currentChat:any
    currentMessage:string
}

type PrivateFields="_Chats"
export class ChatStore{
    private socketInstance:Socket | null = null;
    constructor() {
        makeObservable<ChatStore,PrivateFields>(this,{
            _Chats:observable,
            addChat:action,
            setUsers:action,
            connectChats:action,
            newChat:action,
            filterChats:action,
            addCurrentChat:action,
            currentChat:computed,
            Users:computed,
            Chats:computed,
            handleMessage:action,
            currentMessage:computed,
            sendMessage:action,
            socketIns:computed,
        })

    }
    private _Chats:ChatStoreType={
        chats:[],
        users:[],
        currentChat:null,
        currentMessage:"",
    }

    get socketIns(){
        return this.socketInstance
    }
    get currentMessage(){
        return this._Chats.currentMessage
    }
    addChat(chat:any,push:boolean){
        if(push){
        this._Chats.chats.push(chat)
        }else {
            this._Chats.chats=chat
        }

    }
    async newChat(user:userType){
        message.open({
            content:"loading",
            key:"loading",
            type: 'loading'
        })
        const users:userType[]=[]
        const chat =this._Chats.chats.filter((el:chatsType)=>el.users._id==user._id)
        if (chat.length!=0){
            message.destroy("loading")
            return chat[0]._id
        }
        else {
            const newChat=await SignApi.createChat([user,rootStore.UserStore.user])
            if (newChat.status==201){
                message.destroy("loading")
                return newChat.data._id
            }
        }
    }
    get currentChat(){
        return this._Chats.currentChat
    }
    filterChats(id:string){
        const chat=this._Chats.chats.filter((el)=>el._id==id)
        const user=this._Chats.users.filter((el)=>el._id==chat[0].users._id)
        if (chat[0]){
            this._Chats.currentChat={
                _id:chat[0]._id,
                users:user[0]
            }
        }
    }
    socket() {
        if (!this.socketInstance) {
            if (rootStore.AuthStore.Auth && rootStore.AuthStore.token) {
                this.socketInstance = io(`ws://rshakh.ru:3004?token=${"Bearer " + rootStore.AuthStore.token}`);
            } else {
                message.error("Ошибка при загрузке чата");
                this.socketInstance = io().disconnect();
            }
        }
        return this.socketInstance;
    }
    get Chats(){
        return this._Chats.chats

    }
    get Users(){
        return this._Chats.users
    }

    connectChats(){
        try {
            this.socketInstance?.connect()
            this.socketInstance?.emit("getchats","")
            if (rootStore.UserStore.user._id){
                //тут приходить только чаты
                this.socketInstance?.on(rootStore.UserStore.user._id.toString(),(payload)=>{
                    if (payload.chat.length!=0){
                        switch (payload.action){
                            case "all":{
                                this.addChat(payload.chat,false)
                                break
                            }
                            case "new":{
                                let users
                                payload.chat.users.map((el:any)=>{
                                    if(el._id!=rootStore.UserStore.user._id){
                                        users={
                                            email:el.email,
                                            online:el.online,
                                            username:el.username,
                                            _id:el._id
                                        }
                                    }
                                })
                                this.addChat({
                                    _id:payload.chat._id,
                                    users:users
                                },true)
                            }
                        }

                    }
                    if (payload.messages){
                        rootStore.MessageStore.addMessages(payload.messages)
                    }

                })
            }

            this.socketInstance?.on("users",(data)=>{
                    if (data.length>0){
                       const users:userType[]= data.filter((user:userType)=>{return user._id!=rootStore.UserStore.user._id})
                        this.setUsers(users)
                    }

                // this.setUsers(data)
            })
           this.socketInstance?.on("chats",(data)=>{
               this.addChat(data.chats,false)
            })
        } catch (error){
            this.socketInstance?.close()
            console.log(error)
        }

    }

    listenerChats(){
        if (this._Chats.chats){
            this._Chats.chats.map((el)=>{
                this.socketInstance?.on(el._id,(data)=>{
                    rootStore.MessageStore.addMessage(Object.keys(data)[0],Object.values(data)[0])
                })
            })
        }

    }
    addCurrentChat(data:any){
        this._Chats.currentChat=data
    }
    setUsers(users:userType[]){
        this._Chats.users=users
        if (this._Chats.currentChat){
            users.map((el:userType)=>{
                if (el._id==this._Chats.currentChat?.users._id){
                        this._Chats.currentChat.users.online=el.online
                }
            })
        }
    }
    handleMessage(e:any){
        this._Chats.currentMessage=e.target.value
    }

    sendMessage(){
        if (this._Chats.currentMessage && this._Chats.currentChat?._id){
            const date=dayjs(Date.now())
            const formattedDate = date.format('DD-MM-YYYY, HH:mm');
            this.socketInstance?.emit("msg",{
                date:formattedDate,
                message:this._Chats.currentMessage,
                chatId:this.currentChat?._id,
                user:rootStore.UserStore.user._id
            })
            this._Chats.currentMessage=""
        }
    }



}