<template>
  <div class="side-detail">
    <layer
      :show="show"
      :width="700"
      @close="$emit('close')">
      <div slot="head">
        <div class="detail-head">
          <span class="detail-name" v-show="!editingName" @click="editName('edit')">{{data.name}}</span>
          <input
            class="detail-name detail-name--editable"
            v-model="data.name"
            v-show="editingName"
            @blur.stop.prevent="editName('commit')"/>
          <ul class="detail-menu">
            <li title="分享">
              <i class="el-icon-share"></i>
            </li>
            <li title="删除">
              <el-popover
                width="100"
                placement="bottom"
                trigger="click">
                <i class="el-icon-more" slot="reference"></i>
                <div>
                  <div>
                    <el-button type="text">
                      <i class="el-icon-share"></i>文字按钮
                    </el-button>
                  </div>
                  <div>
                    <el-button type="text">
                      <i class="el-icon-share"></i>文字按钮
                    </el-button>
                  </div>
                </div>
              </el-popover>
            </li>
          </ul>
        </div>
      </div>
      <div slot="body">
        <div class="detail-body">
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
      show: false,
      editingName: false,
      data: {
        name: '头部标题'
      }
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
    },
    editName (type) {
      if (type === 'edit') {
        this.editingName = true
      } else {
        this.editingName = false
      }
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
  .detail-body {
    width: 95%;
    height: 200px;
    background-color: #21a0ff;
    border-radius: 5px;
    margin: 10px auto;
  }
  .detail-name{
    cursor: pointer;
    padding: 10px 10px;
    font-size: 14px;
    color: #555;
    background-color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    font-weight: bold;
    transition: color .4s ease;
    &--editable{
      margin: 0;
      padding: 0 10px;
      position: relative;
      width: 500px;
      outline: none;
      overflow: hidden;
      border: 0;
      font-size: 14px;
      &:hover{
        color: #444;
      }
    }
  }
</style>
