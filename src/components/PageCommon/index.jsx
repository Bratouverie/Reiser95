import React from 'react';

import api from '../../api';

const PageCommon = () => {
    const [name, setName] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [banner, setBanner] = React.useState('');
    const [title1, setTitle1] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [title2, setTitle2] = React.useState('');
    const [progress, setProgress] = React.useState(false);

    const createPage = () => {
        setProgress(true);
        let formData = new FormData();
        formData.append('name', name);
        formData.append('number', parseInt(number));
        formData.append('url', url);
        formData.append('banner', banner);
        formData.append('title_1', title1);
        formData.append('description', description);
        formData.append('title_2', title2);

        api.post('page/', formData)
            .then(data => {
                alert('Page created!');
            })
            .catch(e => {
                alert('Please fill all inputs');
                console.log(e);
            })
            .finally(() => {
                setProgress(false);
            });
    };

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
                            placeholder="https://checkbrand.com/"
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
                        {progress ? (
                            <button className="button create__button default__hover disabled">
                                Loading..
                            </button>
                        ) : (
                            <button
                                className="button create__button default__hover"
                                onClick={createPage}
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

export default PageCommon;
