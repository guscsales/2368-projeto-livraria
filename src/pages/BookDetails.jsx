import { useParams } from 'react-router-dom';
import useBook from '../hooks/useBook';

export default function BookDetails() {
  const { bookId } = useParams();
  const { book, isLoadingBook } = useBook(bookId);

  if (isLoadingBook) {
    return <div>Carregando livro...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-5">{book.titulo}</h2>
    </div>
  );
}
