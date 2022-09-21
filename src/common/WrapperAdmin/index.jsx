import React from 'react';
import { Outlet } from "react-router-dom";

import HeaderAdmin from '../../components/HeaderAdmin';

const Wrapper = () => {
    return(
        <>
            <HeaderAdmin />

            <Outlet />
        </>
    )
}

export default Wrapper;