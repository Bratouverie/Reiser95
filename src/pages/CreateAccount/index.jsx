import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Input from '../../common/Input';
import File from '../../common/File';
import { createAccaunt } from '../../functions/data';
import { REQUEST_TYPE, useRequest } from '../../hooks/useRequest';

import './index.css';

const BrandsName = {
  BRANDS: 'Brands',
  PERSONS: 'Persons',
  ALCO: 'Alco',
  AVTO: 'Avto',
  WATCHES: 'Watches',
};

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

const BRANDS_BUTTONS_ARR = Object.values(BrandsName);
const SOCIAL_LINKS_ARR = Object.values(SocialLinks);

const CreateAccount = () => {
  const auth = useSelector(state => state.auth);

  const [isLoading, setIsLoading] = useState(false);

  const [brand, setBrand] = useState(BrandsName.PERSONS);
  const [logo, setLogo] = useState('');
  const [accauntName, setAccauntName] = useState('');
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

  const { state, request, onClearState } = useRequest(REQUEST_TYPE.DATA);

  const createAccountFunc = useCallback(() => {
    setIsLoading(true);

    let formData = new FormData();
    formData.append('brand', brand);
    formData.append('logo', logo);
    formData.append('accauntName', accauntName);
    formData.append('cover', cover);
    formData.append('url', url);
    formData.append('descriprion', descriprion);
    formData.append('opensea', social.opensea);
    formData.append('discord', social.discord);
    formData.append('instagram', social.instagram);
    formData.append('twitter', social.twitter);

    // const createdPage = createAccaunt(formData, auth.accessToken);

    // createdPage
    //   .then(d => {
    //     alert('Account created!');
    //     setBrand('');
    //     setLogo('');
    //     setAccauntName('');
    //     setCover('');
    //     setBanner('');
    //     setUrl('');
    //     setDescriprion('');
    //     setSocial('');
    //     setSocial({
    //       opensea: '',
    //       discord: '',
    //       instagram: '',
    //       twitter: '',
    //     });
    //   })
    //   .catch(e => {
    //     alert('Please fill all inputs');
    //     console.log(e);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  }, [brand, logo, accauntName, cover, banner, url, descriprion, social, auth.accessToken]);

  const changeBrandHandler = useCallback(brand => {
    setBrand(brand);
  }, []);

  const onChangeSocialLinksHandler = useCallback((key, value) => {
    setSocial(p => ({
      ...p,
      [key]: value,
    }));

    useEffect(() => {
      console.log({ state });
    }, [state]);

    useEffect(() => {
      request({
        url: 'page/',
      });
    }, []);
  }, []);

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
                {BRANDS_BUTTONS_ARR.map(btnName => (
                  <button
                    key={btnName}
                    className={`button create__item--option ${btnName === brand ? 'active' : ''}`}
                    onClick={() => changeBrandHandler(btnName)}
                  >
                    {btnName}
                    {btnName === brand && (
                      <img src="/assets/img/check.svg" alt="icon" className="create__item--icon" />
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
              value={accauntName}
              setValue={setAccauntName}
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
                  <img src={imgLink} alt={name} className="create__item--link--icon" />
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
              {isLoading ? (
                <button className="button create__button disabled">Loading...</button>
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
