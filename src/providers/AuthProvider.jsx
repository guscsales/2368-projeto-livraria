import React from 'react';
import { useCookies } from 'react-cookie';

export const AuthContext = React.createContext({
  token: '',
  setToken: () => {},
});

export default function AuthProvider({ children }) {
  const tokenCookieName = 'token';
  const [cookies, setCookie] = useCookies([tokenCookieName]);

  function setToken(token) {
    const currentDate = new Date();
    const daysToAdd = 1;
    // Cria uma data de amanhã
    const tomorrow = currentDate.getDate() + daysToAdd;

    setCookie(tokenCookieName, token, {
      path: '/',
      expires: new Date(currentDate.setDate(tomorrow)),
    });

    // Exemplo de expiração com horas
    // const nextThreeHours = currentDate.getHours() + 3;

    // setCookie(tokenCookieName, token, {
    //   expires: new Date(currentDate.setHours(nextThreeHours)),
    // });
  }

  return (
    <AuthContext.Provider value={{ token: cookies.token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
