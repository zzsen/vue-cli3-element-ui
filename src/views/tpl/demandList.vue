<template>
  <div class="demandList">
    <el-card class="box-card">
      <div class="clearfix" slot="header">
        需求模板列表
        <el-button style="float: right; padding: 3px 0" type="text" @click="adding = true">
          <i class="el-icon-circle-plus-outline"/>新建需求模板
        </el-button>
      </div>
      <el-table
        align="left"
        height="250"
        style="width: 100%"
        :data="demands">
        <el-table-column
          label="模板名称"
          min-width="180"
          prop="name">
        </el-table-column>
        <el-table-column
          min-width="180"
          label="需求类型"
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
          label="创建人"
          min-width="180">
          <template slot-scope="scope">
            <div
              class="link"
              style="cursor:pointer">
              {{scope.row.creater.name}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="180"
          label="创建时间">
          <template slot-scope="scope">
            {{scope.row.createTime}}
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="添加需求模板"
        :visible.sync="adding"
        width="500px">
        <el-form ref="newDemand" :model="newDemand" :rules="demandRules">
          <el-form-item label="需求名称" label-width="100px" prop="name">
            <el-input
              placeholder="请输入需求名称"
              v-model="newDemand.name"
              :disabled="newDemand&&!!newDemand.id"
              :value="newDemand ? newDemand.name : ''"></el-input>
          </el-form-item>
          <el-form-item label="负责人" label-width="100px">
            <el-select
              filterable
              multiple
              remote
              placeholder="请选择需求负责人"
              remoteplaceholder="请输入关键词"
              v-model="newDemand.principals"
              :loading="searchingUser"
              :remote-method="searchUser"
              @focus="searchUser">
              <el-option
                v-for="user in userArray"
                :key="user.id"
                :label="user.name"
                :value="user.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="addDemand('newDemand')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'demandList',
  components: {
    draggable
  },
  data () {
    return {
      demandRules: {
        name: [
          { required: true, message: '请输入需求名称', trigger: 'blur' }
        ]
      },
      demands: [
        {
          id: 1,
          name: '需求a',
          status: '正常a',
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
          name: '需求b',
          status: '正常b',
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
      adding: false,
      newDemand: {
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
    searchUser () {
      this.userArray = this.users
      this.searchingUser = false
    },
    closeDialog () {
      this.adding = false
    },
    addDemand () {
      this.demands.push(this.newDemand)
      this.newDemand = {
        id: '',
        name: '',
        principals: [],
        creater: {
          id: 1,
          name: '创建人a'
        },
        createTime: '2018-08-08'
      }
      this.adding = false
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
