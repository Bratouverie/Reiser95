import React from 'react';
import { Outlet } from "react-router-dom";

import HeaderAdmin from '../HeaderAdmin';

const Wrapper = () => {
    return(
        <>
            <HeaderAdmin />

            <Outlet />
        </>
    )
}

export default Wrapper;