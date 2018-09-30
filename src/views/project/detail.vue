<template>
  <div class="detail">
    <el-card class="box-card">
      <div slot="header">
        <el-button size="mini" style="float: left;top: -5px;position: relative;" title="返回">
          <i class="mdi mdi-arrow-left-bold"/>
        </el-button>
        项目列表
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'detail',
  components: {
  },
  data () {
    return {
      project: {
        id: 1,
        name: '项目1'
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      document.title = `项目详情-${this.project.name}`
    }
  }
}
</script>

<style lang='scss'>
</style>
