<template>
  <div class="file-content">
    <layer
      :show="show"
      @close="$emit('close')"></layer>
    <transition name="fileContent"
      @before-enter="$emit('transition','beforeEnter')"
      @after-enter="$emit('transition','afterEnter')"
      @before-leave="$emit('transition','beforeLeave')"
      @after-leave="$emit('transition','afterLeave')">
      <el-card
        class="fileContent-body"
        :style="{height: height + 'px', width: width + 'px'}"
        v-show="show">
        <div slot="header">
          {{filename}}
          <el-button
            style="float: right; padding: 3px 0"
            type="text">
            <i
              class="el-icon-close"
              @click="$emit('close')"></i>
          </el-button>
        </div>
        <div class="content-body" v-html="filecontent">
        </div>
      </el-card>
    </transition>
  </div>
</template>

<script>
import Layer from '@/components/Layer'
export default {
  name: 'FileContent',
  components: {
    Layer
  },
  props: {
    show: { type: Boolean, default: false },
    width: { type: Number, default: 500 },
    height: { type: Number, default: 500 },
    filename: { type: String, default: '阿斯dad撒' },
    filecontent: { type: String, default: '阿斯dad撒' }
  },
  computed: {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang='scss' scoped>
.file-content {
  position: relative;
  overflow: hidden;
}
.fileContent-body {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: auto;
  margin: auto 0;
  z-index: 99;
  height: 800px;
  background-color: #f5f5f5;
  overflow-y: auto;
  .el-card__header {
    position: relative;
  }
}
.fileContent-enter-active,
.fileContent-leave-active {
  transition: all ease .3s;
  transform: translate3d(0, 0, 0)
}
.fileContent-enter,
.fileContent-leave-to {
  transform: translate3d(100%, 0, 0)
}
</style>
