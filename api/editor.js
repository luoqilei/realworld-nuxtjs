import { request } from "@/plugins/request.js";

// 创建新文章
export const createArticle = (data) => {
  return request({
    method: "POST",
    url: "/api/articles",
    data,
  });
};

// 获取文章
export const getArticle = (slug) => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}`,
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
