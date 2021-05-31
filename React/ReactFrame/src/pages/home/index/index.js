import React from 'react';
import {connect} from 'react-redux';
import Css from '../../../assets/css/home/index/index.css';
import {setScrollTop} from '../../../assets/js/utils';

class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.fnScrollTop=null;
    }

    componentDidMount() {
        setScrollTop(window.base.pages.index.scrollTop);
        this.fnScrollTop=this.eventScroll.bind(this);
        window.addEventListener("scroll",this.fnScrollTop);
    }

    eventScroll(){
        window.base.pages.index.scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
    }

    componentWillUnmount() {
        window.removeEventListener("scroll",this.fnScrollTop)
    }

    render() {
        return (
            <div className={Css['page']}>
                首页
                <div className={Css['goods-main']} onClick={()=>{this.props.history.push(window.base.config.path+"goods")}}>产品</div>
            </div>
        )
    }
}

export default connect((state)=>{
    return {
        state
    }
})(Index);