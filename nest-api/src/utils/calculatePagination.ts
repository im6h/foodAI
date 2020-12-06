export const calulatePagination = (size = 10, page = 1) => {
  const limit = Math.min(Math.max(1, size), 100);
  page = Math.max(1, page);
  const offset = limit * (page - 1);
  return [limit, offset];
};
