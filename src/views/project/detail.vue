<template>
  <div class="detail">
    <el-card class="box-card">
      <div slot="header">
        <el-button size="mini" style="float: left;top: -5px;position: relative;" title="返回">
          <i class="mdi mdi-arrow-left-bold"/>
        </el-button>
        {{project.name}}
      </div>
      <el-row>
        <el-col :span="2">
          <div>项目主管&nbsp;:&nbsp;</div>
        </el-col>
        <el-col :span="10">
          <div>{{project.masters}}</div>
        </el-col>
        <el-col :span="2">
          <div>项目负责人&nbsp;:&nbsp;</div>
        </el-col>
        <el-col :span="10">
          <div>{{project.principals}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div>创建人&nbsp;:&nbsp;</div>
        </el-col>
        <el-col :span="10">
          <div>{{project.creator.name}}</div>
        </el-col>
        <el-col :span="2">
          <div>创建时间&nbsp;:&nbsp;</div>
        </el-col>
        <el-col :span="10">
          <div>{{project.createTime}}</div>
        </el-col>
      </el-row>
      <el-row v-if="project.project">
        <el-col :span="4">
          <div>关联project的项目&nbsp;:&nbsp;</div>
        </el-col>
        <el-col :span="20">
          <div>{{project.creator.name}}</div>
        </el-col>
      </el-row>
      <el-tabs type="border-card">
        <el-tab-pane label="项目成员">
          <el-table
            stripe
            align="left"
            style="width: 100%"
            :data="members">
            <el-table-column
              prop="name"
              label="用户名">
              <template slot-scope="scope">
                {{scope.row.name}}
                <el-tag
                  size="mini"
                  type="danger"
                  v-if="scope.row.state!==1">
                  已离职
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="position"
              label="职能">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="事件信息">事件信息</el-tab-pane>
        <el-tab-pane label="需求信息">需求信息</el-tab-pane>
        <el-tab-pane label="项目动态">
          <el-table
            align="left"
            height="250px"
            style="width: 100%"
            :data="projectActions">
            <el-table-column
              label="操作人"
              min-width="180">
              <template slot-scope="scope">
                {{scope.row.user.name}}
                <el-tag
                  size="mini"
                  type="danger"
                  v-if="scope.row.user.state!==1">
                  已删除
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              min-width="180"
              prop="createTime"
              label="操作时间">
            </el-table-column>
            <el-table-column
              prop="content"
              label="操作内容"
              min-width="300">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'detail',
  components: {
  },
  data () {
    return {
      project: {
        id: 1,
        name: '项目1',
        statusName: '正常',
        isDelete: false,
        creator: {
          id: 1,
          name: '用户1',
          state: 1
        },
        masters: '主管1,2,3',
        principals: '负责人1,2,3',
        createTime: '2018-08-08',
        project: {
          id: '132',
          name: 'project项目'
        }
      },
      members: [
        {
          id: 1,
          name: '用户1',
          state: 1,
          position: '职能111'
        },
        {
          id: 2,
          name: '用户2',
          state: 2,
          position: '职能222'
        },
        {
          id: 3,
          name: '用户3',
          state: 1,
          position: '职能333'
        }
      ],
      projectActions: [
        {
          content: '111',
          user: {
            id: 1,
            name: '用户1',
            state: 1
          },
          createTime: '2018-08-08'
        },
        {
          content: '222',
          user: {
            id: 2,
            name: '用户2',
            state: 2
          },
          createTime: '2018-08-08'
        },
        {
          content: '333',
          user: {
            id: 3,
            name: '用户3',
            state: 1
          },
          createTime: '2018-08-08'
        },
        {
          content: '444',
          user: {
            id: 1,
            name: '用户1',
            state: 2
          },
          createTime: '2018-08-08'
        }
      ]
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.project.id = this.$route.params.id
      document.title = `项目详情-${this.project.name}-${this.project.id}`
    }
  }
}
</script>

<style lang='scss'>
.el-col>div{
  width: 100%;
  text-align: left;
}
</style>
