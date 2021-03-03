<template>
  <div class="eventForm">
    <el-card class="box-card">
      <div class="clearfix" slot="header">
        新建事件模板
      </div>
      <el-form label-width="80px" ref="project" :model="project" :rules="eventRules">
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="project.name"></el-input>
        </el-form-item>
        <el-form-item class="eventBody" label="事件需求">
          <el-button type="text" style="float: right;margin-right: 10px;" @click="adding = true">
            <i class="el-icon-circle-plus-outline"/>
            添加需求
          </el-button>
          <div style="margin-top:40px;">
            <el-card
              shadow="hover"
              v-for="event in events"
              :body-style="{ padding: '0px'}"
              :key="event.id"
              style="min-width: 200px;width: calc(33.333333% - 45px);float:left;margin:20px 20px;position:relative">
              <div style="padding: 14px;">
                <div slot="header" class="clearfix">
                  <el-input placeholder="请输入事件名称" style="width:150px" v-model="event.name"></el-input>
                  <el-button
                    class="button"
                    style="float: right;"
                    type="text"
                    @click="deleteEvent(event)">
                    删除
                  </el-button>
                </div>
                <div class="bottom clearfix">
                  <el-select v-model="event.templateId" clearable placeholder="选择模板" style="width:220px">
                    <el-option
                      v-for="event in events"
                      :key="event.id"
                      :label="event.name"
                      :value="event.id"></el-option>
                  </el-select>
                </div>
              </div>
            </el-card>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addProject('project')">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
        title="添加需求"
        width="500px"
        :visible.sync="adding">
        <el-form ref="newDemand" :model="newDemand" :rules="demandRules">
          <el-form-item label="需求名称" label-width="100px" prop="name">
            <el-input
              placeholder="请输入需求名称"
              v-model="newDemand.name"
              :value="newDemand ? newDemand.name : ''"></el-input>
          </el-form-item>
          <el-form-item label-width="100px">
            <span slot="label">模板
            </span>
            <el-select
              clearable
              placeholder="选择模板"
              v-model="newDemand.templateId"
              @change="selectTemplate">
              <el-option
                v-for="event in events"
                :key="event.id"
                :label="event.name"
                :value="event.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="dialog-footer" slot="footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="addEvent('newDemand')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'eventForm',
  data () {
    return {
      eventRules: {
        name: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }// ,
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      demandRules: {
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
      newDemand: {
        id: '',
        name: '',
        templateId: ''
      },
      id: 11
    }
  },
  methods: {
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
          var newDemand = Object.assign({}, this.newDemand)
          newDemand.id = this.id++
          this.events.push(newDemand)
          this.adding = false
          this.newDemand = {}
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    selectTemplate (tpl) {
      var eventTemplates = this.events
      if (!this.newDemand.name) {
        this.newDemand.name = eventTemplates.find(t => t.id === tpl).name
      }
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
</style>
