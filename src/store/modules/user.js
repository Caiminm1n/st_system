import {loginByUsername, logout, getUserInfo} from '../../api/login'
import {getToken, setToken, removeToken} from '@/utils/auth';

const user = {
  state: {
    user: '',
    token: getToken(),
    code: '',
    name: '',
    introduction: '',
    roles: []
  },
  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const token = response.data.data
          commit('SET_TOKEN', token)
          setToken(token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    AdminLoginByUsername ({commit}, adminInfo){
      const username = adminInfo.adminUsername.trim()
      const password = adminInfo.password1.trim()+adminInfo.password2.trim();
      return new Promise((resolve, reject) => {
        loginByUsername(username, password).then(response => {
          const token = response.data.data
          commit('SET_TOKEN', token)
          setToken(token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserInfo ({commit, state}) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then((response) => {
          const data = response.data.data

          if (data.roles && data.roles.length > 0) {
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo:roles must be a non-null array')
          }
          commit('SET_NAME', data.name)
          resolve(response)
        }).catch((response) => {
          reject(resolve)
        })
      })
    },
    LogOut ({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    },
    FedLogOut ({commit}) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
