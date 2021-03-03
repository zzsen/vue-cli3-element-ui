<template>
  <div class="user-role">
    <div
      class="projectType"
      v-for="projectType in projects"
      :key="projectType.type">
      <el-checkbox
        class="checkAll"
        v-model="checkAll[projectType.type]"
        :indeterminate="isIndeterminate[projectType.type]"
        @change="handleCheckAll(projectType.type)">
        {{projectType.type}}
      </el-checkbox>&nbsp;:
      <div class="projects">
        <div
          v-for="project in projectType.projects"
          :key="project.id">
        </div>
        <el-checkbox-group
          v-model="checkedProjects[projectType.type]">
          <el-checkbox
            v-for="project in projectType.projects"
            :label="project.name"
            :key="project.id"
            @change="handleChange(projectType.type)">
            {{project.name}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userRole',
  components: {
  },
  props: {
    user: { type: Object, default: () => { return {} } },
    projects: { type: Array, default: () => { return [] } }
  },
  data () {
    return {
      checkAll: {},
      checkedProjects: {},
      isIndeterminate: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const checkAll = {}
      const checkedProjects = {}
      const isIndeterminate = {}
      this.projects.forEach(type => {
        checkAll[type.type] = false
        checkedProjects[type.type] = []
        isIndeterminate[type.type] = false
      })
      this.checkedProjects = checkedProjects
      this.checkAll = checkAll
    },
    handleCheckAll (type) {
      this.checkedProjects[type] = this.checkAll[type] ? this.projects.find(t => t.type === type).projects.map(p => p.id) : []
      this.isIndeterminate[type] = false
    },
    handleChange (type) {
      const checkedCount = this.checkedProjects[type].length
      const projectCount = this.projects.find(t => t.type === type).projects.length || 0
      this.checkAll[type] = checkedCount === projectCount
      this.isIndeterminate[type] = checkedCount > 0 && checkedCount < projectCount
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-role{
    padding: 0 10px;
    .projectType{
      font-size: 16px;
      margin-bottom: 20px;
      &:last-of-type{
        margin: 0;
      }
      .projects{
        font-size: 15px;
      }
    }
  }
</style>

<style lang="scss">
  .checkAll{
    .el-checkbox__label{
      font-weight: 600 !important;
    }
  }
</style>
