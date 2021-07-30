import React from 'react';
import {Card, Button,Spin,Tag,Layout } from 'antd';
import Css from '../assets/css/home/index/index.css';
import {SettingOutlined,DeliveredProcedureOutlined,SyncOutlined,StopOutlined,ReloadOutlined  } from '@ant-design/icons';
const { Meta } = Card;
const {Content} = Layout;
const rootWidth = document.querySelector('#root').offsetWidth - 100
export default class CardsList extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  //根据状态返回tag样式
  renderTag (status) {
    if(status.indexOf('已停止') > -1){
      return <Tag color="red" style={{float:'right'}} className={Css['button']}>已停止</Tag>
    } else {
      return <Tag color="blue" style={{float:'right'}} className={Css['button']}>运行中</Tag>
    }
  }
  operate (type, el, index, apiUrl) {
    this.props.operate(type, el, index, apiUrl)
  }
  bowerModalShow (el,url) {
    this.props.bowerModalShow(el,url)
  }
  redisModalShow (url) {
    this.props.redisModalShow(url)
  }
  //根据状态判断是 启动换包 还是 重启停止
  renderSpan (status, el, index, url) {
    if (status.indexOf('已停止') > -1) {
      if(el.server_name !== 'Redis'){
        return (
          <span>
            <Tag color="red" onClick={this.bowerModalShow.bind(this,el,url)} style={{float:'right',cursor:'pointer'}} className={Css['button']}><DeliveredProcedureOutlined /> 换包</Tag>
            <Tag color="red" onClick={this.operate.bind(this,'start',el,index,url)} style={{float:'right',cursor:'pointer'}} className={Css['button']}><SyncOutlined /> 启动</Tag>
          </span>
        )
      } else {
        return (
          <span>
            <Tag color="red" onClick={this.operate.bind(this,'start',el,index,url)} style={{float:'right',cursor:'pointer'}} className={Css['button']}><SyncOutlined /> 启动</Tag>
          </span>
        )
      }
    } else {
      if(el.server_name !== 'Redis'){
        return (
          <span>
            <Tag color="blue" onClick={this.operate.bind(this,'stop', el, index,url)} style={{ float: 'right', cursor: 'pointer' }} className={Css['button']}><StopOutlined /> 停止</Tag>
            <Tag color="blue" onClick={this.operate.bind(this,'restart',el,index,url)} style={{float:'right',cursor:'pointer'}} className={Css['button']}><ReloadOutlined /> 重启</Tag>
          </span>
        )
      } else {
        return (
          <span>
            <Tag color="blue" onClick={this.operate.bind(this,'stop', el, index,url)} style={{ float: 'right', cursor: 'pointer' }} className={Css['button']}><StopOutlined /> 停止</Tag>
            <Tag color="blue" onClick={this.redisModalShow.bind(this,url)} style={{float:'right',cursor:'pointer'}} className={Css['button']}><SettingOutlined /> 缓存操作</Tag>
          </span>
        )
      }
    }
  }
  render () {
    let str = []
    this.props.cards.forEach((el, index) => {
      str.push(
        <Spin  key={index} spinning={el.loading}  tip="Loading..." delay={500}>
          <Card
            bodyStyle={
              el.server_status.indexOf('已停止') > -1 ? {
                width: 400,
                'background':'#ec7f77'
              } : {
                width: 400,
                'background':'#2daeeb'
              }
            }
            style={{
              'marginBottom':'20px'
            }}
            hoverable
            actions={[
              <Button type="default" size="default" onClick={this.props.settingCommon.bind(this,el.server_name,index,el.ip_port)}>常用配置修改</Button>,
              <Button type="default" size="default" onClick={this.props.visibleInfo.bind(this,el.server_name,el.ip_port)}>日志</Button>,
              <Button type="default" size="default" onClick={this.props.updateYml.bind(this,el.server_name,el.ip_port)}>yml</Button>]}
          >
            <Meta style={{
              color:"white"
            }} title={
              <div>
                <p className={Css['white-p']}>
                  {el.server}
                  { 
                    this.renderTag(el.server_status)
                  }
                </p>
              </div>
            } description={
              <div>
                <p className={Css['white-p']} style={{
                  'fontSize': '25px'
                }} onClick={this.props.viewBowerNo.bind(this,el,el.ip_port)}>
                  {el.server_name}
                </p>
                <p className={Css['white-p']}>
                  {el.ip}:{el.port}{this.renderSpan(el.server_status,el,index)}
                </p>
              </div>
            }/>
          </Card>
        </Spin>
      )
    })
    //占位填充 满足每行五个块 缺少的用空白补上
    let conLength = this.props.cards.length % (parseInt(rootWidth / 400))
    for (var i = 0; i < (parseInt(rootWidth / 400)) - conLength; i++){
      str.push(
        <div key={i + this.props.cards.length} style={{ width: 400,'marginBottom':'20px'}}></div>
      )
    }
    return (<Content className={Css['content']}>{str}</Content>)
  }
}