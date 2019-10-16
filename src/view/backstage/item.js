import React from 'react';
import { Link } from 'react-router-dom';
import {Icon, Menu} from "antd";
const { SubMenu } = Menu;
class Item extends React.Component{

    rootSubmenuKeys = ['subCategory', 'subContent'];

    constructor(props){
        super(props);

        let { id, type } = this.props;
        let openKey = '';
        if (type === 'category'){
            openKey = 'subCategory';
        } else if (type === 'content'){
            openKey = 'subContent';
            if (id === 'add'){
                id = 'addContent';
            }
        }
        this.state = {
            openKeys: [openKey],
            itemKey: id, //Menu.Item选中key值
        }
    }

    // Menu.Item改变 key 的函数
    onKeyChange = key =>{

        this.setState({
            itemKey:key
        });

        // 当是用户管理和后台管理页面的时候关闭其他两个页面的子菜单
        if (key === 'user' || key === 'home'){
            this.setState({
                openKeys:[],
            })
        }
    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render() {

        return (
            <div>
                <Menu
                    mode="inline"
                    selectedKeys={[this.state.itemKey]}
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    style={{ width: 256, minHeight:'100vh' ,float:'left',}}
                    onClick={(key)=>{
                        // console.log(key);
                        let type = '', id = key.key;
                        if (key.keyPath[1] === 'subCategory') {
                            type = 'category';
                        }else if (key.keyPath[1] === 'subContent' && key.key ==='addContent') {
                            type = 'content';
                            id = 'add';
                        }
                        this.onKeyChange(key.key);
                        this.props.changeIdHandle(id, type);
                    }}
                >
                    <Menu.Item key="home">
                        <Icon type="home"/>
                        <span>后台管理</span>
                        <Link to='/backstage/home'/>
                    </Menu.Item>

                    <Menu.Item key="user">
                        <Icon type="user"/>
                        <span>用户管理</span>
                        <Link to='/backstage/user'/>
                    </Menu.Item>

                    <SubMenu
                        key="subCategory"
                        title={<span><Icon type="setting" /><span>分类管理</span></span>}
                    >
                        <Menu.Item key="category">
                            <Icon type="home" />
                            <span>分类首页</span>
                            <Link to='/backstage/category'/>
                        </Menu.Item>
                        <Menu.Item key="add">
                            <Icon type="plus" />
                            <span>分类添加</span>
                            <Link to='/backstage/category/add'/>
                        </Menu.Item>
                        {this.props.id === 'edit' && this.props.type === 'category' ? (
                            <Menu.Item key="edit">
                                <Icon type="edit" />
                                <span>分类编辑</span>
                                <Link to='/backstage/category/edit'/>
                            </Menu.Item>
                        ):<div></div>}
                    </SubMenu>

                    <SubMenu
                        key="subContent"
                        title={<span><Icon type="unordered-list" /><span>内容管理</span></span>}
                    >
                        <Menu.Item key="content">
                            <Icon type="home" />
                            <span>内容首页</span>
                            <Link to='/backstage/content'/>
                        </Menu.Item>
                        <Menu.Item key="addContent">
                            <Icon type="plus" />
                            <span>内容添加</span>
                            <Link to='/backstage/content/add'/>
                        </Menu.Item>
                        {this.props.id === 'edit' && this.props.type === 'content' ? (
                            <Menu.Item key="edit">
                                <Icon type="edit" />
                                <span>分类编辑</span>
                                <Link to='/backstage/category/edit'/>
                            </Menu.Item>
                        ):<div></div>}
                    </SubMenu>

                </Menu>
            </div>
        )
    }
}

export default Item