import React from 'react';
import Item from './item';
import { withRouter } from 'react-router-dom';
import Home from './component/home';
import User from './component/user';
import CategoryHome from './component/categoryHome';
import CategoryAdd from './component/categoryAdd';
import CategoryEdit from './component/categoryEdit';
import ContentAdd from './component/contentAdd';
import ContentHome from './component/contentHome';
import ContentEdit from './component/contentEdit';

class Content extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            id: this.URLHandle().id,  //URL中'add'字段
            type: this.URLHandle().type,
        };
    };

    // 处理URL
    URLHandle = ()=>{
        let arr = this.props.history.location.pathname.split('/');
        let aFilter = arr.filter((item)=>{
            return item === 'category' || item === 'content';
        });
        return {
            id : arr[arr.length -1],
            type : aFilter[0]
        };
    };

    changeIdHandle = (id,type)=>{
        this.setState({id,type})
    };

    // 根据 URL展示不同的视图
    showComponent = ()=>{

        //  判断URL中是category还是content
        const type = this.state.type;
        const addShow = ()=>{
            if (type === 'category') {
                return <CategoryAdd/>;
            }else if (type === 'content') {
                return <ContentAdd/>
            }
        };

        const editShow = ()=>{
            if (type === 'category') {
                return <CategoryEdit/>;
            }else if (type === 'content') {
                return <ContentEdit/>
            }
        };

        // 展示不同的组件
        switch (this.state.id) {
            case 'user':
                return <User/>;
            case 'category':
                return <CategoryHome/>;
            case 'content':
                return <ContentHome/>;
            case 'add':
                return addShow();
            case'edit':
                return editShow();
            default :
                return <Home/>
        }
    };

    render() {
        return (
            <div>
                <Item {...this.state} changeIdHandle = {this.changeIdHandle}/>

                {/*后台管理视图展示*/}
                {this.showComponent()}
            </div>
        );
    }
}
export default withRouter(Content);