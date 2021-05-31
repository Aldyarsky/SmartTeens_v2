import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'

import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'

import OrderListScreen from './screens/OrderListScreen'
import MarathonListScreen from './screens/MarathonListScreen'
import MarathonEditScreen from './screens/MarathonEditScreen'
import MarathonScreen from './screens/MarathonScreen'
import MarathonLessonScreen from './screens/MarathonLessonScreen'


function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/cart/:id?' component={CartScreen} />

          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />

          <Route path='/admin/marathonList' component={MarathonListScreen} />
          <Route path='/admin/marathon/:id/edit' component={MarathonEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/marathon/:id' component={MarathonScreen} />
          <Route path='/lessons/:id' component={MarathonLessonScreen}/>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
