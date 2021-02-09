/**
 * 基于 axios 封装的模块
 */

import axios from "axios";

// 创建请求对象
export const request = axios.create({
  baseURL: "https://conduit.productionready.io",
});

// 通过插件机制获取上下文对象（query，params，req，res，app，store...）
// 插件导出成员必须是默认成员
export default ({store}) => {
  // 请求拦截器
  // 任何请求都要经过请求拦截器，在请求拦截器中做一些公共的业务处理，统一设置token
  request.interceptors.request.use(
    function(config) {
      const {user} = store.state;
      if (user && user.token) {
        config.headers.Authorization = `Token ${user.token}`;
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  
};
