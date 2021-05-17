import { Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import AnonRoute from './components/routes/AnonRoutes';
import PrivateRoute from './components/routes/PrivateRoutes';
import UserSelector from './components/UserSelector';
import './App.css';
import DoctorProfile from './pages/profile/DoctorProfile';
import PatientProfile from './pages/profile/PatientProfile';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={() => (<p>Hola</p>)} />
      <PrivateRoute exact path="/user-selector" component={UserSelector} />
      <PrivateRoute path="/doctor-profile" component={DoctorProfile} />
      <PrivateRoute path="/patient-profile" component={PatientProfile} />
      <AnonRoute exact path="/signup" component={Signup} />
      <AnonRoute exact path="/login" component={Login} />
    </div>
  );
}

export default App;
