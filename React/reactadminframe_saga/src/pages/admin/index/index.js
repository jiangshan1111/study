/*eslint-disable*/
import React from 'react'
import {Switch,Redirect} from 'react-router-dom';
import asyncComponent from '../../../components/async/AsyncComponent.js';
import {connect} from 'react-redux';
import actions from '../../../store/actions';
import Css from '../../../assets/css/admin/index/index.css';
import LeftColumn from '../../../components/leftcolumn';
import {AuthRoute} from '../../../routes/private.js';
const ColumnIndexPage=asyncComponent(()=>import("../column/index"));
const UserIndexPage=asyncComponent(()=>import("../user/index"));
const UserAddPage=asyncComponent(()=>import("../user/add"));
const OrderIndexPage=asyncComponent(()=>import("../order/index"));
const TongjiPage=asyncComponent(()=>import("../tongji/index"));

class AdminIndex extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isLeftShow:true,
            positionName:"",
            columns:[
                {
                    title:"栏目管理",
                    path:base.config.path+"admin/column",
                    isActive:false,//点击后的颜色
                    isLnkActive:false//点击链接后的颜色
                },
                {
                    title:"会员管理",
                    isActive:false,
                    isLnkActive:false,
                    children:[
                        {
                            title:"查看",
                            path:base.config.path+"admin/user",
                            isActive:false,
                            isLnkActive:false
                        },
                        {
                            title:"添加",
                            path:base.config.path+"admin/user/add",
                            isActive:false,
                            isLnkActive:false
                        }
                    ]
                },
                {
                    title:"订单管理",
                    isActive:false,
                    isLnkActive:false,
                    children:[
                        {
                            title:"查看",
                            path:base.config.path+"admin/order",
                            isActive:false,
                            isLnkActive:false
                        },
                    ]
                },
                {
                    title:"百度",
                    isActive:false,
                    isLnkActive:false,
                    isLink:true,//是否外链
                    path:"http://www.baidu.com"
                },
                {
                    title:"统计",
                    isActive:false,
                    isLnkActive:false,
                    children:[
                        {
                            title:"html5统计",
                            isActive:false,
                            isLnkActive:false,
                            children:[
                                {
                                    title:"css3统计",
                                    isActive:false,
                                    isLnkActive:false,
                                    path:base.config.path+"admin/tongji",
                                }
                            ]
                        }
                    ]
                }
            ],
            tags:[
                {
                    title:"首页",
                    path:base.config.path+"admin/column",
                    isLnkActive:true
                }
            ],
            moveVal:0
        }
        this.moveVal=0;
    }
    outLogin(){
        this.props.dispatch(actions.admin.outLogin());
        this.props.history.replace(base.config.path);
    }
    //显示隐藏左侧栏目
    showLeftColumn(){
        this.setState({isLeftShow:!this.state.isLeftShow});
    }
    goPage(data){
        if(data.isLink){//如果是外链
            window.open(data.path,'_blank');
        }else {
            this.props.history.replace(data.path);
            this.clearColumnStyle();
            this.changeColumnPathStyle(data.path);
        }
    }
    getColumnName(name){
        this.changeColumnStyle(name);
    }
    changeColumnStyle(name,parentName,data){
        let positionName=this.state.positionName;
        data=data || this.state.columns;
        if(data.length>0){
            this.clearColumnStyle();
            for(let i=0;i<data.length;i++){
                //data[i].isLnkActive=false;
                if(data[i].title==name){
                    data[i].isActive=!data[i].isActive;
                    this.setState({data:data});
                    if(!data[i].children || data[i].children.length<=0){
                        positionName="";
                        data[i].isLnkActive=true;
                        if(parentName) {
                            positionName +=" / "+ parentName + " / " + data[i].title;
                        }else{
                            positionName=" / "+name;
                        }
                        this.setState({positionName:positionName,data:data});
                    }
                    break;
                }
                if(data[i].children && data[i].children.length>0){
                    this.changeColumnStyle(name,data[i].title,data[i].children);
                }
            }
        }
    }
    clearColumnStyle(data){
        data=data || this.state.columns;
        for(let i=0;i<data.length;i++){
            if(data[i].isLnkActive==true){
                data[i].isLnkActive=false;
                this.setState({data:data});
                break;
            }
            if(data[i].children && data[i].children.length>0){
                this.clearColumnStyle(data[i].children);
            }
        }
    }
    changeColumnPathStyle(path,parentData,data){
        let positionName=this.state.positionName;
        data=data || this.state.columns;
        if(data && data.length>0){
            for(let i=0;i<data.length;i++){
                if(data[i].path==path){
                    if(!data[i].children || data[i].children.length<=0){
                        positionName="";
                        data[i].isLnkActive=true;
                        this.setState({positionName:positionName,data:data});
                        if(parentData) {
                            parentData.isActive=true;
                            positionName +=" / "+ parentData.title + " / " + data[i].title;
                            this.setState({positionName:positionName,data:parentData});
                        }else{
                            positionName=" / "+data[i].title;
                            this.setState({positionName:positionName});
                        }
                        //添加tags标签
                        this.addTags({
                            title:data[i].title,
                            path:data[i].path,
                            isLnkActive:data[i].isLnkActive
                        })
                    }
                    break;
                }
                if(data[i].children && data[i].children.length>0){
                    this.changeColumnPathStyle(path,data[i],data[i].children);
                }
            }
        }
    }
    //添加tags数据
    addTags(data){
        let isSame=false;
        let tags=this.state.tags;
        if(tags.length>0){
            for(let key in tags){
                if(tags[key].isLnkActive){
                    tags[key].isLnkActive=false;
                }
            }
            for(let key in tags){
                if(tags[key].path===data.path){
                    isSame=true;
                    tags[key].isLnkActive=true;
                    break;
                }
            }
        }
        if(!isSame){
            tags.push(data)
        }
        this.setState({tags:tags});
    }
    //点击便签切换页面
    goTabgsPage(path,index){
        this.clearColumnStyle();
        this.changeColumnPathStyle(path);
        let tags=this.state.tags;
        if(tags.length>0){
            for(let key in tags){
                if(tags[key].isLnkActive){
                    tags[key].isLnkActive=false;
                    break;
                }
            }
        }
        tags[index].isLnkActive=true;
        this.setState({tags:tags});
        this.props.history.replace(path);
    }
    //关闭tags数据
    closeTags(index){
        let tags=this.state.tags;
        let prevPath=tags[index-1].path;
        tags[index-1].isLnkActive=true;
        this.clearColumnStyle();
        this.changeColumnPathStyle(prevPath);
        tags.splice(index,1);
        this.setState({tags:tags});
        this.props.history.replace(prevPath);
    }
    moveRight(){
        let tags=this.refs['tags'];
        let tagsData=this.refs['tags-data'];
        let offsetVal=Math.abs(parseInt(tagsData.style.left));
        if(tagsData.offsetWidth>tags.offsetWidth && offsetVal<tags.offsetWidth){
            this.moveVal+=-300;
            this.setState({moveVal:this.moveVal});
        }
    }
    moveLeft(){
        let tagsData=this.refs['tags-data'];
        let offsetVal=parseInt(tagsData.style.left);
        if(offsetVal<0){
            this.moveVal-=-300;
            this.setState({moveVal:this.moveVal});
        }
    }
    render() {
        return (
            <div>
                <div className={this.state.isLeftShow?Css["left"]:Css["left"]+" "+Css["slide"]}>
                    <div className={Css["logo"]}>后台管理</div>
                    <div className={Css["column-wrap"]}>
                        <LeftColumn data={this.state.columns} goPage={this.goPage.bind(this)} getColumnName={this.getColumnName.bind(this)}></LeftColumn>
                    </div>
                </div>
                <div className={this.state.isLeftShow?Css['main']:Css['main']+" "+Css['full']}>
                <div className={Css["header"]}>
                    <div className={this.state.isLeftShow?Css['slider-icon']:Css['slider-icon']+" "+Css['rotate']} onClick={this.showLeftColumn.bind(this)}>
                    <div className={Css["line"]}></div>
                    </div>
                    <div className={Css["nav-position"]}>
                        首页 {this.state.positionName}
                    </div>
                    <div className={Css["out-login"]} onClick={this.outLogin.bind(this)}>安全退出</div>
                </div>
                    {
                        this.state.tags.length>0?
                            <div className={Css["nav"]}>
                                <div className={Css["arrow"]} onClick={this.moveLeft.bind(this)}>&lt;</div>
                                <div className={Css["tags"]} ref="tags">
                                    <div className={Css["tags-data"]} ref="tags-data" style={{left:this.state.moveVal+'px'}}>
                                        {
                                            this.state.tags.map((item,index)=>{
                                                return (
                                                    <div className={Css['item']+" "+Css['active']} key={index} onClick={this.goTabgsPage.bind(this,item.path,index)}>{item.title}{index>0?<div className={Css["close"]} onClick={(e)=>{e.stopPropagation();this.closeTags(index)}} >X</div>:""}</div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className={Css["arrow"]} onClick={this.moveRight.bind(this)}>&gt;</div>
                            </div>
                        :""
                    }
                <div style={{width:'100%',height:'87vh',overflow:'hidden'}}>
                    <Switch>
                        <AuthRoute path={base.config.path+"admin/column"} component={ColumnIndexPage}></AuthRoute>
                        <AuthRoute exact path={base.config.path+"admin/user"} component={UserIndexPage}></AuthRoute>
                        <AuthRoute path={base.config.path+"admin/user/add"} component={UserAddPage}></AuthRoute>
                        <AuthRoute path={base.config.path+"admin/order"} component={OrderIndexPage}></AuthRoute>
                        <AuthRoute path={base.config.path+"admin/tongji"} component={TongjiPage}></AuthRoute>
                        <Redirect to={base.config.path+"admin/column"}></Redirect>
                    </Switch>
                </div>
            </div>
        </div>
        )
    }
}
export default connect()(AdminIndex)
