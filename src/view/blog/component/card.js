import React from 'react';
import { Link } from "react-router-dom";
import { Card, Pagination, Empty } from 'antd';
import {getAPI, formatDate} from "../../../public/public";

export default class CardComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data:[],
            pages:1, //总页数
            count:0, //总条数
            page:1,  //当前页
        };
    }

    // 初始化数据
    componentWillMount() {
        let id = this.props.type;
        if (id === 'all'){
            id = '';
        }
        this.getData(this.state.page,id);
    }

    // 数据更新
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.page !== nextState.page || this.props.type !== nextProps.type){
            let id = nextProps.type;
            if (id === 'all'){
                id = '';
            }
            this.getData(nextState.page, id);
            return false;
        }
        return true;
    }

    //获取数据
    getData = (page, id)=>{
        getAPI('GET',`blog?page=${page}&category=${id}`,'')
            .then(res=>{

                if (res.message === '查询成功'){
                    this.setState({
                        data: res.data,
                        pages:res.pages,
                        count: res.count
                    })
                }
            })
            .catch(err=>console.log(err))
    };

    //视图显示
    showViews = ()=>{
        if (this.state.data.length === 0) return (<Empty/>);
        return this.state.data.map(item=>{
            return (
                <Card
                    title={item.title}
                    extra={
                        <div>
                            <Link to={`/blog/${item._id}`} onClick={this.props.onChangeOpen}>
                                <span>查看全文</span>
                            </Link>
                        </div>
                    }
                    style={{ margin:'20px' }} key={item._id}>
                    <p>
                        作者：<span className={'text'}>{item.user.username}&nbsp;&nbsp;&nbsp;</span>
                        -时间：<span className={'text'}>{formatDate(new Date(item.addTimes))}&nbsp;&nbsp;&nbsp;</span>
                        -阅读：<span className={'text'}>{item.views}&nbsp;&nbsp;&nbsp;</span>
                        -评论：<span className={'text'}>{item.comments.length}</span></p>
                    <p>{item.description}</p>
                </Card>
            )
        });
    };

    render() {
        return (
            <div>
                {this.showViews()}
                <div>
                    {this.state.data.length === 0 ? (<div></div>) : (
                        <Pagination
                            style={{marginBottom:'20px', marginRight:'25px', float:'right'}}
                            defaultCurrent={1}
                            total={this.state.count}
                            defaultPageSize = {3}
                            onChange={(page, pageSize)=>{
                                this.setState({page});
                            }}
                        />
                    )}
                </div>
            </div>
        )
    }
}