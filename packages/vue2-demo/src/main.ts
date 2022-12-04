import Vue from "vue";
import App from "./App.vue";
import { routes } from "./router";
import { vueBridge } from "@garfish/bridge-vue-v2";
import VueRouter from "vue-router";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
Vue.use(VueRouter as any);
console.log(VueRouter, Vue, "你好世界");

Vue.config.productionTip = false;

// new Vue({
//   // @ts-ignore
//   router: router as any,
//   render: (h) => h(App),
// }).$mount("#app");

function newRouter(basename) {
  const router = new VueRouter({
    mode: "history",
    base: basename,
    routes: routes,
  });
  return router;
}
/* 存在问题 */
// export const provider = vueBridge({
//   loadRootComponent: () => {
//     return Promise.resolve(App as any);
//   },
//   // 可选，注册 vue-router或状态管理对象
//   appOptions: ({ basename, dom, appName, props, appInfo }) => {
//     // pass the options to Vue Constructor. check https://vuejs.bootcss.com/api/#%E9%80%89%E9%A1%B9-%E6%95%B0%E6%8D%AE

//     console.log(newRouter(basename), "ssss");
//     return {
//       el: "#app",
//       router: newRouter(basename),
//     };
//   },
// });

export const provider = ({ dom, basename }) => {
  let vm: null | Vue = null;
  return {
    render() {
      console.log(basename, dom);
      vm = new Vue({
        //@ts-ignore
        router: newRouter(basename) as unknown as any,
        render: (h) => h(App),
      }).$mount("#app");
    },
    destroy() {
      vm?.$destroy();
    },
  };
};

if (!(window as any).__GARFISH__) {
  // @ts-ignore
  console.log(process.env.BASE_URL);
  new Vue({
    //@ts-ignore
    router: newRouter(process.env.BASE_URL) as unknown as any,
    render: (h) => h(App),
  }).$mount("#app");
}
