import React from 'react';
import { Redirect } from 'react-router'
import { withAuth } from '../context/auth.context'
import CachedIcon from '@material-ui/icons/Cached';

const UserSelector = (props) => {
    if (props.user.data) {
        if (Array.isArray(props.user.data.patients)) { // Is a doctor
            return (<Redirect to={`/doctor-profile/${props.user.data._id}`} />)
        } else {
            return (<Redirect to={`/patient-profile/${props.user.data._id}`} />)
        }
    }

    setTimeout(() => {
        window.location.reload();
    }, 200);

    return <div className="loadingContainer"><CachedIcon /></div>
}

export default withAuth(UserSelector);
