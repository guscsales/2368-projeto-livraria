import { Outlet } from 'react-router-dom';

export default function RootAuth() {
  return (
    <div className="h-[80vh] flex items-center justify-center">
      {/* Responsável por renderizar os elementos do children do createBrowserRouter */}
      <Outlet />
    </div>
  );
}
