import React from 'react';
import {Alert, Button} from "antd";
export default class AlertView extends React.Component{
    render() {
        let { message, type, description } = this.props;
        return (
            <div>
                <Alert
                    message={message}
                    description={description}
                    type={type}
                    showIcon
                />
                <Button
                    type="primary"
                    style={{marginTop:'15px'}}
                    onClick={this.props.onTypeChange}
                >返回</Button>
            </div>
        )
    }
}