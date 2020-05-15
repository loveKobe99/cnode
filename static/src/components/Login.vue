<template>
  <div>
    <h5>用户登录</h5>
    <group>
      <x-input v-model="accesstoken" placeholder="Access Token"></x-input>
    </group>
    <!--    在组件中执行@click事件，需要添加事件修饰符.native[监听的原生修饰符]-->
    <x-button @click.native="dologin" style="margin-top: 10px" type="primary">登录</x-button>
  </div>
</template>

<script>
  import {XInput, Group, XButton} from 'vux';
  import {mapMutations} from 'vuex';
  export default {
    name: "Login",
    components: {
      XInput,
      Group,
      XButton
    },
    data: function () {
      return {
        accesstoken: ''
      }
    },
    methods: {
      ...mapMutations(['mutationLogin']),
      //点击执行登录操作
      dologin: function () {
        //console.log('点击事件已经执行')
        var app=this;
        this.$http.post('/accesstoken', {
          accesstoken: this.accesstoken
        }).then(function (response) {
          // console.log(response.data);
          if(response.data.success){
            app.mutationLogin(true);
            //实现页面跳转
            app.$router.push('/user/'+response.data.loginname);
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
