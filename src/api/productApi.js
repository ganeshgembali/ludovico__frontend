import api from "./client";

export const getFeaturedProducts = () => {
  return api.get("/products?featured=true&limit=10");
};

export const getBestSellerProducts = () => {
  return api.get("/products?bestSeller=true&limit=10");
};

export const getCoffeeProducts = () => {
  return api.get("/products?category=coffee");
};

export const getTeaProducts = () => {
  return api.get("/products?category=tea");
};

export const searchProducts = (query) => {
  return api.get(`/products?search=${encodeURIComponent(query)}`);
};

export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

export const getProductBySlug = (slug) => {
  return api.get(`/products/slug/${slug}`);
};

export const getCategories = () => {
  return api.get("/products/categories");
};

export const getCollections = () => {
  return api.get("/products/collections");
};