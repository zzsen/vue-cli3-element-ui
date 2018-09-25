<template>
  <div class="system">
    <el-card class="box-card">
      <div class="clearfix" slot="header" style="position:relative;">
        系统日志
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table
        stripe
        align="left"
        :data="files"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
          <template slot-scope="scope">
            <i class="mdi mdi-folder" v-if="scope.row.isDir"/>
            <i class="mdi mdi-file" v-else/>
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'system',
  components: {
  },
  computed: {
    ...mapGetters([ 'activeUser' ])
  },
  data () {
    return {
      files: [
        {
          name: '文件夹1',
          isDir: true
        },
        {
          name: '文件夹2',
          isDir: true
        },
        {
          name: '文件夹3',
          isDir: true
        },
        {
          name: '文件1',
          isDir: false,
          size: '2kb'
        },
        {
          name: '文件2',
          isDir: false,
          size: '2kb'
        },
        {
          name: '文件3',
          isDir: false,
          size: '2kb'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang='scss'>
.el-breadcrumb{
  margin-top:10px;
}
</style>
