<template>
  <div class="role-to-choose">
    <el-collapse accordion>
      <el-collapse-item
        v-for="user in users"
        :key="user.id">
        <template slot="title">
          <span style="float:left;">
            {{user.name}}
          </span>
        </template>
        <user-role
          :user="user"
          :projects="projects">
        </user-role>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import userRole from '@/views/manage/components/userRole'
export default {
  name: 'roleToChoose',
  components: {
    userRole
  },
  data () {
    return {
      users: [
        {
          id: 1,
          name: '用户a',
          status: '正常',
          isdelete: false,
          role: 1,
          roleName: '菜鸡a'
        }, {
          id: 2,
          name: '用户b',
          status: '已离职',
          isdelete: true,
          role: 2,
          roleName: '入门b'
        }, {
          id: 3,
          name: '用户c',
          status: '休假中',
          isdelete: false,
          role: 3,
          roleName: '大神c'
        }, {
          id: 4,
          name: '用户d',
          status: '正常',
          isdelete: false,
          role: 4,
          roleName: '炒鸡管理员'
        }
      ],
      projects: [
        {
          type: '1类',
          projects: [{
            id: '1',
            name: '1'
          },
          {
            id: '2',
            name: '2'
          },
          {
            id: '3',
            name: '3'
          },
          {
            id: '4',
            name: '4'
          },
          {
            id: '5',
            name: '5'
          }]
        }, {
          type: '2类',
          projects: [{
            id: '6',
            name: '6'
          },
          {
            id: '7',
            name: '7'
          },
          {
            id: '8',
            name: '8'
          },
          {
            id: '9',
            name: '9'
          },
          {
            id: '10',
            name: '10'
          }]
        }]
    }
  },
  watch: {
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
