export const getPagination = (page = 1, limit = 10) => {
  const currentPage = Number(page);
  const pageLimit = Number(limit);

  const skip = (currentPage - 1) * pageLimit;

  return { skip, limit: pageLimit };
};
