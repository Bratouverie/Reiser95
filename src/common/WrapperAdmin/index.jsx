import React from 'react';
import { Outlet } from "react-router-dom";

import Header from '../../components/Header';

import PrivatePageWrapper from '../../components/PrivatePageWrapper';

const Wrapper = () => {
    return(
        <PrivatePageWrapper>
            <Header isAdminPage={true} />

            <Outlet />
        </PrivatePageWrapper>
    )
}

export default Wrapper;