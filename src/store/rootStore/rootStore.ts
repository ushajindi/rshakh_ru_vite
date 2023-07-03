import UserStore from "../UserStore/UserStore.ts";
import {ThemeStore} from "../themeStore/themeStore.ts";
import {ChatStore} from "../ChatStore/ChatStore.ts";
import {AuthStore} from "../AuthStore/AuthStore.ts";


export default class rootStore{
    readonly UserStore=new UserStore()
    readonly themeStore=new ThemeStore()
    readonly ChatStore=new ChatStore()
    readonly AuthStore=new AuthStore()
}