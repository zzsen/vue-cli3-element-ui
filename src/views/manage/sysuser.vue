<template>
  <div class="sysuser">
    <el-card class="box-card" style="position: relative;">
      <el-button
        style="padding: 3px 0;position: absolute;right: 20px;"
        type="text"
        v-if="activeTab==='sys'"
        @click="setAddingUser">
        <i class="el-icon-circle-plus-outline"/>添加成员
      </el-button>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="系统角色" name="sys">
          <el-table
            stripe
            align="left"
            max-height="300"
            style="width: 100%"
            :data="user">
            <el-table-column
              label="姓名"
              min-width="180">
              <template slot-scope="scope">
                <span class="defaultCursor">
                  {{scope.row.name}}
                  <el-tag
                    size="mini"
                    type="default"
                    v-if="activeUser.id===scope.row.id">
                    it's me
                  </el-tag>
                  <el-tag
                    size="mini"
                    type="danger"
                    v-if="scope.row.status!=='正常'">
                    {{scope.row.status}}
                  </el-tag>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="成员角色"
              min-width="180">
              <template slot-scope="scope">
                <el-popover
                  placement="left-start"
                  trigger="hover"
                  width="200"
                  :content="scope.row.createInfo">
                  <span class="defaultCursor" slot="reference">
                    {{scope.row.roleName}}
                  </span>
                </el-popover>
                <div style="display:initial;margin-left:10px" v-if="!scope.row.isdelete">
                  <el-button
                    circle
                    icon="mdi mdi-account-edit"
                    size="mini"
                    title="编辑"
                    type="primary"
                    @click="setEditingUser(scope.row)"></el-button>
                  <el-button
                    circle
                    icon="el-icon-delete"
                    size="mini"
                    title="删除"
                    type="danger"
                    @click="deleteSysUser(scope.row)"></el-button>
                </div>
                <el-tag
                  closable
                  v-else
                  class="defaultCursor"
                  size="mini"
                  type="danger"
                  @close="undeleteSysUser(scope.row)">
                  已删除
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="项目角色" name="project">项目角色</el-tab-pane>
      </el-tabs>
      <!-- 添加成员角色 -->
      <el-dialog title="添加成员"
        :visible.sync="adding"
        width="500px">
        <el-form>
          <el-form-item label="姓名" label-width="120px">
            <el-select
              filterable
              multiple
              remote
              remoteplaceholder="请输入关键词"
              v-model="userToAdd"
              :loading="searchingUser"
              :remote-method="searchUser"
              @focus="searchUser">
              <el-option
                v-for="user in userArray"
                :key="user.id"
                :label="user.name"
                :value="user.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色" label-width="120px">
            <el-select v-model="roleToAdd" placeholder="请选择角色">
              <el-option
                v-for='role in roles'
                :key='role.value'
                :label="role.name"
                :selected='role.value===roleToAdd'
                :value="role.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="closeDialog">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改成员角色dialog -->
      <el-dialog title="修改角色" width="500px" :visible.sync="editing">
        <el-form :model="userToEdit">
          <el-form-item label="姓名" label-width="120px">
            <el-input disabled v-model="userToEdit.name"></el-input>
          </el-form-item>
          <el-form-item label="角色" label-width="120px">
            <el-select v-model="userToEdit.role" placeholder="请选择角色">
              <el-option
                v-for="role in roles"
                :key="role.value"
                :label="role.name"
                :value="role.value"
                :selected="role.value===userToEdit.role">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="dialog-footer" slot="footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="closeDialog">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'sysuser',
  components: {
  },
  computed: {
    ...mapGetters([ 'activeUser' ])
  },
  data () {
    return {
      activeTab: 'sys',
      roles: [
        {
          name: '菜鸡a',
          value: 1
        },
        {
          name: '入门b',
          value: 2
        },
        {
          name: '大神c',
          value: 3
        },
        {
          name: '炒鸡管理员',
          value: 4
        }
      ],
      user: [
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
      searchingUser: false,
      userArray: [],
      userToAdd: [],
      roleToAdd: 3,
      userToEdit: {},
      adding: false,
      editing: false
    }
  },
  methods: {
    closeDialog () {
      this.adding = false
      this.editing = false
    },
    searchUser (queryString) {
      this.userArray = this.user
      this.loading = false
    },
    setAddingUser () {
      this.adding = true
      this.loading = true
      this.userToAdd = []
    },
    setEditingUser (userinfo) {
      this.editing = true
      this.userToEdit = userinfo
    },
    deleteSysUser (userinfo) {
      let deleteContent = `是否确定删除 ${userinfo.id !== this.activeUser.id ? userinfo.name : '自己'} 的 ${userinfo.roleName} 角色?`
      this.$confirm(deleteContent, '删除成员', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      }).then(() => {
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
    undeleteSysUser (userinfo) {
      let undeleteContent = `是否确定撤销删除 ${userinfo.name} 的 ${userinfo.roleName} 角色?`
      this.$confirm(undeleteContent, '撤销删除成员', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
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
    }
  }
}
</script>

<style scoped lang='scss'>
.el-form{
  padding-right: 60px
}
.el-select{
  width: 100%;
}
.el-form-item__content>.el-autocomplete{
  width: 100%
}
</style>
