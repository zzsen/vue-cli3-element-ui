<template>
  <div class="collapse-card">
    <div
      class="collapse-card-header"
      @click="()=>{show = !show}">
      123
      <i class="mdi mdi-chevron-left" :class="show ? 'arrow arrow-down' : 'arrow arrow-left'"/>
    </div>
    <div
      class="collapse-card-body"
      :class="show ? 'collapse-open' : 'collapse-close'">
      1<br>
      2<br>
      3<br>
      4<br>
      5<br>
      6<br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layer',
  props: {
    show: { type: Boolean, default: true }
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
      overflow-y: scroll;
    }
  }
  .arrow {
    float: right;
  }
  .arrow-left {
    transition: all ease .3s;
    transform:rotate(-180deg);
  }
  .arrow-down{
    transition: all ease .3s;
    transform:rotate(-90deg);
  }

  .collapse-open {
    transition: all ease .3s;
    max-height: 5000px;
  }
  .collapse-close {
    transition: all ease .3s;
    max-height: 0;
  }
</style>
