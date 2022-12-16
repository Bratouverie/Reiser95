import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CenteredContainer from '../../common/CenteredContainer';
import Loader from '../../common/Loader';
import { checkAuth } from '../../functions/auth';
import { useGetPagesQuery } from '../../redux/api/dataService';

const InitialDataContainer = ({ children }) => {
    const dispatch = useDispatch();
    const autn = useSelector(state => state.auth);

    const { isLoading: isPagesLoading } = useGetPagesQuery();

    useEffect(() => {
        checkAuth(dispatch);
    }, [dispatch]);

    if (isPagesLoading || autn.loadAuth) {
        return (
            <CenteredContainer>
                <Loader />
            </CenteredContainer>
        );
    }

    return children;
};

export default React.memo(InitialDataContainer);
