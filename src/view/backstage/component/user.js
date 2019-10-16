import React from 'react';
import { Table } from 'antd';
import { getAPI } from '../../../public/public';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        align: 'center',
    },
    {
        title: '用户名',
        dataIndex: 'username',
        align: 'center',
    },
    {
        title: '密码',
        dataIndex: 'password',
        align: 'center',
    },
    {
        title: '是不是管理员',
        dataIndex: 'admin',
        align: 'center',
    },
];

class User extends React.Component{

    state = {
        data:[],
        page:1, //当前页
        count:1, //总页数
    };

    componentWillMount() {
        this.getData(this.state.page);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.page !== nextState.page){
            this.getData(nextState.page);
            return false;
        }
        return true;
    }

    // 获取用户列表数据
    getData = (page)=>{

        getAPI('GET',`admin?page=${page}`,'').then(res=>{

            let arr = [], obj = {},str = '';
            res.data.forEach((item,index)=>{
                if (item.isAdmin)str = '是';
                else str = '不是';
                obj = {
                    key: index.toString(),
                    id: item._id,
                    username: item.username,
                    password: item.password,
                    admin: str,
                };
                arr.push(obj);
            });

            this.setState({
                data:arr,
                count:res.count
            });
        })
    };

    render() {
        return(
            <div style={{width:global.WIDTH,backgroundColor:'#fff'}} className='wrap'>
                <div style={{width:'100%', paddingLeft:'10px',paddingRight:'20px',margin:'auto'}}>
                    <h1>用户列表</h1>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.data}
                        pagination={{
                            pageSize:5,
                            defaultCurrent:1,
                            total:this.state.count,
                            onChange:(page)=>this.setState({page})
                        }}
                    />
                </div>
            </div>
        )
    }
}
export default User;