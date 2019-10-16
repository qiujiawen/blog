import React from 'react';
import { withRouter, } from 'react-router-dom';
import Login from './login';
import Register from './register';
import User from './user';

class Views extends React.Component{

    // 登录、注册、用户信息页面的切换
    showView = ()=>{
        return this.props.id === 'user' ? <User/>: this.props.match.params.id === 'login'?<Login/>:<Register/>
    };

    render(){
        return (
            <div 
                style={{minHeight:'100vh',float:'right',width:`${this.props.width}px`,position:'relative'}}>
                {this.showView()}
            </div>
        )
    }
};

export default withRouter(Views)