import { constantRoutes } from '@/router'
import { getRoutes } from '@/api/user'
/* Layout */
import Layout from '@/layout'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  RESET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

const actions = {
  // get routes
  generateRoutes({ commit }) {
    return new Promise((resolve, reject) => {
      getRoutes()
        .then((response) => {
          const routes = response.data
          if (!routes) {
            reject('Can not get routes!')
          }
          const dynamicRoutes = recursionRoutes(routes)
          commit('SET_ROUTES', dynamicRoutes)
          resolve(dynamicRoutes)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  resetRoutes({ commit }) {
    return new Promise((resolve, reject) => {
      commit('RESET_ROUTES', [])
      resolve()
    })
  }
}

function recursionRoutes(routes) {
  routes.forEach(route => {
    if (route.component === 'Layout') {
      route.component = Layout
    } else {
      route.component = loadView(route.component)
    }
    if (route.children) {
      route.children = recursionRoutes(route.children)
    }
  })
  return routes
}

export const loadView = (view) => { // 路由懒加载
  return (resolve) => {
    return require([`@/views/${view}`], resolve)
      .then((res) => resolve(res))
      .catch(() => require([`@/views/error-page/404`], resolve))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
