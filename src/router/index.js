import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

// 项目
import Project from '../views/project/index'
import ProjectList from '../views/project/list'
import ProjectDetail from '../views/project/detail'
import CreateProject from '../views/project/create'

// 模板
import Template from '../views/tpl/index'
import ProjectListTemplate from '../views/tpl/projectList'
import ProjectTemplateForm from '../views/tpl/projectForm'
import EventListTemplate from '../views/tpl/eventList'
import EventTemplateForm from '../views/tpl/eventForm'
import DemandListTemplate from '../views/tpl/demandList'

// 管理
import Manage from '../views/manage/index'
import SysUser from '../views/manage/sysuser'
import BackUser from '../views/manage/backuser'

// 日志
import Log from '../views/log/index'
import System from '../views/log/system'

import CollapseCard from '../components/CollapseCard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'HomeList',
          component: ProjectList,
          meta: {
            title: '项目列表'
          }
        }
      ]
    }, {
      path: '/project',
      name: 'project',
      component: Project,
      children: [
        {
          path: 'list',
          name: 'ProjectList',
          component: ProjectList,
          meta: {
            title: '项目列表'
          }
        },
        {
          path: 'detail/:id',
          name: 'ProjectDetail',
          component: ProjectDetail
        },
        {
          path: 'create',
          name: 'CreateProject',
          component: CreateProject
        }
      ]
    }, {
      path: '/template',
      name: 'template',
      component: Template,
      children: [
        {
          path: 'projectlist',
          name: 'ProjectTemplate',
          component: ProjectListTemplate,
          meta: {
            title: '项目模板列表'
          }
        },
        {
          path: 'createproject',
          name: 'CreateProjectTemplate',
          component: ProjectTemplateForm,
          meta: {
            title: '创建项目模板'
          }
        },
        {
          path: 'editproject/:id',
          name: 'EditProjectTemplate',
          component: ProjectTemplateForm,
          meta: {
            title: '编辑项目模板'
          }
        },
        {
          path: 'eventlist',
          name: 'EventListTemplate',
          component: EventListTemplate,
          meta: {
            title: '事件模板列表'
          }
        },
        {
          path: 'Createevent',
          name: 'CreateEventTemplate',
          component: EventTemplateForm,
          meta: {
            title: '创建事件模板'
          }
        },
        {
          path: 'demandlist',
          name: 'DemandListTemplate',
          component: DemandListTemplate,
          meta: {
            title: '需求模板列表'
          }
        }
      ]
    }, {
      path: '/manage',
      name: 'manage',
      component: Manage,
      children: [
        {
          path: 'sysuser',
          name: 'SysUser',
          component: SysUser,
          meta: {
            title: '成员列表'
          }
        },
        {
          path: 'backuser',
          name: 'BackUser',
          component: BackUser,
          meta: {
            title: '后台成员列表'
          }
        }
      ]
    }, {
      path: '/log',
      name: 'Log',
      component: Log,
      children: [
        {
          path: 'system',
          name: 'System',
          component: System,
          meta: {
            title: '系统日志'
          }
        },
        {
          path: 'card',
          name: 'card',
          component: CollapseCard,
          meta: {
            title: 'card'
          }
        }
      ]
    }, {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  ]
})
