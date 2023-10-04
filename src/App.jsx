import './App.css';
import Effects from './pages/Effects';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import RootAuth from './pages/RootAuth';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AuthProvider from './providers/AuthProvider';
import { SWRConfig } from 'swr';
import { fetcher } from './helpers/api';

const router = createBrowserRouter([
  {
    path: 'auth',
    element: <RootAuth />,
    children: [
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'efeitos',
        element: <Effects />,
      },
      {
        path: 'livros/:bookId',
        element: <BookDetails />,
      },
      {
        path: 'livros',
        element: <Books />,
      },
      {
        path: '',
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return (
    <SWRConfig value={{ fetcher }}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </SWRConfig>
  );
}

export default App;
