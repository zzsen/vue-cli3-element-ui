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
            <div class="file" @mouseover="mouseover($event)" @mouseout="mouseout($event)">
              <i class="mdi mdi-folder" v-if="scope.row.isDir"/>
              <i class="mdi mdi-file" v-else/>
              {{scope.row.name}}
            </div>
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
    <log-content>
    </log-content>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LogContent from '@/components/LogContent'
export default {
  name: 'system',
  components: {
    LogContent
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
    mouseover (event) {
      if (event.srcElement.className === 'file') {
        let children = event.srcElement.children[0]
        if (children.className === 'mdi mdi-folder') {
          event.srcElement.children[0].className = 'mdi mdi-folder-open'
        } else if (children.className === 'mdi mdi-file') {
          event.srcElement.children[0].className = 'mdi mdi-file-document'
        }
      }
    },
    mouseout (event) {
      if (event.srcElement.className === 'file') {
        let children = event.srcElement.children[0]
        if (children.className === 'mdi mdi-folder-open') {
          event.srcElement.children[0].className = 'mdi mdi-folder'
        } else if (children.className === 'mdi mdi-file-document') {
          event.srcElement.children[0].className = 'mdi mdi-file'
        }
      }
    }
  }
}
</script>

<style lang='scss'>
.el-breadcrumb{
  margin-top:10px;
}
.mdi-folder,.mdi-folder-open,
.mdi-file,.mdi-file-document{
  color: coral;
}
</style>
