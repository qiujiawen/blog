import React from 'react';
import {Button, Input} from 'antd';
import AlertView from './alert';
import { getAPI } from '../../../public/public';

class CategoryAdd extends React.Component{

    state = {
        type:'',            //弹出窗的类型
        message:'',         //弹出窗的提示
        description:'',     //弹出窗的描述
        value:'',           //输入框的值
    };

    // 弹出窗返回到分类添加页面
    onTypeChange = ()=>{
        this.setState({
            type:'',            //弹出窗的类型
            message:'',         //弹出窗的提示
            description:'',     //弹出窗的描述
            value:'',           //输入框的值
            res:{},             //数据源
        })
    };

    // 提交事件
    commitHandle = ()=>{
        let { value} = this.state;
        if (!value){
            this.setState({
                type:'error',
                message:'出错了',
                description:'分类添加的内容不能为空'
            })
        }else {
            this.getData();
        }
    };

    // 输入框
    onValueChange = (e)=>{
        this.setState({
            ...this.state,
            value: e.target.value
        });
    };

    // 视图显示和隐藏
    showView = ()=>{

        let { type, message, description} = this.state;

        switch (type) {
            case 'error':
                return (
                    <AlertView
                        type={type}
                        message={message}
                        description={description}
                        onTypeChange={this.onTypeChange}
                    />
                );
            case 'success':
                return(
                    <AlertView
                        type={type}
                        message={message}
                        description={description}
                        onTypeChange={this.onTypeChange}
                    />
                );
            default:
                return (
                    <div>
                        <h1>分类添加</h1>
                        分类的名称：
                        <Input
                            placeholder="请输入分类的名称"
                            value={this.state.value}
                            onChange={this.onValueChange}
                        />
                        <Button
                            type="primary"
                            style={{marginTop:'15px'}}
                            onClick={this.commitHandle}
                        >提交</Button>
                    </div>
                )
        }
    };

    // 数据
    getData = ()=>{
        getAPI('POST','admin/category/add',{name:this.state.value})
            .then(res=>{
                if (res.message === '保存成功'){

                    this.setState({
                        type:'success',
                        message:'保存成功',
                        description:'分类添加的内容保存成功',
                    });
                }else {
                    this.setState({
                        type:'error',
                        message:'出错了',
                        description:res.message,
                    })
                }
            })
            .catch(err=>console.log(err));
    };

    render() {
        return (
            <div style={{width:global.WIDTH, backgroundColor:'#fff'}} className='wrap'>
                <div style={{width:'100%', paddingLeft:'10px',paddingRight:'20px',marginTop:'20px'}}>
                    {this.showView()}
                </div>
            </div>
        )
    }
}
export default CategoryAdd;