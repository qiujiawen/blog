import React from 'react';
import {Table} from "antd";
import {getAPI,} from "../../../public/public";

class ContentHome extends React.Component{

    state = {
        data:[],
        page:1, //当前页
        count:1, //总页数
    };

    // 初始化数据
    componentWillMount() {
        this.getData(this.state.page);
    }

    // 状态改变更新数据
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.page !== nextState.page){
            this.getData(nextState.page);
            return false;
        }
        return true;
    }

    // 获取用户列表数据
    getData = (page)=>{

        getAPI('GET',`admin/content?page=${page}`,'')
            .then(res=>{
                let arr = [], obj = {}, arr2 = [], str = '';
                res.data.forEach((item,index)=>{
                    arr2 = item.addTimes.split('T');
                    str = arr2[0];
                    obj = {
                        key: item._id,
                        id: item._id,
                        category:item.category.name,
                        title:item.title,
                        author:item.user.username,
                        addTime:str,
                        views:item.views
                    };
                    arr.push(obj);
                });
                this.setState({
                    data:arr,
                    count:res.count
                });
            })
            .catch(err=>console.log(err));
    };

    // 删除数据
    deleteData = (id)=>{
        getAPI('DELETE','admin/content/delete',{_id:id})
            .then(res=>{
                alert(res.message);
                if (res.message === '删除成功'){
                    this.getData(this.state.page);
                }
            })
            .catch(err=>console.log(err))
    };

    render() {

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                align: 'center',
            },
            {
                title: '分类名称',
                dataIndex: 'category',
                align: 'center',
            },
            {
                title: '标题',
                dataIndex: 'title',
                align: 'center',
            },
            {
                title: '作者',
                dataIndex: 'author',
                align: 'center',
            },
            {
                title: '添加时间',
                dataIndex: 'addTime',
                align: 'center',
            },
            {
                title: '阅读量',
                dataIndex: 'views',
                align: 'center',
            },
            {
                title: '操作',
                dataIndex: 'action',
                align: 'center',
                render: () => <div>
                    <a href='#' id='update'>修改 / </a>
                    <a href='#' id = 'delete'>删除</a>
                </div>
            },
        ];

        return (
            <div style={{width:global.WIDTH, backgroundColor:'#fff'}} className='wrap'>
                <div style={{width:'100%', paddingLeft:'10px',paddingRight:'20px',margin:'auto'}}>
                    <h1>内容首页</h1>
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
                        onRow={record => {

                            return {
                                onClick: e=>{
                                    if (e.target.id === 'update'){
                                        // 点击修改跳转
                                        e.target.href=`${global.baseURL}/backstage/content/edit?id=${record.id}`
                                    }else if (e.target.id === 'delete'){
                                        // 点击删除
                                        this.deleteData(record.id);
                                    }

                                }
                            }
                        }}
                    />
                </div>
            </div>
        )
    }
}
export default ContentHome;
