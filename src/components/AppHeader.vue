<template>
  <div class='app-header'>
    <h1 class='logo' @click="$router.push('/')">Project<span class='logo-label'>Admin</span></h1>
    <el-menu
      class="el-menu-demo header-menu"
      mode="horizontal"
      :default-active="$route.path"
      :router="true"
      @select="handleSelect">
      <div
        class="el-menu-demo body-menu el-menu--horizontal el-menu"
        v-for="menu in menus"
        :key="menu.name">
        <el-menu-item
          v-if="!menu.children || !menu.children.length"
          :index="menu.link">
          {{menu.name}}
        </el-menu-item>
        <el-submenu v-if="menu.children && menu.children.length" :index="menu.link">
          <template slot="title"><span>{{menu.name}}</span></template>
          <el-menu-item
            v-for="child in menu.children"
            :index="child.link"
            :key="child.name">
            {{child.name}}
          </el-menu-item>
        </el-submenu>
      </div>
    </el-menu>

    <div class="info">
      <div class="userinfo">
        <i class="mdi mdi-account"/>
          {{activeUser.name}}
        <i class="mdi mdi-logout-variant logout link"/>
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
  background-color: white;
  height: 60px;
  left: 0;
  line-height: 60px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
}
.logo {
  float: left;
  font-size: 2em;
  margin: 0 0 0 100px;
  &:hover {
    text-shadow: 4px 3px 5px #ccc;
  }
  .logo-label {
    background-color: #20a0ff;
    border-radius: 3px;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    margin-left: 10px;
    padding: 2px 5px;
    position: relative;
    top: -4px;
  }
}
.header-menu {
  background-color: darkgrey;
  float: left;
  height: 59px;
  left: 10%;
  .body-menu {
    float: left;
    height: 100%;
    line-height: 60px;
    .el-menu-item,.el-submenu{
      height: 100% !important;
      line-height: 60px !important;
      min-width: 80px;
    }
  }
}
.info {
  right: 100px;
  font-size: 14px;
  position: absolute;
  .logout {
    margin-left: 10px;
  }
}
</style>
