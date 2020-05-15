//vue状态管理
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from "./mutations";
import actions from "./actions";

//全局注册
Vue.use(Vuex);

//创建Store对象
const store = new Vuex.Store({
  //数据放在state中便于共享
  //状态数据
  state: {
    topics: [
      {name: 'all', desc: '全部', selected: true},
      {name: 'good', desc: '精华', selected: false},
      {name: 'share', desc: '分享', selected: false},
      {name: 'ask', desc: '问答', selected: false},
      {name: 'job', desc: '招聘', selected: false},
      {name: 'dev', desc: '客户端测试', selected: false}
    ],
    //actionsheet菜单
    //用户未登录时显示登陆
    unLoginedMoreMenus: {
      Login: '登陆',
      registered: '注册'
    },
    //用户已经登陆显示登出
    loginedMoreMenus: {
      center: '个人中心',
      News: '消息通知',
      Logout: '登出'
    },
    //登陆状态
    isLogined: false,
    //actionSheet显示与变量
    isShowMoreMenus: false,
  },
  //状态数据计算属性
  getters: {
    moreMenus: function (state) {
      if (state.isLogined) {
        //用户已登录
        return state.loginedMoreMenus;
      }
      return state.unLoginedMoreMenus;
    }
  },
//修改同步数据的函数
  mutations,
  //异步数据
  actions
})

//对外输出
export default store;
