import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Input from '../../common/Input';
import File from '../../common/File';
import { REQUEST_TYPE, useRequest } from '../../hooks/useRequest';
import { HTTP_METHODS } from '../../const/http/HTTP_METHODS';

import './index.css';

const SocialLinks = {
    OPENSEA: {
        imgLink: '/assets/img/opensea.svg',
        name: 'opensea',
        placeholder: 'https://opensea.io/abcdef',
    },
    DISCORD: {
        imgLink: '/assets/img/discord-white.svg',
        name: 'discord',
        placeholder: 'https://discord.gg/abcdef',
    },
    INSTAGRAM: {
        imgLink: '/assets/img/insta.svg',
        name: 'instagram',
        placeholder: 'https://www.instagram.com/YourinstagramHandle',
    },
    TWITTER: {
        imgLink: '/assets/img/twitter.svg',
        name: 'twitter',
        placeholder: 'https://twitter.com/abcdef',
    },
};

const SOCIAL_LINKS_ARR = Object.values(SocialLinks);

const CreateAccount = () => {
    const pages = useSelector(state => state.pages);

    const { state, request, onClearState } = useRequest({
        requestType: REQUEST_TYPE.DATA,
        method: HTTP_METHODS.POST,
        url: 'account/',
        isAuth: true,
    });

    const [brandId, setBrandId] = useState('');
    const [logo, setLogo] = useState('');
    const [accountName, setAccountName] = useState('');
    const [cover, setCover] = useState('');
    const [banner, setBanner] = useState('');
    const [url, setUrl] = useState('');
    const [descriprion, setDescriprion] = useState('');
    const [social, setSocial] = useState({
        opensea: '',
        discord: '',
        instagram: '',
        twitter: '',
    });

    const createAccountFunc = useCallback(() => {
        let formData = new FormData();

        formData.append('link_opensea', social.opensea);
        formData.append('link_discord', social.discord);
        formData.append('link_instagram', social.instagram);
        formData.append('link_twitter', social.twitter);
        formData.append('logo', logo);
        formData.append('cover', cover);
        formData.append('brand', brandId);
        formData.append('name', accountName);
        formData.append('url', url);
        formData.append('descriprion', descriprion);

        request({
            data: formData,
        });
    }, [brandId, logo, accountName, cover, banner, url, descriprion, social]);

    const changeBrandHandler = useCallback(id => {
        setBrandId(id);
    }, []);

    const onChangeSocialLinksHandler = useCallback((key, value) => {
        setSocial(p => ({
            ...p,
            [key]: value,
        }));
    }, []);

    useEffect(() => {
        if (state && state.error) {
            alert(state.error);
        }
    }, [state.error]);

    useEffect(() => {
        if (state && state.result) {
            setBrandId('');
            setLogo('');
            setAccountName('');
            setCover('');
            setBanner('');
            setUrl('');
            setDescriprion('');
            setSocial('');
            setSocial({
                opensea: '',
                discord: '',
                instagram: '',
                twitter: '',
            });
            onClearState();
        }
    }, [state]);

    return (
        <div className="default__padding createpage">
            <div className="container">
                <div className="createpage__inner">
                    <h2 className="title left">Create Account</h2>

                    <p className="text left">Account will be create on the choosed Page.</p>

                    <div className="create__content">
                        <div className="create__item">
                            <p className="create__item--title">Page</p>

                            <p className="create__item--text">
                                Select the page on which the account will be created.
                            </p>

                            <div className="create__item--select--prop">
                                {(pages.pages || []).map(page => (
                                    <button
                                        key={page.id}
                                        className={`button create__item--option ${
                                            page.id === brandId ? 'active' : ''
                                        }`}
                                        onClick={() => changeBrandHandler(page.id)}
                                    >
                                        {page.name}
                                        {page.id === brandId && (
                                            <img
                                                src="/assets/img/check.svg"
                                                alt="icon"
                                                className="create__item--icon"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <File
                            title="Logo image"
                            text="This image will be used as Brand / Person logo. 350 x 350 recommended."
                            required
                            type="logo"
                            id="createaccountLogo"
                            value={logo}
                            setValue={setLogo}
                        />
                        <File
                            title="Cover"
                            text="This image will be used for featuning Account on the Page. 600 x 600 recommended."
                            required
                            type="cover"
                            id="createaccountCover"
                            value={cover}
                            setValue={setCover}
                        />
                        <File
                            title="Banner image"
                            text="This image will appear at the top of account page. 1400 x 400 recommended."
                            required
                            id="createaccountBanner"
                            value={banner}
                            setValue={setBanner}
                        />
                        <Input
                            title="Account Name"
                            placeholder="Enter Account name"
                            required
                            value={accountName}
                            setValue={setAccountName}
                        />
                    </div>
                    <Input
                        title="URL"
                        text="Customize your URL on CheckBrandcom. Must only contain lowercase letters, numbers, and hyphens."
                        placeholder="https://checkbrand.com/persons/accountname"
                        required
                        value={url}
                        setValue={setUrl}
                    />
                    <Input
                        title="Description"
                        text="Markdown syntax is supported. 0 of 1000 characters used."
                        textarea
                        required
                        value={descriprion}
                        setValue={setDescriprion}
                    />

                    <div className="create__item">
                        <p className="create__item--title">Links</p>

                        <div className="create__item--links">
                            {SOCIAL_LINKS_ARR.map(({ imgLink, name, placeholder }) => (
                                <div className="create__item--link" key={name}>
                                    <img
                                        src={imgLink}
                                        alt={name}
                                        className="create__item--link--icon"
                                    />
                                    <Input
                                        className="linkContainer"
                                        placeholder={placeholder}
                                        isLink
                                        value={social[name]}
                                        setValue={value => onChangeSocialLinksHandler(name, value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="create__button--content">
                        <div className="create__button--content">
                            {state.isProcessing ? (
                                <button className="button create__button disabled">
                                    Loading...
                                </button>
                            ) : (
                                <button
                                    className="button create__button default__hover"
                                    onClick={createAccountFunc}
                                >
                                    Create
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;
