import { useNavigate, useParams } from 'react-router-dom';
import useBook from '../hooks/useBook';
import { Card } from '../../@/components/ui/card';
import { Button } from '../../@/components/ui/button';

export default function BookDetails() {
  const { bookId } = useParams();
  const { book, isLoadingBook } = useBook(bookId);
  const navigate = useNavigate();

  if (isLoadingBook) {
    return <div>Carregando livro...</div>;
  }

  return (
    <div className="grid grid-cols-[336px_1fr] gap-6">
      <div
        className="w-full h-[580px] bg-no-repeat bg-center bg-cover rounded shadow-lg"
        style={{ backgroundImage: `url('${book.capa}')` }}
      ></div>
      <div className="text-left">
        <header>
          <h2 className="text-3xl font-bold mb-2">{book.titulo}</h2>

          <div className="text-gray-400 italic text-lg">
            Autor: {book.autor.nome} / Editora: {book.editora.nome}
          </div>
        </header>

        <section className="flex flex-col gap-2 mt-7">
          <h3 className="text-xl font-bold">Informações Gerais</h3>

          <div className="flex gap-2">
            <Card className="flex flex-col gap-1 p-4">
              <span className="text-sm font-bold uppercase">Categoria</span>
              {book.categoria.nome}
            </Card>
            <Card className="flex flex-col gap-1 p-4">
              <span className="text-sm font-bold uppercase">
                Código Interno do Livro
              </span>
              {book.codigo}
            </Card>
            <Card className="flex flex-col gap-1 p-4">
              <span className="text-sm font-bold uppercase">ISBN</span>
              {book.isbn}
            </Card>
            <Card className="flex flex-col gap-1 p-4">
              <span className="text-sm font-bold uppercase">Páginas</span>
              {book.paginas}
            </Card>
            <Card className="flex flex-col gap-1 p-4">
              <span className="text-sm font-bold uppercase">
                Ano de Lançamento
              </span>
              {book.ano}
            </Card>
          </div>
        </section>

        <section className="flex flex-col gap-2 mt-7">
          <h3 className="text-xl font-bold">Autor(a)</h3>

          <div className="flex gap-2">
            <Card className="flex flex-col gap-1 p-4">
              <span className="text-sm font-bold uppercase">Nome</span>
              {book.autor.nome}
            </Card>
            <Card className="flex flex-col gap-1 p-4">
              <span className="text-sm font-bold uppercase">Email</span>
              {book.autor.email}
            </Card>
            <Card className="flex flex-col gap-1 p-4">
              <span className="text-sm font-bold uppercase">Contato</span>
              {book.autor.telefone}
            </Card>
          </div>

          <Card className="flex flex-col gap-1 p-4">
            <span className="text-sm font-bold uppercase">Biografia</span>
            {book.autor.bio}
          </Card>
        </section>

        <section className="flex flex-col gap-2 mt-7">
          <h3 className="text-xl font-bold">Editora</h3>

          <div className="flex gap-2">
            <Card className="flex flex-col gap-1 p-4">
              <span className="text-sm font-bold uppercase">Nome</span>
              {book.editora.nome}
            </Card>
            <Card className="flex flex-col gap-1 p-4">
              <span className="text-sm font-bold uppercase">Endereço</span>
              {book.editora.endereco}
            </Card>
            <Card className="flex flex-col gap-1 p-4">
              <span className="text-sm font-bold uppercase">Contato</span>
              {book.editora.telefone}
            </Card>
          </div>
        </section>

        <footer className="mt-7">
          <Button
            onClick={() => {
              navigate('/livros');
            }}
          >
            Voltar
          </Button>
        </footer>
      </div>
    </div>
  );
}
