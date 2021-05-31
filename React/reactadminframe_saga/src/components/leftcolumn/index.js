import React from 'react'
import PropTypes from 'prop-types';
import './index.css';

export default class LeftColumn extends React.Component {
    componentDidMount(){

    }
    render() {
        return (
            <div style={{width:"100%"}}>
                {
                    this.props.data.length>0?
                        this.props.data.map((item,index)=>{
                            return (
                                <React.Fragment key={index}>
                                    <div style={this.props.level>0?{paddingLeft:""+(this.props.level*60)+"px"}:{}} className={item.isLnkActive?'column-name lnk-active':item.isActive?"column-name active":"column-name"} onClick={item.path?this.props.goPage?this.props.goPage.bind(this,{path:item.path,title:item.title,isLink:item.isLink}):()=>{}:this.props.getColumnName?this.props.getColumnName.bind(this,item.title):()=>{}}>
                                        <span>{item.title}</span>
                                        {
                                            item.children && item.children.length>0?
                                                <div className={'icon arrow'}></div>
                                            :""
                                        }
                                    </div>
                                    {
                                        item.children && item.children.length>0?
                                            <div className={"next-wrap"}>
                                                <LeftColumn data={item.children} level={this.props.level+1} goPage={this.props.goPage.bind(this)} getColumnName={this.props.getColumnName.bind(this)}></LeftColumn>
                                            </div>
                                        :""
                                    }
                                </React.Fragment>
                            )
                        })
                    :""
                }

            </div>
        )
    }
}
LeftColumn.propTypes={
    data:PropTypes.array.isRequired
};
LeftColumn.defaultProps={
    data:[],
    level:0
};
