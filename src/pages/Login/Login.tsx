import {Button, Checkbox, Col, Form, Input,Row} from "antd";
import {AntDesignOutlined} from "@ant-design/icons";
import ParticlesBg from "particles-bg";
import "./style.css"
import {observer} from "mobx-react-lite";
import rootStore from "../../store/rootStore/instanse.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import SignIn from "./SignIn.tsx";
const Login = () => {
    const [isSign,setIsSign]=useState(true)
    const navigate=useNavigate()
    useEffect(()=>{

        if (!rootStore.AuthStore.Auth.Auth){
            rootStore.AuthStore.autoRun()
        }else {
            navigate("/")
        }
    },[
        rootStore.AuthStore.Auth.Auth
    ])
    return (
        <>
            <Row justify="start" align="middle">
                {
                  //<ParticlesBg  type="cobweb" bg={true}/>
                }
               <Col xs={24} sm={24} lg={24} md={24} span={24}>
                       <Col className="head__login"  span={24}>
                           <AntDesignOutlined style={{fontSize:"33px"}} /><h1>RSHAKH</h1>
                       </Col>
                   {isSign?<Row justify={"center"}>
                       <Form
                           className="login__form"
                           name="basic"
                           labelCol={{ span: 6}}
                           wrapperCol={{ span: 18 }}
                           style={{ maxWidth: "600px" }}
                           initialValues={{ remember: true }}
                           onFinish={(values)=>{
                               rootStore.AuthStore.Login(values)
                           }}
                           autoComplete="off"
                       >
                           <Form.Item
                               validateStatus={rootStore.AuthStore.Auth.notAuthMessage}
                               help={rootStore.AuthStore.Auth.notAuthMessage&&"Неправильный логин или пароль"}
                               name={['email']} label="Email" rules={[{ type: 'email' ,message:"Некорректный Email "} ,{required:true,message: 'Пожалуйста введите пароль '}]}>
                               <Input />
                           </Form.Item>

                           <Form.Item
                               validateStatus={rootStore.AuthStore.Auth.notAuthMessage}
                               help={rootStore.AuthStore.Auth.notAuthMessage&&"Неправильный логин или пароль"}
                               label="Пароль"
                               name="password"
                               rules={[{ required: true, message: 'Пожалуйста введите пароль ' },{min:8,message:"Минимальная длина паролья 8 символов"}]}
                           >
                               <Input.Password />
                           </Form.Item>

                           <Form.Item name="remember" valuePropName="checked" wrapperCol={{ span: 16 }}>
                               <div className="signin">
                                   <Checkbox>Запомнить меня</Checkbox>
                                   <div style={{color:"rgba(59,77,84,0.65)"}} onClick={()=> {
                                       setIsSign(false)
                                   }} className={"signin__item"}>Регистрация</div>
                               </div>

                           </Form.Item>
                           <Row justify={"center"}>
                               <Form.Item wrapperCol={{  span: 5 }}>
                                   <Button loading={rootStore.AuthStore.Auth.loading} style={{width:"170px",background: "linear-gradient(to right, #FF5F6D, #42EADD)"}} type="primary" htmlType="submit">
                                       Войти
                                   </Button>
                               </Form.Item>
                           </Row>

                       </Form>
                   </Row>:<SignIn setIsSign={setIsSign}/>}


                       </Col>
            </Row>
        </>
    );
};

export default observer(Login);