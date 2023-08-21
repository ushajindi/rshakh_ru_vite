import React from 'react';
import {Button, Checkbox, Col, Form, Input, Row} from "antd";
import rootStore from "../../store/rootStore/instanse.ts";
import {observer} from "mobx-react-lite";
type propsType={
    setIsSign:(a:boolean)=>void
}
const SignIn = (props:propsType) => {
    return (
                <Col span={24}>
                    <Row justify={"center"}>
                        <Form
                            className="login__form"
                            name="basic"
                            labelCol={{ span: 10}}
                            wrapperCol={{ span: 20 }}
                            style={{ maxWidth: "600px" }}
                            onFinish={(values)=>{
                                rootStore.AuthStore.addSign(values)
                            }}
                            autoComplete="off"
                        >
                            <Form.Item
                                validateStatus={rootStore.AuthStore.Sign.isEmailError?"error":""}
                                help={rootStore.AuthStore.Sign.isEmailError&&"по данному Email зарегистрован другой пользователь "}
                                name={['email']} label="Email" rules={[{ type: 'email' ,message:"Некорректный Email "} ,{required:true,message: 'Пожалуйста введите Email '}]}>
                                <Input onBlur={(event)=>rootStore.AuthStore.findEmail(event)}  />
                            </Form.Item>
                            <Form.Item
                                name={['username']} label="User Name" rules={[{message:"Некорректный Email "} ,{required:true,message: 'Пожалуйста введите имя'}]}>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Пароль"
                                name="password"
                                rules={[{ required: true, message: 'Пожалуйста введите пароль ' },{min:8,message:"Минимальная длина паролья 8 символов"}]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ span: 16 }}>
                                <div className="signin">
                                    <div style={{color:"rgba(59,77,84,0.65)"}} onClick={()=> {
                                        props.setIsSign(true)
                                    }} className={"signin__item"}>Войти, имею аккаунт</div>
                                </div>

                            </Form.Item>
                            <Row justify={"center"}>
                                <Form.Item wrapperCol={{  span: 5 }}>
                                    <Button disabled={rootStore.AuthStore.Sign.isEmailError} loading={rootStore.AuthStore.Auth.loading} style={{width:"170px",background: "linear-gradient(to right, #FF5F6D, #42EADD)"}} type="primary" htmlType="submit">
                                        Зарегистрироваться
                                    </Button>
                                </Form.Item>
                            </Row>

                        </Form>
                    </Row>
            </Col>
    );
};

export default observer(SignIn);