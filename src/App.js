import { Redirect, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Logout from './pages/login/Logout';
import Signup from './pages/signup/Signup';
import SignupPatient from './pages/signup/SignupPatient';
import AnonRoute from './components/routes/AnonRoutes';
import PrivateRoute from './components/routes/PrivateRoutes';
import UserSelector from './components/UserSelector';
import './App.css';
import DoctorProfile from './pages/profile/DoctorProfile';
import PatientProfile from './pages/profile/PatientProfile';
import PatientDetails from './pages/profile/PatientDetails';
import NavbarComponent from './components/NavbarComponent';

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <div className="appContent">
        <Route exact path="/" component={() => (<Redirect to="/login" />)} />
        <PrivateRoute exact path="/user-selector" component={UserSelector} />
        <PrivateRoute path="/doctor-profile/:id" component={DoctorProfile} />
        <PrivateRoute path="/patient-profile/:id" component={PatientProfile} />
        <PrivateRoute path="/patient-details/:id" component={PatientDetails} />
        <PrivateRoute path="/new-patient" component={SignupPatient} />
        <AnonRoute exact path="/signup" component={Signup} />
        <AnonRoute exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
      </div>
    </div>
  );
}

export default App;
