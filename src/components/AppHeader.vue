<template>
  <div class='app-header'>
    <h1 class='logo' @click="$router.push('/')">Project<span class='logo-label'>Admin</span></h1>
    <el-menu
      :router="true"
      :default-active="activeIndex"
      class="el-menu-demo header-menu"
      mode="horizontal"
      @select="handleSelect">
      <div
        v-for="menu in menus"
        :key="menu.name"
        class='el-menu-demo body-menu el-menu--horizontal el-menu'>
        <el-menu-item
        :index="menu.link"
        v-if="!menu.children || !menu.children.length">
          {{menu.name}}
        </el-menu-item>
        <el-submenu :index="menu.link" v-if="menu.children && menu.children.length">
          <template slot="title"><span>{{menu.name}}</span></template>
          <el-menu-item v-for="child in menu.children" :index="child.link" :key="child.name">{{child.name}}</el-menu-item>
        </el-submenu>
      </div>
    </el-menu>

    <div class='info'>
      <div class='userinfo'>
        <i class='mdi mdi-account'/>
        {{activeUser.name}}
        <i class='mdi mdi-logout-variant logout link'/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppHeader',
  props: ['menus'],
  data () {
    return {
      activeIndex: '/'
    }
  },
  computed: {
    ...mapGetters([ 'activeUser' ])
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.app-header {
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: white;
  z-index: 999;
  line-height: 60px;
  top: 0;
  left: 0;
}
.logo {
  float: left;
  margin: 0 0 0 100px;
  font-size: 2em;
  &:hover {
    text-shadow: 4px 3px 5px #ccc;
  }
  .logo-label {
    background-color: #20a0ff;
    font-size: 12px;
    height: 20px;
    position: relative;
    top: -4px;
    line-height: 20px;
    padding: 2px 5px;
    border-radius: 3px;
    margin-left: 10px;
  }
}
.header-menu {
  height: 59px;
  float: left;
  left: 10%;
  background-color: darkgrey;
  .body-menu {
    height: 100%;
    float: left;
    line-height: 60px;
    .el-menu-item,.el-submenu{
      height: 100% !important;
      line-height: 60px !important;
      min-width: 80px;
    }
  }
}
.info {
  position: absolute;
  right: 100px;
  font-size: 14px;
  .logout {
    margin-left: 10px;
  }
}
</style>
