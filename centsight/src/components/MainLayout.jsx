import { Outlet } from 'react-router-dom';
import SideMenu from './SideMenu';
import Header from './Header';
const MainLayout = () => {
  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <SideMenu />
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
