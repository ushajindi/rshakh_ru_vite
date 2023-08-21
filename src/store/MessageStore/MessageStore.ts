import {userType} from "../UserStore/UserStore.ts";
import {action, computed, makeObservable, observable, toJS} from "mobx";
type messagesType = Record<string, MessagesType[]>
export type MessagesType = {
    _id: string,
    user: string,
    chatId: string,
    message: string
}
type PrivateFields = "_Messages"

export class MessageStore {
    private _Messages: messagesType = {}

    constructor() {
        makeObservable<MessageStore, PrivateFields>(this, {
            _Messages: observable,
            Message: computed,
            addMessages: action,
            addMessage: action,

        })
    }

    get Message() {
        return this._Messages
    }


    addMessages(Messages:messagesType) {
        this._Messages = Messages
    }

    addMessage(key: string, message:any) {
        if (this._Messages[key]){
            this._Messages[key].push(message)
        } else {
            this._Messages[key]=[message]
        }
    }

}