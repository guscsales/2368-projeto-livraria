import useSWR from 'swr';

export default function useBooks({ limit = 10, page = 0, search = '' }) {
  // Maneira mais manual de requisitar o servidor via API
  // const [books, setBooks] = React.useState([]);
  // const [loading, setLoading] = React.useState(false);
  // const [error, setError] = React.useState(null);
  // React.useEffect(() => {
  //   setLoading(true);
  //   api
  //     .get('/livros?limit=100')
  //     .then(({ data }) => {
  //       setBooks(data?.items || []);
  //     })
  //     .catch(() => {
  //       setError('Erro ao buscar livros');
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  const {
    data: books,
    isLoading,
    error,
  } = useSWR(() => `/livros?limit=${limit}&page=${page}&q=${search}`);

  return {
    books: books?.items || [],
    booksCount: books?.count || 0, // ?. = if (books && books.count)
    booksTotal: books?.total || 0,
    isBookLoading: isLoading,
    booksError: error,
  };
}
