/**
 *  评论页面
 */
import React from 'react';
import { withRouter } from "react-router";
import {formatDate, getAPI, cookie} from "../../../public/public";
import {Button, Card, List, Typography, Empty, Pagination} from "antd";
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

class Comment extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data:{},
            comment:'',     //评论
            comments:[],    //返回的评论数据
        };
        this.myRef = React.createRef();
    }

    componentWillMount() {
       this.getData();
    };

    // 获取数据
    getData = ()=>{
        // 获取用户的内容
        getAPI('GET',`blog/query?id=${this.props.match.params.id}`,'')
            .then(res=>{
                console.log(res);
                if (res.message === '查询成功'){
                    this.setState({
                        data: res.data[0],
                        comments: res.data[0].comments
                    });
                }
            })
            .catch(err=>console.log(err))
    };

    // 获取评论的值
    onValueChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    // 提交事件
    commitHandle = ()=>{
        const
            userId = cookie().get('userId'),
            _id = this.props.match.params.id,
            comments = this.state.comment;
        if (!_id){
            return alert('请登录后再评论');
        }else if (!comments) return  alert('请填写内容再提交');
        getAPI('POST','blog/commit', {_id, comments, userId})
            .then(res=>{
                if (res.message === '保存成功'){
                    this.getData();
                    this.setState({comment:''});
                    this.myRef.current.value = '';
                }
            })
            .catch(err=>console.log(err));
    };

    // 头部视图
    showCard = ()=>{
        let {data} = this.state;
        if (!data.title) return <Empty/>;
        else return (
            <Card
                className={'card'}
                title={data.title}
                style={{ width:'100%'}}>
                <p>
                    作者：<span className={'text'}>{data.user.username}&nbsp;&nbsp;&nbsp;</span>
                    -时间：<span className={'text'}>{formatDate(new Date(data.addTimes))}&nbsp;&nbsp;&nbsp;</span>
                    -阅读：<span className={'text'}>{data.views}&nbsp;&nbsp;&nbsp;</span>
                    -评论：<span className={'text'}>{data.comments.length}</span>
                </p>
                <p>{data.content}</p>
            </Card>
        )
    };

    render() {
        let length = 0;
        if (this.state.data.comments) {
            length = this.state.data.comments.length;
        }
        return(
            <div
                style={{margin:'20px',}}
            >
                {/*头部视图*/}
                {this.showCard()}

                <div style={{background:'#fff', marginTop:'25px', padding:'5px 10px 10px'}}>
                    <p>
                        <span style={{fontWeight:'blod', fontSize:'20px'}}>评论</span>
                        <span style={{float:"right"}}>一共{length}条评论</span>
                    </p>
                    {cookie().get('username') ? (<span>我：{cookie().get('username')}</span>):(
                        <span>游客身份</span>
                    )}

                    <div>
                        <div style={{marginTop: '15px'}}>
                            <textarea
                                name='comment'
                                rows="5"
                                placeholder="请输入评论..."
                                className={'textarea'}
                                onChange={this.onValueChange}
                                ref={this.myRef}
                            >
                            </textarea>
                        </div>
                        <Button
                            type="primary"
                            style={{marginTop:'15px'}}
                            onClick={this.commitHandle}
                        >提交</Button>
                    </div>
                </div>

                {/*评论列表*/}
                <div>
                    <List
                        header={<div>评论列表</div>}
                        bordered
                        dataSource={this.state.comments}
                        style={{backgroundColor:'#fff', marginTop:'15px'}}
                        renderItem={item => (
                            <List.Item>
                                <Typography.Text mark style={{marginRight:'20px'}}>{item.username}</Typography.Text>{formatDate(new Date(item.time))}
                                <div>
                                    <p>{item.content}</p>
                                </div>
                            </List.Item>
                        )}
                    />
                    {this.state.comments.length === 0 ? (<div></div>) : (
                        <Pagination
                            style={{marginBottom:'20px', marginTop:'25px'}}
                            defaultCurrent={1}
                            total={this.state.comments.length}
                            defaultPageSize = {5}
                        />
                    )}
                </div>

                <div style={{backgroundColor:'#000', marginTop:'20px', height:'79px', color:'#555',display:'flex'}}>
                    <p style={{margin:'auto'}}>Copyright © xxxxx.com 版权所有 | 京ICP备08102442号</p>
                </div>
            </div>
        )
    }
}

export default withRouter(Comment);