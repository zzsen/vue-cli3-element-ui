<template>
  <div class="list">
    <el-card class="box-card">
      <div class="clearfix" slot="header">
        新建项目
      </div>
      <el-form
        label-width="100px"
        :inline="true"
        :model="project">
        <el-form-item label="关联pmgo">
          <el-select
            clearable
            filterable
            remote
            placeholder="请输入pmgo中对应的项目名，全新项目可不填"
            remoteplaceholder="请输入关键词"
            v-model="project.projectIdInPmgo"
            :loading="searchingPmgo"
            :remote-method="searchPmgo"
            @focus="searchPmgo"
            @change="pmgoChange">
            <el-option
              v-for="project in projects"
              :key="project.id"
              :label="project.name"
              :value="project.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span slot="label">
            同步pmgo
            <el-tooltip class="item" content="同时在pmgo中创建同名项目" effect="dark" placement="top">
              <i class="el-icon-question"/>
            </el-tooltip>
          </span>
          <div style="float: left;">
            <el-switch style="float: left; top: 10px;" v-model="createPmgo" :disabled="!canSwitch"></el-switch>
            <div style="float: left; margin-left: 50px;" v-if="createPmgo">
              <span style="width:100px">前缀</span>
              <el-tooltip class="item" content="此处的项目前缀主要用于pmgo中" effect="dark" placement="top">
                <i class="el-icon-question"/>
              </el-tooltip>
              <el-input
                clearable
                placeholder="项目前缀，只支持数字或字母"
                style="position: absolute; margin-left: 10px; width: calc(100% - 145px)"
                v-model="project.prefixInPmgo"></el-input>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <!-- 模板 -->
      <el-form
        :model="project"
        :inline="true"
        label-width="100px">
        <el-form-item label="选择模板">
          <el-select
            clearable
            placeholder="请选择项目模板"
            v-model="project.templateId"
            @change="projectTemplateChange">
            <el-option
              v-for="tpl in projectTemplates"
              :key="tpl.id"
              :label="tpl.name"
              :value="tpl.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" slot="label" type="text">配置模板</el-button>
        </el-form-item>
      </el-form>
      <!-- 项目类型 -->
      <el-form
        :model="project"
        :inline="true"
        label-width="100px">
        <el-form-item label="项目状态">
          <el-select placeholder="请选择项目状态" v-model="project.status">
            <el-option
              v-for="pStatus in projectStatus"
              :key="pStatus.value"
              :label="pStatus.name"
              :value="pStatus.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目类型">
          <el-select disabled placeholder="请选择项目类型" v-model="project.type">
            <el-option
              v-for="pType in projectType"
              :key="pType.value"
              :label="pType.name"
              :value="pType.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 项目信息 -->
      <el-form
        :model="project"
        :rules="projectRules"
        ref="projectInfo"
        :inline="true"
        label-width="100px">
        <el-form-item label="项目名称" prop="name">
          <el-input placeholder="请输入项目名称,最多30字" v-model="project.name"></el-input>
        </el-form-item>
        <el-form-item label="项目代号" prop="code">
          <el-input placeholder="请输入项目代号,最多10字" v-model="project.code"></el-input>
        </el-form-item>
      </el-form>
      <!-- 描述 -->
      <el-form
        :model="project"
        :rules="projectRules"
        ref="project"
        label-width="100px">
        <el-form-item label="项目描述">
          <el-input
            resize="none"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="请输入内容"
            v-model="project.description">
          </el-input>
        </el-form-item>
      </el-form>
      <!-- 人员 -->
      <el-form
        class="therePieces"
        label-width="100px"
        ref="projectUsers"
        :inline="true"
        :model="project"
        :rules="projectRules">
        <el-form-item label="项目负责人" prop="principals">
          <el-select
            filterable
            multiple
            remote
            placeholder="请选择项目负责人"
            remoteplaceholder="请输入关键词"
            v-model="project.principals"
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
        <el-form-item prop="masters" label="项目主管">
          <el-select
            filterable
            remote
            placeholder="请选择项目主管"
            remoteplaceholder="请输入关键词"
            v-model="project.masters"
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
        <el-form-item prop="pms" label="项目PM">
          <el-select
            filterable
            multiple
            remote
            placeholder="请选择项目PM"
            remoteplaceholder="请输入关键词"
            v-model="project.pms"
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
      </el-form>
      <!-- 事件 -->
      <el-form
        :model="project"
        :rules="projectRules"
        ref="project"
        label-width="100px">
        <el-form-item label="默认事件" class="eventBody">
          <el-button type="text" style="float: right; margin-right: 10px; margin-top: 7px;" @click="addingEvent = true"><i class="el-icon-circle-plus-outline"/>添加事件</el-button>
          <div style="margin-top:40px;">
            <el-card
              shadow="hover"
              style="width: 250px;float:left;margin:20px 20px;position:relative"
              v-for="event in project.events"
              :body-style="{ padding: '0px'}"
              :key="event.id">
              <div style="padding: 14px;">
                <div slot="header" class="clearfix">
                  <el-input placeholder="请输入事件名称" style="width:150px" v-if="!event.templateId" v-model="event.name"></el-input>
                  <span v-if="event.templateId">{{event.name}}</span>
                  <el-button class="button" style="float: right;" type="text" @click='deleteEvent(event)'>删除</el-button>
                </div>
                <div class="bottom clearfix">
                  <el-select
                    clearable
                    placeholder="选择模板"
                    style="width:220px"
                    v-model="event.templateId"
                    @change="eventTemplateChange(event)">
                    <el-option
                      v-for="event in events"
                      :key="event.id"
                      :label="event.name"
                      :value="event.id">
                    </el-option>
                  </el-select>
                  <el-date-picker
                    format="yyyy 年 MM 月 dd 日"
                    placeholder="选择日期"
                    type="date"
                    value-format="yyyy-MM-dd"
                    v-model="event.deadline">
                  </el-date-picker>
                </div>
              </div>
            </el-card>
          </div>
        </el-form-item>
        <el-form-item style="text-align:center;">
          <el-button @click="$router.push({ name: 'ProjectList' })">取消</el-button>
          <el-button type="primary" @click="createProject">创建</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
        title="添加事件"
        width="500px"
        :visible.sync="addingEvent">
        <el-form ref="newEvent" size="mini" :model="newEvent" :rules="eventRules">
          <el-form-item label="事件名称" label-width="100px" prop="name">
            <el-input
              placeholder="请输入事件名称"
              v-model="newEvent.name"
              :disabled="newEvent&&!!newEvent.id"
              :value="newEvent ? newEvent.name : ''"></el-input>
          </el-form-item>
          <el-form-item label-width="100px">
            <span slot="label">模板
              <el-tooltip class="item" content="选择模版后,将无法编辑事件名称" effect="dark" placement="bottom">
                <i class="el-icon-question"/>
              </el-tooltip>
            </span>
            <el-select
              clearable
              placeholder="选择模板"
              v-model="templateId"
              @change="selectTemplate">
              <el-option
                v-for="event in events"
                :key="event.id"
                :label="event.name"
                :value="event.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="addEvent('newEvent')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { createProject } from '@/services/project'

export default {
  name: 'create',
  components: {
  },
  data () {
    return {
      projectRules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { max: 30, message: '长度在 30 个字符以内', trigger: 'blur' }
        ],
        code: [
          { max: 10, message: '长度在 10 个字符以内', trigger: 'blur' }
        ],
        principals: [
          { required: true, message: '请选择项目负责人', trigger: 'blur' }
        ],
        masters: [
          { required: true, message: '请选择项目主管', trigger: 'blur' }
        ],
        pms: [
          { required: true, message: '请选择项目PM', trigger: 'blur' }
        ]
      },
      eventRules: {
        name: [
          { required: true, message: '请输入事件名称', trigger: 'blur' }
        ]
      },
      projectStatus: [
        {
          value: 100,
          name: '类型a'
        },
        {
          value: 200,
          name: '类型b'
        }
      ],
      projectType: [
        {
          value: 100,
          name: '开发中'
        },
        {
          value: 200,
          name: '维护中'
        },
        {
          value: 300,
          name: '已关停'
        }
      ],
      project: {
        status: 100,
        type: 100,
        events: []
      },
      projects: [
        {
          id: '1',
          name: '项目1'
        },
        {
          id: '2',
          name: '项目2'
        },
        {
          id: '3',
          name: '项目3'
        },
        {
          id: '4',
          name: '项目4'
        }
      ],
      projectTemplates: [
        {
          id: 1,
          name: '模板1',
          events: [
            {
              id: 0,
              name: '事件1',
              type: 1,
              templateId: 1
            },
            {
              id: 2,
              name: '事件2',
              templateId: 2
            },
            {
              id: 3,
              name: '事件3'
            }
          ]
        },
        {
          id: 2,
          name: '模板1',
          events: [
            {
              id: 4,
              name: '事件4',
              type: 1,
              templateId: 1
            },
            {
              id: 5,
              name: '事件5',
              templateId: 2
            },
            {
              id: 6,
              name: '事件6'
            }
          ]
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
      events: [
        {
          id: 1,
          type: 1,
          name: 'event1'
        },
        {
          id: 2,
          type: 2,
          name: 'event2'
        },
        {
          id: 3,
          type: 3,
          name: 'event3'
        },
        {
          id: 4,
          type: 1,
          name: 'event4'
        },
        {
          id: 5,
          type: 2,
          name: 'event5'
        },
        {
          id: 6,
          type: 3,
          name: 'event6'
        }
      ],
      userArray: [],
      searchingUser: false,
      searchingPmgo: false,
      createPmgo: false,
      prefixInPmgo: '',
      addingEvent: false,
      templateId: '',
      newEvent: {
        id: '',
        name: '',
        templateId: ''
      },
      canSwitch: true
    }
  },
  methods: {
    searchUser () {
      this.userArray = this.users
      this.searchingUser = false
    },
    searchPmgo () {
      this.searchingPmgo = false
    },
    pmgoChange (val) {
      if (val) {
        this.createPmgo = false
        this.canSwitch = false
      } else {
        this.canSwitch = true
      }
    },
    createProject () {
      let isValid = true
      this.$refs.projectInfo.validate((valid) => {
        if (!valid) {
          console.log('error submit!!')
          isValid = false
        }
      })
      this.$refs.projectUsers.validate((valid) => {
        if (!valid) {
          console.log('error submit!!')
          isValid = false
        }
      })
      if (!isValid) {
        return false
      }
      createProject(this.project)
        .then(() => {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message({
            message: err.response.error || '创建失败',
            type: 'dangers'
          })
        })
    },
    projectTemplateChange (tpl) {
      var projectTemplate = this.projectTemplates.find(p => p.id === tpl)
      this.project.events = projectTemplate.events
    },
    eventTemplateChange (event) {
      var eventTemplate = this.events.find(p => p.id === event.templateId)
      if (eventTemplate) {
        event.name = eventTemplate.name
      }
    },
    selectTemplate (tpl) {
      var eventTemplates = this.events
      this.newEvent = eventTemplates.find(t => t.id === tpl)
    },
    addEvent (event) {
      this.$refs[event].validate((valid) => {
        if (valid) {
          var newEvent = Object.assign({}, this.newEvent)
          let id = 1
          for (const event of this.project.events) {
            if (event.id > id) {
              id = event.id
            }
          }
          newEvent.id = id + 1
          newEvent.templateId = this.templateId
          this.project.events.push(newEvent)
          this.addingEvent = false
          this.templateId = ''
          this.newEvent = {}
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    deleteEvent (event) {
      const deleteContent = `是否确定把事件 ${event.name} 从该项目模板中删除?`
      this.$confirm(deleteContent, '删除事件', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      }).then(() => {
        this.project.events = this.project.events.filter(e => e.id !== event.id)
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
    closeDialog () {
      this.addingEvent = false
    }
  }
}
</script>

<style lang='scss'>
.el-col{
  line-height: 26px;
  font-size: 14px;
}
.el-row {
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-form--inline{
  width: 100%;
  .el-form-item{
    width: calc(50% - 10px) !important;
  }
  .el-form-item__content{
    width: calc(100% - 100px) !important;
  }
}
.el-form{
  textarea{
    font-size: 15px;
  }
  .el-form-item__content{
    width: calc(100% - 110px);
  }
}
.el-form--inline.therePieces{
  width: 100%;
  .el-form-item{
    width: calc(33.3% - 10px) !important;
  }
}
</style>
