import React, { useRef, useEffect, useState } from 'react';
import { Avatar, Badge, Col, Image, Row } from 'antd';
import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import rootStore from '../../store/rootStore/instanse.ts';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { userType } from '../../store/UserStore/UserStore.ts';
import {useNavigate} from "react-router-dom";

const Users = () => {
    const navigate = useNavigate()
    const elementRef = useRef<HTMLDivElement>(null);
    const [colWidth, setColWidth] = useState(0);
    const newChatNav = async (user:userType)=>{
        const nav = await rootStore.ChatStore.newChat(user)
        if(nav){
            navigate(`/chats/${nav}`)
        }
        console.log(toJS(nav))

    }

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width } = entry.contentRect;
                setColWidth(width);
            }
        });

        if (elementRef.current) {
            resizeObserver.observe(elementRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <Row
            ref={elementRef}
            className={
                rootStore.themeStore.theme === 'dark'
                    ? 'text-white mt-10 pl-5 pr-5'
                    : 'text-dark-primary mt-10 pl-5 pr-5'
            }
            gutter={[0, 20]}
            justify={'center'}
        >
            {rootStore.ChatStore.Users?.map((user: userType) => {

                return (
                    <Col xs={24} key={user._id} className={'overflow-auto'} span={24}>
                        <Row style={{gap:colWidth < 281?"10px":"0"}}
                            align={'middle'}
                            justify={'center'}
                            className={'border-solid border-2 border-dark-text p-2 rounded-md'}
                        >
                            <Col xs={8} span={8}>
                                    <Badge color={'green'} dot={user.online}>
                                        <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                                            {user.avaimg ? (
                                                <Image src={`https://rshakh.ru:3003/${user.avaimg}`} />
                                            ) : (
                                                <Avatar size={46}>{user?.username ? user?.username[0] : ''}</Avatar>
                                            )}
                                        </div>
                                    </Badge>

                            </Col>
                            <Col xs={colWidth < 281 ? 24 :12} span={8}>
                                <div>{user.username}</div>
                                <div>{user.email}</div>
                            </Col>
                            <Col xs={colWidth < 281 ? 24 : 4} span={8}>
                                <Row style={{ gap: '20px' }} align={'middle'} justify={colWidth < 281?"center":"end"}>
                                    <div>
                                        <UserOutlined className={'text-xl cursor-pointer'} />
                                    </div>
                                    <div>
                                        <MessageOutlined onClick={()=>{
                                            newChatNav(user)
                                        }} className={'text-xl cursor-pointer'} />
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                );
            })}
        </Row>
    );
};

export default observer(Users);
