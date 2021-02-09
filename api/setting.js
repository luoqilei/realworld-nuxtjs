import { request } from "@/plugins/request.js";

// 获取当前登录用户
export const getCurrentUser = () => {
  return request({
    method: "GET",
    url: "/api/user",
  });
};

// 更新用户信息
export const updateUser = (data) => {
    return request({
      method: "PUT",
      url: "/api/user",
      data
    });
  };
