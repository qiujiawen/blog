import React from 'react';
import {Input, Button, Row, Col, Tooltip} from 'antd';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import { getAPI, cookie,} from "../../public/public";

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            user:{
                username: '',
                password: ''
            },
            open:false, //  提示信息，默认是不打开的
            message:'', //  提示的信息
            res:{},     //  API数据
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.user.res !== nextProps.user.res){
            if ( nextProps.user.res.message === '登录成功') {
                this.setState({
                    ...this.state,
                    res: nextProps.user.res,
                    open: true,
                    message: '登录成功',
                });
                setTimeout(() => {
                    this.setState({
                        ...this.state,
                        open: false,
                        message: '',
                    });
                    window.location.href = `${global.baseURL}/index/user`;
                }, 1000)
            }
            return false;
        }
        return true;
    }

    // 登录
    loginClick = ()=>{

        const {username, password} = this.state.user;

        // 判断用户名和密码是否输入
        if (!username || !password) {

            let message = '';
            if (!username){
                message = '用户名不为空';
            }else if(!password){
                message = '密码不为空';
            }

            this.setState({
                open:true,
                message
            });

            // 延时一秒后提示信息隐藏
            setTimeout(()=>{
                this.setState({
                    open:false,
                    message:''
                })
            },1000);

            return
        }

        this.props.dispatch(dispatch=>{
            getAPI('POST','login',{...this.state.user})
                .then(res=>{

                    if(res.code !== 0){
                        this.setState({
                            open:true,
                            message:res.message
                        });

                        // 延时一秒后提示信息隐藏
                        setTimeout(()=>{
                            this.setState({
                                open:false,
                                message:''
                            })
                        },1000);
                        return
                    }
                    cookie().set('username',res.userInfo.username,1);
                    cookie().set('userId',res.userInfo._id,1);
                    dispatch({
                        type:'LOGIN_SUCC',
                        res
                    });
                })
                .catch(err=>console.log(err))

        });

        // getAPI('POST','login',{...this.state.user})
        //     .then(res=>{
        //         this.setState({
        //             ...this.state,
        //             res,
        //             open:true,
        //             message:'登录成功'
        //         });
        //         cookie().set('username',res.userInfo.username,1);
        //         if (res.message === '登录成功'){setTimeout(()=>{
        //             this.setState({
        //                 ...this.state,
        //                 open:false,
        //                 message:''
        //             });
        //             window.location.href = `${global.baseURL}/index/user`;
        //         },1000);
        //
        //         }
        //
        //     })
        //     .catch(err=>console.log(err))
    };

    // 提示信息
    tooltipHandle = ()=>{

        if (this.state.open){
            return (
                <Tooltip>
                    <Button style={{position:'absolute',right:0,top:0,backgroundColor:'#FF8888'}}>
                        {this.state.message}
                    </Button>
                </Tooltip>
            )
        } else {
            return <div></div>
        }
    };

    // 输入框处理函数
    changeHandle = (e)=>{
        this.setState({
            ...this.state,
            user:{
                ...this.state.user,
                [e.target.name]:e.target.value
            }
        })
    };

    render(){

        return(
            <div className='login-wrap'>
                <Row>
                    <Col md={18} xs={24} className='joint'>
                        <div className='joint-info'>
                            <div className='joint-info-first'>
                                <span>用户名：</span>
                                <Input
                                    placeholder="请输入用户名"
                                    name='username'
                                    value={this.state.user.username}
                                    onChange={this.changeHandle}
                                />
                            </div>
                            <div className='joint-info-first'>
                                <span>密&nbsp;码：</span>
                                <Input
                                    placeholder='请输入密码'
                                    name='password'
                                    value={this.state.user.password}
                                    onChange={this.changeHandle}
                                    type = "password"
                                />
                            </div>
                            <div className='joint-info-second'>
                                <Button
                                    type="primary"
                                    onClick={this.loginClick}
                                >登录</Button>
                                <Button>通过GitHub登录</Button>
                                <Link 
                                to='/index/register'>没有账号?请注册</Link>
                            </div>
                            <div style={{position:'relative',left:0,top:'5px'}}>
                                {this.tooltipHandle()}
                            </div>
                        </div>
                    </Col>
                    <Col md={6} xs={0} className='joint-second'>
                        <div>
                            <div className='purpose-header'>
                                <span>关于</span>
                            </div>
                            <p>博客社区</p>
                            <p>在这里你可以：</p>
                            <p>向别人提出你遇到的问题</p>
                            <p>帮助遇到问题的人</p>
                            <p>分享自己的知识</p>
                            <p>和其它人一起进步</p>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
};

export default connect(state => state)(Login);