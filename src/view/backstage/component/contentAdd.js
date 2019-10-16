import React from 'react';
import {Button, Input, Select} from 'antd';
import AlertView from './alert';
import { getAPI,cookie } from '../../../public/public';
const { Option } = Select;

class ContentAdd extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            type:'',            //弹出窗的类型
            message:'',         //弹出窗的提示
            description:'',     //弹出窗的描述
            value:'',           //输入框的值
            categoriesData:[],  //分类名称的信息
            selectValue:'',     //下拉框的值
            selectID:'',        //选中分类信息的id
            textareaValue:'',   //简介的值
            contentValue:'',    //内容的值
            userId:cookie().get('userId'), //用户ID
        };
    }

    // 初始化数据
    componentWillMount() {
        getAPI('GET', 'admin/content/category','')
            .then(res=>{
                this.setState({
                    categoriesData: res.data,
                    selectValue: res.data[0].name,
                    selectID: res.data[0]._id
                })
            }).catch(err=>console.log(err));
    }

    // 更新数据
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state.selectID !== nextState.selectID){
            this.getCategoryData();
            return false;
        }
        return true;
    }

    // 弹出窗返回到内容添加页面
    onTypeChange = ()=>{
        this.setState({
            type:'',            //弹出窗的类型
            message:'',         //弹出窗的提示
            description:'',     //弹出窗的描述
            value:'',           //输入框的值
            selectID:'',        //选中分类信息的id
            textareaValue:'',   //简介的值
            contentValue:'',    //内容的值
        })
    };

    // 提交事件
    commitHandle = ()=>{

        /**
         *  过滤是否请求参数有任一个为空，全部不为空才请求数据
         */
        let { value, textareaValue, contentValue, userId} = this.state;

        if (!value || !textareaValue || !contentValue || !userId){
            let message = '';
            if (!value) message = '标题不能为空';
            else if (!textareaValue) message = '简介不能为空';
            else if (!contentValue) message = '内容不能为空';
            else if (!userId) message = '用户过期，请重新登录';

            this.setState({
                type:'error',
                message:'出错了',
                description:message
            })
        }else {
            this.getData();
        }
    };

    // 输入框
    onValueChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    // 视图显示和隐藏
    showView = ()=>{

        let { type, message, description, categoriesData} = this.state;

        if (!categoriesData[0]) return ;

        // 下拉框处理函数
        const handleChange = (value,key)=> {
            this.setState({
                selectValue: value,
                selectID:key.key
            });
        };

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
                        <h1>内容添加</h1>
                        <div>
                            分类：
                            <Select
                                defaultValue = {this.state.selectValue}
                                style={{ width: '100%' }}
                                onChange={handleChange}
                            >
                                {categoriesData.map(item=>{
                                    return <Option key = {item._id} value = {item.name}>{item.name}</Option>
                                })}
                            </Select>
                        </div>
                        <div>
                            标题：
                            <Input
                                placeholder="请输入标题"
                                autoFocus={'autofocus'}
                                value={this.state.value}
                                onChange={this.onValueChange}
                                name={'value'}
                            />
                        </div>
                        <div style={{marginTop: '15px'}}>
                            简介：
                            <textarea
                                rows="3"
                                name='textareaValue'
                                placeholder="请输入简介..."
                                className={'textarea'}
                                onChange={this.onValueChange}
                            >
                            </textarea>
                        </div>
                        <div style={{marginTop: '15px'}}>
                            内容：
                            <textarea
                                rows="5"
                                name='contentValue'
                                placeholder="请输入内容..."
                                className={'textarea'}
                                onChange={this.onValueChange}
                            >
                            </textarea>
                        </div>
                        <Button
                            type="primary"
                            style={{marginTop:'15px'}}
                            onClick={this.commitHandle}
                        >提交</Button>
                    </div>
                )
        }
    };

    // 保存数据的API
    getData = ()=>{

        // 提交数据
        let {value, textareaValue, contentValue,selectID, userId} = this.state;
        getAPI('POST','admin/content/add',{
            category: selectID,
            title:value,
            description:textareaValue,
            content:contentValue,
            user:userId
        })
            .then(res=>{
                if (res.message === '内容保存成功'){
                    this.setState({
                        type:'success',
                        message:'保存成功',
                        description:'内容保存成功',
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

    // 获取下拉选择的数据
    getCategoryData = ()=>{
        getAPI('GET', 'admin/content/category','')
            .then(res=>{
                this.setState({
                    categoriesData: res.data,
                })
            }).catch(err=>console.log(err));
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

export default ContentAdd;