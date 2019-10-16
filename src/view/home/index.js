import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, } from 'antd';
import Views from './view';
import HeaderView from '../public/header';
import './login.css'
import {cookie} from "../../public/public";
export default class Index extends React.Component {

    constructor(props){

        super(props);
        let id = '';
        if (this.props.match.params.id === 'login' || this.props.match.params.id === 'register'){
            id = 'LR'
        }else{
            id = this.props.match.params.id;
        }
        this.state = {
            width:window.screen.availWidth-256,
            id,
        };
    }

    changeId = (sId)=>{
        this.setState({
            id:sId,
            params:this.props.match.params.id
        });
    };

    render() {
        let disabled=false;
        if (cookie().get('username') === '') disabled = false;
        else disabled = true;
        console.log(this.props.match.params.id, cookie().get('username'))
        return (
            <div>
                <HeaderView/>
                <Layout.Content>
                        <div style={{width:'256px',minHeight:'100vh',float:'left'}}>
                            <Menu 
                                mode="inline" 
                                defaultSelectedKeys={[this.state.id]}
                                style={{width:'256px',minHeight:'100vh'}}
                            >
                                <Menu.Item key="user">
                                    <Icon type="user" />
                                    <span>个人信息</span>
                                    <Link to='/index/user' onClick={()=>this.changeId('user')}/>
                                </Menu.Item>
                                <Menu.Item key="LR" disabled={disabled}>
                                    <Icon type="login" />
                                    <span>登录/注册</span>
                                    <Link 
                                        to={`/index/login`} 
                                        onClick={()=>this.changeId('LR')}/>
                                </Menu.Item>
                                
                            </Menu>
                        </div>
                        <Views {...this.state}/>
                </Layout.Content>
            </div>
        )
    }
}