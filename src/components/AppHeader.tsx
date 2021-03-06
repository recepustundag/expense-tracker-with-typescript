import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { isLoggedIn } from '../store/actions/userActions';
import { AppState } from '../store/reducers';

const AppHeader = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: AppState) => state.user);

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  const {pathname} = useLocation()

  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className='logo' />
      <Menu theme='dark' mode='horizontal' selectedKeys={[pathname]} defaultSelectedKeys={['2']}>
        {data.username ? (
          <>
            <Menu.Item key='/records'><Link to="/records">Harcama Kayıtları</Link></Menu.Item>
            <Menu.Item key='/categories'><Link to="/categories">Kategori</Link></Menu.Item>
            <Menu.Item key='/logout'><Link to="/logout">Çıkış</Link></Menu.Item>
          </>
        ) : (
          loading ? null : <Menu.Item key='/login'><Link to="/login">Giriş</Link></Menu.Item>
        )}
      </Menu>
    </Header>
  );
};

export default AppHeader;
