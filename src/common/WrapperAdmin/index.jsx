import React from 'react';
import { Outlet } from "react-router-dom";

import Header from '../../components/Header';

const Wrapper = () => {
    return(
        <>
            <Header isAdminPage={true} />

            <Outlet />
        </>
    )
}

export default Wrapper;