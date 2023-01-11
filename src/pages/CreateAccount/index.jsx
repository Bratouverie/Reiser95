import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NotificationContext } from '../../context/NotificationContext';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';
import { normilizeError } from '../../utils/http/normilizeError';
import {
    useCreateAccountMutation,
    useGetAccountQuery,
    useGetPageByUrlQuery,
    useGetPagesQuery,
    useUpdateAccountMutation,
} from '../../redux/api/dataService';
import Input from '../../common/Input';
import File from '../../common/File';
import CenteredContainer from '../../common/CenteredContainer';
import Loader from '../../common/Loader';
import { pagesSelectors } from '../../redux/slices/pages';

import './index.css';

// type Account = {
//     {
//         "id": "bdb6027e-f74f-448d-b5fc-e072f612bea0",
//         "hide": false,
//         "link_opensea": "",
//         "link_discord": "",
//         "link_instagram": "",
//         "link_medium": null,
//         "link_twitter": "",
//         "type": "standard",
//         "logo": "https://gateway.storjshare.io/demo-bucket/accounts/005.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221222%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221222T173046Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=fdd4592b8128af97fb5e3b0b905efaaae62af99599d262207b6a03df21af2128",
//         "cover": "https://gateway.storjshare.io/demo-bucket/accounts/005_mdcD3IR.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221222%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221222T173046Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=67098796eba424560d0a8b7431a7bf2a1d7b96506db41bfa9c854258a4955c6e",
//         "banner": "https://gateway.storjshare.io/demo-bucket/accounts/005_2R62XPP.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221222%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221222T173046Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=701e9d3378f2de3891a99d5c200120f9c53595ca563ca48bfe60d0a5feac4658",
//         "name": "Lorem",
//         "url": "Lorem",
//         "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//         "items_count": 16,
//         "owners_count": 0,
//         "collections_count": 1,
//         "floor_price_count": "0.10000000",
//         "volume_troded_count": "0.00000000",
//         "profit": "1.60000000",
//         "page": "216c2c74-f307-43e3-94f1-ab2e1172aff1"
//     }
// }

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

const CreateAccount = (props) => {
    const { isEdit } = props;

    const { id } = useParams();

    const pages = useSelector(pagesSelectors.selectAll);

    const [
        onCreateAccountRequest,
        { isLoading, error, isSuccess, reset },
    ] = useCreateAccountMutation();

    const { data: account, isLoading: isAccountLoading } = useGetAccountQuery(
        { id },
        {
            skip: !id || !isEdit,
        },
    );

    const [
        onUpdateAccountRequest,
        {
            isLoading: isAccountUpdatingProccessing,
            error: updateAccountError,
            isSuccess: isAccountUpdatingSuccessfully,
            reset: resetAccountUpdate,
        },
    ] = useUpdateAccountMutation();

    const { isLoading: isPagesLoading } = useGetPagesQuery();

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

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

        if (
            (!logo && !isEdit) ||
            (!cover && !isEdit) ||
            (!banner && !isEdit) ||
            !brandId ||
            !accountName ||
            !url ||
            !descriprion
        ) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: 'Fill all required fields',
            });

            return;
        }

        formData.append('link_opensea', social.opensea);
        formData.append('link_discord', social.discord);
        formData.append('link_instagram', social.instagram);
        formData.append('link_twitter', social.twitter);

        if (logo) {
            formData.append('logo', logo);
        }

        if (cover) {
            formData.append('cover', cover);
        }

        if (banner) {
            formData.append('banner', banner);
        }

        formData.append('page', brandId);
        formData.append('name', accountName);
        formData.append('url', url);
        formData.append('description', descriprion);

        if (isEdit) {
            onUpdateAccountRequest({ id, data: formData });
        } else {
            onCreateAccountRequest(formData);
        }
    }, [isEdit, id, brandId, logo, accountName, cover, banner, url, descriprion, social]);

    const changeBrandHandler = useCallback((id) => {
        setBrandId(id);
    }, []);

    const onChangeSocialLinksHandler = useCallback((key, value) => {
        setSocial((p) => ({
            ...p,
            [key]: value,
        }));
    }, []);

    useEffect(() => {
        if (error) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: normilizeError(error),
            });
        }
    }, [error]);

    useEffect(() => {
        if (isSuccess) {
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

            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'Accaunt successfuly created',
            });
        }
    }, [isSuccess]);

    useEffect(() => {
        if (updateAccountError) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: normilizeError(updateAccountError),
            });
        }
    }, [updateAccountError]);

    useEffect(() => {
        if (isAccountUpdatingSuccessfully) {
            addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                text: 'Account successfuly updated',
            });
        }
    }, [isAccountUpdatingSuccessfully]);

    useEffect(() => {
        if (account && isEdit) {
            setBrandId(account.page);
            setAccountName(account.name);
            setUrl(account.url);
            setDescriprion(account.description);
            setSocial({
                opensea: account.link_opensea,
                discord: account.link_discord,
                instagram: account.link_instagram,
                twitter: account.link_twitter,
            });
        }
    }, [account, isEdit]);

    useEffect(
        () => () => {
            reset();
            resetAccountUpdate();
        },
        [],
    );

    if (isPagesLoading || isAccountLoading || (!account && isEdit)) {
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
                    <h2 className="title left">{isEdit ? 'Update Account' : 'Create Account'}</h2>

                    <p className="text left">Account will be create on the choosed Page.</p>

                    <div className="create__content">
                        <div className="create__item">
                            <p className="create__item--title">Page</p>

                            <p className="create__item--text">
                                Select the page on which the account will be created.
                            </p>

                            <div className="create__item--select--prop">
                                {(pages || []).map((page) => (
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
                            defaultValue={account && account.logo}
                            value={logo}
                            setValue={setLogo}
                        />
                        <File
                            title="Cover"
                            text="This image will be used for featuning Account on the Page. 600 x 600 recommended."
                            required
                            type="cover"
                            id="createaccountCover"
                            defaultValue={account && account.cover}
                            value={cover}
                            setValue={setCover}
                        />
                        <File
                            title="Banner image"
                            text="This image will appear at the top of account page. 1400 x 400 recommended."
                            required
                            id="createaccountBanner"
                            defaultValue={account && account.banner}
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
                                        setValue={(value) =>
                                            onChangeSocialLinksHandler(name, value)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="create__button--content">
                        <div className="create__button--content">
                            {isLoading || isAccountUpdatingProccessing ? (
                                <button className="button create__button disabled">
                                    Loading...
                                </button>
                            ) : (
                                <button
                                    className="button create__button default__hover"
                                    onClick={createAccountFunc}
                                >
                                    {isEdit ? 'Save changes' : 'Create'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CreateAccount);
