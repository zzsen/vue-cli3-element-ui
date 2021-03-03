<template>
  <div class="eventList">
    <el-card class="box-card">
      <div class="clearfix" slot="header">
        事件模板列表
        <router-link to="/template/createevent">
          <el-button style="float: right; padding: 3px 0" type="text">
            <i class="el-icon-circle-plus-outline"/>新建事件模板
          </el-button>
        </router-link>
      </div>
      <el-table
        :data="events"
        height="250"
        align="left"
        style="width: 100%">
        <el-table-column
          label="模板名称"
          min-width="180">
          <template slot-scope="scope">
            {{scope.row.name}}
            <el-tag
              closable
              size="mini"
              type="danger"
              v-if="scope.row.isDelete"
              @close="undeleteEvent(scope.row)">
              已删除
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="事件类型"
          min-width="180"
          prop="status">
        </el-table-column>
        <el-table-column
          min-width="180"
          label="负责人">
          <template slot-scope="scope">
            <div
              class="link"
              style="cursor:pointer">
              {{!scope.row.principals || !scope.row.principals.length
                  ? '-'
                  : scope.row.principals.map(u=>u.name || u.id).join('、')}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="180"
          label="创建人">
          <template slot-scope="scope">
            <div
              class="link"
              style="cursor:pointer">
              {{scope.row.creater.name}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          min-width="180">
          <template slot-scope="scope">
            {{scope.row.createTime}}
          </template>
        </el-table-column>
        <el-table-column
          min-width="120"
          label="操作">
          <template slot-scope="scope">
            <el-button
              circle
              size="mini"
              title="编辑"
              type="primary"
              v-if="!scope.row.isDelete"
              @click="deleteEvent(scope.row)">
              <i class="el-icon-edit"/>
            </el-button>
            <el-button
              circle
              size="mini"
              title="删除"
              type="danger"
              v-if="!scope.row.isDelete"
              @click="deleteEvent(scope.row)">
              <i class="el-icon-delete"/>
            </el-button>
            <el-button
              circle
              size="mini"
              title="恢复"
              type="warning"
              @click="undeleteEvent(scope.row)"
              v-else>
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
  name: 'eventList',
  data () {
    return {
      eventRules: {
        name: [
          { required: true, message: '请输入事件名称', trigger: 'blur' }
        ]
      },
      events: [
        {
          id: 1,
          name: '事件a',
          status: '正常a',
          isDelete: false,
          creater: {
            id: 1,
            name: '创建人a'
          },
          principals: [
          ],
          createTime: '2018-08-08'
        },
        {
          id: 2,
          name: '事件b',
          status: '正常b',
          isDelete: true,
          creater: {
            id: 2,
            name: '创建人b'
          },
          principals: [
            {
              id: 1,
              name: '创建人a'
            },
            {
              id: 2,
              name: '创建人b'
            }
          ],
          createTime: '2018-08-08'
        }
      ],
      users: [
        {
          id: 1,
          name: '用户a',
          status: '正常',
          isdelete: false,
          role: 1,
          roleName: '菜鸡a',
          createInfo: '用户a于2018年12月12日添加用户a的管理炒鸡管理员角色'
        }, {
          id: 2,
          name: '用户b',
          status: '已离职',
          isdelete: true,
          role: 2,
          roleName: '入门b',
          createInfo: '用户a于2018年12月12日添加用户a的管理炒鸡管理员角色'
        }, {
          id: 3,
          name: '用户c',
          status: '休假中',
          isdelete: false,
          role: 3,
          roleName: '大神c',
          createInfo: '用户a于2018年12月12日添加用户a的管理炒鸡管理员角色'
        }, {
          id: 4,
          name: '用户d',
          status: '正常',
          isdelete: false,
          role: 4,
          roleName: '炒鸡管理员',
          createInfo: '用户a于2018年12月12日添加用户a的管理炒鸡管理员角色'
        }
      ],
      userArray: [],
      searchingUser: false,
      newEvent: {
        id: '',
        name: '',
        principals: [],
        creater: {
          id: 1,
          name: '创建人a'
        },
        createTime: '2018-08-08'
      }
    }
  },
  methods: {
    deleteEvent (project) {
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
    undeleteEvent (project) {
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
