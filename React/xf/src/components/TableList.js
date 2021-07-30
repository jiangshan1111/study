import React from 'react';
import {Button,Tag,Layout,Table } from 'antd';
import Css from '../assets/css/home/index/index.css';
import {SettingOutlined,DeliveredProcedureOutlined,SyncOutlined,StopOutlined,ReloadOutlined  } from '@ant-design/icons';
const {Content} = Layout;
const rootHeight = document.querySelector('#root').offsetHeight
const rootWidth = document.querySelector('#root').offsetWidth
export default class CardsList extends React.Component {
  constructor(props) {
    super(props)
    let cards = this.props.cards
    cards.forEach((el,index) => {
      el.key = index
    });
    this.state = {
      cards: cards,
      columns:[
        {
          title: '中文名',
          dataIndex: 'server',
          key: 'server',
          width: 200,
          fixed:rootWidth < 1500
        },
        {
          title: '状态',
          align:'center',
          dataIndex: 'server_status',
          key: 'server_status',
          width: 120,
          fixed:rootWidth < 1500,
          render: (val, row) => {
            if(row.server_status.indexOf('已停止') > -1){
              return <Tag color="red" className={Css['button']}>已停止</Tag>
            } else {
              return <Tag color="blue" className={Css['button']}>运行中</Tag>
            }
          }
        },
        {
          title: '英文名',
          dataIndex: 'server_name',
          key: 'server_name',
          width: 200,
          align:'center'
        },
        {
          title: '包版本',
          dataIndex: 'address',
          key: 'address',
          width: 100,
          align:'center',
          render: (val,row) => {
            return (<Tag color="geekblue" style={{cursor:'pointer'}} onClick={()=>{this.props.viewBowerNo(row,row.ip_port)}}>包版本</Tag>)
          }
        },
        {
          title: 'IP地址',
          dataIndex: 'ip',
          key: 'ip',
          align:'center',
          width: 150,
        },
        {
          title: '端口',
          dataIndex: 'port',
          key: 'port',
          align:'center',
          width: 200,
        },
        {
          title: '操作',
          dataIndex: 'operate',
          key: 'operate',
          width: 500,
          align:'center',
          render: (text,row) => this.renderOp(row.server_status,row,row.key,row.ip_port),
        },
      ]
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
  renderOp (status, el, index, url) {
    let aContent = ''
    if (el.server_status.indexOf('已停止') > -1) {
      if(el.server_name !== 'Redis'){
        aContent =  (
          <React.Fragment>
            <Button size="small" className={Css['operate-button']} onClick={this.bowerModalShow.bind(this,el,url)}><DeliveredProcedureOutlined /> 换包</Button>
            <Button size="small" className={Css['operate-button']} onClick={this.operate.bind(this,'start',el,index,url)}><SyncOutlined /> 启动</Button>
          </React.Fragment>
        )
      } else {
        aContent = 
          <React.Fragment>
            <Button size="small" className={Css['operate-button']} onClick={this.operate.bind(this,'start',el,index,url)}><SyncOutlined /> 启动</Button>
          </React.Fragment>
        
      }
    } else {
      if(el.server_name !== 'Redis'){
        aContent =   (
          <React.Fragment>
            <Button size="small" className={Css['operate-button']} onClick={this.operate.bind(this,'stop', el, index,url)}><StopOutlined /> 停止</Button>
            <Button size="small" className={Css['operate-button']} onClick={this.operate.bind(this,'restart',el,index,url)}><ReloadOutlined /> 重启</Button>
          </React.Fragment>
        )
      } else {
        aContent =   (
          <React.Fragment>
            <Button size="small" className={Css['operate-button']} onClick={this.operate.bind(this,'stop', el, index,url)} ><StopOutlined /> 停止</Button>
            <Button size="small" className={Css['operate-button']} onClick={this.redisModalShow.bind(this,url)}><SettingOutlined /> 缓存操作</Button>
          </React.Fragment>
        )
      }
    }
    return (
      <div>
        {aContent}
        <Button size="small" onClick={() => { this.props.settingCommon( el.server_name, index, el.ip_port) }} className={Css['operate-button']}>常用配置修改</Button>
        <Button size="small" className={Css['operate-button']} onClick={()=>{this.props.visibleInfo(el.server_name,el.ip_port)}}>日志</Button>
        <Button size="small" className={Css['operate-button']} onClick={() => { this.props.updateYml( el.server_name, el.ip_port) }}>yml</Button>
      </div>
    )
  }
  render () {
    let TableStyle = {}
    let scrollObj = {}
    if (rootWidth > 1500) {
      TableStyle = { marginTop: '64px',width:'1500px',background:'white' }
    } else {
      scrollObj = {x:1470}
      TableStyle = { marginTop: '64px',width:rootWidth+'px',background:'white' }
    }
    let tableHeight = this.state.cards.length * 56 + 53
    if (tableHeight > rootHeight - 190) {
      scrollObj = Object.assign(scrollObj,{y: rootHeight- 190})
    }
    return (
      <Content style={{display:'flex',justifyContent:'center',background:'white'}}>
        <Table style={TableStyle}
          columns={this.state.columns}
          bordered
          scroll={scrollObj}
          pagination={false}
          dataSource={this.state.cards}/>
      </Content>
    )
  }
}