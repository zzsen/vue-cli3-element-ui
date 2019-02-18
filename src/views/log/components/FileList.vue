<template>
  <div class="file-list">
    <el-card class="box-card">
      <div class="clearfix" slot="header" style="position:relative;">
        {{title}}
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="breadcrumb in breadcrumbs"
          :key="breadcrumb.path"
          :to="{ query: { path : breadcrumb.path} }">
          {{breadcrumb.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-table
        stripe
        align="left"
        :data="files"
        style="width: 100%">
        <el-table-column
          label="名称"
          min-width="180">
          <template slot-scope="scope">
            <div
              class="file"
              @click="handleClick(scope.row)"
              @mouseover="mouseover($event)"
              @mouseout="mouseout($event)">
              <i class="mdi mdi-folder" v-if="scope.row.isDir"/>
              <i class="mdi mdi-file" v-else/>
              {{scope.row.name}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="创建日期"
          min-width="180">
          <template slot-scope="scope">
            {{scope.row.createTime}}
          </template>
        </el-table-column>
        <el-table-column
          label="编辑日期"
          min-width="180">
          <template slot-scope="scope">
            {{scope.row.updateTime}}
          </template>
        </el-table-column>
        <el-table-column
          label="文件类型"
          min-width="180">
          <template slot-scope="scope">
            {{scope.row.type}}
          </template>
        </el-table-column>
        <el-table-column
          label="文件大小"
          min-width="180">
          <template slot-scope="scope">
            {{scope.row.size}}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <file-content
      :filecontent="filecontent"
      :filename="filename"
      :show="showFileContent"
      :height="800"
      :width="800"
      @close="()=>{ showFileContent = false }">
    </file-content>
  </div>
</template>

<script>
import FileContent from '@/views/log/components/FileContent'
export default {
  name: 'FileList',
  components: {
    FileContent
  },
  props: {
    getFile: [ Function ],
    path: { type: String, default: '' },
    title: { type: String, default: 'log' }
  },
  computed: {
  },
  data () {
    return {
      showFileContent: false,
      filecontent: '',
      filename: '',
      files: [
        {
          name: '文件夹1',
          createTime: '2018-11-11',
          updateTime: '2018-11-12',
          isDir: true
        },
        {
          name: '文件夹2',
          createTime: '2018-11-11',
          updateTime: '2018-11-12',
          isDir: true
        },
        {
          name: '文件夹3',
          createTime: '2018-11-11',
          updateTime: '2018-11-12',
          isDir: true
        },
        {
          name: '文件1',
          createTime: '2018-11-11',
          updateTime: '2018-11-12',
          type: 'txt',
          isDir: false,
          size: '2kb'
        },
        {
          name: '文件2',
          createTime: '2018-11-11',
          updateTime: '2018-11-12',
          type: 'doc',
          isDir: false,
          size: '2kb'
        },
        {
          name: '文件3',
          createTime: '2018-11-11',
          updateTime: '2018-11-12',
          type: 'json',
          isDir: false,
          size: '2kb'
        }
      ],
      breadcrumbs: [
        {
          name: '路径1',
          path: '路径1'
        },
        {
          name: '路径2',
          path: '路径2'
        },
        {
          name: '路径3',
          path: '路径3'
        }
      ]
    }
  },
  watch: {
    $route: function () {
      this.init()
    }
  },
  methods: {
    handleClick (file) {
      if (file.isDir) {
        console.log(file.name)
      } else {
        this.showFileContent = true
        this.filename = file.name
        this.filecontent = '文件文件文件文件文件文件文件文件文件文件文件文件文件文件文件文件文件文件文件文件文件文件文件文件'
      }
    },
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
  margin-bottom:20px;
}
.mdi-folder,.mdi-folder-open,
.mdi-file,.mdi-file-document{
  color: coral;
}
</style>
