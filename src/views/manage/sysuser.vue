<template>
  <div class="sysuser">
    <el-container>
      <el-header>
        <div class='title' style='position: relative;'>
          系统成员
          <el-button type="primary" round plain class='addMember' size='mini' @click="setAddingUser">
            <i class='el-icon-circle-plus-outline' style='margin-right:5px'/>添加成员
          </el-button>
        </div>
      </el-header>
      <el-main>
        <el-table
          stripe
          align='left'
          :data="user"
          max-height="300"
          style="width: 100%">
          <el-table-column
            label="姓名"
            min-width="180">
            <template slot-scope="scope">
              <span class='defaultCursor'>
                {{scope.row.name}}
                <el-tag
                  v-if='activeUser.id===scope.row.id'
                  type='default'
                  size='mini'>
                  it's me
                </el-tag>
                <el-tag
                  v-if='scope.row.status!="正常"'
                  type='danger'
                  size='mini'>
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
                width="200"
                trigger="hover"
                :content="scope.row.createInfo">
                <span class='defaultCursor' slot="reference">
                  {{scope.row.roleName}}
                </span>
              </el-popover>
              <div style="display:inline-block;margin-left:10px" v-if="!scope.row.isdelete">
                <el-button size="mini" type="primary" icon="el-icon-edit" circle @click='setEditingUser(scope.row)' title="编辑"></el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" circle @click='deleteSysUser(scope.row)' title="删除"></el-button>
              </div>
              <el-tag class='defaultCursor' type='danger' size='mini' closable @close='undeleteSysUser(scope.row)' v-else>已删除</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <!-- 添加成员角色 -->
        <el-dialog title="添加成员" :visible.sync="adding" width="500px">
          <el-form :model="userToAdd">
            <el-form-item label="姓名" label-width="120px">
              <!-- <el-input v-model="userToEdit.name" disabled></el-input> -->
              <el-autocomplete
                :debounce='500'
                v-model="userToAdd.name"
                :fetch-suggestions="searchUser"
                placeholder="请输入内容"
                @select="handleSelect"
                :popper-append-to-body=false
                value-key="name"
              >
              </el-autocomplete>
            </el-form-item>
            <el-form-item label="角色" label-width="120px">
              <el-select v-model="userToAdd.role" placeholder="请选择角色">
                <el-option v-for='role in roles' :key='role.value'
                  :label="role.name" :value="role.value" :selected='role.value===userToAdd.role'>
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
        <el-dialog title="修改角色" :visible.sync="editing" width="500px">
          <el-form :model="userToEdit">
            <el-form-item label="姓名" label-width="120px">
              <el-input v-model="userToEdit.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="角色" label-width="120px">
              <el-select v-model="userToEdit.role" placeholder="请选择活动区域">
                <el-option v-for='role in roles' :key='role.value'
                  :label="role.name" :value="role.value" :selected='role.value===userToEdit.role'>
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="closeDialog">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 删除成员dialog -->
        <el-dialog
          title="删除成员"
          :visible.sync="deleting"
          width="30%"
          center>
          <span>{{deleteContent}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="danger" @click="closeDialog">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 撤销删除成员dialog -->
        <el-dialog
          title="撤销删除"
          :visible.sync="undeleting"
          width="30%"
          center>
          <span>{{undeleteContent}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="closeDialog">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
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
      searchusers: '',
      userToAdd: {
        role: 2
      },
      idToAdd: '',
      roleToAdd: 3,
      userToEdit: {},
      adding: false,
      editing: false,
      deleting: false,
      deleteContent: '',
      undeleting: false,
      undeleteContent: ''
    }
  },
  methods: {
    closeDialog () {
      this.adding = false
      this.editing = false
      this.deleting = false
      this.undeleting = false
    },
    searchUser (queryString, callback) {
      var userAfterSearch = this.user
      console.log(userAfterSearch)
      // userAfterSearch = queryString ? userAfterSearch.filter(this.createStateFilter(queryString)) : userAfterSearch
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        callback(userAfterSearch)
      }, 3000 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        console.log(state)
        return (state.name.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (val) {
      this.userAfterSearch = val
    },
    setAddingUser () {
      this.adding = true
      this.userToAdd = {}
    },
    setEditingUser (userinfo) {
      this.editing = true
      this.userToEdit = userinfo
    },
    deleteSysUser (userinfo) {
      this.deleting = true
      this.deleteContent = `是否确定删除 ${userinfo.id !== this.activeUser.id ? userinfo.name : '自己'} 的 ${userinfo.roleName} 角色?`
    },
    undeleteSysUser (userinfo) {
      this.undeleting = true
      this.undeleteContent = `是否确定撤销删除 ${userinfo.name} 的 ${userinfo.roleName} 角色?`
    }
  }
}
</script>

<style scoped lang='scss'>
.sysuser{
  max-width: 1280px;
}
.el-form{
  padding-right: 60px
}
.el-select{
  width: 100%;
}
.addMember{
  position: absolute;
  right: 0;
  top: 20px;
}
.el-form-item__content>.el-autocomplete{
  width: 100%
}
</style>
