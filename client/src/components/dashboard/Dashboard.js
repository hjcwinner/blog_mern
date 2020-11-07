import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className='lead'>
                <i className="fas fa-user"/> Welcome
           </p>
           <Fragment>
               <p>You have not yet setup a profile, please add some info</p>
               <Link to='/create-profile' className='btn btn-primary my-!'>
                   Create Profile
               </Link>
           </Fragment>
        </Fragment>

    );
};

export default Dashboard;