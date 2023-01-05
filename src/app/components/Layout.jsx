import { Outlet } from 'react-router-dom';
import Headers from './Header';
const Layout = () => {
  return (
    <>
      <Headers />
      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
