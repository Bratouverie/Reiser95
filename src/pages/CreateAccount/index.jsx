import React from 'react';

import './index.css';

const CreateAccount = () => {
    return(
        <div className="default__padding createpage">
            <div className="container">
                <div className="createpage__inner">
                    <h2 className="title left">
                        Create Account
                    </h2>

                    <p className="text left">
                        Account will be create on the choosed Page.
                    </p>

                    <div className="create__content">
                        <div className="create__item">
                            <p className="create__item--title">
                                Page
                            </p>

                            <p className="create__item--text">
                                Select the page on which the account will be created.
                            </p>

                            <div className="create__item--select--prop">
                                <button className="button create__item--option">
                                    Brands
                                </button>

                                <button className="button create__item--option active">
                                    Persons

                                    <img src="/assets/img/check.svg" alt="icon" className="create__item--icon" />
                                </button>

                                <button className="button create__item--option">
                                    Alco
                                </button>

                                <button className="button create__item--option">
                                    Avto
                                </button>

                                <button className="button create__item--option">
                                    Watches
                                </button>
                            </div>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Logo image
                            </p>

                            <p className="create__item--text">
                                This image will be used as Brand / Person logo. 350 x 350 recommended.
                            </p>

                            <input id="createaccountLogo" type="file" className="file" accept="image/png, image/gif, image/jpeg" />

                            <label htmlFor="createaccountLogo" className="create__item--label logo">
                                <img src="/assets/img/img.png" alt="img" className="create__item--label--img" />
                            </label>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title required">
                                Cover
                            </p>

                            <p className="create__item--text">
                                This image will be used for featuning Account on the Page. 600 x 600 recommended.
                            </p>

                            <input id="createaccountCover" type="file" className="file" accept="image/png, image/gif, image/jpeg" />

                            <label htmlFor="createaccountCover" className="create__item--label cover">
                                <img src="/assets/img/img.png" alt="img" className="create__item--label--img" />
                            </label>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Banner image
                            </p>

                            <p className="create__item--text">
                                This image will appear at the top of account page. 1400 x 400 recommended.
                            </p>

                            <input id="createaccountBanner" type="file" className="file" accept="image/png, image/gif, image/jpeg" />

                            <label htmlFor="createaccountBanner" className="create__item--label banner">
                                <img src="/assets/img/img.png" alt="img" className="create__item--label--img" />
                            </label>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Account Name
                            </p>

                            <input type="text" className="input create__item--input" placeholder="Enter Account name" />
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                URL
                            </p>

                            <p className="create__item--text">
                                Customize your URL on CheckBrandcom. Must only contain lowercase letters, numbers, and hyphens.
                            </p>

                            <input type="text" className="input create__item--input" placeholder="https://checkbrand.com/persons/accountname" />
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Description
                            </p>

                            <p className="create__item--text">
                                Markdown syntax is supported. 0 of 1000 characters used.
                            </p>

                            <textarea type="text" className="input create__item--textarea"></textarea>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Links
                            </p>

                            <div className="create__item--links">
                                <div className="create__item--link">
                                    <img src="/assets/img/opensea.svg" alt="opensea" className="create__item--link--icon" />

                                    <input className="input create__item--link--input" placeholder="https://opensea.io/abcdef" />
                                </div>
                                
                                <div className="create__item--link">
                                    <img src="/assets/img/discord-white.svg" alt="discord" className="create__item--link--icon" />

                                    <input className="input create__item--link--input" placeholder="https://discord.gg/abcdef" />
                                </div>

                                <div className="create__item--link">
                                    <img src="/assets/img/insta.svg" alt="instagram" className="create__item--link--icon" />

                                    <input className="input create__item--link--input" placeholder="https://www.instagram.com/YourinstagramHandle" />
                                </div>

                                <div className="create__item--link">
                                    <img src="/assets/img/twitter.svg" alt="twitter" className="create__item--link--icon" />

                                    <input className="input create__item--link--input" placeholder="https://twitter.com/abcdef" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="create__button--content">
                        <div className="create__button--wrapper">
                            <button className="button create__button default__hover">
                                Create
                            </button>

                            <button className="button create__button default__hover delete">
                                Delete
                            </button>
                        </div>

                        <div className="create__button--wrapper">
                            <button className="button create__button default__hover">
                                Submit changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount;