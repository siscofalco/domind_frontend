import React from 'react';
import { withAuth } from '../context/auth.context';
import HomeIcon from '@material-ui/icons/Home';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './NavbarComponent.css';

const Navbar = (props) => {
    if (!props.user || !props.user.data || !props.user.data.username) {
        return null;
    }

    const redirectTo = (url) => {
        window.location.href = url;
    }

    return (
        <div className="navbar-container">
            <div className={`navbar-item ${!window.location.href.includes('/new-patient') ? 'selected' : ''}`} onClick={() => {redirectTo('/user-selector');}}><HomeIcon /></div>
            {(props.user.data.patients && Array.isArray(props.user.data.patients) ? (<div className={`navbar-item ${window.location.href.includes('new-patient') ? 'selected' : ''}`} onClick={() => {redirectTo('/new-patient');}}><PersonAddIcon /></div>) : null)}
            <div className="navbar-item" onClick={() => {redirectTo('/logout');}}><ExitToAppIcon /></div>
        </div>
    )
}

export default withAuth(Navbar);