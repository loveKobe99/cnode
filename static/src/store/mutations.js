const mutations={
  //actionsheet显示操作
  mutationsIsShowMoreMenus:function (state,payload) {
    //state表示当前store对象的状态数据
    //payload表示调用函数时传入的数据
    state.isShowMoreMenus = payload;
  },
  //用户登录操作
  mutationLogin:function (state,payload) {
    state.isLogined=payload;
  }
};
export default mutations
