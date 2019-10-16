import React from 'react';
import {Table} from "antd";
import {getAPI} from "../../../public/public";

class CategoryHome extends React.Component{

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

        getAPI('GET',`admin/category/?page=${page}`,'').then(res=>{
            let arr = [], obj = {};
            res.data.forEach((item,index)=>{
                obj = {
                    key: index.toString(),
                    id: item._id,
                    name: item.name,
                };
                arr.push(obj);
            });
            this.setState({
                data:arr,
                count:res.count
            });
        })
    };

    // 删除数据
    deleteData = (id)=>{
        getAPI('DELETE','admin/category/delete',{id})
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
                dataIndex: 'name',
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
                    <h1>分类首页</h1>
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
                                        e.target.href=`${global.baseURL}/backstage/category/edit?id=${record.id}`
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
export default CategoryHome;