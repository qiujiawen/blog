import React from 'react';
import { connect } from 'react-redux';
import {cookie, getAPI} from "../../public/public";
class User extends React.Component{

    state = {
        username: cookie().get('username'),
        res:{}
    };

    componentWillMount() {
        this.setState({username: cookie().get('username')});
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        if (this.props.user.res !== nextProps.user.res){

            if (nextProps.user.res.message === '退出成功'){
                window.location.href = `${global.baseURL}/index/login`;
                cookie().set('username','',30);
            }
            return false;
        }
        return true;
    }

    // 退出事件
    logoutHandle = ()=>{

        this.props.dispatch(dispatch=>{

            getAPI('GET','user','')
                .then(res=>{
                    this.setState({res});
                    dispatch({
                        type: 'LOGOUT_SUCC',
                        res
                    });
                })
                .catch(err=>console.log(err));

        });
    };

    render(){
        return (
            <div>
                <img
                    style={{width:'100%',maHeight:'100%'}}
                    src={require('../../public/img/blog.jpg')}  alt=""
                />
                <div style={{position:'absolute',left:'30px',top:'50px'}}>
                    <h1 className='welcome'>欢迎</h1>
                    <p className='welcome-name'>
                        {this.state.username ? (
                            <span><strong style={{color:'#EE7700'}}>{this.state.username}</strong>的博客</span>
                        ): (
                            <a href={`${global.baseURL}/index/login`}>请先登录</a>
                        )}
                        {this.state.username ? (
                            <button
                                style={{background:'none',border:'none',color:'#1DA57A',outline: 'none'}}
                                onClick={this.logoutHandle}
                            >退出</button>
                        ): (<span></span>)}

                    </p>

                </div>
            </div>
        )
    }
}

export default connect(state=>state)(User);