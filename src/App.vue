<template>
  <div id='app'>
    <app-header
      :menus="menus"/>
    <div class='app-container'>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'app',
  components: {
    AppHeader
  },
  data () {
    return {
      menus: []
    }
  },
  mounted () {
    let userinfo = {
      id: 3,
      name: '用户c',
      role: 3
    }
    let menus = [
      {
        name: '项目',
        link: '/project/list'
      }, {
        name: '模板',
        link: '/template/project',
        children: [
          {
            name: '项目模板',
            link: '/template/projectlist'
          }, {
            name: '事件模板',
            link: '/template/eventlist'
          }, {
            name: '需求模板',
            link: '/template/demandlist'
          }
        ]
      }, {
        name: '管理',
        link: '/manage/sysuser',
        children: [
          {
            name: '系统成员',
            link: '/manage/sysuser'
          }, {
            name: '后台成员',
            link: '/manage/backuser'
          }
        ]
      }
    ]
    this.menus = menus
    this.$store.dispatch('setActiveUser', userinfo)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
.app-container{
  overflow-x: hidden;
  overflow-y: auto;
  padding:75px 100px 20px;
  max-width: 1280px;
  margin: 0 auto;
}
li.el-submenu>.el-submenu__title{
  height: 100% !important;
  line-height: 60px !important;
}
.link:hover{
  color: #20a0ff
}
.defaultCursor{
  cursor: default;
}
.pointerCursor{
  cursor: pointer;
}
.el-container{
}
.el-main{
  background-color: white;
}
.el-header{
  height: 50px !important;
  background-color: white;
}
.el-header>.title{
  padding-top:10px;
  font-size: 30px !important;
}
</style>
