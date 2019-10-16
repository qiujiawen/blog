import React from 'react';
import { withRouter } from 'react-router-dom';
import HeaderView from '../public/header';
import {Menu} from "antd";
import {Link} from "react-router-dom";
import CardComponent from './component/card';
import Comment from './component/comment';
import {getAPI} from '../../public/public';

class Blog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categoryData:[],    //分类信息
            type:'',            //item选中的key值,
            name:'all',         //item选中的name
            open:true,         //详情页和内容页的切换
        }
    };

    componentWillMount() {

        const name = this.props.match.params.id;
        getAPI('GET','blog/category','')
            .then(res=>{
                if(res.message === '查询成功'){

                    this.setState({categoryData: res.data});
                    res.data.forEach(item=>{
                        if (item.name === name){
                            this.setState({
                                name: item._id,
                                type: item._id,
                            });
                        }
                    });
                }
            })
            .catch(err=>console.log(err));

        // 根据URL的id判断显示不同的组件
        if (name.length === 24){
            this.setState({open: false});
        } else this.setState({open: true});
    };

    showViews = ()=>{
        if (!this.state.categoryData) return (<div></div>);
        return this.state.categoryData.map(item=>{
            return (
                <Menu.Item key={item._id}>
                    <span>{item.name}</span>
                    <Link to={`/blog/${item.name}`}/>
                </Menu.Item>
            )
        });
    };

    onChangeOpen = ()=>{
        this.setState({open: false});
    };

    render(){
        // console.log(this.props.match.params.id);
        return(
            <div>
                {/*头部信息*/}
                <HeaderView/>

                <div style={{display:"flex", flexDirection:'row'}}>
                    {/*左侧视图*/}
                    <div>
                        <Menu
                            selectedKeys={[this.state.name]}
                            mode="inline"
                            style={{width:'256px',minHeight:'100vh', height:'100%'}}
                            onClick={item=>{
                                this.setState({
                                    type: item.key,
                                    name: item.key,
                                    open: true
                                });
                            }}
                        >
                            <Menu.Item key='all'>
                                <span>全部</span>
                                <Link to={'/blog/all'}/>
                            </Menu.Item>
                            {this.showViews()}
                        </Menu>
                    </div>

                    {/*右侧视图*/}
                    <div style={{minHeight:'100vh', width:'100%', backgroundColor:'#ebebeb'}}>
                        {this.state.open ? (
                            <CardComponent type={this.state.type} onChangeOpen={this.onChangeOpen}/>
                        ):(
                            <Comment/>
                        )}
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(Blog);