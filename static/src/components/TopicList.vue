<template>
  <scroller lock-x scrollbar-y use-pullup :pullup-config="pullupConfig" height="-46" @on-pullup-loading="loadMoreData" ref="pullup">
    <div>
      <!-- topiclist-name={{name}}
       <p>{{lists}}</p> -->
      <group>
        <cell :is-link="true" :link="'/topic/'+item.id" v-for="(item,index) in lists" :key="index" :title="item.title">
        <span slot="title" class="cell-title">
<!--          头像-->
          <span slot="icon" class="author_avatar">
            <img :src="item.author.avatar_url" alt="">
          </span>
          <!--          回复数-->
          <span class="reply_count">{{item.reply_count}}</span>
          /
          <!--          点击数-->
          <span class="visit_count">{{item.visit_count}}</span>
          <!--          判断是否置顶-->
          <span v-if="item.top" class="top">置顶</span>
          <span v-else class="tab">{{item.tab}}</span>
          <!--          标题-->
          <span>{{item.title}}</span>
        </span>
        </cell>
      </group>
    </div>
  </scroller>

</template>
<script>
  import {Group, Cell, Scroller} from 'vux'

  export default {
    name: 'topiclist',
    props: ['name'],
    components: {
      Group,
      Cell,
      Scroller
    },
    data: function () {
      return {
        lists: [],
        page: 1,
        limit: 10,
        //上拉杀心组件配置信息
        pullupConfig: {
          content: '上拉加载更多',
          downContent: '松开进行加载',
          upContent: '上拉加载更多',
          loadingContent: '加载中...'
        }
      }
    },
    methods: {
      //上拉加载更多数据
      loadMoreData: function () {
        var app = this;
        //发送ajax请求
        this.$http.get('/topics', {
            params: {
              tab: this.name,
              page: this.page + 1,
              limit: this.limit
            }
          }
        ).then(function (response) {
          //console.log(response.data.data)
          //异步请求，this不能指代当前组件
          //push末尾追加
          // app.lists.push(response.data.data.length;i++)
          for (var i=0;i<response.data.data.length;i++){
            app.lists.push(response.data.data[i]);
          }
        })
        //手动结束上一次的上拉加载
        //父组件获取子组件借助refs
        app.$refs.pullup.donePullup();
      }
    },
    // ajax可以在生命周期created中调用，但是动态路由之间跳转需要watch监听
    //ajax 导航守卫也可以使用 进入之前是beforeRouteEnter   切换时beforeRouteEnter
    //在动态路由组件调用ajax时，常用导航守卫
    beforeRouteEnter: function (to, from, next) {
      //beforeRouteEnter 是进入组件之前的回调函数，不能使用this指代当前组件
      //to表示待进入的路由组件
      //from表示离开的路由组件
      //next[一定要写]表示执行下一步操作
      next(function (vm) {
        // vm表示当前组件的实例对象
        vm.$http.get('/topics', {
          params: {
            tab: to.params.name,
            page: vm.page,
            limit: vm.limit
          }

        }).then(function (response) {
          //response 表示响应消息对象
          //response.data 表示响应消息主题
          // console.log(response.data.data)
          if (response.data.success) {
            vm.lists = response.data.data
          }
        })
      })

    },
    //动态路由切换时导航守卫
    beforeRouteUpdate: function (to, from, next) {
      var app = this;
      //可以使用this表示当前组件对象
      this.$http.get('/topics', {
        params: {
          tab: to.params.name,
          page: this.page,
          limit: this.limit
        }
      }).then(function (response) {
        if (response.data.success) {
          //ajax是异步请求 此时this不是当前组件对象
          app.lists = response.data.data
        }
      })

      //执行下一步
      next();

    }
  }

</script>
<style>
  .cell-title {
    font-size: 0.8em;
  }

  .cell-title .reply_count {
    color: #9e78c0;
  }

  .cell-title .visit_count {
    color: #b4b4b4;
  }

  .cell-title .top {
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
  }

  .cell-title .tab {
    background: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 12px;
  }

  .author_avatar img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
    margin-right: 5px;
  }
</style>
