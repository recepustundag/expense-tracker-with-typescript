import { Route } from 'react-router';
import SignUp from './components/SignUp';
import { Layout} from 'antd';
import Login from './components/Login';
import Categories from './components/Categories';
import PrivateRoute from './components/privateRoute';
import Records from './components/Records';
import AppHeader from './components/AppHeader';
import Logout from './components/Logout';

const { Content, Footer } = Layout;

function App() {
  return (
    <>
      <Layout>
        <AppHeader />
        <Content className='site-layout' style={{ padding: '50px', marginTop: 64 }}>
          <div className='site-layout-background' style={{ padding: 24, minHeight: 380 }}>
            <Route path='/register' component={SignUp} />
            <Route path='/login' component={Login} />
            <PrivateRoute path="/categories" component={Categories} />
            <PrivateRoute path="/records" component={Records} />
            <Route path='/logout' component={Logout} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Expense Tracker</Footer>
      </Layout>
    </>
  );
}

export default App;
