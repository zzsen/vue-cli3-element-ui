<template>
  <div class="side-detail">
    <layer
      :show="show"
      :width="700"
      @close="$emit('close')">
      <div slot="head">
        <div class="detail-head">
          <span class="detail-head-title">头部标题</span>
          <ul class="detail-menu">
            <li title="分享"></li>
            <li title="删除">
              <el-popover
                placement="bottom"
                title="标题"
                width="200"
                trigger="click"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                <i class="el-icon-more" slot="reference"></i>
              </el-popover>
            </li>
          </ul>
        </div>
      </div>
    </layer>
  </div>
</template>

<script>
import Layer from '@/components/Layer'
export default {
  name: 'SideDetail',
  components: {
    Layer
  },
  props: {
    id: { type: Number, default: 0 },
    type: { type: Number, default: 0 }
  },
  data () {
    return {
      show: false
    }
  },
  watch: {
    id () {
      this.show = !!(this.id && this.type)
      console.log(this.show)
    },
    type () {
      this.show = !!(this.id && this.type)
      console.log(this.show)
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.show = !!(this.id && this.type)
    }
  }
}
</script>

<style lang="scss" scoped>
  .side-detail {
    font-size: 14px;
  }
  .detail-head {
    position: relative;
    padding: 20px 15px;
    color: #555;
    font-size: 16px;
    background-color: #fff;
    box-shadow: 0 1px 10px #eee;
    margin-bottom: 15px;
    &--center{
      text-align: center;
    }
  }
  .detail-menu{
    float: right;
    margin: 0 !important;
    padding: 0 !important;
    li {
      display: inline-block;
    }
    i {
      color: #777;
      cursor: pointer;
      margin-right: 15px;
      font-size: 14px;
    }
    i:hover{
      color: #21a0ff;
    }
  }
</style>
