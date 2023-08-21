import UserStore from "../UserStore/UserStore.ts";
import {ThemeStore} from "../themeStore/themeStore.ts";
import {ChatStore} from "../ChatStore/ChatStore.ts";
import {AuthStore} from "../AuthStore/AuthStore.ts";
import {MessageStore} from "../MessageStore/MessageStore.ts";


export default class rootStore{
    readonly UserStore=new UserStore()
    readonly themeStore=new ThemeStore()
    readonly ChatStore=new ChatStore()
    readonly AuthStore=new AuthStore()
    readonly MessageStore=new MessageStore()
}