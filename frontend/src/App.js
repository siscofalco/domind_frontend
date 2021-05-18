import { Redirect, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import AnonRoute from './components/routes/AnonRoutes';
import PrivateRoute from './components/routes/PrivateRoutes';
import UserSelector from './components/UserSelector';
import './App.css';
import DoctorProfile from './pages/profile/DoctorProfile';
import PatientProfile from './pages/profile/PatientProfile';
import PatientDetails from './pages/profile/PatientDetails';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={() => (<Redirect to="/login" />)} />
      <PrivateRoute exact path="/user-selector" component={UserSelector} />
      <PrivateRoute path="/doctor-profile/:id" component={DoctorProfile} />
      <PrivateRoute path="/patient-profile/:id" component={PatientProfile} />
      <PrivateRoute path="/patient-details/:id" component={PatientDetails} />
      <AnonRoute exact path="/signup" component={Signup} />
      <AnonRoute exact path="/login" component={Login} />
      <Route path="*" component={() => (<Redirect to="/login" />)} />
    </div>
  );
}

export default App;
