import { Pagination, PaginationInput } from "../typeDefs";

export default function calculatePaginationResponse(
  { page, limit }: PaginationInput,
  totalItems: number
): Pagination {
  const totalPages = Math.ceil(totalItems / limit);

  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  return {
    totalItems,
    currentPage: page,
    pageSize: limit,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
}
