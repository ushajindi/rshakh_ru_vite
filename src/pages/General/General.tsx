import React from 'react';
import {Avatar, Layout, Menu, Row, Slider, Switch} from "antd";
import {UserOutlined, WechatOutlined} from "@ant-design/icons";
import {Outlet, Route, Routes, useNavigate} from "react-router-dom";

const {Sider, Content} = Layout
import rootStore from "../../store/rootStore/instanse.ts";
import {observer} from "mobx-react-lite";
import MenuNav from "../../Components/Navigate/MenuNav.tsx";

const UserStore = rootStore.UserStore
const theme = rootStore.themeStore

const General = () => {

    return (
        <Layout  style={{minHeight: '100vh', margin: "0", padding: "0"}}>
            <Sider className={"shadow"} theme={rootStore.themeStore.theme === "dark" ? "dark" : "light"} width={
                window.innerWidth > 560 ? "50vw" : "60vw"
            } collapsible>
                <MenuNav/>
            </Sider>

            <Content className={theme.theme=="dark"?"bg-dark-primary":"bg-light-primary"}>
                <Outlet/>
            </Content>
        </Layout>
    );
};

export default observer(General);