<template>
  <Actionsheet v-model="show" @on-click-menu="myclick" :menus="menus" show-cancel theme="ios"></Actionsheet>
</template>

<script>
  import {Actionsheet} from 'vux';
  export default {
    components: {
      Actionsheet
    },
    data: function () {
      return {
        show: true,
        menus: {
          menu1: '北京烤鸭',
          menu2: '陕西油泼面',
          menu3: '西安肉夹馍'
        }
      }
    },
    methods:{
      myclick:function (menukey,menuitem) {
        console.log('menukey='+menukey);
        console.log('menuitem='+menuitem);
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
