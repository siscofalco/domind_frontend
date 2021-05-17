import { Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import AnonRoute from './components/routes/AnonRoutes';
import PrivateRoute from './components/routes/PrivateRoutes';
import UserSelector from './components/UserSelector';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={() => (<p>Hola</p>)} />
      <PrivateRoute exact path="/user-selector" component={UserSelector} />
      <PrivateRoute exact path="/doctor-profile/:id" component={UserSelector} />
      <PrivateRoute exact path="/patient-profile/:id" component={UserSelector} />
      <AnonRoute exact path="/signup" component={Signup} redirectPath="/" />
      <AnonRoute exact path="/login" component={Login} />
    </div>
  );
}

export default App;
