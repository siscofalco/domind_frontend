import React from 'react';
import { withAuth } from '../context/auth.context';

const Navbar = (props) => {

    if (!props.user || !props.user.data || !props.user.data.username) {
        return null;
    }

    const redirectTo = (url) => {
        window.location.href = url;
    }

    return (
        <div className="navbar-container">
            <div className="navbar-item" onClick={() => {redirectTo('/user-selector');}}>Profile</div>
            {(props.user.data.patients && Array.isArray(props.user.data.patients) ? (<div className="navbar-item" onClick={() => {redirectTo('/new-patient');}}>New Patient</div>) : null)}
            <div className="navbar-item" onClick={() => {redirectTo('/logout');}}>Logout</div>
        </div>
    )
}

export default withAuth(Navbar);