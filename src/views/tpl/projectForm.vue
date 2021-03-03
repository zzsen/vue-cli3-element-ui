<template>
  <div class="projectForm">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        {{isCreate ? '新建' : '编辑'}}项目模板
      </div>
      <el-form label-width="80px" ref="project" :model="project" :rules="projectRules">
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="project.name"></el-input>
        </el-form-item>
        <el-form-item label="默认事件" class="eventBody">
          <el-button type="text" style="float: right;margin-right: 10px;" @click="adding = true"><i class="el-icon-circle-plus-outline"/>添加事件</el-button>
          <div style="margin-top:40px;position:relative">
            <el-card
              v-for="event in events"
              :key="event.id"
              shadow="hover"
              :body-style="{ padding: '0px'}"
              style="min-width: 200px;width: calc(33.333333% - 45px);float:left;margin:20px 20px;position:relative">
              <div style="padding: 14px;">
                <div class="clearfix" slot="header">
                  <el-input style="width:150px" placeholder="请输入事件名称" v-if="!event.templateId" v-model="event.name"></el-input>
                  <span v-if="event.templateId">{{event.name}}</span>
                  <el-button
                    class="button"
                    style="float: right;"
                    type="text"
                    @click="deleteEvent(event)">
                    删除
                  </el-button>
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
                      :value="event.id"></el-option>
                  </el-select>
                  <el-date-picker
                    format="yyyy 年 MM 月 dd 日"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    v-model="event.deadline"></el-date-picker>
                </div>
              </div>
            </el-card>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            v-if="isCreate"
            @click="addProject('project')">
            创建
          </el-button>
          <el-button
            type="primary"
            v-else
            @click="editProject('project')">
            提交修改
          </el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="添加事件"
        :visible.sync="adding"
        width="500px">
        <el-form ref="newEvent" :model="newEvent" :rules="eventRules">
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
            <el-select v-model="templateId" clearable placeholder="选择模板" @change="selectTemplate">
              <el-option
                v-for="event in events"
                :key="event.id"
                :label="event.name"
                :value="event.id"></el-option>
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
export default {
  name: 'projectForm',
  data () {
    return {
      isCreate: true,
      projectRules: {
        name: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }// ,
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      eventRules: {
        name: [
          { required: true, message: '请输入事件名称', trigger: 'blur' }// ,
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      project: {},
      eventType: [
        {
          value: 1,
          name: '关键事件'
        },
        {
          value: 2,
          name: '日常事件'
        },
        {
          value: 3,
          name: '特殊事件'
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
      adding: false,
      templateId: '',
      newEvent: {
        id: '',
        name: '',
        templateId: ''
      },
      id: 11
    }
  },
  mounted () {
    console.log(this.$route.matched)
    console.log(this.$route.matched[1].path)
    console.log(this.isCreate)
    this.isCreate = this.$route.matched && this.$route.matched[1].path === '/template/createproject'
  },
  methods: {
    editProject (project) {
      this.$refs[project].validate((valid) => {
        if (valid) {
          this.$router.push({ name: 'ProjectTemplate' })
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addProject (project) {
      this.$refs[project].validate((valid) => {
        if (valid) {
          this.$router.push({ name: 'ProjectTemplate' })
          this.$message({
            message: '创建成功',
            type: 'success'
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addEvent (event) {
      this.$refs[event].validate((valid) => {
        if (valid) {
          var newEvent = Object.assign({}, this.newEvent)
          newEvent.id = this.id++
          newEvent.templateId = this.templateId
          this.events.push(newEvent)
          this.adding = false
          this.templateId = ''
          this.newEvent = {}
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
    deleteEvent (event) {
      const deleteContent = `是否确定把事件 ${event.name} 从该项目模板中删除?`
      this.$confirm(deleteContent, '删除事件', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      }).then(() => {
        this.events = this.events.filter(e => e.id !== event.id)
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
      this.adding = false
    }
  }
}
</script>

<style lang='scss'>
.el-step__line{
  top: 19px !important;
}
.el-select{
  width: 100%;
}
.eventBody>.el-form-item__content{
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.el-form-item__content{
  width: calc(100%-80px)!important;
}
</style>
