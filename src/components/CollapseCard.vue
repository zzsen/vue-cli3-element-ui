<template>
  <div class="collapse-card">
    <div
      class="collapse-card-header"
      @click="()=>{show = !show}">
      123
      <i class="mdi mdi-chevron-left" :class="show ? 'arrow arrow-down' : 'arrow arrow-left'"/>
    </div>
    <transition
      name="collapse-transition"
      @before-enter="$emit('transition', 'beforeEnter')"
      @after-enter="$emit('transition', 'afterEnter')"
      @before-leave="$emit('transition', 'beforeLeave')"
      @after-leave="$emit('transiton', 'afterLeave')">
      <div
        class="collapse-card-body"
        v-show="show"
        :style="{width: width + 'px'}">
        1<br>
        2<br>
        3<br>
        4<br>
        5<br>
        6<br>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Layer',
  props: {
    show: { type: Boolean, default: true },
    width: { type: Number, default: 700 }
  }
}
</script>

<style lang="scss" scoped>
  .collapse-card {
    background-color: #eee;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    max-width: 800px;
    position: relative;
    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
    }
    .collapse-card-header {
      padding: 20px;
    }
    .collapse-card-body {
      background-color: #eee;
      padding: 20px;
    }
  }
  .arrow {
    float: right;
  }
  .arrow-left {
    transition: all ease 3s;
    transform:rotate(-180deg);
  }
  .arrow-down{
    transition: all ease 3s;
    transform:rotate(-90deg);
  }
  .side-content{
    position: fixed;
    right: 0;
    bottom: 0;
    width: auto;
    z-index: 99;
    height: 100vh;
    background-color: #f5f5f5;
    overflow-y: auto;
    .side-close{
      cursor: pointer;
      margin-right: 10px;
      font-size: 12px;
      position: absolute;
      right: 10px;
      top: 19px;
      color: #95a2b7;
    }
    .sperate-line{
      margin: 10px 0;
    }
  }
  .collapse-transition-enter-active,
  .collapse-transition-leave-active{
    transition: all ease 3s;
    transform: translate3d(0, 0, 0);
    // box-shadow: -4px 0px 10px #bbb;
  }
  .collapse-transition-enter,
  .collapse-transition-leave-to{
    transform: translate3d(0, 100%, 0);
  }
</style>
