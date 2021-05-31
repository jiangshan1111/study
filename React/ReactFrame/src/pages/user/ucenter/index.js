import React from 'react';
import {connect} from 'react-redux';


class Index extends React.Component {
    constructor(props){
        super(props);
        this.state={};
    }
    componentDidMount(){

    }
    render() {
        return (
            <div>
                我的
            </div>
        )
    }
}

export default connect((state)=>({state}))(Index);