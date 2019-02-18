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
      <el-table
        stripe
        align="left"
        max-height="300"
        style="width: 100%"
        :data="projectList">
        <el-table-column
          fixed
          label="项目名"
          min-width="120">
          <template slot-scope="scope">
            <div
              class="link"
              style="cursor:pointer"
              @click="viewDetail(scope.row.id)">
              {{scope.row.name}}
              <el-tag
                closable
                size="mini"
                type="danger"
                v-if="scope.row.isDelete"
                @close="undeleteProject(scope.row)">
                已删除
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          min-width="120"
          prop="status">
        </el-table-column>
        <el-table-column
          label="负责人"
          min-width="120"
          prop="leader">
        </el-table-column>
        <el-table-column
          label="PM"
          min-width="120"
          prop="pm">
        </el-table-column>
        <el-table-column
          label="主管"
          min-width="120"
          prop="master">
        </el-table-column>
        <el-table-column
          label="描述"
          min-width="300"
          prop="description">
        </el-table-column>
        <el-table-column
          label="创建时间"
          min-width="120"
          prop="createTime">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="120"
          prop="createTime">
          <template slot-scope="scope">
            <el-button
              circle
              size="mini"
              title="编辑"
              type="primary"
              v-if="!scope.row.isDelete"
              @click="deleteProject(scope.row)">
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
      <el-pagination
        background
        layout="total, prev, pager, next"
        :page-size="100"
        :total="1000">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'projectTable',
  props: {
    type: { type: Number, default: 0 }
  },
  components: {
  },
  data () {
    return {
      projectList: [
        {
          id: 'a',
          name: '项目a',
          status: '状态a',
          leader: '负责人a',
          pm: 'PMa',
          master: '主管a',
          description: '描述aaaaaaaaaaaaaaaaaaaaaaaaaa',
          isDelete: false,
          createTime: '2018-08-08'
        }, {
          id: 'b',
          name: '项目b',
          status: '状态b',
          leader: '负责人b',
          pm: 'PMb',
          master: '主管b',
          description: '描述bbbbbbbbbbbbbbbbbbbbbbbbbb',
          isDelete: true,
          createTime: '2018-08-10'
        }
      ]
    }
  },
  methods: {
    deleteProject (project) {
      let deleteContent = `是否确定删除项目 ${project.name} ?`
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
      let deleteContent = `是否确定撤销删除项目 ${project.name} ?`
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
    },
    viewDetail (id) {
      this.$store.dispatch('SetBackUrl', window.location.href)
      this.$router.push({ name: 'ProjectDetail', params: { id } })
    }
  }
}
</script>

<style lang='scss'>
tr.el-table__row>td>div.cell,
tr.el-table__row>td>div.cell>div{
  width:100% !important;
  height:100% !important;
}
.el-pagination{
  float: right;
  margin-top:10px;
  margin-bottom: 10px;
}
</style>
