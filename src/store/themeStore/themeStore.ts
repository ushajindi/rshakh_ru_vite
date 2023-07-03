import {action, makeObservable, observable} from "mobx";


type PrivateField="_theme"
export class ThemeStore{
    private _theme="dark"
    constructor() {
        makeObservable<ThemeStore,PrivateField>(this,{
            _theme:observable,
            setTheme:action
        })
    }
    get theme(){
        return this._theme
    }
    setTheme(value:string){
        this._theme=value
    }
}