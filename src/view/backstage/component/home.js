import React from 'react';
class Home extends React.Component{
    render() {
        return(
            <div style={{width:global.WIDTH}} className='wrap'>
                <div style={{margin:"auto"}}>
                    <h1 style={{fontSize:'50px',fontWeight:'bold'}}>Hello, admin!</h1>
                    <p>欢迎进入我的后台管理</p>
                </div>
            </div>
        )
    }
}
export default Home;