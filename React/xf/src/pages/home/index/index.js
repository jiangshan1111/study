import React from 'react';
import {connect} from 'react-redux';
import Css from '../../../assets/css/home/index/index.css';
import {setScrollTop} from '../../../assets/js/utils';
import { Select,Switch ,Upload,Layout, Button, message,Spin,Modal,Form, Input  } from 'antd';
import { UploadOutlined ,LogoutOutlined,SettingOutlined,SyncOutlined,LoadingOutlined  } from '@ant-design/icons';
import config from '../../../assets/js/conf/config'
import { outLogin } from '../../../store/actions/user'
import {setShowType } from '../../../store/actions/home'
import { requestString } from '../../../assets/js/utils/request'
import {LoadingButton,CardList,TableList } from '../../../components/index';
const { Option } = Select
const { TextArea } = Input;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Header, Content, Footer } = Layout;
class Index extends React.Component {
    constructor(props){
      super(props);
        this.state = {
          master: '1',//主从关系 主1从0
          cardsSource: 1,//页面展示来源 1本机ip方式 2别机ip方式 3微服务方式
          url:'',//接口调用地址
          cards: [],
          JQipList:[],//主服务集群ip列表
          JQipSelected:null,//主服务集群ip选中值
          JQServerList:[],//主服务集群微服务列表
          JQServerSelected: null,//主服务集群微服务选中值
          showType:this.props.home.showType,//展示方式 tableList/cardList
          //集群微服务eureka
          modifyEureka: {
            visible: false,//一键设置IP弹框是否可见
            confirmLoading: false,//一键设置IP弹框loading
            ip:'',
            port:'',
          },
          //ip
          ipSetting: {
            visibleIp: false,//一键设置IP弹框是否可见
            confirmLoadingIp: false,//一键设置IP弹框loading
            ip:''
          },
          //redis操作
          redis: {
            visible: false,//redis操作弹框是否可见
            confirmLoading: false,//redis操作弹框loading
            command:'flushdb'
          },
          //包版本
          bowerNo: {
            server_name:"",
            visible: false,//bowerNo弹框是否可见
            confirmLoading: true,//bowerNo弹框ajax加载loading
            runV: '123',//当前运行版本
            hisVSelect:'',//历史版本选中值
            hisVList: [123, 124, 125],//历史版本列表
          },
          //包
          bower: {
            server_name:"",
            visibleBower: false,//换包弹框是否可见
            confirmLoadingBower: false,//换包弹框loading
            fileList:[]//文件列表
          },
          //日志
          info: {
            server_name:"",
            visible: false,//日志弹框是否可见
            confirmLoading: false,//日志弹框loading
            condList: [
              '200','500','1000','全部','10min','1h','今天'
            ],//筛选条件列表
            cond: '200',//筛选条件
            info:''
          },
          
          //修改yml
          updateYml: {
            server_name:"",
            visible: false,//修改yml弹框是否可见
            confirmLoading: false,//修改yml弹框loading
            ymlContent: '',//yml内容
            ymlSaveLoading:false 
          },
          //常用配置修改
          settingCommon: {
            server_name:"",
            server_index:"",//服务所在卡片的index
            visible: false,//bowerNo弹框是否可见
            confirmLoading: true,//bowerNo弹框ajax加载loading
            basicLoading:false,//微服务配置保存loading
            dbLoading:false,//数据库配置保存loading
            dbinstance:'',//数据库
            dbip:'',//数据库ip
            dbport:'',//数据库端口
            dbpwd:'',//数据库密码
            dbun:'',//数据库名
            ip:'',//ip
            port:'',//端口
          },
          loading:false
        };
        this.fnScrollTop=null;
    }
    componentWillMount () {
      this.getMasterInfo()
      this.getIp()
    }
    componentDidMount() {
        setScrollTop(window.base.pages.index.scrollTop);
        this.fnScrollTop=this.eventScroll.bind(this);
        window.addEventListener("scroll", this.fnScrollTop);
    }
    eventScroll(){
        window.base.pages.index.scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
    }
    apiUrl () {
      let apiUrl = ''
      switch (this.state.cardsSource) {
        case 1:
          apiUrl = config.baseUrl
          break;
        case 2:
          apiUrl = this.state.url
          break;
        case 3:
          apiUrl = 'http://'+this.state.url
          break;
        default:
          apiUrl = config.baseUrl
          break;
      }
      return apiUrl
    }
    //微服务列表切换（主服务）
    switchServer (value) {
      this.setState({
        JQServerSelected: value
      }, () => {
        this.cardsFromServer()
      })
    }
    //根据微服务名称获取cards列表
    cardsFromServer () {
      this.setState(
        {
          loading:true
        }
      )
      requestString(config.baseUrl + '/serverConfig/getServerListByName', 'post',
        this.state.JQServerSelected
      ).then((res) => {
        res.asList.forEach((el, index) => {
          el.loading = false
        })
        this.setState(
          {
            cards: res.asList,
            loading: false,
            cardsSource:3
          }
        )
        message.success('切换成功')
      }).catch(() => {
        message.error('切换失败')
        this.setState(
          {
            loading: false
          }
        )
      })
    }
    //ip列表切换（主服务）
    switchIp (value) {
      if (value === '本机') {
        if (this.state.cardsSource === 1) {
          return
        }
        this.setState({
          JQipSelected: value,
          url:value,
          cardsSource:1,
          loading:true
        }, () => {
          this.getIp()
          this.loadServiceConfigFile()
        })
      } else {
        this.setState({
          JQipSelected: value,
          url:value,
          cardsSource:2,
          loading:true
        }, () => {
          this.getIp()
          this.loadServiceConfigFile()
        })
      }
    }
    //集群微服务eureka配置
    setModifyEureka () {
      this.setState({ modifyEureka: Object.assign({}, this.state.modifyEureka, { confirmLoading: true }) })
      const { ip, port } = this.state.modifyEureka
      const arr = this.state.JQipList.concat([])
      arr.splice(0, 1, config.baseUrl)
      arr.forEach((el) => {
        requestString(el + '/serverConfig/modifyEurekaConfig', 'post',
          JSON.stringify({
            ip,port
          })
        )
      })
      message.success('修改成功')
      this.setState({ modifyEureka: Object.assign({}, this.state.modifyEureka, { confirmLoading: false }) })
    }
    //确定主从部署服务
    getMasterInfo () {
        
      this.setState({
        loading:true
      })
      requestString(config.baseUrl + '/serverConfig/masterOrSlave', 'post', '').then((res) => {
        if (res) {
          const {id,ip,port,master} = res
          this.setState({
            master: master
          })
          if (master === '0') {
            //如果是从服务 注册
            this.registerSlave(id,ip,port)
          } else {
            this.getSlaveUrlList()
          }
        }
      })
    }
    //主服务获取集群ip列表
    getSlaveUrlList () {
      requestString(config.baseUrl + '/serverConfig/getSlaveUrlList',
        'post',
        '').then((res) => {
            if (res) {
              res.unshift('本机')
              this.setState({
                JQipList:res
              })
            }
        }).then(() => {
          this.getServerList()
        })
    }
    //主服务获取集群微服务列表
    getServerList () {
      requestString(config.baseUrl + '/serverConfig/getServerList',
        'post',
        '').then((res) => {
            if (res) {
              this.setState({
                JQServerList:res
              })
            }
        }).then(() => {
          this.loadServiceConfigFile()
        })
    }
    //注册从服务
    registerSlave (id,ip,port) {
      requestString(config.baseUrl + '/serverConfig/registerSlave',
        'post',
        JSON.stringify({
          id,ip,port
        })).then(() => {
          message.success('从服务注册成功')
          this.loadServiceConfigFile()
        })
    }
    //如果是通过服务包来获取卡片的方式，需要将state.url置为每个卡片点击时的ip
    updateUrl (url) {
      if (this.state.cardsSource === 3) {
        this.setState({
          url:url
        })
      }
    }
    //弹出修改yml弹框
    updateYml (server_name, url) {
      this.updateUrl(url)
      this.setState({ updateYml: Object.assign({}, this.state.updateYml, { visible: true,confirmLoading:true, server_name: server_name,ymlContent:"" }) }, () => {
        this.searchYml()
      })
    }
    //yml内容获取
    searchYml () {
      requestString(this.apiUrl() + '/serverConfig/viewYml', 'post', this.state.updateYml.server_name).then((res) => {
        this.setState({ updateYml: Object.assign({}, this.state.updateYml, { confirmLoading: false }) })
        if (res) {
          this.setState({
            updateYml: Object.assign(
              {},
              this.state.updateYml,
              {
                ymlContent:res
              }
            )
          })
        }
      })
    }
    //yml内容保存
    saveYml () {
      const { server_name, ymlContent } = this.state.updateYml
      this.setState({ updateYml: Object.assign({}, this.state.updateYml, { ymlSaveLoading: true }) })
      requestString(this.apiUrl() + '/serverConfig/updateYml', 'post', JSON.stringify({
        servName: server_name,
        ymlContent
      })).then((res) => {
        if (res) {
          message.success('保存成功')
          this.setState({ updateYml: Object.assign({}, this.state.updateYml, { ymlSaveLoading: false }) })
        }
      })
    }
    //查看日志
    viewInfo () {
      this.setState({ info: Object.assign({}, this.state.info, { confirmLoading: true }) })
      const { cond, server_name } = this.state.info
      let url = ''
      let query = {}
      switch (cond) {
        case '200':
        case '500':
        case '1000':
          url = '/serverConfig/checkLog'
          query = {
            logCount: cond,
            servName:server_name
          }
          break;
        case '10min':
        case '1h':
        case '今天':
          url = '/serverConfig/checkLogByTime'
          query = {
            time: cond,
            servName:server_name
          }
          break;
        case '全部':
          url = '/serverConfig/checkAllLog'
          query = {
            servName:server_name
          }
          break;
        default:
          break;
      }
      requestString(this.apiUrl() + url, 'post', JSON.stringify(query)).then((res) => {
        this.setState({ info: Object.assign({}, this.state.info, { confirmLoading: false }) })
        if (res) {
          this.setState({
            info: Object.assign(
              {},
              this.state.info,
              {
                info:res
              }
            )
          })
        }
      })
    }
    //查看日志弹框弹出
    visibleInfo (server_name, url) {
      this.updateUrl(url)
      this.setState({ info: Object.assign({}, this.state.info, { visible: true, server_name: server_name,cond:'200',info:"" }) }, () => {
        this.viewInfo()
      })
    }
    //加解密
    encAndDec (pwd,flag) {
      requestString(this.apiUrl() + '/serverConfig/encAndDec', 'post', JSON.stringify({
        flag,
        pwd
      })).then((res) => {
        if (res) {
          this.setState({
            settingCommon: Object.assign(
              {},
              this.state.settingCommon,
              {
                dbpwd:res
              }
            )
          })
        }
      })
    }
    //数据库配置保存
    dbSave () {
      const {server_name,dbinstance,dbip,dbpwd,dbun,dbport} =  this.state.settingCommon
      this.setState({ settingCommon: Object.assign({}, this.state.settingCommon, { dbLoading: true }) })
      requestString(this.apiUrl() + '/serverConfig/updateDBInfo', 'post', JSON.stringify([{
        dbServerName: server_name,
        dbOrcl:dbinstance,
        dbIp:dbip,
        dbPwd:dbpwd,
        dbUser:dbun,
        dbPort:dbport
      }])).then((res) => {
        if (res) {
          if (res === '更新成功!') {
            message.success('保存成功')
          } else {
            message.error('保存失败')
          }
        }
        this.setState({ settingCommon: Object.assign({}, this.state.settingCommon, { dbLoading: false }) })
      }).catch((error) => {
        this.setState({ settingCommon: Object.assign({}, this.state.settingCommon, { dbLoading: false }) })
      })
    }
    //微服务配置保存
    basicSave () {
      this.setState({ settingCommon: Object.assign({}, this.state.settingCommon, { basicLoading: true}) })
      const {server_name,ip,port,server_index} =  this.state.settingCommon
      requestString(this.apiUrl() + '/serverConfig/updateServerInfo', 'post', JSON.stringify([{
        server_name,ip,port
      }])).then(() => {
        message.success('保存成功')
        let arr = this.state.cards
        arr[server_index].port = port
        arr[server_index].ip = ip
        this.setState({
          settingCommon: Object.assign({}, this.state.settingCommon, { basicLoading: false }),
          cards:arr
        })
      }).catch((error) => {
        console.log(error)
      })
    }
    //下载包
    downloadBower () {
      window.open(this.apiUrl()+"/serverConfig/download?server=" + this.state.bowerNo.server_name + "&fn=" + this.state.bowerNo.hisVSelect)
    }
    //获取包版本信息
    viewBowerNo (el,url) {
      if (el.server_name !== 'Redis') {
        this.updateUrl(url)
        this.setState({bowerNo:Object.assign({},this.state.bowerNo,{ visible: true,server_name:el.server_name })})
        requestString(this.apiUrl()+'/serverConfig/viewJars', 'post', el.server_name).then((res) => {
          if (res) {
            this.setState({
              bowerNo: Object.assign(
                {},
                this.state.bowerNo,
                {
                  hisVList: res.hisV.split(','),
                  runV: res.runV,
                  confirmLoading: false,
                  hisVSelect:res.hisV.split(',')[0]
                }
              )
            })
          }
        })
      }
    }
    //常用配置修改
    settingCommon (server_name,index, url) {
      this.updateUrl(url)
      this.setState({ settingCommon: Object.assign({}, this.state.settingCommon, { visible: true,server_name:server_name,server_index:index}) })
      requestString(this.apiUrl()+'/serverConfig/getServerConfig', 'post', server_name).then((res) => {
        if (res) {
          this.setState({
            settingCommon: Object.assign({},this.state.settingCommon,res,{confirmLoading: false})
          })
        }
      })
    }
    //获取ip
    getIp () {
      requestString(this.apiUrl()+'/serverConfig/getLocalIpinfo', 'post', JSON.stringify({})).then((res) => {
        if (res) {
          this.setState({
            ipSetting: {
              ip:res
            }
          })
        }
      })
    }
    replacePage(pUrl){
      this.props.history.replace(config.path+pUrl);
    }
    //判断权限
    isAdmin () {
      //加载状态情况下return
      if (this.state.loading) {
        return true
      }
      if (this.props.user.auth === 'common') {
        message.error('用户无权限！',2)
        return true
      }
    }
    //让卡片显示和结束loading状态
    loadingCard (index, type, status) {
      let arr = this.state.cards
      if (type === 'start') {
        arr[index].loading = true
        this.setState({ cards: arr })
      }else if (type === 'end') {
        arr[index].loading = false
        if (status) {
          arr[index].server_status = status
        }
        this.setState({ cards: arr })
      }
    }
    //一键设置ip
    setIpAll () {
      this.setState({ ipSetting: Object.assign({}, this.state.ipSetting, { confirmLoadingIp: true }) })
      let arr = this.state.cards
      arr.forEach((el) => {
        el.ip = this.state.ipSetting.ip
      })
      requestString(this.apiUrl()+'/serverConfig/updateServerInfo', 'post', JSON.stringify(arr)).then((res) => {
        if (res === "fail") {
          message.error('一键设置ip失败', 2)
          this.setState({
            ipSetting:Object.assign({},this.state.ipSetting,{confirmLoadingIp: false})
          })
        } else {
          message.success('设置成功', 2)
          this.setState({
            cards: arr,
            ipSetting:Object.assign({},this.state.ipSetting,{confirmLoadingIp: false,visibleIp:false})
          })
        }
      })
    }
    //一键启动
    startAll () {
      if (this.isAdmin()) {
        return
      }
      let cards = this.state.cards
      cards.forEach((el,index) => {
        if (el.server_status.indexOf('已停止') > -1) {
          el.loading = true
        }
      })
      this.setState({
        cards:cards
      })
      let cardIndex = 0
      var timer = setInterval(() => {
        if (cardIndex === cards.length) {
          clearInterval(timer)
        } else {
          this.operate ('start', cards[cardIndex], cardIndex)
          cardIndex++
        }
      }, 3000);
    }
    //redis缓存操作
    redisOperate () {
      requestString(this.apiUrl() + '/serverConfig/flushdb', 'post', JSON.stringify({
        command: this.state.redis.command,
      })).then((res) => {
        if (res) {
          message.success(res)
        }
      })
    }
    //启动、重启、停止
    operate (type, el, index, apiUrl) {
      if (this.isAdmin()) {
        return
      }
      this.updateUrl(apiUrl)
      let url = '' //接口
      let msg = ''//提示
      let status = ''//状态
      switch (type) {
        case 'start':
          url = el.server_name !== 'Redis' ? (this.apiUrl() + '/serverConfig/startService'):(this.apiUrl() + '/serverConfig/startRedis')
          msg = '服务启动失败！'
          status = '运行中'
          break;
        case 'restart':
          url = this.apiUrl()+'/serverConfig/restartService'
          msg = '服务重启失败！'
          status = '运行中'
          break;
        case 'stop':
          url = el.server_name !== 'Redis' ? (this.apiUrl()+'/serverConfig/stopService'):(this.apiUrl()+'/serverConfig/stopRedis')
          msg = '服务停止失败！'
          status = '已停止'
          break;
        default:
          break;
      }
      //先显示加载中，再调接口
      this.loadingCard(index,'start')
      requestString(url, 'post', JSON.stringify({
        ip: el.ip,
        port: el.port,
        servName: el.server_name
      })).then((res) => {
        if (res === "fail") {
          message.error(msg,2)
          this.loadingCard(index,'end')
        } else {
          this.loadingCard(index,'end',status)
        }
      })
    }
    //退出
    Logout () {
      if (this.state.loading) {
        return
      }
      this.props.outLogin()
      this.replacePage('login')
    }
    //获取配置文件信息
    loadServiceConfigFile () {
      requestString(this.apiUrl()+'/serverConfig/getServiceCfgFile', 'post', JSON.stringify({})).then((res) => {
        if (res == null) {
          message.error('找不到配置文件service.cfg！并且部署包未在正确目录下！',2)
        } else {
          this.getCardData(res)
        }
      })
    }
    //获取卡片数据组
    getCardData (data) {
      requestString(this.apiUrl()+'/serverConfig/getServiceConfig', 'post', JSON.stringify(data)).then((res) => {
        data.forEach((el, index) => {
          el = Object.assign(el,res.asList[index],{loading:false})
        })
        this.setState({
          cards:data,
          loading:false
        })
      })
    }
    //换包弹框弹出
    bowerModalShow (el, url) {
      this.updateUrl(url)
      this.setState({bower:Object.assign({},this.state.bower,{ visibleBower: true,server_name:el.server_name })})
    }
    //redis弹框弹出
    redisModalShow (url) {
      this.updateUrl(url)
      this.setState({redis:Object.assign({},this.state.redis,{ visible: true })})
    }
    componentWillUnmount() {
        window.removeEventListener("scroll",this.fnScrollTop)
    }

    render () {
        const uploadButton = (
          <Button><UploadOutlined />上传文件</Button>
        );
        //历史版本列表options
        const hisVOptions = [];
        this.state.bowerNo.hisVList.forEach((el,index) => {
          hisVOptions.push(
            <Option value={el} key={index}>{el}</Option>
          )
        })
        //历史版本列表options
        const condOptions = [];
        this.state.info.condList.forEach((el,index) => {
          condOptions.push(
            <Option value={el} key={index}>{el}</Option>
          )
        })
        //主服务集群ip列表options
        const JQipListOptions = [];
        this.state.JQipList.forEach((el,index) => {
          JQipListOptions.push(
            <Option value={el} key={index}>{el}</Option>
          )
        })
        //主服务集群微服务列表options
        const JQServerListOptions = [];
        this.state.JQServerList.forEach((el,index) => {
          JQServerListOptions.push(
            <Option value={el} key={index}>{el}</Option>
          )
        })
        const newProps = {
          bowerModalShow:this.bowerModalShow.bind(this),
          operate:this.operate.bind(this),
          redisModalShow:this.redisModalShow.bind(this),
          settingCommon:this.settingCommon.bind(this),
          visibleInfo:this.visibleInfo.bind(this),
          updateYml:this.updateYml.bind(this),
          viewBowerNo:this.viewBowerNo.bind(this),
          cards: this.state.cards,
        }
        return (
            <div className={Css['page']}>
              <Layout className="layout">
                <Header className={Css['header']}>
                  <Switch checkedChildren="列表" unCheckedChildren="卡片" defaultChecked = {this.state.showType === 'tableList'} style={{ marginRight: "20px" }} onClick={(checked) => {
                    if (this.state.loading) {
                      return
                    }
                    this.setState({
                      showType:(checked?'tableList':'cardList')
                    }, () => {
                      this.props.setShowType(checked?'tableList':'cardList')
                    })
                  } }/>
                  <p  className={Css['header-p']}>
                    实施部署工具/{this.props.user.auth === 'admin'?'管理员':'普通用户'}/{this.props.user.username}{this.state.master === '0'?'/从服务':'/主服务'}
                  </p>
                  {/* 从服务不显示集群设置相关内容,主服务微服务展示卡片方式不显示集群设置相关内容 */}
                  {
                    this.state.master === '0'?
                      null:
                      <React.Fragment>
                        <Select
                          style={{ float: 'right',width:"200px", marginRight: '10px'}}
                          placeholder="微服务列表"
                          disabled = {this.state.loading}
                          onSelect={(value) => {
                            this.switchServer(value)
                          }}>
                          {JQServerListOptions}
                        </Select>
                        <Select
                          disabled = {this.state.loading}
                          style={{ float: 'right',width:"200px", marginRight: '10px'}}
                          placeholder="ip列表"
                          onSelect={(value) => {
                            this.switchIp(value)
                          }}>
                          {JQipListOptions}
                        </Select>
                        <Button type="primary" onClick={() => {
                          if (this.isAdmin()) {
                            return
                          }
                          this.setState({modifyEureka:Object.assign({},this.state.modifyEureka,{ visible: true })})
                        }} style={{ float: 'right', background: '#2daeeb', marginRight: '10px', borderColor: '#2daeeb' }}>
                          <SettingOutlined />集群Eureka设置
                        </Button>
                      </React.Fragment>
                  }
                  {
                    this.state.cardsSource === 3 ?
                      null :
                      <React.Fragment>
                        <Button onClick={this.startAll.bind(this)} type="primary" style={{float:'right',background:'#2daeeb',marginRight:'10px',borderColor:'#2daeeb'}}>
                          <SyncOutlined />一键启动
                        </Button>
                        <Button type="primary" onClick={() => {
                          if (this.isAdmin()) {
                            return
                          }
                          this.setState({ipSetting:Object.assign({},this.state.ipSetting,{ visibleIp: true })})
                        }} style={{ float: 'right', background: '#2daeeb', marginRight: '10px', borderColor: '#2daeeb' }}>
                          <SettingOutlined />一键设置ip
                        </Button>
                      </React.Fragment>
                  }
                  <Button type="danger" style={{float:'right'}} onClick={this.Logout.bind(this)}>
                    <LogoutOutlined color="red" />退出
                  </Button>
                </Header>
                
              {this.state.loading ?
                <Content className={Css['content1']}>
                  <Spin indicator={antIcon} style={{ textAlign: 'center' }} />
                </Content>
                :
                // this.renderCard()
                  
                    (this.state.showType === 'cardList' ?
                      <CardList {...newProps} /> :
                      <TableList {...newProps} />)
                  
                }
                <Footer className={Css['footer']} style={{ textAlign: 'center' }}>©2021 Created by 中科江南</Footer>
              </Layout>
              
              <Modal
                title="一键设置ip"
                visible={this.state.ipSetting.visibleIp}
                onOk={this.setIpAll.bind(this)}
                confirmLoading={this.state.ipSetting.confirmLoadingIp}
                onCancel={()=>{this.setState({ipSetting:Object.assign({},this.state.ipSetting,{ visibleIp: false })})}}
              >
                <Form
                  name="basic"
                >
                  <Form.Item
                    label="服务器ip"
                  >
                    <Input size="large" value={this.state.ipSetting.ip} onChange={(e) => {
                      this.setState({
                        ipSetting: Object.assign({},this.state.ipSetting,{ip:e.target.value})
                    })}}/>
                  </Form.Item>
                </Form>
              </Modal>
            
              <Modal
                title="集群微服务eureka配置"
                visible={this.state.modifyEureka.visible}
                onOk={this.setModifyEureka.bind(this)}
                confirmLoading={this.state.modifyEureka.confirmLoading}
                onCancel={()=>{this.setState({modifyEureka:Object.assign({},this.state.modifyEureka,{ visible: false })})}}
              >
                <Form
                  name="basic"
                >
                  <Form.Item
                    label="ip"
                  >
                    <Input size="large" value={this.state.modifyEureka.ip} onChange={(e) => {
                      this.setState({
                        modifyEureka: Object.assign({},this.state.modifyEureka,{ip:e.target.value})
                    })}}/>
                  </Form.Item>
                  <Form.Item
                    label="port"
                  >
                    <Input size="large" value={this.state.modifyEureka.port} onChange={(e) => {
                      this.setState({
                        modifyEureka: Object.assign({},this.state.modifyEureka,{port:e.target.value})
                    })}}/>
                  </Form.Item>
                </Form>
              </Modal>

              <Modal
                title="包版本"
                visible={this.state.bowerNo.visible}
                footer = {null}
                onCancel={()=>{this.setState({bowerNo:Object.assign({},this.state.bowerNo,{ visible: false })})}}
              >
                
                {
                  this.state.bowerNo.confirmLoading ?
                  <Spin indicator={antIcon} style={{ textAlign:'center', width: '100%'}}/>:
                  <Form
                    name="basic"
                  >
                    <Form.Item
                      label="当前运行版本"
                    >
                      <Input size="large" disabled={true} value={this.state.bowerNo.runV} onChange={(e) => {
                        this.setState({
                          bowerNo: Object.assign({},this.state.bowerNo,{runV:e.target.value})
                      })}}/>
                    </Form.Item>
                    <Form.Item
                      label="历史备份版本"
                    >
                      <Select size="large" value={this.state.bowerNo.hisVSelect} onChange={(value) => {
                        this.setState({
                          bowerNo: Object.assign({},this.state.bowerNo,{hisVSelect:value})
                        })
                      }}>
                        {hisVOptions}
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" onClick={this.downloadBower.bind(this)}>下载版本包</Button>
                    </Form.Item>
                  </Form>
                }
                
              </Modal>

              <Modal
                title="redis缓存操作"
                visible={this.state.redis.visible}
                onOk={this.redisOperate.bind(this)}
                confirmLoading={this.state.redis.confirmLoading}
                onCancel={()=>{this.setState({redis:Object.assign({},this.state.redis,{ visible: false })})}}
              >
                <Form
                  name="basic"
                >
                  <Form.Item
                    label="redis命令"
                  >
                    <Input size="large" value={this.state.redis.command} onChange={(e) => {
                      this.setState({
                        redis: Object.assign({},this.state.redis,{command:e.target.value})
                    })}}/>
                  </Form.Item>
                </Form>
              </Modal>
            
              <Modal
                title={"查看日志 "+this.state.info.server_name}
                visible={this.state.info.visible}
                footer={null}
                width={1050}
                style={{ top: 20 }}
                onCancel={()=>{this.setState({info:Object.assign({},this.state.info,{ visible: false })})}}
              >
                <div>
                  <Form
                    name="basic"
                    style={
                      { width: '500px' }
                    }
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                  >
                    <Form.Item noStyle label="筛选条件">
                      <Select size="large" style={{ width: 300 }} value={this.state.info.cond} onChange={(value) => {
                        this.setState({
                          info: Object.assign({},this.state.info,{cond:value})
                        }, () => {
                          this.viewInfo()
                        })
                      }}>
                        {condOptions}
                      </Select>
                      {/* <Button type="primary" onClick={this.viewInfo.bind(this)}  style={{ marginLeft: 20 }}>刷新</Button> */}
                    </Form.Item>
                  </Form>
                  {this.state.info.confirmLoading ?
                    <Spin indicator={antIcon} style={{ textAlign: 'center', width: '100%' }} /> :
                    <TextArea style={{height:'400px'}} value={this.state.info.info}>
                    
                    </TextArea>
                  }
                </div>
              </Modal>

              <Modal
                title={"修改yml "+this.state.updateYml.server_name}
                visible={this.state.updateYml.visible}
                footer={null}
                width={1050}
                style={{ top: 20 }}
                onCancel={()=>{this.setState({updateYml:Object.assign({},this.state.updateYml,{ visible: false })})}}
              >
                <div>
                  {this.state.updateYml.confirmLoading ?
                    <Spin indicator={antIcon} style={{ textAlign: 'center', width: '100%' }} /> :
                    <div>
                      <TextArea
                        style={{ height: '400px' }}
                        value={this.state.updateYml.ymlContent}
                        onChange={(e)=> {
                          this.setState({ updateYml: Object.assign({}, this.state.updateYml, { ymlContent: e.target.value }) })
                        }}
                      >
                      
                      </TextArea>
                      <div style={{
                        'display': 'flex',
                        marginTop: '20px',
                        justifyContent: 'center',
                      }}>
                        {this.state.updateYml.ymlSaveLoading ?
                          <LoadingButton type="primary" title="保存设置"/>:
                          <Button type="primary" onClick={this.saveYml.bind(this)}>保存设置</Button>
                        }
                      </div>
                    </div>
                  }
                </div>
              </Modal>
            

              <Modal
                title={"常用配置修改 "+this.state.settingCommon.server_name}
                visible={this.state.settingCommon.visible}
                width={1050}
                style={{ top: 20 }}
                footer = {null}
                onCancel={()=>{this.setState({settingCommon:Object.assign({},this.state.settingCommon,{ visible: false })})}}
              >
              {
                this.state.settingCommon.confirmLoading ?
                  <Spin indicator={antIcon} style={{ textAlign: 'center', width: '100%' }} /> :
                  <div style={{ display: 'flex' }}>
                    <Form
                      name="basic"
                      style={
                        { width: '500px' }
                      }
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 18 }}
                    >
                      <p
                        style={
                          { textAlign: 'center' }
                        }
                      >数据库配置</p>
                      <Form.Item
                        label="数据库ip"
                      >
                        <Input size="large" value={this.state.settingCommon.dbip} onChange={(e) => {
                          this.setState({
                            settingCommon: Object.assign({}, this.state.settingCommon, { dbip: e.target.value })
                          })
                        }} />
                      </Form.Item>
                      <Form.Item
                        label="数据库端口"
                      >
                        <Input size="large" value={this.state.settingCommon.dbport} onChange={(e) => {
                          this.setState({
                            settingCommon: Object.assign({}, this.state.settingCommon, { dbport: e.target.value })
                          })
                        }} />
                      </Form.Item>
                      <Form.Item
                        label="数据库名"
                      >
                        <Input size="large" value={this.state.settingCommon.dbun} onChange={(e) => {
                          this.setState({
                            settingCommon: Object.assign({}, this.state.settingCommon, { dbun: e.target.value })
                          })
                        }} />
                      </Form.Item>
                      <Form.Item
                        label="数据库密码"
                        noStyle
                      >
                        <Input size="large"  style={{ width: 200 }} value={this.state.settingCommon.dbpwd} onChange={(e) => {
                          this.setState({
                            settingCommon: Object.assign({}, this.state.settingCommon, { dbpwd: e.target.value })
                          })
                        }} />
                        <Button onClick={this.encAndDec.bind(this,this.state.settingCommon.dbpwd,'0')}  style={{ marginLeft: 20 }}>加密</Button>
                        <Button onClick={this.encAndDec.bind(this,this.state.settingCommon.dbpwd,'1')}  style={{ marginLeft: 20  }}>解密</Button>
                      </Form.Item>
                      <Form.Item
                        label="数据库实例"
                      >
                        <Input size="large" value={this.state.settingCommon.dbinstance} onChange={(e) => {
                          this.setState({
                            settingCommon: Object.assign({}, this.state.settingCommon, { dbinstance: e.target.value })
                          })
                        }} />
                      </Form.Item>
                      <Form.Item wrapperCol={{ offset: 5 }}>
                        {
                          this.state.settingCommon.dbLoading ?
                            <LoadingButton type="primary" title="保存设置"/> :
                            <Button type="primary" onClick={this.dbSave.bind(this)}>保存设置</Button>
                        }
                      </Form.Item>
                    </Form>
                    <Form
                      name="basic"
                      style={
                        { width: '500px' }
                      }
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 18 }}
                    >
                      <p
                        style={
                          { textAlign: 'center' }
                        }
                      >微服务配置</p>
                      <Form.Item
                        label="ip"
                      >
                        <Input size="large" value={this.state.settingCommon.ip} onChange={(e) => {
                          this.setState({
                            settingCommon: Object.assign({}, this.state.settingCommon, { ip: e.target.value })
                          })
                        }} />
                      </Form.Item>
                      <Form.Item
                        label="port"
                      >
                        <Input size="large" value={this.state.settingCommon.port} onChange={(e) => {
                          this.setState({
                            settingCommon: Object.assign({}, this.state.settingCommon, { port: e.target.value })
                          })
                        }} />
                      </Form.Item>
                      <Form.Item wrapperCol={{ offset: 5 }}>
                        {
                          this.state.settingCommon.basicLoading ?
                            <LoadingButton type="primary" title="保存设置"/> :
                            <Button type="primary" onClick={this.basicSave.bind(this)}>保存设置</Button>
                        }
                      </Form.Item>
                    </Form>
                  </div>
                }
              </Modal>

              <Modal
                title="换包"
                visible={this.state.bower.visibleBower}
                onOk={()=>{this.setState({bower:Object.assign({},this.state.bower,{ visibleBower: false })})}}
                confirmLoading={this.state.bower.confirmLoadingBower}
                onCancel={()=>{this.setState({bower:Object.assign({},this.state.bower,{ visibleBower: false })})}}
              >
                <Upload
                  onRemove= {file => {
                    this.setState(state => {
                      const index = state.bower.fileList.indexOf(file);
                      const newFileList = state.bower.fileList.slice();
                      newFileList.splice(index, 1);
                      return {
                        bower:Object.assign(state.bower,{fileList: newFileList})
                      };
                    });
                  }}
                  beforeUpload={file => {
                    this.setState({ bower: Object.assign({}, this.state.bower, { confirmLoadingBower: true }) })
                  }}
                  onChange={({ fileList, file }) => {
                    this.setState({ bower: Object.assign({}, this.state.bower, { fileList: fileList }) })
                    if (file.status === 'done') {
                      this.setState({ bower: Object.assign({}, this.state.bower, { confirmLoadingBower: false }) })
                      requestString(this.apiUrl() + '/serverConfig/swapjar', 'post', JSON.stringify({
                        servName: this.state.bower.server_name,
                        filePath:this.state.bower.fileList[0].name
                      })).then((res) => {
                        if (res === "success") {
                          message.success('换包成功！')
                        } else {
                          message.error('换包失败！')
                        }
                      })
                    }else if (file.status === 'error') {
                      this.setState({ bower: Object.assign({}, this.state.bower, { confirmLoadingBower: false }) })
                      message.success('换包失败！删除后重新上传！')
                    } else if (file.status !== "uploading") {
                      this.setState({ bower: Object.assign({}, this.state.bower, { confirmLoadingBower: false }) })
                    }
                  }}
                  fileList={this.state.bower.fileList}
                  action={this.apiUrl()+"/serverConfig/uploadfile"}
                  listType="text"
                  maxCount = "1"
                >
                  {this.state.bower.fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Modal>

            </div>
        )
    }
}
export default connect((state) => {
    return {
      user:state.user,
      home:state.home
    }
}, {
  outLogin,
  setShowType
})(Index);