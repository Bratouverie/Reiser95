import React, { useCallback, useContext, useEffect, useState } from 'react';
import { REQUEST_TYPE, useRequest } from '../../hooks/useRequest';
import { NotificationContext } from '../../context/NotificationContext';
import Input from '../../common/Input';
import File from '../../common/File';

import './index.css';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';
import { HTTP_METHODS } from '../../const/http/HTTP_METHODS';

const CreatePage = () => {
    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const { state, request, onClearState } = useRequest({
        requestType: REQUEST_TYPE.DATA,
        method: HTTP_METHODS.POST,
        url: 'page/',
        isAuth: true,
    });

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [url, setUrl] = useState('');
    const [banner, setBanner] = useState('');
    const [title1, setTitle1] = useState('');
    const [description, setDescription] = useState('');
    const [title2, setTitle2] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const createPageFunc = useCallback(() => {
        if (!name || !url || !number || !banner || !title1 || !description || !title2) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: 'Fill all required fields',
            });
            return;
        }

        setIsLoading(true);

        let formData = new FormData();

        formData.append('name', name);
        formData.append('number', parseInt(number));
        formData.append('url', url);
        formData.append('banner', banner);
        formData.append('title_1', title1);
        formData.append('description', description);
        formData.append('title_2', title2);

        request({
            data: formData,
        });
    }, [name, number, url, banner, title1, description, title2]);

    useEffect(() => {
        if (state.result && state.result.data) {
            setName('');
            setNumber('');
            setUrl('');
            setBanner('');
            setTitle1('');
            setDescription('');
            setTitle2('');
            setIsLoading('');

            onClearState();

            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'Page successfuly created',
            });
        }

        if (state && state.error) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: state.error,
            });
        }

        setIsLoading(false);
    }, [state]);

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
                        {isLoading ? (
                            <button className="button create__button disabled">Loading..</button>
                        ) : (
                            <button
                                className="button create__button default__hover"
                                onClick={createPageFunc}
                            >
                                Create
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
