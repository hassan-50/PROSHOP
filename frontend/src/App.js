import {Container} from 'react-bootstrap'
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import LoginScreen from "./screens/LoginScreen"
import CartScreen from "./screens/CartScreen"
import RegisterScreen from "./screens/RegisterScreen"
import {BrowserRouter as Router , Route} from 'react-router-dom'
import ProfileScreen from './screens/ProfileScreen'
const App = () => (        
    <Router>
        <Header />
        <main>
          <Container className="py-3">                        
             <Route  path='/product/:id' component={ProductScreen} />
             <Route  path='/profile' component={ProfileScreen} />
             <Route  path='/register' component={RegisterScreen} />
             <Route  path='/login' component={LoginScreen} />
             <Route  path='/cart/:id?' component={CartScreen} />
             <Route  path='/' component={HomeScreen} exact/>
          </Container>
          </main>
          <Footer />

      </Router>      
  );


export default App;
