import {Route,Routes} from "react-router-dom";
import Login from "./pages/Login/Login.tsx";
import React, {useEffect} from "react";
import General from "./pages/General/General.tsx";
import UserProfile from "./Components/UserProfile.tsx";
import rootStore from "./store/rootStore/instanse.ts";
import {useNavigate} from "react-router-dom";
import Chats from "./pages/Chats/Chats.tsx";
import "./App.css"
import Users from "./pages/Users/Users.tsx";
import {observer} from "mobx-react-lite";


function App() {

    const navigate = useNavigate()
   useEffect(()=>{
       if (!rootStore.AuthStore.Auth.Auth){
           navigateLogin()
       }
   },[rootStore.AuthStore.Auth.Auth])
    const navigateLogin=()=>{
        navigate("/login")
    }

  return (

            <Routes>
                <Route  path={"/login"} element={<Login/>}/>
                <Route path={"/"} element={<General/>}>
                    <Route path={"/me"} element={<UserProfile/>}/>
                    <Route path={"/chats/:id"} element={<Chats/>}/>\
                    <Route path={"/users"} element={<Users/>}/>
                </Route>
            </Routes>
  )
}

export default observer(App)
