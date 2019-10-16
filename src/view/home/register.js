import React from 'react';
import {Button, Col, Input, Row, Tooltip} from "antd";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { getAPI } from '../../public/public';

class Register extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username:'',    //用户名
            password:'',    //密码
            repassword:'',  //确认密码
            res:{},         //请求数据的值
            open:false,     //默认关闭注册提示信息
            message:'',     //  提示的信息
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.user.res !== nextProps.user.res){

            // 注册成功跳转到登录界面
            if (nextProps.user.res.message === '注册成功'){
                this.setState({
                    ...this.state,
                    res:nextProps.user.res,
                    open:true,
                    message:nextProps.user.res.message
                });
                setTimeout(()=>{
                    this.setState({
                        ...this.state,
                        open: false,
                        message: ''
                    });
                    window.location.href = `${global.baseURL}/index/login`;
                },1000);

            }
            return false;
        }
        return true;
    }

    // 处理输入框的值
    valueChangeHandle = (e)=>{
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value
        })
    };

    // 点击注册请求数据
    clickHandle = ()=>{

        const {username, password, repassword} = this.state;

        // 判断用户名和密码是否输入
        if (!username || !password || !repassword) {

            let message = '';
            if (!username){
                message = '用户名不为空';
            }else if(!password){
                message = '密码不为空';
            }else if (!repassword){
                message = '再次输入密码不为空'
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
            getAPI('POST','register',{username, password, repassword})
                .then(data=>{

                    dispatch({
                        type: 'REGISTER__SUCC',
                        res: data
                    });
                })
                .catch(err=>console.log(err));
        });

        // getAPI('POST','register',{username, password, repassword})
        //     .then(data=>{
        //         this.setState({
        //             ...this.state,
        //             res:data,
        //             open:true
        //         },()=>{
        //
        //             // state的回调函数，用于关闭提示信息
        //             setTimeout(()=>{
        //                 this.setState({open:false});
        //             },1000);
        //
        //         });
        //
        //         // 注册成功跳转到登录界面
        //         if (data.message === '注册成功'){
        //             window.location.href = `${global.baseURL}/index/login`;
        //         }
        //     })
        //     .catch(err=>console.log(err));

    };

    // 注册提示信息
    tooltipHandle = ()=>{

        if (!this.state.open) {
            return <div></div>
        }else{
            return (
                <Tooltip>
                    <Button style={{position:'absolute',right:0,top:0,backgroundColor:'#FF8888'}}>
                        {this.state.message}
                    </Button>
                </Tooltip>
            )
        }
    };

    render(){
        return(
            <div className='register-wrap'>
                <Row>
                    <Col md={18} xs={24} className='joint'>
                        
                        <div className='joint-info register-joint-info'>
                            <div className='joint-info-first'>
                                <span>用户名：</span>
                                <Input 
                                placeholder="请输入用户名" 
                                name='username'
                                value={this.state.username}
                                onChange={this.valueChangeHandle}
                                />
                            </div>
                            <div className='joint-info-first'>
                                <span>设置密码：</span>
                                <Input 
                                placeholder='请输入密码'
                                name='password'
                                value={this.state.password}
                                onChange={this.valueChangeHandle}
                                type = "password"
                                />
                            </div>
                            <div className='joint-info-first'>
                                <span>确认密码：</span>
                                <Input 
                                placeholder='请再输入密码'
                                name='repassword'
                                value={this.state.repassword}
                                onChange={this.valueChangeHandle}
                                type = "password"
                                />
                            </div>
                            <div className='joint-info-second register-joint-info-second'>
                                <Button type="primary" onClick={this.clickHandle}>注册</Button>
                                <Link to='/index/login'>已有帐号，直接登录»</Link>
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
}

export default connect(state=>state)(Register);