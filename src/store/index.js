import Vuex from 'vuex'
import Vue from 'vue'
import isEmpty from '@/utils/isEmpty'
import * as types from './mutation-types'

// sessionStorage中保存数据前缀
const prefix = 'admin-'
const { parse, stringify } = window.JSON

// Getters中,先读取state中的数据，如果没有值，则从sessionStorage中读取
// state：vuex state
// stateProp：vuex state中属性的名称
// storageName：sessionStorage
// IMPORTANT：组件使用时，直接使用mapGetters 替换掉mapState
const loadState = (state, stateProp, storageName) => {
  if (isEmpty(state[stateProp])) {
    try {
      const data = parse(sessionStorage.getItem(`${prefix}${storageName}`))
      return isEmpty(data) ? '' : data
    } catch (err) {
      return {}
    }
  } else {
    return state[stateProp]
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeUser: {}
  },
  getters: {
    activeUser: state => {
      return loadState(state, 'activeUser', 'active-user')
    }
  },
  actions: {
    setActiveUser ({ commit }, user) {
      sessionStorage.setItem(`${prefix}active-user`, stringify(user))
      commit(types.SET_ACTIVE_USER)
    }
  },
  mutations: {
    [types.SET_ACTIVE_USER] (state, user) {
      state.activeUser = user
    }
  }
})
