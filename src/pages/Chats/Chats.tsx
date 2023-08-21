import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Badge, Col, Image, Input, message, Row} from "antd";
import {AudioOutlined, SendOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import './style.css'
import rootStore from "../../store/rootStore/instanse.ts";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router";
import {chatsType} from "../../store/ChatStore/ChatStore.ts";
import Messages from "../../Components/Messages/Messages.tsx";
const Chats = () => {
    const scr=useRef<HTMLDivElement>(null)
    const { id} = useParams();
    useEffect(()=>{
        handleScrollToBottom()
        if (id){
            rootStore.ChatStore.filterChats(id)
        }

    },[id,id!=undefined&&rootStore.MessageStore.Message[id]&&rootStore.MessageStore.Message[id].length])

    const handleScrollToBottom = () => {
        if (scr.current) {
            // Рассчитываем максимальное значение scrollTop
            scr.current.scrollTop = scr.current.scrollHeight - scr.current.clientHeight;
        }
    };
    return (
        <Row className={rootStore.themeStore.theme==="dark"?"bg-dark-primary text-dark-secondary border-dark-secondary":""} justify={"center"}>
           <Col span={24}>
               <Col className={rootStore.themeStore.theme==="dark"?"chat__header__dark text-dark-secondary border-dark-secondary":"chat__header__light"} span={24}>
                   <Badge color={'green'} dot={!!rootStore.ChatStore.currentChat?.users.online}>
                       <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                           {rootStore.ChatStore.currentChat?.users.avaimg ? (
                               <Image src={`https://rshakh.ru:3003/${rootStore.ChatStore.currentChat?.users.username}`} />
                           ) : (
                               <Avatar size={46}>{rootStore.ChatStore.currentChat?.users.username ? rootStore.ChatStore.currentChat?.users.username[0] : ''}</Avatar>
                           )}
                       </div>
                   </Badge>
                   <div>
                       <div>
                           {rootStore.ChatStore.currentChat?.users.username}
                       </div>
                       <div>
                           {rootStore.ChatStore.currentChat?.users.online?"В сети":"Не в сети"}
                       </div>

                   </div>

               </Col>
               <Row>
                   <Col  ref={scr} className="messages__inner" span={24}>
                       <Messages/>
                       <div className={"scroll"}></div>
                   </Col>
               </Row>
           </Col>

                <div className="chats input">
                    <TextArea value={rootStore.ChatStore.currentMessage} onChange={(e)=>{
                        rootStore.ChatStore.handleMessage(e)
                    }} className={rootStore.themeStore.theme==="dark"?"bg-dark-primary text-dark-secondary border-dark-secondary":""} size={"large"} autoSize={true} style={{height:"500px"}}/>
                    <AudioOutlined
                        className={"pointer"}
                        onClick={()=>{
                            message.error("Еще не готова",1)
                        }}
                        style={{
                            fontSize: 20,
                            color: '#1677ff',
                        }}
                    />
                    <SendOutlined
                        onClick={()=>{
                            rootStore.ChatStore.sendMessage()
                        }}
                        style={{
                        fontSize: 20,
                        color: '#1677ff',
                    }} />
                </div>

        </Row>
    );
};

export default observer(Chats);