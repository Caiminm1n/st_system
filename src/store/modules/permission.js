import {asyncRouterMap, constantRouterMap} from '@/router'

function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  }else {
    return true
  }
}
function filterAsyncRouter (routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = {...route}
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
function filterNoneRouter(){
  const res = []
  asyncRouterMap.forEach(route =>{
    const tmp = {...route}
    if(tmp.meta && tmp.meta.roles && tmp.meta.roles.includes('无')){
      res.push(tmp)
    }
  })
  return res
}
const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({commit}, data) {
      return new Promise((resolve) => {
        const {roles} = data
        let accessedRouters
        if (roles.includes('超级管理员')) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles).concat(filterNoneRouter())
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
