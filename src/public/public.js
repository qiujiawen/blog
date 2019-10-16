/**
 *  公共的方法和定义全局变量
 */
const URL = 'http://localhost:9191/api/';   //后台URL
global.baseURL = 'http://localhost:3000';   //页面URL
global.WIDTH = `${window.screen.availWidth-256}px`; //视图右侧内容宽度
global.userId = '';

/**
 * 封装 fetch 去请求接口
 * @param method    请求方法的类型
 * @param baseURL   请求的路径
 * @param oBody     请求的需要的数据
 * @returns {Promise<any>}
 */
export const getAPI = (method, baseURL, oBody)=> {

    if (method === 'GET'){
        return new Promise((resolve, reject)=>{
            fetch(
                `${URL}${baseURL}`,
                {
                    method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                })
                .then(response=>response.json())
                .then(data=>resolve(data))
                .catch(err=>reject(err));
        })
    } else {
        return new Promise((resolve, reject)=>{
            fetch(`${URL}${baseURL}`,{
                method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(oBody)
            })
                .then(response=>response.json())
                .then(data=>resolve(data))
                .catch(err=>reject(err))

        })
    }

};

export const cookie = () =>{

    const set = (key, value, t)=>{
        const date = new Date();
        date.setDate(date.getDay() + t);
        document.cookie = key + '=' + encodeURI(value) + ';expires' + date.toGMTString()+';path=/';
    };

    const get = (key)=>{
        let arr = document.cookie.split(';');
        for (let i = 0; i < arr.length; i++){
            let arr1 = arr[i].split('=');
            if (arr1[0].trim() === key){
                return decodeURI(arr1[1]);
            }
        }
    };

    return {set,get};

};

/**
 * 格式化时间
 * @param time
 * @returns {string}
 */
export const formatDate = (time)=>{
    let date = new Date(time);
    let year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    let newTime = year + '-' +
        month + '-' +
        day + ' ' +
        hour + ':' +
        min + ':' +
        sec;
    return newTime;
};
