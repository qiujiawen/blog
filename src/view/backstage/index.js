import React from 'react';
import HeaderView from '../public/header';
import Content from './content';
export default class Backstage extends React.Component{
    render(){
        return (
            <div>
                <HeaderView/>
                <Content/>
            </div>
        )
    }
}