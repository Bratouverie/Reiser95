import React, { useMemo, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import About from '../../components/About';
import BrandBg from '../../components/BrandBg';
import ImgBlock from '../../components/ImgBlock';
import Loader from '../../common/Loader';
import CenteredContainer from '../../common/CenteredContainer';

import { REQUEST_TYPE, useRequest } from '../../hooks/useRequest';
import { NotificationContext } from '../../context/NotificationContext';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';
import { useSelector } from 'react-redux';
import { useGetAccountsQuery, useGetPageByUrlQuery } from '../../redux/api/dataService';

const TemplatePage = () => {
    const { url } = useParams();

    const {
        data: pageInfo,
        isLoading: isPageLoading,
        isSuccess: isPageLoadedSuccessfully,
        error: gettingPageError,
        reset: resetGettingPage,
    } = useGetPageByUrlQuery(url);

    const { data: accounts, isLoading: isAccountsLoading } = useGetAccountsQuery({
        page: 1,
        pageSize: 1000,
    });

    const pageAccaunts = useMemo(() => {
        if (!pageInfo || !accounts || !accounts.results) {
            return [];
        }

        return accounts.results.filter((a) => a.page === pageInfo.id);
    }, [accounts, pageInfo]);

    useEffect(() => {
        if (isPageLoadedSuccessfully) {
        }
    }, [isPageLoadedSuccessfully]);

    useEffect(() => {
        if (gettingPageError) {
            // window.location = '/';
        }
    }, [gettingPageError]);

    if (isPageLoading || !pageInfo || isAccountsLoading) {
        return (
            <CenteredContainer>
                <Loader />
            </CenteredContainer>
        );
    }

    return (
        <>
            <BrandBg src={pageInfo.banner} />

            <About title={pageInfo.title_1} text={pageInfo.description} />

            <ImgBlock title={pageInfo.title_2} data={pageAccaunts} />
        </>
    );
};

export default TemplatePage;
