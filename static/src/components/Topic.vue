<template>
  <div v-if='topic'>
    <!--    topicid={{id}}-->
    <!--    <h1>{{topic.title}}</h1>-->
    <!--    <p>作者：{{topic.author.loginname}} · {{topic.visit_count}}次浏览</p>-->
    <!--    <div v-html="topic.content"></div>-->


    <!--    h5语义化标签-->
    <article class="weui-article">
      <h1>{{topic.title}}</h1>
      <section>
        <span>作者：{{topic.author.loginname}}</span>
        ·
        <span>{{topic.visit_count}}次浏览</span>
        ·
        <span>来自- <a :href="'/#/topiclist/'+topic.tab">{{topic.tab}}</a></span>
      </section>
      <section v-html="topic.content"></section>
    </article>
    <!--    评论列表-->
    <group>
      <cell-box v-for="(item,index) in topic.replies" :key="index">
        <flexbox>
          <flexbox-item :span="1/8">
            <img :src="item.author.avatar_url" alt="" style="width: 30px;height: 30px;">
          </flexbox-item>
          <flexbox-item :span="6/8">
            <section>
              <div>
                {{item.author.loginname}}
                {{index+1}}楼
              </div>
              <div v-html="item.content"></div>
            </section>
          </flexbox-item>
          <flexbox-item :span="1/8">
            <span>
              💖
              {{item.ups.length}}
            </span>
            <span v-if="isLogined">
              💬
            </span>
          </flexbox-item>
        </flexbox>
      </cell-box>
    </group>
  </div>
</template>

<script>
  import {CellBox, Group, Flexbox, FlexboxItem,} from "vux";
  import {mapState} from 'vuex';

  export default {
    name: 'topic',
    props: ['id'],
    components: {
      CellBox,
      Group,
      Flexbox,
      FlexboxItem,
    },
    computed: {
      ...mapState(['isLogined']),
    },
    data: function () {
      return {
        topic: null,
      }
    },
    // 借助导航守卫
    beforeRouteEnter: function (to, from, next) {
      next(function (vm) {
        vm.$http.get("/topic/" + to.params.id).then(function (response) {
          // console.log(response.data)
          vm.topic = response.data.data;
        })
      })
    },
    beforeRouteUpdate: function (to, from, next) {
      var app = this;
      next(function (vm) {
        vm.$http.get("/topic/" + to.params.id).then(function (response) {
          app.topic = response.data.data;
        })
      })
    }
  }
</script>
<style lang="less">
  @import "~vux/src/styles/weui/weui";
</style>
