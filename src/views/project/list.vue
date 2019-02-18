<template>
  <div class="list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        项目列表
        <router-link to="/project/create">
          <el-button style="float: right; padding: 3px 0" type="text">
            <i class="el-icon-circle-plus-outline"/>新建项目
          </el-button>
        </router-link>
      </div>
      <el-tabs v-model="activeTab">
        <el-tab-pane
          v-for="projectType in projectTypes"
          :key="projectType.value"
          :label="`${projectType.name.substr(0, 2)}项目`"
          :name="`${projectType.name}`">
          <project-table
            :type="projectType.value">
          </project-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import projectTable from '@/views/project/components/projectTable'
export default {
  name: 'list',
  components: {
    projectTable
  },
  data () {
    const projectTypes = [{
      value: 10,
      name: 'abcde'
    }, {
      value: 20,
      name: 'bcdef'
    }]
    return {
      projectTypes,
      activeTab: projectTypes[0].name
    }
  }
}
</script>
