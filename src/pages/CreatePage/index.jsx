import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NotificationContext } from '../../context/NotificationContext';
import Input from '../../common/Input';
import File from '../../common/File';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';
import {
    useCreatePageMutation,
    useGetPageByUrlQuery,
    useUpdatePageMutation,
} from '../../redux/api/dataService';
import { normilizeError } from '../../utils/http/normilizeError';
import CenteredContainer from '../../common/CenteredContainer';
import Loader from '../../common/Loader';

import './index.css';

// type Page
// {
//     "id": "b0a17740-2c89-4973-8b7d-32b23f41c8c4",
//     "hide": false,
//     "name": "Persons",
//     "number": 1,
//     "url": "persons",
//     "banner": "https://gateway.storjshare.io/demo-bucket/IMG_0609.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221222%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221222T090657Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=e55ebe0d76dc9be541100da37f833f54738c71d64057b06870315f2b75de0ccc",
//     "title_1": "Person NFT Certificates",
//     "description": "Best friendsBest friendsBest friendsBest friendsBest friendsBest friendsBest friendsB est friendsBest friendsBest friendsBest friendsBest friendsBest friendsBest friendsBest friendsBest friend sBest friendsBest friendsB est friendsBest friendsBest friendsBe st friendsBest friendsBest friendsBest friendsBest friendsBest frie ndsBest friendsB est friendsBest fri endsBest friendsBest fr iendsBest friends",
//     "title_2": "Choose Person"
// }

const CreatePage = (props) => {
    const { isEdit } = props;

    const { url: urlP } = useParams();

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const [
        onCreatePageRequest,
        { isLoading, error, isSuccess, reset: resetPageCreation },
    ] = useCreatePageMutation();

    const [
        onUpdatePageRequest,
        {
            isLoading: isPageUpdatingProccessing,
            error: updatePageError,
            isSuccess: isPageUpdatingSuccessfully,
            reset: resetPageUpdate,
        },
    ] = useUpdatePageMutation();

    const { data: page, isLoading: isPageLoading } = useGetPageByUrlQuery(urlP, {
        skip: !urlP || !isEdit,
    });

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [url, setUrl] = useState('');
    const [banner, setBanner] = useState('');
    const [title1, setTitle1] = useState('');
    const [description, setDescription] = useState('');
    const [title2, setTitle2] = useState('');

    const createPageFunc = useCallback(() => {
        if (isLoading) {
            return;
        }

        if (
            !name ||
            !url ||
            !number ||
            (!banner && !isEdit) ||
            !title1 ||
            !description ||
            !title2
        ) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: 'Fill all required fields',
            });
            return;
        }

        let formData = new FormData();

        formData.append('name', name);
        formData.append('number', parseInt(number));
        formData.append('url', url);
        if (banner) {
            formData.append('banner', banner);
        }
        formData.append('title_1', title1);
        formData.append('description', description);
        formData.append('title_2', title2);

        if (isEdit) {
            onUpdatePageRequest({
                url: urlP,
                data: formData,
            });
        } else {
            onCreatePageRequest(formData);
        }
    }, [isEdit, name, number, urlP, banner, title1, description, title2, isLoading]);

    useEffect(() => {
        if (error) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: normilizeError(error),
            });
        }
    }, [error]);

    useEffect(() => {
        if (updatePageError) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: normilizeError(updatePageError),
            });
        }
    }, [updatePageError]);

    useEffect(() => {
        if (isSuccess) {
            setName('');
            setNumber('');
            setUrl('');
            setBanner('');
            setTitle1('');
            setDescription('');
            setTitle2('');

            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'Page successfuly created',
            });
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isPageUpdatingSuccessfully) {
            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'Page successfuly updated',
            });
        }
    }, [isPageUpdatingSuccessfully]);

    useEffect(() => {
        if (page && isEdit) {
            setName(page.name);
            setNumber(String(page.number));
            setUrl(page.url);
            setTitle1(page.title_1);
            setDescription(page.description);
            setTitle2(page.title_2);
        }
    }, [page, isEdit]);

    useEffect(
        () => () => {
            resetPageCreation();
            resetPageUpdate();
        },
        [],
    );

    if (isPageLoading) {
        return (
            <CenteredContainer>
                <Loader />
            </CenteredContainer>
        );
    }

    return (
        <div className="default__padding createpage">
            <div className="container">
                <div className="createpage__inner">
                    <h2 className="title left">Create Page</h2>

                    <p className="text left">
                        The created Page will be available for management in the Control Panel.
                    </p>

                    <div className="create__content">
                        <Input
                            title="Page name"
                            placeholder="Enter Page name"
                            half
                            required
                            value={name}
                            setValue={setName}
                        />

                        <Input
                            title="Page number"
                            placeholder="1"
                            half
                            required
                            value={number}
                            setValue={setNumber}
                        />

                        <Input
                            title="URL"
                            text="Customize your URL on CheckBrandcom. Must only contain lowercase letters, numbers, and hyphens."
                            placeholder="https://checkbrand.com/URL"
                            required
                            value={url}
                            setValue={setUrl}
                        />

                        <File
                            title="Banner image"
                            text="This image will appear at the top of account page. 1400 x 400 recommended."
                            required
                            id="createpageBanner"
                            value={banner}
                            defaultValue={page && page.banner}
                            setValue={setBanner}
                        />

                        <Input
                            title="Title 1"
                            placeholder="Enter Title name"
                            required
                            value={title1}
                            setValue={setTitle1}
                        />

                        <Input
                            title="Description"
                            text="Markdown syntax is supported. 0 of 1000 characters used."
                            placeholder="Enter Page description"
                            required
                            value={description}
                            setValue={setDescription}
                            textarea
                        />

                        <Input
                            title="Title 2"
                            placeholder="Enter Title name"
                            required
                            value={title2}
                            setValue={setTitle2}
                        />
                    </div>

                    <div className="create__button--content">
                        {isLoading || isPageUpdatingProccessing ? (
                            <button className="button create__button disabled">Loading..</button>
                        ) : (
                            <button
                                className="button create__button default__hover"
                                onClick={createPageFunc}
                            >
                                {isEdit ? 'Save changes' : 'Create'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
