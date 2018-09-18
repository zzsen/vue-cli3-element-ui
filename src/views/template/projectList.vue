<template>
  <div class='projectList'>
    <el-container>
      <el-header><div class='title'>项目模板列表</div></el-header>
      <el-main>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item
            v-for="project in projects"
            :key="project.id"
            :name="project.id">
            <template slot="title" slot-scope="scope">
              {{project.name}}
              <i class="header-icon el-icon-info"></i>
            </template>
            <div>{{project.status}}</div>
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'projectList',
  components: {
  },
  data () {
    return {
      projects: [
        {
          id: 1,
          name: '项目a',
          status: '正常',
          event: []
        },
        {
          id: 2,
          name: '项目b',
          status: '正常',
          event: []
        }
      ]
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
