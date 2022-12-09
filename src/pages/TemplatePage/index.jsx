import React, { useMemo, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import About from '../../components/About';
import BrandBg from '../../components/BrandBg';
import ImgBlock from '../../components/ImgBlock';
import Preloader from '../../common/Preloader';

import { REQUEST_TYPE, useRequest } from '../../hooks/useRequest';
import { NotificationContext } from '../../context/NotificationContext';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';
import { useSelector } from 'react-redux';

const TemplatePage = () => {
    const accounts = useSelector(state => state.accounts);

    const [pageInfo, setPageInfo] = useState();
    const [loading, setLoading] = useState(true);

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const { url } = useParams();

    const { state: getPageInfoRS, request: onGerPageInfo } = useRequest({
        requestType: REQUEST_TYPE.DATA,
    });

    const pageAccaunts = useMemo(() => {
        if (!pageInfo || !accounts.accounts) {
            return [];
        }

        return accounts.accounts.filter(a => a.page === pageInfo.id);
    }, [accounts.accounts, pageInfo]);

    useEffect(() => {
        setLoading(true);
        onGerPageInfo({
            url: `page/${url}/`,
        });
    }, [url]);

    useEffect(() => {
        setLoading(false);
        if (getPageInfoRS.result && getPageInfoRS.result.data) {
            setPageInfo(getPageInfoRS.result.data);
        }

        if (getPageInfoRS.error) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: getPageInfoRS.error,
            });
        }
    }, [getPageInfoRS]);

    if (loading || getPageInfoRS.isProcessing || !pageInfo) {
        return <Preloader />;
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
