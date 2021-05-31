/*eslint-disable*/
import React from 'react';
import Css from '../../../assets/css/admin/user/index.css';
import { Table,Pagination } from 'antd';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

export default class UserIndex extends React.Component {
    constructor() {
        super();
        this.state={
            data:[
                {
                    key: '1',
                    name: 'John Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park',
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 1 Lake Park',
                },
                {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park',
                },
                {
                    key: '4',
                    name: 'Disabled User',
                    age: 99,
                    address: 'Sidney No. 1 Lake Park',
                },
            ]
        }
    }
    componentDidMount(){

    }
    changePage=(page,pageSize)=>{
        console.log(page,pageSize)
    };
    render() {
        let rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        return (
            <div className={Css['page']}>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} pagination={false} />
                <div className={Css['pagination']}>
                    <Pagination defaultCurrent={6} total={500} onChange={this.changePage} />
                </div>
            </div>
        )
    }
}
