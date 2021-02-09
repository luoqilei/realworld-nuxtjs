import { request } from "@/plugins/request.js";

// 章节公共文章列表
export const getArticles = (params) => {
  return request({
    method: "GET",
    url: "/api/articles",
    params,
  });
};

// 获取文章分类列表
export const getTags = () => {
  return request({
    method: "GET",
    url: "/api/tags",
  });
};

// 获取关注的用户文章列表
export const getFeedArticles = (params) => {
  return request({
    method: "GET",
    url: "/api/articles/feed",
    // headers: {
    //   Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTQwMjk2LCJ1c2VybmFtZSI6IldhbmdjaHVhbiIsImV4cCI6MTYxNzg0MTY4OX0.e3F-A8CbMuE2Wx4LE3wa7B7lH7Uc26OgDIazDL1jZcU`,
    // },
    params,
  });
};

// 添加点赞
export const addFavorite = (slug) => {
  return request({
    method: "POST",
    url: `/api/articles/${slug}/favorite`,
  });
};

// 添加点赞
export const delFavorite = (slug) => {
  return request({
    method: "DELETE",
    url: `/api/articles/${slug}/favorite`,
  });
};

// 删除点赞
export const getArticle = (slug) => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}`,
  });
};

// 评论列表
export const getComments = (slug) => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}/comments`,
  });
};

// 添加评论
export const sendComments = (slug, data) => {
  return request({
    method: "POST",
    url: `/api/articles/${slug}/comments`,
    data
  });
};

// 删除评论
export const deleteComments = (slug, id) => {
  return request({
    method: "DELETE",
    url: `/api/articles/${slug}/comments/${id}`,
  });
};

// 关注作者
export const following = (username) => {
  return request({
    method: "POST",
    url: `/api/profiles/${username}/follow`,
  });
};

//  取消关注
export const unFollowing = (username) => {
  return request({
    method: "DELETE",
    url: `/api/profiles/${username}/follow`,
  });
}

//  删除文章
export const delArticle = (slug) => {
  return request({
    method: "DELETE",
    url: `/api/articles/${slug}`,
  });
}


