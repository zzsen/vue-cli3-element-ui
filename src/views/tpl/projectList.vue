<template>
  <div class="projectList">
    <el-card class="box-card">
      <div class="clearfix" slot="header">
        项目模板列表
        <router-link to="/template/createproject">
          <el-button style="float: right; padding: 3px 0" type="text">
            <i class="el-icon-circle-plus-outline"/>新建项目模板
          </el-button>
        </router-link>
      </div>
      <el-table
        align="left"
        height="250"
        style="width: 100%"
        :data="projects">
        <el-table-column
          label="模板名称"
          min-width="120">
          <template slot-scope="scope">
            {{scope.row.name}}
            <el-tag
              closable
              size="mini"
              type="danger"
              v-if="scope.row.isDelete"
              @close="undeleteProject(scope.row)">
              已删除
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="项目类型"
          min-width="120"
          prop="status">
        </el-table-column>
        <el-table-column
          label="创建人"
          min-width="120">
          <template slot-scope="scope">
            <div
              class="link"
              style="cursor:pointer">
              {{scope.row.creater.name}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="创建人"
          min-width="120">
          <template slot-scope="scope">
            <div
              class="link"
              style="cursor:pointer">
              {{scope.row.creater.name}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="事件数量"
          min-width="120">
          <template slot-scope="scope">
            {{scope.row.event?scope.row.event.length : 0}}
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          min-width="120">
          <template slot-scope="scope">
            {{scope.row.createTime}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="120">
          <template slot-scope="scope">
            <el-button
              circle
              size="mini"
              title="编辑"
              type="primary"
              v-if="!scope.row.isDelete"
              @click="$router.push({name: 'EditProjectTemplate',params: {id: scope.row.id}})">
              <i class="el-icon-edit"/>
            </el-button>
            <el-button
              circle
              size="mini"
              title="删除"
              type="danger"
              v-if="!scope.row.isDelete"
              @click="deleteProject(scope.row)">
              <i class="el-icon-delete"/>
            </el-button>
            <el-button
              circle
              size="mini"
              title="恢复"
              type="warning"
              v-else
              @click="undeleteProject(scope.row)">
              <i class="mdi mdi-undo-variant"/>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
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
          status: '正常a',
          isDelete: false,
          creater: {
            id: 1,
            name: '创建人a'
          },
          detail: '正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a正常a',
          event: [
            {
              id: 1,
              name: '事件1'
            },
            {
              id: 2,
              name: '事件2'
            }
          ],
          createTime: '2018-01-01'
        },
        {
          id: 2,
          name: '项目b',
          status: '正常b',
          isDelete: true,
          creater: {
            id: 2,
            name: '创建人b'
          },
          detail: '正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b正常b',
          event: [
            {
              id: 1,
              name: '事件1'
            },
            {
              id: 2,
              name: '事件2'
            }
          ],
          createTime: '2018-01-01'
        }
      ]
    }
  },
  methods: {
    editProject (project) {
      console.log(project.name)
    },
    deleteProject (project) {
      const deleteContent = `是否确定删除项目 ${project.name} ?`
      this.$confirm(deleteContent, '删除项目', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      }).then(() => {
        project.isDelete = true
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    undeleteProject (project) {
      const deleteContent = `是否确定撤销删除项目 ${project.name} ?`
      this.$confirm(deleteContent, '撤销删除项目', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        project.isDelete = false
        this.$message({
          type: 'success',
          message: '撤销删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消撤销删除'
        })
      })
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
