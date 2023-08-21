import React, {useEffect} from 'react';
import {Col,Row} from "antd";
import rootStore from "../../store/rootStore/instanse.ts";
import {toJS} from "mobx";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router";
import "./style.css"

const Messages = () => {
    const { id} = useParams();
    return (
          <Col className={"p-2"} span={24}>
              {
                  id!=undefined&&
                  rootStore.MessageStore.Message[id]&&
                  rootStore.MessageStore.Message[id].length!=0?<>

                      {
                          rootStore.MessageStore.Message[id].map((el:any)=>{
                              if (rootStore.UserStore.user._id){
                                  return(
                                          <Row  key={el._id} className={"pt-2"} justify={rootStore.UserStore.user._id==el.user?"end":"start"}>
                                              <Col  style={{background:rootStore.UserStore.user._id==el.user?"#7dc441":"#505749"}} flex={"flex"} className="text-white border border-dark-secondary p-2 rounded-lg" span={12}>
                                                  <Row  align={"middle"}>
                                                      <div className={rootStore.UserStore.user._id==el.user?"text-black":""} style={{whiteSpace:"normal"}}>
                                                          {el.message}
                                                      </div>

                                                      <Col className={rootStore.UserStore.user._id==el.user?"messages__date":"messages__date nome"} span={24}>{el.date}</Col>
                                                  </Row>
                                              </Col>
                                          </Row>
                                  )
                              }

                          })
                      }

                  </>:<>Нет сообщения</>
              }
          </Col>
    );
};

export default observer(Messages);