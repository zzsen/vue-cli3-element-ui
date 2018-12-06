<template>
  <div class="layer">
    <div
      class="side-layer"
      @click="$emit('close')"
      v-show="show">
    </div>
    <transition
      name="slide"
      @before-enter="$emit('transition', 'beforeEnter')"
      @after-enter="$emit('transition', 'afterEnter')"
      @before-leave="$emit('transition', 'beforeLeave')"
      @after-leave="$emit('transiton', 'afterLeave')">
      <div
        class="side-content"
        v-show="show"
        :style="{width: width + 'px'}">
        <div class="side-head">
          <slot name="head"></slot>
        </div>
        <div class="side-body">
          <slot name="body"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Layer',
  props: {
    closable: { type: Boolean, default: true },
    show: { type: Boolean, default: false },
    loading: { type: Boolean, default: true },
    width: [Number, String]
  }
}
</script>

<style lang="scss" scoped>
  .layer{
    background-color: #eee;
  }
  .side-layer{
    cursor: pointer;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 98;
    background-color: rgba(0, 0, 0, .1)
  }
  .side-content{
    position: fixed;
    right: 0;
    bottom: 0;
    width: auto;
    z-index: 99;
    height: 100%;
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
  .slide-enter-active,
  .slide-leave-active{
    transition: all ease .3s;
    transform: translate3d(0, 0, 0);
    // box-shadow: -4px 0px 10px #bbb;
  }
  .slide-enter,
  .slide-leave-to{
    transform: translate3d(100%, 0, 0);
  }
</style>
