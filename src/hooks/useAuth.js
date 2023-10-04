import React from 'react';
import { api } from '../helpers/api';
import { AuthContext } from '../providers/AuthProvider';

export default function useAuth() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { setToken } = React.useContext(AuthContext);

  // Essa função é responsável apenas por fazer login chamando o backend e nada mais
  // redirecionamentos são responsabilidades dos componentes
  async function login(email, password) {
    try {
      setLoading(true);

      // Chamando o backend on http://localhost:3000/auth/login
      const { data } = await api.post('/auth/login', {
        email,
        senha: password,
      });

      // Retorna um token se tudo der certo e salva na API de
      // contexto chamada "AuthContext/AuthProvider"
      // assim eu posso acessar esse token de qualquer lugar da aplicação
      setToken(data.token);

      return data;
    } catch (e) {
      setError(e?.response?.data?.error);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function signUp(email, password) {
    // Podem retulizar os mesmos estados de carregamento e erro
    // Sigam o exemplo do login, mas para fazer o cadastro
    // Chamem essa API para criar conta: /auth/signup
    // Mandem esse valor como corpo da requisição
    /*
      {
          "email": "email do formulário",
          "senha": "senha do formulário"
      }
    */
    return;
  }

  function logout() {
    setToken(null);
  }

  return {
    authLoading: loading,
    authError: error,
    login,
    signUp,
    logout,
  };
}
