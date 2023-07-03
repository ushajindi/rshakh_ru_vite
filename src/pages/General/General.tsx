import React from 'react';
import {Avatar, Layout, Menu, Row, Slider, Switch} from "antd";
import {UserOutlined, WechatOutlined} from "@ant-design/icons";
import {Outlet, Route, Routes, useNavigate} from "react-router-dom";

const {Sider, Content} = Layout
import rootStore from "../../store/rootStore/instanse.ts";
import {observer} from "mobx-react-lite";

const UserStore = rootStore.UserStore
const theme = rootStore.themeStore

const General = () => {
    const navigate = useNavigate()

    return (
        <Layout  style={{minHeight: '100vh', margin: "0", padding: "0"}}>
            <Sider className={"shadow"} theme={theme.theme === "dark" ? "dark" : "light"} width={
                window.innerWidth > 560 ? "30vw" : "60vw"
            } collapsible>
                <Menu mode="inline" theme={theme.theme === "dark" ? "dark" : "light"}
                items={[{
                    key:1,
                    label:<>
                    <span>
                        <span onClick={()=>{
                            navigate("/user")
                        }}>{UserStore.user.username}</span>

                        <span style={{float: "right"}}>
                                    <Switch
                                        checked={theme.theme === 'dark'}
                                        onChange={() => {
                                            if (theme.theme === 'dark') {
                                                theme.setTheme("light")
                                            } else {
                                                theme.setTheme("dark")
                                            }
                                        }}
                                        checkedChildren="Темный"
                                        unCheckedChildren="Светлый"
                                    />
                                </span>

                            </span>
                    </>,
                    icon:<UserOutlined/>,
                },

                    {
                        type:"divider"
                    },
                    {
                        key:2,
                        icon:<WechatOutlined/>,
                        label: "Chats",
                        children:[{
                            label:<>54545</>,
                            key:3
                        }]
                    }
                ]}
                />
            </Sider>
            <Content className={theme.theme=="dark"?"bg-dark-primary":"bg-light-primary"}>
                <Outlet/>
            </Content>
        </Layout>
    );
};

export default observer(General);