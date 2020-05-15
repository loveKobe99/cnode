import axios from 'axios';
//axios发送ajax请求
//1.直接使用axios函数
//2.借助辅助函数
//3.创建实例对象
const request = axios.create({
  baseURL:' https://cnodejs.org/api/v1'
})

export default request;
