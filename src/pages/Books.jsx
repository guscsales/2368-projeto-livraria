import useBooks from '../hooks/useBooks';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../@/components/ui/card';
import { Button, buttonVariants } from '../../@/components/ui/button';
import { Link } from 'react-router-dom';
import React from 'react';
import { Input } from '../../@/components/ui/input';
import { useForm } from 'react-hook-form';

const limit = 10;

export default function Books() {
  const form = useForm();
  // Utilize o watch para sempre ter o valor quando o campo for alterado
  // const search = form.watch('search');

  // Utilize um estado para atualizar o valor quando clicar em "buscar"
  const [search, setSearch] = React.useState('');

  const [currentPage, setCurrentPage] = React.useState(0);
  const { books, booksTotal, booksCount, isBookLoading } = useBooks({
    limit,
    page: currentPage,
    search,
  });
  const totalPages = Math.ceil(booksTotal / limit);

  function onSubmit(data) {
    setSearch(data.search);
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Lista de livros</h2>

      <form className="flex gap-2 mb-4" onSubmit={form.handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Busque por nome do livro, autor e editora..."
          {...form.register('search')}
        />
        <Button type="submit">Buscar</Button>
      </form>

      {isBookLoading && <div>Carregando livros...</div>}

      {!isBookLoading && (
        <>
          <h3 className="text-lg font-bold mb-4">
            Registros nessa página: {booksCount} / Total de Registros:{' '}
            {booksTotal}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {books.map((book) => (
              <Card key={book.id}>
                <CardHeader>
                  <CardTitle>{book.titulo}</CardTitle>
                  <CardDescription>
                    {book.autor.nome} - {book.editora.nome}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="w-full h-80 bg-no-repeat bg-center rounded"
                    style={{ backgroundImage: `url('${book.capa}')` }}
                  ></div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link
                    to={`/livros/${book.id}`}
                    className={buttonVariants({
                      variant: 'link',
                      className: '-mx-4',
                    })}
                  >
                    Ver Detalhes
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}

      <div className="flex gap-2 w-96 overflow-x-auto mt-5 pb-2 mx-auto">
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            variant={currentPage === index ? 'default' : 'outline'}
            key={`page_${index}`}
            onClick={() => {
              setCurrentPage(index);
            }}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </>
  );
}
