<template>
  <div id="app">
    <div class="nav">
      <p class="intro">
        金蚕网云智能管理平台
      </p>
      <ul>
        <li class="nav_li" v-for="(item,index) in nav" :key="index" :class="{nav_active_li:nav_active_index==index}" @click="navLiClick(index)">
          <div class="nav_li_point" :class="{nav_active_point:nav_active_index==index}"></div>
          <p>
            <Icon :type="item.icon" size="15" style="margin-right:10px;"/>{{item.name}}
          </p>
        </li>
      </ul>
    </div>
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      nav_active_index:0,
      nav:[
        {
          icon:'ios-home',
          name:'主页',
        },
        {
          icon:'md-partly-sunny',
          name:'蚕室环境检测与控制系统',
        },
        {
          icon:'ios-egg',
          name:'自动饲喂监控系统',
        },
        {
          icon:'ios-medical',
          name:'疾病防疫系统',
        },
        {
          icon:'md-contacts',
          name:'交易信息系统',
        },
      ]
    }
  },
  methods: {
    navLiClick(index){
      this.nav_active_index=index;
      switch(index){
        case 0:
          this.$router.push('/');
          break;
        case 1:
          this.$router.push('/environment');
          break;
      }
    }
  },
}
</script>

<style>
@import url('./APP.css');
</style>
