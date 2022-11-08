import React from 'react';
import { Navigate } from 'react-router-dom';
import {useSelector} from 'react-redux';

import Preloader from '../../common/Preloader';

const PrivatePageWrapper = ({children}) => {
	const auth = useSelector(state => state.auth);

	if(auth.loadAuth){
		return <Preloader />
	}

    if(!auth.isAuth){
        return <Navigate to="/" />
    }

	return(
		children
	)
}

export default PrivatePageWrapper;