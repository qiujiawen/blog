import React from 'react';
import { Switch, Route ,Redirect } from 'react-router-dom';
import Index from '../view/home';
import Blog from '../view/blog/index';
import Backstage from '../view/backstage/index';

export default class RouteIndex extends React.Component{
    render(){
        return (
            <Switch>
                <Route path='/' exact render={()=><Redirect to='/index/user'/>}/>
                <Route path='/index/:id' component={Index}/>
                <Route path='/blog' exact render={()=><Redirect to='/blog/all'/>}/>
                <Route path='/blog/:id' component={Blog}/>
                <Route path='/backstage/:id' component={Backstage}/>
            </Switch>
        );
    }
} 