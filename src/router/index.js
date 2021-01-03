/*
  仅有一级router-view版本，因为要完美实现多页面标签功能，所以不嵌套路由，全部路由仅为二级路由
*/
import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';// Progress 进度条样式
import authApi from "@/api/common/auth";
import commonApi from "@/api/common/common";
import config from "@/config";
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router)

let router = new Router({
  routes: [
    { path: '/', redirect: '/index' },
    {
      path: '/login',
      name: 'login',
      component: _import('/login'),
      meta: {
        noAuth: true
      }
    },
    {
      path: '/qywxAuth/:path?',
      name: 'qywxAuth',
      component: _import('/qywxAuth'),
      props: true,
      meta: {
        title: '微信企业认证',
        noAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  let configFunc;
  if (store.state.sys.config == null) {
    configFunc = commonApi.getConfigList();
  } else {
    configFunc = Promise.resolve();
  }
  configFunc.then(res => {
    if (res) {
      let config = {};
      res.data.forEach(item => {
        switch (item.type) {
          case "NUMBER":
            config[item.key] = Number(item.value);
            break;
          case "BOOL":
            config[item.key] = item.value == "ON" ? true : false;
            break;
          default:
            config[item.key] = item.value;
        }
      });
      store.commit("SET_CONFIG", config);
    }
    /* 判断要访问的路由是否需要权限访问 */
    if (to.meta && to.meta.noAuth) {
      next()
    } else {
      /* 判断是否有已登录 */
      if (localStorage.getItem(config.token.accessKey) ? true : false) {
        /* 判断是否已获取登录认证信息 */
        if (store.getters.hasAuthInfo) {
          next()
        } else {
          let layout = require("@/components/common/layout/" + store.state.sys.config.LAYOUT + "/index").default;
          /* 获取登录认证信息 */
          authApi.getAuthInfo().then(res => {
            let permissionMenus = res.data.permissionMenus;
            permissionMenus.unshift({
              id: -1,
              name: config.homePage.name,
              path: config.homePage.path,
              icon: config.homePage.icon,
              parentId: null
            })
            let menus = []; //树结构菜单

            let layoutRouter = {
              name: "layout",
              path: "",
              component: layout,
              children: []
            };

            //构建完整路径及权限路径值
            function buildPermissionAndFullPath(menu) {
              permissionMenus.forEach((m, i) => {
                if (m.parentId == menu.id) {
                  m.fullPath = menu.fullPath + '/' + m.path;
                  m.permissionPath = (menu.permissionPath ? (menu.permissionPath + '.') : "") + m.path;
                  buildPermissionAndFullPath(m);
                }
              })
            };
            buildPermissionAndFullPath({
              id: null,
              fullPath: "",
              permissionPath: ""
            });

            //先取出顶级菜单
            permissionMenus.forEach(item => {
              if (item.isPage) {
                layoutRouter.children.push({
                  name: item.permissionPath,
                  path: item.fullPath,
                  component: _import(item.fullPath + ".vue"),
                  meta: {
                    id: item.id,
                    title: item.name,
                    canMultipleOpen: item.canMultipleOpen,
                    isPage: item.isPage
                    // fullPath: m.fullPath,
                    // icon: m.icon,
                    // canRead: m.canRead,
                    // canWrite: m.canWrite,
                    // canReview: m.canReview
                  }
                })
              } else if (item.parentId == null) {
                menus.push(item);
              }
            })
            //构建菜单及路由
            function buildMenusAndRouters(menus) {
              menus.forEach(item => {
                permissionMenus.forEach(m => {
                  if (m.parentId == item.id && !m.isPage) {
                    if (!item.children) item.children = [];
                    item.children.push(m);
                  }
                })
                if (item.children) {
                  buildMenusAndRouters(item.children);
                } else {
                  layoutRouter.children.push({
                    name: item.permissionPath,
                    path: item.fullPath,
                    component: _import(item.fullPath + "/index.vue"),
                    meta: {
                      id: item.id,
                      title: item.name,
                      canMultipleOpen: item.canMultipleOpen
                    }
                  })
                }
              })
            }
            buildMenusAndRouters(menus);
            store.commit('SET_ID', res.data.userId);
            store.commit('SET_NAME', res.data.userName);
            store.commit("SET_PERMISSION_MENUS", res.data.permissionMenus);
            store.commit('SET_MENUS', menus);
            router.addRoutes([layoutRouter]);
            router.addRoutes([{ path: '*', redirect: '/index' }]);
            next({ path: to.path, replace: true });
          })
        }
      } else {
        next('/login')
        if (from.path == "/login") {
          NProgress.done()
        }
      }
    }
  })
})

router.afterEach((to, from) => {
  NProgress.done() // 结束Progress
  if (to.meta && to.meta.title) {
    document.title = to.meta.title + ' | ' + store.state.sys.config.SYSTEM_TITLE
  } else {
    document.title = store.state.sys.config.SYSTEM_TITLE
  }
})

export default router
