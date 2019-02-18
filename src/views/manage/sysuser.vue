<template>
  <div class="sysuser">
    <el-card class="box-card" style="position: relative;">
      <el-button
        style="padding: 3px 0;position: absolute;right: 20px;z-index:1;"
        type="text"
        v-if="activeTab.indexOf('sys')>=0"
        @click="setAddingUser">
        <i class="el-icon-circle-plus-outline"/>添加成员
      </el-button>
      <el-tabs v-model="activeTab">
        <el-tab-pane
          v-for="projectType in projectTypes"
          :key="projectType.value"
          :label="`系统角色${projectType.name}`"
          :name="`sys${projectType.name}`">
          <system-role
            :users="users"
            @edit="setEditingUser"
            @delete="deleteSysUser"
            @undelete="undeleteSysUser">
          </system-role>
        </el-tab-pane>
        <el-tab-pane
          v-for="projectRole in projectRoles"
          :key="projectRole.value"
          :label="`项目角色${projectRole.name}`"
          :name="`master${projectRole.name}`">
          <project-role
            :users="masters">
          </project-role>
        </el-tab-pane>
        <el-tab-pane
          label="可选择"
          name="可选择">
          <role-to-choose>
          </role-to-choose>
        </el-tab-pane>
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
import projectRole from '@/views/manage/components/projectRole'
import systemRole from '@/views/manage/components/systemRole'
import roleToChoose from '@/views/manage/components/roleToChoose'
export default {
  name: 'sysuser',
  components: {
    systemRole,
    projectRole,
    roleToChoose
  },
  computed: {
    ...mapGetters([ 'activeUser' ])
  },
  data () {
    const projectTypes = [
      {
        name: 'a',
        value: 'a'
      },
      {
        name: 'b',
        value: 'b'
      },
      {
        name: 'c',
        value: 'c'
      }
    ]
    const projectRoles = [
      {
        name: 'd',
        value: 'd'
      },
      {
        name: 'e',
        value: 'e'
      },
      {
        name: 'f',
        value: 'f'
      }
    ]
    return {
      activeTab: '可选择' || `sys${projectTypes[0].name}`,
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
      masters: [
        {
          id: 1,
          name: '用户1',
          projects: [
            {
              id: 1,
              name: '项目1',
              statusName: '正常',
              isDelete: false,
              description: '正常正常正常正常正常',
              creator: {
                id: 1,
                name: '用户1',
                state: 1
              },
              createTime: '2018-08-08'
            },
            {
              id: 2,
              name: '项目2',
              statusName: '正常',
              isDelete: true,
              description: '正常正常正常正常正常',
              creator: {
                id: 2,
                name: '用户2',
                state: 2
              },
              createTime: '2018-08-08'
            }
          ]
        },
        {
          id: 2,
          name: '用户2',
          projects: [
            {
              id: 1,
              name: '项目1',
              statusName: '正常',
              isDelete: false,
              description: '正常正常正常正常正常',
              creator: {
                id: 1,
                name: '用户1',
                state: 1
              },
              createTime: '2018-08-08'
            },
            {
              id: 2,
              name: '项目2',
              statusName: '正常',
              isDelete: true,
              description: '正常正常正常正常正常',
              creator: {
                id: 2,
                name: '用户2',
                state: 2
              },
              createTime: '2018-08-08'
            }
          ]
        }
      ],
      projectTypes,
      projectRoles,
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
    },
    viewProjectDetail (id) {
      this.$store.dispatch('SetBackUrl', window.location.href)
      this.$router.push({ name: 'ProjectDetail', params: { id } })
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
</style>
