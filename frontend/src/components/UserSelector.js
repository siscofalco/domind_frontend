import React from 'react';
import { Redirect } from 'react-router'
import { withAuth } from '../context/auth.context'

const UserSelector = (props) => {
    if (props.user.data) {
        console.log(props.user.data);
        if (Array.isArray(props.user.data.patients)) { // Es un doctor
            return (<Redirect to={`/doctor-profile?id=${props.user.data._id}`} />)
        } else {
            return (<Redirect to={`/patient-profile?id=${props.user.data._id}`} />)
        }
    }
    return <p>Loading...</p>
}

export default withAuth(UserSelector);
