import React from 'react';
import {Avatar, Button, Card, Col, Form, Image, Input, message, Row, Upload} from "antd";
import {LoadingOutlined, PlusOutlined, UserOutlined} from "@ant-design/icons";
import rootStore from "../store/rootStore/instanse.ts";
import {observer} from "mobx-react-lite";
const UserStore=rootStore.UserStore
const theme=rootStore.themeStore


const UserProfile = () => {
    const uploadButton = (
        <div>
             <PlusOutlined />
            <div style={{ marginTop: 8 }}>Загрузить</div>
        </div>
    );

    return (
            <Row justify="center">
                <Col style={{ marginTop: "50px",marginBottom:"50px" }}>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        onChange={(e)=>{
                            UserStore.updateUserAvatar(e.fileList[0].originFileObj)
                        }}
                        accept="image/*"
                    >
                        {UserStore.user.avaimg ? (
                            <img src={`https://rshakh.ru:3003/${UserStore.user.avaimg}`} alt="avatar" style={{ width: '100%' }} />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </Col>

                <Col xs={24} span={24}>
                    <Form  autoComplete={"off"}>
                        <Row  justify="center">
                            <Col span={20}>
                                <Form.Item label={<label className={theme.theme==="dark"?"text-dark-secondary":"text-black"}>Email</label>}>
                                    <Input className={theme.theme==="dark"?"bg-dark-primary text-dark-secondary border-dark-secondary":""} value={UserStore.user.email?UserStore.user.email:"11"} />
                                </Form.Item>
                            </Col>
                            <Col span={20}>
                                <Form.Item label={<label className={theme.theme==="dark"?"text-dark-secondary":""}>userName</label>}>
                                    <Input className={theme.theme==="dark"?"bg-dark-primary text-dark-secondary border-dark-secondary":""} value={UserStore.user.username ? UserStore.user.username : ""} />
                                </Form.Item>
                            </Col>
                            <Col span={20}>
                                <Form.Item label={<label className={theme.theme==="dark"?"text-dark-secondary":""}>Пароль</label>} name="password" rules={[{ type: "string", min: 8, message: "Пароль менее 8 символов" }]}>
                                    <Input.Password className={theme.theme==="dark"?"password bg-dark-primary text-dark-secondary border-dark-secondary":""} />
                                </Form.Item>
                            </Col>
                            <Col span={20}>
                                <Form.Item label={<label className={theme.theme==="dark"?"text-dark-secondary":""}>id</label>}>
                                    <Input className={theme.theme==="dark"?"bg-dark-primary text-dark-secondary border-dark-secondary":""} value={UserStore.user._id ? UserStore.user._id : "123456789"} />
                                </Form.Item>
                            </Col>
                            <Col span={20}>
                                <Row style={{gap:"20px"}} justify="center">
                                    <Button className={theme.theme==="dark"?"bg-dark-primary text-dark-secondary border-dark-secondary":"text-black"}  type="primary" htmlType="submit">
                                        Изменить
                                    </Button>
                                    <Button className={theme.theme==="dark"?"bg-dark-primary text-danger-primary border-dark-secondary":"text-danger-primary"} type="primary">
                                        Выход
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>

    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default observer(UserProfile);
