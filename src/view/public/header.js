import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Layout, Menu, } from 'antd';
import {cookie, getAPI} from "../../public/public";

class HeaderView extends React.Component{

    state = {
        id: this.props.match.path.split('/')[1],
        isAdmin: false
    };

    componentWillMount() {

        if (cookie().get('username')){
            getAPI('POST','permission',{username:cookie().get('username')})
                .then(res=>{
                    this.setState({
                        isAdmin: Boolean(res.isAdmin)
                    })
                })
                .catch(err=>console.log(err))
        }

    }


    changeId = ()=>{
        const id = this.props.match.path.split('/')[1];
        this.setState({id});
    };

    render(){

        return(
            <div>
                <Layout.Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[this.state.id]}
                        style={{ lineHeight: '64px',marginLeft:'256px',zIndex:10}}
                        onClick={(key)=>{
                            if(key.key=== 'backstage'){
                                if (!this.state.isAdmin){
                                    alert('不是管理员，拒接访问');
                                    window.location.href = `${global.baseURL}/index/user`;
                                }
                            }
                        }}
                    >
                        <Menu.Item key="index">
                            <Link to='/index/user' onClick={this.changeId}>首页</Link>
                        </Menu.Item>
                        <Menu.Item key="blog">
                            <Link to='/blog' onClick={this.changeId}>博客</Link>
                        </Menu.Item>
                        <Menu.Item key="backstage">
                            <Link
                                to={!this.state.isAdmin ? '/' :'/backstage/home'}
                                onClick={this.changeId}>后台管理</Link>
                        </Menu.Item>
                    </Menu>
                </Layout.Header>
            </div>
        )
    }
};

export default withRouter(HeaderView);