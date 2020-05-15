import Vue from 'vue';
import VueRouter from 'vue-router';
import TestVux from "../components/TestVux";
//@表示src路径
import TopicList from "../components/TopicList";
import Login from '@/components/Login';
import Center from '@/components/Center';
import News from '@/components/News';
import Logout from '@/components/Logout';
import Topic from "@/components/Topic";

//全局注册
Vue.use(VueRouter);

//定义路由信息对象
const routes = [
  {path: '/', redirect: '/topiclist/all'},
  // {path: '/testvux', component: TestVux, name: 'testvux'},
  {path: '/topiclist/:name', component: TopicList, name: 'topiclist', props: true},
  //详情页面
  {path: '/topic/:id', component: Topic, props: true},
  //登录页面
  {path: '/Login', component: Login},
  //个人中心
  {path: '/Center', component: Center},
  //消息通知
  {path: '/News', component: News},
  //登出
  {path: '/Logout', component: Logout},


]

//创建路由管理器
const router = new VueRouter({
  routes
})

//对外输出
export default router;
