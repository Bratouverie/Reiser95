import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import File from '../../common/File';
import Input from '../../common/Input';
import { getAccountsList } from '../../functions/data';

import './index.css';

const OpenSeaCategory = {
  ART: 'Art',
  COLLECTIBLES: 'Collectibles',
  MUSIC: 'Music',
  PHOTOGRAPHY: 'Photography',
  SPORTS: 'Sports',
  TRANDING_CARDS: 'TradingCards',
  UTILITY: 'Utility',
};

const CheckBrandcomPages = {
  BRANDS: 'Brands',
  PERSONS: 'Persons',
  ALCO: 'Alco',
  WATCHES: 'Watches',
  AVTO: 'Avto',
};

const OPENSEA_CATEGORY_ARR = Object.values(OpenSeaCategory);
const CHECK_BRANDCOM_PAGE = Object.values(CheckBrandcomPages);

const CreateCollection = () => {
  const auth = useSelector(state => state.auth);

  const [accountsList, setAccountsList] = useState([]);

  const [logo, setLogo] = useState('');
  const [adminSmart, setAdminSmart] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [banner, setBanner] = useState('');
  const [name, setName] = useState('');
  const [opensea, setOpensea] = useState('');
  const [descriprion, setDescriprion] = useState('');
  const [checkbrandcom, setCheckbrandcom] = useState('');
  const [openSeaCategory, setOpenSeaCategory] = useState(OpenSeaCategory.ART);
  const [checkBrandcom, setCheckBrandcom] = useState(CheckBrandcomPages.BRANDS);

  useEffect(() => {
    const accountsListRes = getAccountsList();
    console.log({ accountsListRes });
    setAccountsList(accountsListRes);
  }, [auth.accessToken]);

  return (
    <div className="default__padding createpage">
      <div className="container">
        <div className="createpage__inner">
          <h2 className="title left">Create a collection</h2>

          <p className="text left">
            Collection is creating on the OpenSea and is visible on CheckBrandcom
          </p>

          <div className="create__content">
            <File
              title="Logo image"
              text="This image will be used as Brand / Person logo. 350 x 350 recommended."
              required
              half
              type="logo"
              id="createaccountLogo"
              value={logo}
              setValue={setLogo}
            />
            <Input
              title="Smart-contract administrator"
              placeholder="0xeA09D6D8Cff17b11E45763d1025831de3E2DdaAF"
              required
              half
              value={adminSmart}
              setValue={setAdminSmart}
            />
            <File
              title="Featured image"
              text="This image will be used for featuning your collection on the Account page. 600 x 400
              recommended."
              required
              id="featuredImage"
              value={featuredImage}
              setValue={setFeaturedImage}
            />
            <File
              title="Banner image"
              text="This image will appear at the top of account page. 1400 x 400 recommended."
              required
              id="createcollectionBanner"
              value={banner}
              setValue={setBanner}
            />
            <Input
              title="name"
              placeholder="Enter Collection name"
              required
              value={name}
              setValue={setName}
            />
            <Input
              title="URL OpenSea"
              text="Customize your URL on OpenSea. Must only contain lowercase letters, numbers, and hyphens."
              placeholder="https://opensea.io/collection/custom URL"
              required
              value={opensea}
              setValue={setOpensea}
            />
            <Input
              title="URL CheckBrandcom"
              text="Customize your URL on CheckBrandcom. Must only contain lowercase letters, numbers, and hyphens."
              placeholder="https://checkbrand.com/collection/custom URL"
              required
              value={checkbrandcom}
              setValue={setCheckbrandcom}
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
              <p className="create__item--title">Category OpenSea</p>

              <p className="create__item--text">
                Adding a category will help make your item discoverable on OpenSea.
              </p>

              <div className="create__item--select--prop">
                {OPENSEA_CATEGORY_ARR.map(c => (
                  <button
                    className={`button create__item--option ${
                      c === openSeaCategory ? 'active' : ''
                    }`}
                    onClick={() => setOpenSeaCategory(c)}
                  >
                    {c}
                    {c === openSeaCategory && (
                      <img src="/assets/img/check.svg" alt="icon" className="create__item--icon" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="create__item">
              <p className="create__item--title">CheckBrandcom Page</p>

              <p className="create__item--text">
                Select the page that hosts the account where you want to create the collection.
              </p>

              <div className="create__item--select--prop">
                {CHECK_BRANDCOM_PAGE.map(p => (
                  <button
                    className={`button create__item--option ${p === checkBrandcom ? 'active' : ''}`}
                    onClick={() => setCheckBrandcom(p)}
                  >
                    {p}
                    {p === checkBrandcom && (
                      <img src="/assets/img/check.svg" alt="icon" className="create__item--icon" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="create__item">
              <p className="create__item--title">Account</p>

              <p className="create__item--text">Choose an account to place the collection.</p>

              <div className="create__item--account--inner">
                <div className="create__item--account--content">
                  <div className="create__item--account--item">
                    <input
                      type="radio"
                      name="accounts"
                      className="create__item--account--checkbox"
                      id="account1"
                    />

                    <label htmlFor="account1" className="create__item--account--item--label">
                      <span className="create__item--account--item--label--wrap">
                        <p className="create__item--account--item--num">1</p>

                        <span className="create__item--account--item--img"></span>

                        <p className="create__item--account--item--name">Account name</p>
                      </span>

                      <span className="create__item--account--item--circle"></span>
                    </label>
                  </div>

                  <div className="create__item--account--item">
                    <input
                      type="radio"
                      name="accounts"
                      className="create__item--account--checkbox"
                      id="account2"
                    />

                    <label htmlFor="account2" className="create__item--account--item--label">
                      <span className="create__item--account--item--label--wrap">
                        <p className="create__item--account--item--num">2</p>

                        <span className="create__item--account--item--img"></span>

                        <p className="create__item--account--item--name">Versace</p>
                      </span>

                      <span className="create__item--account--item--circle"></span>
                    </label>
                  </div>

                  <div className="create__item--account--item">
                    <input
                      type="radio"
                      name="accounts"
                      className="create__item--account--checkbox"
                      id="account3"
                    />

                    <label htmlFor="account3" className="create__item--account--item--label">
                      <span className="create__item--account--item--label--wrap">
                        <p className="create__item--account--item--num">3</p>

                        <span className="create__item--account--item--img"></span>

                        <p className="create__item--account--item--name">Armani</p>
                      </span>

                      <span className="create__item--account--item--circle"></span>
                    </label>
                  </div>

                  <div className="create__item--account--item">
                    <input
                      type="radio"
                      name="accounts"
                      className="create__item--account--checkbox"
                      id="account4"
                    />

                    <label htmlFor="account4" className="create__item--account--item--label">
                      <span className="create__item--account--item--label--wrap">
                        <p className="create__item--account--item--num">4</p>

                        <span className="create__item--account--item--img"></span>

                        <p className="create__item--account--item--name">Gucci</p>
                      </span>

                      <span className="create__item--account--item--circle"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="create__item">
              <p className="create__item--title">Links</p>

              <div className="create__item--links">
                <div className="create__item--link">
                  <img
                    src="/assets/img/opensea.svg"
                    alt="opensea"
                    className="create__item--link--icon"
                  />

                  <input
                    className="input create__item--link--input"
                    placeholder="https://opensea.io/abcdef"
                  />
                </div>

                <div className="create__item--link">
                  <img
                    src="/assets/img/discord-white.svg"
                    alt="discord"
                    className="create__item--link--icon"
                  />

                  <input
                    className="input create__item--link--input"
                    placeholder="https://discord.gg/abcdef"
                  />
                </div>

                <div className="create__item--link">
                  <img
                    src="/assets/img/insta.svg"
                    alt="instagram"
                    className="create__item--link--icon"
                  />

                  <input
                    className="input create__item--link--input"
                    placeholder="https://www.instagram.com/YourinstagramHandle"
                  />
                </div>

                <div className="create__item--link">
                  <img
                    src="/assets/img/twitter.svg"
                    alt="twitter"
                    className="create__item--link--icon"
                  />

                  <input
                    className="input create__item--link--input"
                    placeholder="https://twitter.com/abcdef"
                  />
                </div>
              </div>
            </div>

            <div className="create__item">
              <p className="create__item--title">Creator Earnings</p>

              <p className="create__item--text">
                Collect a fee when a user re-sells on item you originally created. This is deducted
                from the final sale price and paid monthly to a payout address of your choosing.
              </p>

              <p className="create__item--text">Percentage fee</p>

              <input type="text" className="input create__item--input" placeholder="e.g. 5" />
            </div>

            <div className="create__item">
              <p className="create__item--title">Blockchain</p>

              <p className="create__item--text">
                Select the blockchain where you&rsquo;d like new items from this collection to be
                added by default.
              </p>

              <div className="create__item--select--inner">
                <select className="select create__item--select">
                  <option>Ethereum</option>
                  <option>Ethereum 2</option>
                  <option>Ethereum 3</option>
                  <option>Ethereum 4</option>
                  <option>Ethereum 5</option>
                </select>

                <img
                  src="/assets/img/arrow-select.png"
                  alt="arrow"
                  className="create__item--select--icon"
                />
              </div>
            </div>

            <div className="create__item">
              <p className="create__item--title">Payment tokens</p>

              <p className="create__item--text">
                These tokens can used to buy and sell your items.
              </p>

              <div className="create__item--select--prop">
                <button className="button create__item--pay--button">
                  <img src="/assets/img/eth.svg" alt="eth" className="create__item--pay--icon" />

                  <span className="create__item--pay--button--wrap">
                    <p className="create__item--pay--button--title">Eth</p>

                    <p className="create__item--pay--button--text">Ethereum</p>
                  </span>
                </button>

                <button className="button create__item--pay--button">
                  <img src="/assets/img/cat.png" alt="eth" className="create__item--pay--icon" />

                  <span className="create__item--pay--button--wrap">
                    <p className="create__item--pay--button--title">Eth</p>

                    <p className="create__item--pay--button--text">Ethereum</p>
                  </span>
                </button>
              </div>

              <div className="create__item--select--inner">
                <select className="select create__item--select">
                  <option>Add token</option>
                  <option>Add token 2</option>
                  <option>Add token 3</option>
                  <option>Add token 4</option>
                  <option>Add token 5</option>
                </select>

                <img
                  src="/assets/img/arrow-select.png"
                  alt="arrow"
                  className="create__item--select--icon"
                />
              </div>
            </div>

            <div className="create__item">
              <p className="create__item--title">Display theme</p>

              <p className="create__item--text">Change how your items are shown.</p>

              <div className="create__item--theme--inner">
                <button className="button create__item--theme--item">
                  <img
                    src="/assets/img/display1.png"
                    alt="theme"
                    className="create__item--theme--item--img"
                  />

                  <p className="create__item--theme--item--title">Padded</p>

                  <p className="create__item--theme--item--text">
                    Recommended for assets with transparent background
                  </p>
                </button>

                <button className="button create__item--theme--item">
                  <img
                    src="/assets/img/display2.png"
                    alt="theme"
                    className="create__item--theme--item--img"
                  />

                  <p className="create__item--theme--item--title">Contained</p>

                  <p className="create__item--theme--item--text">
                    Recommended for assets that are not a 1:1 ratio
                  </p>
                </button>

                <button className="button create__item--theme--item active">
                  <img
                    src="/assets/img/display3.png"
                    alt="theme"
                    className="create__item--theme--item--img"
                  />

                  <p className="create__item--theme--item--title">Covered</p>

                  <p className="create__item--theme--item--text">
                    Recommended for assets that can extend to the edge
                  </p>

                  <img src="/assets/img/check.svg" alt="icon" className="create__item--icon" />
                </button>
              </div>
            </div>
          </div>

          <div className="create__button--content">
            <div className="create__button--wrapper">
              <button className="button create__button default__hover">Create</button>

              <button className="button create__button filled">Upload in Blockchane</button>

              <button className="button create__button default__hover delete">
                Delete Collection
              </button>
            </div>

            <div className="create__button--wrapper">
              <button className="button create__button default__hover">Submit changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCollection;
