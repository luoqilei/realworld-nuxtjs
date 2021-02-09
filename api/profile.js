import { request } from "@/plugins/request.js";

// 获取用户信息
export const getProfile = (username) => {
  return request({
    method: "GET",
    url: `/api/profiles/${username}`,
  });
};

// 获取文章
export const getMyArticles = (params) => {
    return request({
      method: "GET",
      url: "/api/articles",
      params,
    });
  };

// 更新文章
export const updateArticle = (slug, data) => {
  return request({
    method: "PUT",
    url: `/api/articles/${slug}`,
    data,
  });
};
