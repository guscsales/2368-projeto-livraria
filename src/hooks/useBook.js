import useSWR from 'swr';

export default function useBook(bookId) {
  const { data, isLoading, error } = useSWR(
    () => bookId && `/livros/${bookId}`
  );

  function createBook() {
    // No futuro posso ter essa função
  }

  return {
    book: data,
    isLoadingBook: isLoading,
    bookError: error,
    createBook,
  };
}
