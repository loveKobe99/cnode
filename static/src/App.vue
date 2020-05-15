<template>
  <div id="app">
    <div id="title">
      <x-header :right-options="{showMore: true}" @on-click-more="showMoreMenus" style="background-color: #444444">CNode社区移动端</x-header>
      <actionsheet @on-click-menu="handleClickMoreMenu" :menus="moreMenus" v-model="isShowMoreMenus"></actionsheet>
      <!--      <router-link to="/topiclist/all">全部</router-link>-->
      <!--      <router-link v-for="(item,index) in topics" :key="index" :to="'/topiclist/'+item.name">{{item.desc}}</router-link>-->
      <tab>
        <tab-item @on-item-click="routeto" v-for="(item,index) in topics" :selected='$route.path=="/topiclist/"+item.name' :key="index">
          {{item.desc}}
        </tab-item>
      </tab>
      <!--      <button-tab>-->
      <!--        <button-tab-item @on-item-click="routeto" v-for="(item,index) in topics" :selected="item.selected" :key="index">-->
      <!--          {{item.desc}}-->
      <!--        </button-tab-item>-->
      <!--      </button-tab>-->
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {Tab, TabItem, XHeader, Actionsheet, ButtonTab, ButtonTabItem} from 'vux'
  import {mapState, mapGetters } from 'vuex';

  export default {
    name: 'app',
    components: {
      Tab,
      TabItem,
      XHeader,
      Actionsheet,
      // ButtonTab,
      // ButtonTabItem
    },
    data: function () {
      return {}
    },
    computed: {
      //状态数据获取，建议放在computed里面
      //方法一：this.$store.state.属性名
      //方法二：借助mapState
      //...是es6语法
      ...mapState(['topics', 'unLoginedMoreMenus', "loginedMoreMenus", 'isLogined']),
      ...mapGetters(['moreMenus']),
      isShowMoreMenus: {
        set: function (navl) {
          //触发mutation函数，修改状态数据
          this.$store.commit('mutationsIsShowMoreMenus', navl)
        },
        get: function () {
          return this.$store.state.isShowMoreMenus;
        }
      },

    },
    methods: {
      // routeto:function () {
      //点击路由链接时，实现路由跳转
      routeto(index) {
        // index参数表示当前点击tab项在整个tab的位置下标（序号）
        // console.log('index=' + index);
        // 通过下标试下编程路由
        this.$router.push('/topiclist/' + this.topics[index].name)
      },
      //点击xheader时右侧时显示actionsheet菜单
      showMoreMenus() {
        // 状态数据，不能直接修改，必须通过mutations修改
        this.isShowMoreMenus = true;
      },
      //点击actionsheet跳转到对应页面
      handleClickMoreMenu(menuKey, meniItem) {
        console.log("menukey=" + menuKey)
        //路由跳转到对应页面
        this.$router.push('/' + menuKey);
      }
    },
      // 组件创建成功后获取本地存储数据
  created:function(){
      
  }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  body {
    background-color: #fbf9fe;
  }


</style>
