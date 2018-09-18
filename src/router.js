import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// 项目
import Project from './views/project/index'
import ProjectList from './views/project/list'
import ProjectDetail from './views/project/detail'

// 模板
import Template from './views/template/index'
import ProjectListTemplate from './views/template/projectList'
import EventListTemplate from './views/template/eventList'
import DemandListTemplate from './views/template/demandList'

// 管理
import Manage from './views/manage/index'
import SysUser from './views/manage/sysuser'
import BackUser from './views/manage/backuser'

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
            title: '首页'
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
          path: 'eventlist',
          name: 'EventListTemplate',
          component: EventListTemplate,
          meta: {
            title: '事件模板列表'
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
