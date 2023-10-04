import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { Button } from '../../@/components/ui/button';
import useAuth from '../hooks/useAuth';

export default function Root() {
  const { token } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const { logout } = useAuth();

  React.useEffect(() => {
    // Se eu não tiver token, ele me redireciona para o login
    if (!token) {
      navigate('/auth/login');
    }
  }, [token]);

  return (
    <>
      <header className="mb-6">
        <h1 className="text-4xl font-bold">Projeto Livraria</h1>

        <nav>
          <Link to="/">Home</Link> | <Link to="/livros">Livros</Link> |{' '}
          <Link to="/efeitos">Efeitos</Link> |{' '}
          <Button variant="link" onClick={() => logout()}>
            Sair
          </Button>
        </nav>
      </header>

      {/* Responsável por renderizar os elementos do children do createBrowserRouter */}
      <Outlet />
    </>
  );
}
