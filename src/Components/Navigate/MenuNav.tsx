import React, {useEffect} from 'react';
import {Avatar, Badge, Menu, MenuProps, Space, Switch} from "antd";
import {EyeOutlined, SettingOutlined, UsergroupAddOutlined, UserOutlined, WechatOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import rootStore from "../../store/rootStore/instanse.ts";
import {chatsType} from "../../store/ChatStore/ChatStore.ts";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
type MenuItem = Required<MenuProps>['items'][number];

const MenuNav = () => {
    useEffect(()=>{
        rootStore.ChatStore.listenerChats()
    },[rootStore.ChatStore.Chats.length])
    const navigate = useNavigate()
    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key!=="not"){
           const nav=e.key.split(" ")
            switch (nav[0]){
                case "chat":{
                    navigate(`chats/${nav[1]}`)
                    break
                }
                case "users":{
                    navigate("/users")
                    break
                }

                case "me":{
                    navigate("/me")
                }
            }
        }
    };
    function getItem(
        disabled:React.ReactNode,
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem {
        return {
            key,
            icon,
            disabled,
            children,
            label,
            type,
        } as MenuItem;
    }
    const items:MenuProps["items"] = [
        getItem(true,<Switch style={{float:"right"}}
                              checked={rootStore.themeStore.theme === 'dark'}
                              onChange={() => {
                                  if (rootStore.themeStore.theme === 'dark') {
                                      rootStore.themeStore.setTheme("light")
                                  } else {
                                      rootStore.themeStore.setTheme("dark")
                                  }
                              }}
                              checkedChildren="Темный"
                              unCheckedChildren="Светлый"
        />,"",<EyeOutlined />),
        getItem(false,rootStore.UserStore.user.username,"me",<SettingOutlined />),
        { type: "divider" },
        getItem(false,"Chats", "2", <WechatOutlined/>,rootStore.ChatStore.Chats&&[
            ...rootStore.ChatStore.Chats.map((el:chatsType)=>{
            return getItem(false,el?.users.username?el.users.username:"У вас нет еще чатов"
                ,el?._id?`chat `+el._id:"not",el?<Badge  size={"small"} count={1}><Avatar size={25} className={"text-black"} style={{background:"#eee"}}>{el?.users.username?el?.users.username[0]:""}</Avatar></Badge>:"",)
            })
        ]),
        getItem(false,"Люди","users",<UsergroupAddOutlined />)
];


    return (
        <Menu mode="inline" theme={rootStore.themeStore.theme === "dark" ? "dark" : "light"}
              items={items}
              onClick={onClick}
        />
    );
};

export default observer(MenuNav);