export const generatePageNumbers = (
  totalPages: number,
  currentPage: number
) => {
  const pageNumbers = [];
  const maxPagesToShow = 3;

  for (let i = 1; i <= Math.min(maxPagesToShow, totalPages); i++) {
    pageNumbers.push(i);
  }

  if (currentPage > maxPagesToShow + 1) {
    pageNumbers.push('...');
  }

  for (
    let i = Math.max(currentPage - 1, maxPagesToShow + 1);
    i <= Math.min(currentPage + 1, totalPages - maxPagesToShow);
    i++
  ) {
    pageNumbers.push(i);
  }

  if (currentPage < totalPages - maxPagesToShow - 1) {
    pageNumbers.push('...');
  }

  for (
    let i = Math.max(totalPages - maxPagesToShow + 1, maxPagesToShow + 2);
    i <= totalPages;
    i++
  ) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};
