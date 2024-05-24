import { Pagination } from "../typeDefs";

export default function combinePaginations(pagination1: Pagination, pagination2: Pagination): Pagination {
  const totalItems = pagination1.totalItems + pagination2.totalItems;
  let currentPage;
  let pageSize;
  let totalPages;
  let hasNextPage;
  let hasPrevPage;

  if (pagination1.totalItems >= pagination2.totalItems) {
    currentPage = pagination1.currentPage;
    pageSize = pagination1.pageSize;
    totalPages = pagination1.totalPages;
    hasNextPage = pagination1.hasNextPage;
    hasPrevPage = pagination1.hasPrevPage;
  }
  else {
    currentPage = pagination2.currentPage;
    pageSize = pagination2.pageSize;
    totalPages = pagination2.totalPages;
    hasNextPage = pagination2.hasNextPage;
    hasPrevPage = pagination2.hasPrevPage;
  }

  return {
    totalItems,
    currentPage,
    pageSize,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
}